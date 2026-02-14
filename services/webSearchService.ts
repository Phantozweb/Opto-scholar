
const AGENT_BASE_URL = "https://api.agent.ai/v1/agent/qdss0ed1h3rmp6gn/webhook/c9fd28e8";

/**
 * Performs a web search using the Agent.ai async webhook.
 * 1. POSTs the query to start the agent.
 * 2. Polls the status endpoint until a 200 OK response is received.
 */
export const performWebSearch = async (query: string): Promise<string> => {
  try {
    // Step 1: Start the Agent Task
    const startResponse = await fetch(`${AGENT_BASE_URL}/async`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: query }),
    });

    if (!startResponse.ok) {
      throw new Error(`Failed to start search agent: ${startResponse.status} ${startResponse.statusText}`);
    }

    const startData = await startResponse.json();
    const runId = startData.run_id;

    if (!runId) {
      throw new Error("No run_id received from search agent.");
    }

    // Step 2: Poll for Results
    // We'll poll every 1 second for up to 60 seconds.
    const maxRetries = 60;
    let attempts = 0;

    while (attempts < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s

      const statusResponse = await fetch(`${AGENT_BASE_URL}/status/${runId}`);

      // 200 OK: Process finished, content available
      if (statusResponse.status === 200) {
        const data = await statusResponse.json();
        return data.response;
      }
      
      // 204 No Content: Process still running (thinking)
      // 202 Accepted: Often used for async processing too
      if (statusResponse.status === 204 || statusResponse.status === 202) {
        attempts++;
        continue;
      }

      // Any other status is likely an error
      const errorText = statusResponse.statusText || 'Unknown Error';
      throw new Error(`Search agent status check failed: ${statusResponse.status} ${errorText}`);
    }

    throw new Error("Search timed out. The agent took too long to respond.");

  } catch (error: any) {
    console.error("Web Search Service Error:", error);
    // Rethrow to be handled by component
    throw error;
  }
};
