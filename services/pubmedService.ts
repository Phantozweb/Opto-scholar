
import { PUBMED_API_BASE, JOURNAL_OPTIONS } from '../constants';
import { SearchResult, ArticleSummary, ESearchResult, ESummaryResult, SearchOptions } from '../types';

/**
 * Searches PubMed for the given term with options for sorting and filtering.
 * Uses GET request to minimize CORS preflight issues in browser environments.
 */
export const searchArticles = async (options: SearchOptions): Promise<SearchResult> => {
  const { 
    term, 
    retstart = 0, 
    retmax = 10, 
    sortBy = 'relevance', 
    dateFilter = 'all',
    customStartYear,
    customEndYear,
    journalFilter = 'all'
  } = options;

  const cleanTerm = term.trim().replace(/"/g, ''); // Simple sanitization

  // IMPROVED SEARCH LOGIC:
  const contentQuery = `(${cleanTerm}[Title] OR ${cleanTerm}[Title/Abstract])`;

  let finalTerm = contentQuery;

  // Apply Journal Filter
  if (journalFilter && journalFilter !== 'all') {
    finalTerm = `${contentQuery} AND "${journalFilter}"[Journal]`;
  } else {
    // Default: Filter by ALL indexed journals
    const journalQuery = JOURNAL_OPTIONS.map(j => `"${j.value}"[Journal]`).join(' OR ');
    finalTerm = `${contentQuery} AND (${journalQuery})`;
  }

  // Construct parameters
  const params = new URLSearchParams();
  params.append('db', 'pubmed');
  params.append('term', finalTerm);
  params.append('retmode', 'json');
  params.append('retstart', retstart.toString());
  params.append('retmax', retmax.toString());
  params.append('sort', sortBy);

  // Apply Date Filters
  if (dateFilter !== 'all') {
    params.append('datetype', 'pdat'); // Filter by Publication Date
    
    if (dateFilter === '1year') {
      params.append('reldate', '365');
    } else if (dateFilter === '5years') {
      params.append('reldate', '1825');
    } else if (dateFilter === 'custom' && customStartYear && customEndYear) {
      params.append('mindate', `${customStartYear}/01/01`);
      params.append('maxdate', `${customEndYear}/12/31`);
    }
  }

  // Using GET instead of POST to avoid CORS preflight triggers on simple content types
  // The query length is usually within limits for GET (~2KB-8KB depending on browser/server)
  const response = await fetch(`${PUBMED_API_BASE}/esearch.fcgi?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Search API failed: ${response.statusText}`);
  }

  const data = await response.json();
  const result: ESearchResult = data.esearchresult;

  if (!result) {
    throw new Error("Invalid response structure from NLM");
  }

  return {
    count: parseInt(result.count || '0', 10),
    retmax: parseInt(result.retmax || '0', 10),
    retstart: parseInt(result.retstart || '0', 10),
    ids: result.idlist || []
  };
};

/**
 * Fetches the total count of articles in the curated OptoAtlas journal list.
 */
