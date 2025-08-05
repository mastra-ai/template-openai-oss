import { Agent } from "@mastra/core/agent";
import { MCPClient } from "@mastra/mcp";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const openaiOSS = createOpenAICompatible({
  name: "openai-oss",
  baseURL: "http://127.0.0.1:1234/v1",
});

const mcp = new MCPClient({
  servers: {
    hackernews: {
      command: "npx",
      args: ["-y", "@devabdultech/hn-mcp-server"],
    },
  },
});

const mcpTools = await mcp.getTools();

export const hackernewsAgent = new Agent({
  name: "HackerNews Agent",
  instructions: `
      You are a helpful personal assistant that has access to the following tools:

      1. Hackernews:
         - Use this tool to search for stories on Hackernews
         - You can use it to get the top stories or specific stories
         - You can use it to retrieve comments for stories
  `,
  model: openaiOSS("openai/gpt-oss-20b"),
  tools: { ...mcpTools },
});
