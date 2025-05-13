import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as NhtsaApi from '../api/nhtsa.js';

/**
 * Register resources with the MCP server
 * @param server The MCP server instance
 */
export function registerResources(server: McpServer) {
  // Example resource to provide information about available endpoints
  server.resource(
    'apiInfo',
    'nhtsa://api-info',
    async (uri) => {
      const apiInfo = `
# NHTSA Vehicle API

This MCP server provides access to the National Highway Traffic Safety Administration (NHTSA) vehicle database.

## Available Tools

### VIN Decoding
- decodeVin - Decode a Vehicle Identification Number
- decodeVinValues - Decode a VIN in flat format
- decodeVinExtended - Decode a VIN with extended information
- decodeVinValuesExtended - Decode a VIN with extended information in flat format
- decodeVinBatch - Decode multiple VINs in a batch (max 50)

### World Manufacturer Identifier (WMI)
- decodeWMI - Decode a World Manufacturer Identifier
- getWMIsForManufacturer - Get WMIs for a manufacturer

### Makes
- getAllMakes - Get all vehicle makes
- getMakesForManufacturer - Get makes for a manufacturer
- getMakesForManufacturerAndYear - Get makes for a manufacturer in a specific year
- getMakesForVehicleType - Get makes for a vehicle type

### Models
- getModelsForMake - Get models for a make
- getModelsForMakeId - Get models for a make by ID
- getModelsForMakeYear - Get models for a make and year
- getModelsForMakeIdYear - Get models for a make ID and year
- getModelsForMakeYearType - Get models for a make, year, and vehicle type

### Manufacturers
- getAllManufacturers - Get all manufacturers
- getManufacturerDetails - Get details for a specific manufacturer

### Parts
- getParts - Get parts by type and date range

### Vehicle Variables
- getVehicleVariableList - Get all vehicle variables
- getVehicleVariableValuesList - Get values for a specific vehicle variable

### Canadian Vehicle Specifications
- getCanadianVehicleSpecifications - Get Canadian vehicle specifications

## Data Sources
All data is sourced from the official NHTSA vPIC API at https://vpic.nhtsa.dot.gov/api/
`;

      return {
        contents: [{
          uri: uri.href,
          text: apiInfo
        }]
      };
    }
  );

  // Resource to provide information about vehicle makes
  server.resource(
    'vehicleMakes',
    'nhtsa://makes',
    async (uri) => {
      const makeList = await NhtsaApi.Makes.getAllMakes();

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(makeList, null, 2)
        }]
      };
    }
  );

  // Resource to provide information about a specific make
  server.resource(
    'makeInfo',
    new ResourceTemplate('nhtsa://makes/{make}', { list: undefined }),
    async (uri, { make }) => {
      // Convert make to string to fix type error
      const makeString = Array.isArray(make) ? make[0] : make;
      const modelsForMake = await NhtsaApi.Models.getModelsForMake(makeString);

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(modelsForMake, null, 2)
        }]
      };
    }
  );

  // Resource to provide information about manufacturers
  server.resource(
    'manufacturers',
    'nhtsa://manufacturers',
    async (uri) => {
      const manufacturers = await NhtsaApi.Manufacturers.getAllManufacturers();

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(manufacturers, null, 2)
        }]
      };
    }
  );

  // Resource to provide information about specific manufacturer
  server.resource(
    'manufacturerInfo',
    new ResourceTemplate('nhtsa://manufacturers/{manufacturer}', { list: undefined }),
    async (uri, { manufacturer }) => {
      // Convert manufacturer to string or number to fix type error
      const manufacturerValue = Array.isArray(manufacturer) ? manufacturer[0] : manufacturer;
      const manufacturerDetails = await NhtsaApi.Manufacturers.getManufacturerDetails(manufacturerValue);

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(manufacturerDetails, null, 2)
        }]
      };
    }
  );

  // Resource to provide information about vehicle variables
  server.resource(
    'vehicleVariables',
    'nhtsa://variables',
    async (uri) => {
      const variables = await NhtsaApi.VehicleVariables.getVehicleVariableList();

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(variables, null, 2)
        }]
      };
    }
  );
} 