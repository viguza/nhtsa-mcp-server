import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../../api/nhtsa.js';

/**
 * Register Makes-related tools with the MCP server
 * @param server The MCP server instance
 */
export function registerMakesTools(server: McpServer) {
  server.tool(
    'getAllMakes',
    {},
    async () => {
      const result = await NhtsaApi.Makes.getAllMakes();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getMakesForManufacturer',
    {
      manufacturer: z.string().or(z.number()).describe('Manufacturer name or ID')
    },
    async ({ manufacturer }) => {
      const result = await NhtsaApi.Makes.getMakesForManufacturer(manufacturer);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getMakesForManufacturerAndYear',
    {
      manufacturer: z.string().or(z.number()).describe('Manufacturer name or ID'),
      year: z.number().describe('Model year')
    },
    async ({ manufacturer, year }) => {
      const result = await NhtsaApi.Makes.getMakesForManufacturerAndYear(manufacturer, year);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getMakesForVehicleType',
    {
      vehicleType: z.string().describe('Vehicle type name')
    },
    async ({ vehicleType }) => {
      const result = await NhtsaApi.Makes.getMakesForVehicleType(vehicleType);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );
} 