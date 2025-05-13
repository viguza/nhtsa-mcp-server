import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../../api/nhtsa.js';

/**
 * Register Vehicle Variables-related tools with the MCP server
 * @param server The MCP server instance
 */
export function registerVehicleVariablesTools(server: McpServer) {
  server.tool(
    'getVehicleVariableList',
    {},
    async () => {
      const result = await NhtsaApi.VehicleVariables.getVehicleVariableList();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  server.tool(
    'getVehicleVariableValuesList',
    {
      variable: z.string().or(z.number()).describe('Variable name or ID')
    },
    async ({ variable }) => {
      const result = await NhtsaApi.VehicleVariables.getVehicleVariableValuesList(variable);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );
} 