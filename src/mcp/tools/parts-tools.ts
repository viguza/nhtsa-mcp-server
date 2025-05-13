import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../../api/nhtsa.js';

/**
 * Register Parts-related tools with the MCP server
 * @param server The MCP server instance
 */
export function registerPartsTools(server: McpServer) {
  server.tool(
    'getParts',
    {
      type: z.number().describe('Part type (e.g., 565 for VIN guidance)'),
      fromDate: z.string().describe('Start date (MM/DD/YYYY)'),
      toDate: z.string().describe('End date (MM/DD/YYYY)'),
      page: z.number().optional().describe('Page number for pagination'),
      manufacturer: z.string().or(z.number()).optional().describe('Optional manufacturer name or ID')
    },
    async ({ type, fromDate, toDate, page, manufacturer }) => {
      const result = await NhtsaApi.Parts.getParts(type, fromDate, toDate, page, manufacturer);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );
} 