import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../../api/nhtsa.js';

/**
 * Register VIN-related tools with the MCP server
 * @param server The MCP server instance
 */
export function registerVinTools(server: McpServer) {
  server.tool(
    'decodeVin',
    {
      vin: z.string().min(1).describe('Vehicle Identification Number to decode'),
      modelYear: z.number().optional().describe('Optional model year to help with decoding')
    },
    async ({ vin, modelYear }) => {
      const result = await NhtsaApi.VinDecoding.decodeVin(vin, modelYear);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'decodeVinValues',
    {
      vin: z.string().min(1).describe('Vehicle Identification Number to decode'),
      modelYear: z.number().optional().describe('Optional model year to help with decoding')
    },
    async ({ vin, modelYear }) => {
      const result = await NhtsaApi.VinDecoding.decodeVinValues(vin, modelYear);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'decodeVinExtended',
    {
      vin: z.string().min(1).describe('Vehicle Identification Number to decode'),
      modelYear: z.number().optional().describe('Optional model year to help with decoding')
    },
    async ({ vin, modelYear }) => {
      const result = await NhtsaApi.VinDecoding.decodeVinExtended(vin, modelYear);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'decodeVinValuesExtended',
    {
      vin: z.string().min(1).describe('Vehicle Identification Number to decode'),
      modelYear: z.number().optional().describe('Optional model year to help with decoding')
    },
    async ({ vin, modelYear }) => {
      const result = await NhtsaApi.VinDecoding.decodeVinValuesExtended(vin, modelYear);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'decodeVinBatch',
    {
      vinData: z.array(
        z.object({
          vin: z.string().min(1).describe('Vehicle Identification Number'),
          modelYear: z.number().optional().describe('Optional model year')
        })
      ).max(50).describe('Array of VINs to decode (max 50)')
    },
    async ({ vinData }) => {
      const result = await NhtsaApi.VinDecoding.decodeVinBatch(vinData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );
} 