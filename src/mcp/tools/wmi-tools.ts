import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../../api/nhtsa.js';

/**
 * Register World Manufacturer Identifier (WMI) tools with the MCP server
 * @param server The MCP server instance
 */
export function registerWmiTools(server: McpServer) {
  server.tool(
    'decodeWMI',
    {
      wmi: z.string().length(3).describe('World Manufacturer Identifier (3 characters)')
    },
    async ({ wmi }) => {
      const result = await NhtsaApi.WorldManufacturerIdentifier.decodeWMI(wmi);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getWMIsForManufacturer',
    {
      manufacturer: z.string().or(z.number()).describe('Manufacturer name or ID'),
      vehicleType: z.string().or(z.number()).optional().describe('Optional vehicle type name or ID')
    },
    async ({ manufacturer, vehicleType }) => {
      const result = await NhtsaApi.WorldManufacturerIdentifier.getWMIsForManufacturer(manufacturer, vehicleType);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );
} 