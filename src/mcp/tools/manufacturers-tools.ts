import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../../api/nhtsa.js';

/**
 * Register Manufacturers-related tools with the MCP server
 * @param server The MCP server instance
 */
export function registerManufacturersTools(server: McpServer) {
  server.tool(
    'getAllManufacturers',
    {
      page: z.number().optional().describe('Page number for pagination'),
      manufacturerType: z.string().optional().describe('Optional manufacturer type to filter by')
    },
    async ({ page, manufacturerType }) => {
      const result = await NhtsaApi.Manufacturers.getAllManufacturers(page, manufacturerType);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getManufacturerDetails',
    {
      manufacturer: z.string().or(z.number()).describe('Manufacturer name or ID'),
      page: z.number().optional().describe('Page number for pagination')
    },
    async ({ manufacturer, page }) => {
      const result = await NhtsaApi.Manufacturers.getManufacturerDetails(manufacturer, page);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );
} 