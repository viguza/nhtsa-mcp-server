import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerAllTools } from './tools/index.js';
import { registerResources } from './resources.js';

/**
 * Create a new MCP server instance with all tools and resources registered
 * @returns The configured MCP server
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: 'NHTSA Vehicle API',
    version: '1.0.0'
  });

  // Register all tools and resources
  registerAllTools(server);
  registerResources(server);

  return server;
} 