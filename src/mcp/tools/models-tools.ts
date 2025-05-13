import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../../api/nhtsa.js';

/**
 * Register Models-related tools with the MCP server
 * @param server The MCP server instance
 */
export function registerModelsTools(server: McpServer) {
  server.tool(
    'getModelsForMake',
    {
      make: z.string().describe('Make name')
    },
    async ({ make }) => {
      const result = await NhtsaApi.Models.getModelsForMake(make);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getModelsForMakeId',
    {
      makeId: z.number().describe('Make ID')
    },
    async ({ makeId }) => {
      const result = await NhtsaApi.Models.getModelsForMakeId(makeId);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getModelsForMakeYear',
    {
      make: z.string().describe('Make name'),
      year: z.number().describe('Model year')
    },
    async ({ make, year }) => {
      const result = await NhtsaApi.Models.getModelsForMakeYear(make, year);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getModelsForMakeIdYear',
    {
      makeId: z.number().describe('Make ID'),
      year: z.number().describe('Model year')
    },
    async ({ makeId, year }) => {
      const result = await NhtsaApi.Models.getModelsForMakeIdYear(makeId, year);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getModelsForMakeYearType',
    {
      make: z.string().describe('Make name'),
      year: z.number().describe('Model year'),
      vehicleType: z.string().describe('Vehicle type')
    },
    async ({ make, year, vehicleType }) => {
      const result = await NhtsaApi.Models.getModelsForMakeYearType(make, year, vehicleType);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );
} 