export const getAtlasCount = async (): Promise<string | null> => {
  const journalQuery = JOURNAL_OPTIONS.map(j => `"${j.value}"[Journal]`).join(' OR ');

  const params = new URLSearchParams();
  params.append('db', 'pubmed');
  params.append('term', journalQuery);
  params.append('retmode', 'json');
  params.append('rettype', 'count');

  try {
    const response = await fetch(`${PUBMED_API_BASE}/esearch.fcgi?${params.toString()}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.esearchresult?.count || null;
  } catch (e) {
    return null;
  }
};

/**
 * Fetches summaries for a list of PubMed IDs.
 */
export const getArticleSummaries = async (ids: string[]): Promise<ArticleSummary[]> => {
  if (ids.length === 0) return [];

  const params = new URLSearchParams({
    db: 'pubmed',
    id: ids.join(','),
    retmode: 'json'
  });

  const response = await fetch(`${PUBMED_API_BASE}/esummary.fcgi?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Summary API failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Validation: Ensure result exists
  if (!data || !data.result) {
    console.warn("No result found in summary response");
    return [];
  }

  const result: ESummaryResult = data.result;
  
  // Validation: Ensure uids array exists
  if (!result.uids || !Array.isArray(result.uids)) {
     return [];
  }

  return result.uids.map((uid) => {
    const item = result[uid];
    if (!item) return { uid, title: 'Error loading item', authors: [], pubdate: '', source: '' };
    
    const doiObj = item.articleids?.find((id: any) => id.idtype === 'doi');
    const doi = doiObj ? doiObj.value : undefined;

    return {
      uid: uid,
      title: item.title || 'No Title Available',
      authors: item.authors || [],
      pubdate: item.pubdate,
      source: item.source,
      fulljournalname: item.fulljournalname,
      volume: item.volume,
      issue: item.issue,
      pages: item.pages,
      epubdate: item.epubdate,
      doctype: item.doctype,
      doi: doi
    };
  });
};

/**
 * Fetches the abstract for a specific PubMed ID.
 */
export const getArticleAbstract = async (id: string): Promise<string> => {
  const params = new URLSearchParams({
    db: 'pubmed',
    id: id,
    retmode: 'xml'
  });

  const response = await fetch(`${PUBMED_API_BASE}/efetch.fcgi?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Fetch API failed: ${response.statusText}`);
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  const abstractTexts = xmlDoc.getElementsByTagName("AbstractText");
  
  if (abstractTexts.length === 0) {
    return "Abstract not available.";
  }

  let fullAbstract = "";
  for (let i = 0; i < abstractTexts.length; i++) {
    const node = abstractTexts[i];
    const label = node.getAttribute("Label");
    const text = node.textContent;
    
    if (label) {
      fullAbstract += `${label}: ${text}\n\n`;
    } else {
      fullAbstract += `${text}\n\n`;
    }
  }

  return fullAbstract.trim();
};

/**
 * Fetches keywords for a specific PubMed ID.
 */
export const getArticleKeywords = async (id: string): Promise<string[]> => {
  const params = new URLSearchParams({
    db: 'pubmed',
    id: id,
    retmode: 'xml'
  });

  try {
    const response = await fetch(`${PUBMED_API_BASE}/efetch.fcgi?${params.toString()}`);
    if (!response.ok) return [];

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const keywordNodes = xmlDoc.getElementsByTagName("Keyword");
    const keywords: string[] = [];
    
    for (let i = 0; i < keywordNodes.length; i++) {
      if (keywordNodes[i].textContent) {
        keywords.push(keywordNodes[i].textContent!);
      }
    }
    return keywords;
  } catch (e) {
    return [];
  }
};

/**
 * Fetches the full citation in Medline format.
 */
export const getArticleCitation = async (id: string): Promise<string> => {
  const params = new URLSearchParams({
    db: 'pubmed',
    id: id,
    rettype: 'medline',
    retmode: 'text'
  });

  const response = await fetch(`${PUBMED_API_BASE}/efetch.fcgi?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Fetch API failed: ${response.statusText}`);
  }

  return await response.text();
};

/**
 * Checks for spelling suggestions for a given term.
 * Silences errors to prevent UI noise for non-critical features.
 */
export const getSpellingSuggestion = async (term: string): Promise<string | null> => {
  const params = new URLSearchParams({
    db: 'pubmed',
    term: term
  });

  try {
    const response = await fetch(`${PUBMED_API_BASE}/espell.fcgi?${params.toString()}`);
    if (!response.ok) return null;

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const correctedQuery = xmlDoc.getElementsByTagName("CorrectedQuery")[0];
    return correctedQuery ? correctedQuery.textContent : null;
  } catch (e) {
    // Silently fail for spelling suggestions
    return null;
  }
};

/**
 * Fetches related articles.
 */
export const getRelatedArticles = async (id: string, title?: string): Promise<ArticleSummary[]> => {
  const params = new URLSearchParams({
    dbfrom: 'pubmed',
    db: 'pubmed',
    id: id,
    cmd: 'neighbor',
    retmode: 'json'
  });

  try {
    const response = await fetch(`${PUBMED_API_BASE}/elink.fcgi?${params.toString()}`);
    
    let relatedIds: string[] = [];
    
    if (response.ok) {
      const data = await response.json();
      
      const linkSet = data.linksets?.[0];
      if (linkSet?.linksetdbs) {
        const relatedDb = linkSet.linksetdbs.find((db: any) => db.linkname === 'pubmed_pubmed');
        if (relatedDb && relatedDb.links) {
          relatedIds = relatedDb.links.map((l: any) => l.id);
        }
      }
    }

    relatedIds = relatedIds.filter(relatedId => relatedId !== id);

    if (relatedIds.length < 3 && title) {
      const cleanTitle = title
        .replace(/[^\w\s]/gi, '')
        .split(' ')
        .filter(word => word.length > 3)
        .slice(0, 6)
        .join(' ');
      
      if (cleanTitle) {
         try {
           const searchRes = await searchArticles({ 
             term: cleanTitle, 
             retmax: 5,
             sortBy: 'relevance' 
           });
           
           const fallbackIds = searchRes.ids.filter(sid => sid !== id && !relatedIds.includes(sid));
           relatedIds = [...relatedIds, ...fallbackIds];
         } catch (err) {
           // Ignore fallback errors
         }
      }
    }

    const finalIds = relatedIds.slice(0, 5);
    
    if (finalIds.length === 0) return [];

    return await getArticleSummaries(finalIds);
  } catch (e) {
    return [];
  }
};
