#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is required");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Create MCP server
const server = new Server(
  {
    name: "gemini-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "gemini_chat",
        description: "Send a message to Google Gemini 2.5 Pro and get a response",
        inputSchema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "The message to send to Gemini",
            },
            temperature: {
              type: "number",
              description: "Controls randomness (0.0-2.0). Default: 1.0",
              default: 1.0,
            },
            max_tokens: {
              type: "number",
              description: "Maximum tokens in response. Default: 8192",
              default: 8192,
            },
          },
          required: ["message"],
        },
      },
      {
        name: "gemini_chat_with_history",
        description: "Multi-turn conversation with Gemini maintaining context",
        inputSchema: {
          type: "object",
          properties: {
            messages: {
              type: "array",
              description: "Array of conversation messages [{role: 'user'|'model', parts: [{text: 'message'}]}]",
              items: {
                type: "object",
                properties: {
                  role: { type: "string", enum: ["user", "model"] },
                  parts: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: { type: "string" }
                      }
                    }
                  }
                }
              }
            },
            temperature: {
              type: "number",
              description: "Controls randomness (0.0-2.0). Default: 1.0",
              default: 1.0,
            },
          },
          required: ["messages"],
        },
      },
      {
        name: "gemini_analyze_code",
        description: "Analyze code using Gemini for bugs, improvements, or explanations",
        inputSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "The code to analyze",
            },
            language: {
              type: "string",
              description: "Programming language (e.g., javascript, python, go)",
            },
            analysis_type: {
              type: "string",
              description: "Type of analysis: 'bugs', 'optimize', 'explain', 'review'",
              enum: ["bugs", "optimize", "explain", "review"],
              default: "review",
            },
          },
          required: ["code"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "gemini_chat": {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.0-flash-exp",
          generationConfig: {
            temperature: args.temperature || 1.0,
            maxOutputTokens: args.max_tokens || 8192,
          },
        });

        const result = await model.generateContent(args.message);
        const response = result.response;
        const text = response.text();

        return {
          content: [
            {
              type: "text",
              text: text,
            },
          ],
        };
      }

      case "gemini_chat_with_history": {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.0-flash-exp",
          generationConfig: {
            temperature: args.temperature || 1.0,
            maxOutputTokens: 8192,
          },
        });

        const chat = model.startChat({
          history: args.messages.slice(0, -1),
        });

        const lastMessage = args.messages[args.messages.length - 1];
        const result = await chat.sendMessage(lastMessage.parts[0].text);
        const text = result.response.text();

        return {
          content: [
            {
              type: "text",
              text: text,
            },
          ],
        };
      }

      case "gemini_analyze_code": {
        const analysisPrompts = {
          bugs: `Analyze the following ${args.language || ''} code for bugs, errors, and potential issues:\n\n${args.code}\n\nProvide a detailed bug report.`,
          optimize: `Review the following ${args.language || ''} code and suggest performance optimizations and best practices:\n\n${args.code}`,
          explain: `Explain the following ${args.language || ''} code in detail, including what it does and how it works:\n\n${args.code}`,
          review: `Perform a comprehensive code review of the following ${args.language || ''} code, covering bugs, performance, security, and best practices:\n\n${args.code}`,
        };

        const prompt = analysisPrompts[args.analysis_type || 'review'];
        
        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.0-flash-exp",
        });

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return {
          content: [
            {
              type: "text",
              text: text,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Gemini MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
