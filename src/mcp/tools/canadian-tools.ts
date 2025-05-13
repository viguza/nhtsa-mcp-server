import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../../api/nhtsa.js';

/**
 * Register Canadian Vehicle Specifications-related tools with the MCP server
 * @param server The MCP server instance
 */
export function registerCanadianTools(server: McpServer) {
  server.tool(
    'getCanadianVehicleSpecifications',
    {
      year: z.number().min(1971).describe('Model year (>= 1971)'),
      make: z.string().describe('Vehicle make'),
      model: z.string().optional().describe('Optional vehicle model'),
      units: z.enum(['Metric', 'US']).optional().describe('Measurement units')
    },
    async ({ year, make, model, units }) => {
      const result = await NhtsaApi.CanadianVehicleSpecifications.getCanadianVehicleSpecifications(year, make, model, units);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );
} 