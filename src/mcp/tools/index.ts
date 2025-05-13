import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerVinTools } from './vin-tools.js';
import { registerWmiTools } from './wmi-tools.js';
import { registerMakesTools } from './makes-tools.js';
import { registerModelsTools } from './models-tools.js';
import { registerManufacturersTools } from './manufacturers-tools.js';
import { registerPartsTools } from './parts-tools.js';
import { registerVehicleVariablesTools } from './vehicle-variables-tools.js';
import { registerCanadianTools } from './canadian-tools.js';

/**
 * Register all MCP tools with the server
 * @param server The MCP server instance
 */
export function registerAllTools(server: McpServer) {
  // Register all tool categories
  registerVinTools(server);
  registerWmiTools(server);
  registerMakesTools(server);
  registerModelsTools(server);
  registerManufacturersTools(server);
  registerPartsTools(server);
  registerVehicleVariablesTools(server);
  registerCanadianTools(server);
} 