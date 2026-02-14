
import { WebSearchResult, WikiArticle } from '../types';

/**
 * Simulates a Web Search for eye care topics.
 * In a real app, this would call the Bing or Google Custom Search API.
 */
export const searchWeb = async (query: string): Promise<WebSearchResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const lowerQ = query.toLowerCase();
  
  // Dynamic generation based on query to make it feel "real"
  return [
    {
      id: '1',
      title: `${query} - American Academy of Ophthalmology`,
      url: `https://www.aao.org/search?q=${encodeURIComponent(query)}`,
      displayUrl: 'www.aao.org › eye-health',
      snippet: `Comprehensive overview of ${query}, including symptoms, causes, diagnosis and treatment options provided by the American Academy of Ophthalmology.`,
      source: 'AAO',
      date: 'Sep 12, 2023'
    },
    {
      id: '2',
      title: `${query}: Diagnosis and Management - Mayo Clinic`,
      url: `https://www.mayoclinic.org/search/search-results?q=${encodeURIComponent(query)}`,
      displayUrl: 'www.mayoclinic.org › diseases-conditions',
      snippet: `Learn about the stages of ${query}. Expert care and latest research findings regarding effective management strategies.`,
      source: 'Mayo Clinic',
      date: 'Jan 04, 2024'
    },
    {
      id: '3',
      title: `Review of Optometry: Clinical guide to ${query}`,
      url: `https://www.reviewofoptometry.com/search?q=${encodeURIComponent(query)}`,
      displayUrl: 'www.reviewofoptometry.com › article',
      snippet: `A detailed clinical breakdown for optometrists handling cases of ${query}. Discusses pharmaceutical interventions and surgical referrals.`,
      source: 'Review of Optometry',
      date: 'Nov 20, 2023'
    },
    {
      id: '4',
      title: `National Eye Institute: ${query} Facts`,
      url: `https://www.nei.nih.gov/search?keywords=${encodeURIComponent(query)}`,
      displayUrl: 'www.nei.nih.gov › learn-about-eye-health',
      snippet: `The National Eye Institute (NEI) conducts and supports research to discover the causes of vision disorders like ${query}.`,
      source: 'NEI',
      date: 'Aug 15, 2023'
    },
    {
      id: '5',
      title: `Medscape Reference: ${query}`,
      url: `https://search.medscape.com/search/?q=${encodeURIComponent(query)}`,
      displayUrl: 'emedicine.medscape.com › ophthalmology',
      snippet: `Clinical presentation, workup, differential diagnosis, and treatment of ${query}. Authored by leading ophthalmologists.`,
      source: 'Medscape',
      date: 'Feb 10, 2024'
    }
  ];
};

export const WIKI_DATA: WikiArticle[] = [
  {
    id: 'glaucoma-overview',
    category: 'Glaucoma',
    title: 'Primary Open-Angle Glaucoma (POAG)',
    content: `
# Primary Open-Angle Glaucoma

Primary open-angle glaucoma (POAG) is a chronic, progressive optic neuropathy characterized by acquired loss of optic nerve fibers.

## Epidemiology
It is the most common form of glaucoma, affecting approximately 2% of the population over age 40.

## Risk Factors
- **IOP:** Elevated intraocular pressure is the most important modifiable risk factor.
- **Age:** Risk increases with age.
- **Race:** More common and severe in African Americans.
- **Family History:** Positive family history increases risk.
- **CCT:** Thin central corneal thickness is an independent risk factor.

## Pathophysiology
The exact mechanism is multifactorial, involving mechanical stress and vascular dysregulation leading to retinal ganglion cell death.
    `,
    lastUpdated: 'Oct 2023',
    relatedTerms: ['IOP', 'Optic Nerve', 'Visual Field']
  },
  {
    id: 'myopia-control',
    category: 'Refractive Error',
    title: 'Myopia Management Strategies',
    content: `
# Myopia Management

With the rising prevalence of myopia globally, slowing its progression has become a clinical priority.

## Interventions

### Orthokeratology
Overnight wear of rigid gas permeable lenses to reshape the cornea. Shown to reduce axial elongation by approx 45%.

### Soft Multifocal Contact Lenses
Center-distance designs impose myopic defocus on the peripheral retina, slowing growth.

### Atropine
Low-dose atropine (0.01%, 0.025%, 0.05%) is effective, with higher concentrations generally offering better control but more side effects.

### Environmental Modifications
Increased time outdoors is protective against the onset of myopia.
    `,
    lastUpdated: 'Jan 2024',
    relatedTerms: ['Axial Length', 'Atropine', 'Orthokeratology']
  },
  {
    id: 'amd-dry',
    category: 'Retina',
    title: 'Dry Age-Related Macular Degeneration',
    content: `
# Dry AMD

Dry Age-Related Macular Degeneration is characterized by the presence of drusen and RPE changes.

## Classification (AREDS)
- **Category 1:** No AMD (few small drusen).
- **Category 2:** Early AMD (multiple small drusen or few intermediate).
- **Category 3:** Intermediate AMD (extensive intermediate or at least one large druse).
- **Category 4:** Advanced AMD (Geographic Atrophy or Neovascular AMD).

## Management
- AREDS2 supplements for intermediate stage.
- Smoking cessation.
- UV protection.
- Monitoring with Amsler grid.
    `,
    lastUpdated: 'Dec 2023',
    relatedTerms: ['Drusen', 'Geographic Atrophy', 'AREDS2']
  },
  {
    id: 'diabetic-retinopathy',
    category: 'Retina',
    title: 'Diabetic Retinopathy Overview',
    content: `
# Diabetic Retinopathy

Diabetic retinopathy (DR) is a microvascular complication of diabetes mellitus and a leading cause of blindness.

## Classification
1. **Non-Proliferative (NPDR):** Microaneurysms, hemorrhages, hard exudates, cotton wool spots.
2. **Proliferative (PDR):** Neovascularization of the disc or elsewhere, vitreous hemorrhage, tractional retinal detachment.

## Screening Guidelines
- **Type 1:** 5 years after diagnosis.
- **Type 2:** At time of diagnosis.
- **Pregnancy:** First trimester.

## Treatment
- Anti-VEGF injections.
- Panretinal Photocoagulation (PRP).
- Vitrectomy for non-clearing hemorrhage.
    `,
    lastUpdated: 'Feb 2024',
    relatedTerms: ['Diabetes', 'Anti-VEGF', 'Macular Edema']
  }
];

export const searchWiki = (query: string): WikiArticle[] => {
  const lowerQ = query.toLowerCase();
  return WIKI_DATA.filter(article => 
    article.title.toLowerCase().includes(lowerQ) || 
    article.content.toLowerCase().includes(lowerQ) ||
    article.category.toLowerCase().includes(lowerQ)
  );
};
