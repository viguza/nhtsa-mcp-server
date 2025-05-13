# NHTSA MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An MCP (Model Context Protocol) server providing access to the NHTSA (National Highway Traffic Safety Administration) vehicle database APIs. This server allows LLMs (Large Language Models) to interact with vehicle data through a standardized protocol.

## Overview

This project implements an MCP server that wraps the [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/), making vehicle data accessible to any MCP-compatible client or LLM. The server provides both resources and tools for querying vehicle information, including:

- Vehicle Identification Number (VIN) decoding
- Vehicle makes and models
- Manufacturer details
- World Manufacturer Identifiers (WMI)
- Vehicle variables and specifications
- Canadian vehicle specifications
- And more

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation

### Option 1: Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/viguza/nhtsa-mcp-server.git
   cd nhtsa-mcp-server
   ```

2. Build and start the Docker container:
   ```bash
   docker compose up -d
   ```

3. For development with hot reloading:
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

### Option 2: Standard Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/viguza/nhtsa-mcp-server.git
   cd nhtsa-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (or use the defaults):
   ```
   PORT=3000
   NHTSA_API_BASE_URL=https://vpic.nhtsa.dot.gov/api
   NODE_ENV=development
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

The server will be available at http://localhost:3000 (or the configured PORT).

## Usage

### Connect to the MCP Server

The server supports two types of connections:

#### 1. Standard MCP Connection
To use the server with an MCP client, connect to the MCP endpoint:

```
http://localhost:3000/mcp
```

#### 2. Server-Sent Events (SSE) Connection
The server also supports SSE for streaming communication:

```
http://localhost:3000/sse
```

SSE provides a persistent connection for real-time updates from the server to the client. Message posting for SSE clients is done via:

```
http://localhost:3000/messages?sessionId=YOUR_SESSION_ID
```

### Available Tools

The server exposes the following tools for LLMs to interact with the NHTSA API:

#### VIN Decoding
- `decodeVin`: Decode a Vehicle Identification Number
- `decodeVinValues`: Decode a VIN in flat format
- `decodeVinExtended`: Decode a VIN with extended information
- `decodeVinValuesExtended`: Decode a VIN with extended information in flat format
- `decodeVinBatch`: Decode multiple VINs in a batch (max 50)

#### World Manufacturer Identifier (WMI)
- `decodeWMI`: Decode a World Manufacturer Identifier
- `getWMIsForManufacturer`: Get WMIs for a manufacturer

#### Makes
- `getAllMakes`: Get all vehicle makes
- `getMakesForManufacturer`: Get makes for a manufacturer
- `getMakesForManufacturerAndYear`: Get makes for a manufacturer in a specific year
- `getMakesForVehicleType`: Get makes for a vehicle type

#### Models
- `getModelsForMake`: Get models for a make
- `getModelsForMakeId`: Get models for a make by ID
- `getModelsForMakeYear`: Get models for a make and year
- `getModelsForMakeIdYear`: Get models for a make ID and year
- `getModelsForMakeYearType`: Get models for a make, year, and vehicle type

#### Manufacturers
- `getAllManufacturers`: Get all manufacturers
- `getManufacturerDetails`: Get details for a specific manufacturer

#### Parts
- `getParts`: Get parts by type and date range

#### Vehicle Variables
- `getVehicleVariableList`: Get all vehicle variables
- `getVehicleVariableValuesList`: Get values for a specific vehicle variable

#### Canadian Vehicle Specifications
- `getCanadianVehicleSpecifications`: Get Canadian vehicle specifications

### Available Resources

The server exposes the following resources:

- `nhtsa://api-info`: API documentation
- `nhtsa://makes`: List of all vehicle makes
- `nhtsa://makes/{make}`: Information about a specific make
- `nhtsa://manufacturers`: List of all manufacturers
- `nhtsa://manufacturers/{manufacturer}`: Information about a specific manufacturer
- `nhtsa://variables`: List of all vehicle variables

## Example Queries

Here are some example tool calls an LLM might make:

### 1. Decode a VIN

```json
{
  "name": "decodeVin",
  "arguments": {
    "vin": "1FTFW1ET5DFA4527",
    "modelYear": 2013
  }
}
```

### 2. Get all vehicle makes

```json
{
  "name": "getAllMakes",
  "arguments": {}
}
```

### 3. Get models for a specific make and year

```json
{
  "name": "getModelsForMakeYear",
  "arguments": {
    "make": "Honda",
    "year": 2020
  }
}
```

### 4. Get manufacturer details

```json
{
  "name": "getManufacturerDetails",
  "arguments": {
    "manufacturer": "Honda"
  }
}
```

## Development

### Scripts

- `npm run build` - Build the project
- `npm start` - Start the server
- `npm run dev` - Start the server in development mode with hot reloading

### Docker Commands

- `docker compose up -d` - Start the container in detached mode
- `docker compose down` - Stop the container
- `docker compose logs -f` - View logs
- `docker compose -f docker-compose.dev.yml up -d` - Start development container with hot reloading

## Model Context Protocol (MCP)

The Model Context Protocol is an open standard for providing context to LLMs. It allows services to expose data and functionality in a standardized way that any MCP-compatible client can consume.

Key MCP concepts used in this project:

- **Tools**: Similar to functions, tools allow LLMs to take actions (e.g., make API calls)
- **Resources**: Similar to documents or files, resources provide data to LLMs
- **Transport**: Communication layer between client and server (this project uses Streamable HTTP and SSE)

Learn more about MCP at [modelcontextprotocol.io](https://modelcontextprotocol.io).

## Data Source

All data is sourced from the official NHTSA vPIC API at [vpic.nhtsa.dot.gov/api/](https://vpic.nhtsa.dot.gov/api/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NHTSA](https://www.nhtsa.gov/) for providing the vehicle data API
- [Model Context Protocol](https://modelcontextprotocol.io) for the MCP specification and SDK
