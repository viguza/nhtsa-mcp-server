import { fetchNhtsaApi, ResponseFormat } from '../utils/api.js';
import {
  VehicleMake,
  VehicleModel,
  Manufacturer,
  WMI,
  VehicleVariable,
  VehicleVariableValue,
  VinDecodingResult,
  VinDecodingFlatResult,
  CanadianVehicleSpecs,
  Part,
  VehicleType
} from '../types/nhtsa.js';

/**
 * VIN Decoding API Endpoints
 */
export const VinDecoding = {
  /**
   * Decode a VIN
   * @param vin Vehicle Identification Number to decode
   * @param modelYear Optional model year to help with decoding
   * @returns Detailed information decoded from the VIN
   */
  decodeVin: async (vin: string, modelYear?: number) => {
    const endpoint = `vehicles/DecodeVin/${vin}`;
    const params: Record<string, string | number> = {};

    if (modelYear) {
      params.modelyear = modelYear;
    }

    return fetchNhtsaApi<VinDecodingResult>(endpoint, params);
  },

  /**
   * Decode a VIN in flat format
   * @param vin Vehicle Identification Number to decode
   * @param modelYear Optional model year to help with decoding
   * @returns Flat format information decoded from the VIN
   */
  decodeVinValues: async (vin: string, modelYear?: number) => {
    const endpoint = `vehicles/DecodeVinValues/${vin}`;
    const params: Record<string, string | number> = {};

    if (modelYear) {
      params.modelyear = modelYear;
    }

    return fetchNhtsaApi<VinDecodingFlatResult>(endpoint, params);
  },

  /**
   * Decode a VIN with extended information
   * @param vin Vehicle Identification Number to decode
   * @param modelYear Optional model year to help with decoding
   * @returns Extended information decoded from the VIN
   */
  decodeVinExtended: async (vin: string, modelYear?: number) => {
    const endpoint = `vehicles/DecodeVinExtended/${vin}`;
    const params: Record<string, string | number> = {};

    if (modelYear) {
      params.modelyear = modelYear;
    }

    return fetchNhtsaApi<VinDecodingResult>(endpoint, params);
  },

  /**
   * Decode a VIN with extended information in flat format
   * @param vin Vehicle Identification Number to decode
   * @param modelYear Optional model year to help with decoding
   * @returns Extended flat format information decoded from the VIN
   */
  decodeVinValuesExtended: async (vin: string, modelYear?: number) => {
    const endpoint = `vehicles/DecodeVinValuesExtended/${vin}`;
    const params: Record<string, string | number> = {};

    if (modelYear) {
      params.modelyear = modelYear;
    }

    return fetchNhtsaApi<VinDecodingFlatResult>(endpoint, params);
  },

  /**
   * Decode multiple VINs in a batch (max 50)
   * @param vinData Array of objects containing VIN and optional model year
   * @returns Array of decoded VIN information
   */
  decodeVinBatch: async (vinData: Array<{ vin: string, modelYear?: number }>) => {
    // Format the input string according to the API's expected format
    const inputString = vinData
      .map(item => item.modelYear
        ? `${item.vin},${item.modelYear}`
        : item.vin)
      .join(';');

    const endpoint = `vehicles/DecodeVINValuesBatch/${inputString}`;

    return fetchNhtsaApi<VinDecodingFlatResult>(endpoint);
  }
};

/**
 * WMI API Endpoints (World Manufacturer Identifier)
 */
export const WorldManufacturerIdentifier = {
  /**
   * Decode a World Manufacturer Identifier (WMI)
   * @param wmi The WMI code to decode (3 characters)
   * @returns Information about the manufacturer
   */
  decodeWMI: async (wmi: string) => {
    const endpoint = `vehicles/DecodeWMI/${wmi}`;
    return fetchNhtsaApi<WMI>(endpoint);
  },

  /**
   * Get WMIs for a manufacturer
   * @param manufacturer Manufacturer name or ID
   * @param vehicleType Optional vehicle type name or ID
   * @returns WMIs assigned to the manufacturer
   */
  getWMIsForManufacturer: async (manufacturer: string | number, vehicleType?: string | number) => {
    const endpoint = `vehicles/GetWMIsForManufacturer/${manufacturer}`;
    const params: Record<string, string | number> = {};

    if (vehicleType) {
      params.vehicleType = vehicleType;
    }

    return fetchNhtsaApi<WMI>(endpoint, params);
  }
};

/**
 * Makes API Endpoints
 */
export const Makes = {
  /**
   * Get all vehicle makes
   * @returns List of all makes
   */
  getAllMakes: async () => {
    const endpoint = 'vehicles/GetAllMakes';
    return fetchNhtsaApi<VehicleMake>(endpoint);
  },

  /**
   * Get makes for a manufacturer
   * @param manufacturer Manufacturer name or ID
   * @returns Makes produced by the manufacturer
   */
  getMakesForManufacturer: async (manufacturer: string | number) => {
    const endpoint = `vehicles/GetMakeForManufacturer/${manufacturer}`;
    return fetchNhtsaApi<VehicleMake>(endpoint);
  },

  /**
   * Get makes for a manufacturer in a specific year
   * @param manufacturer Manufacturer name or ID
   * @param year Model year
   * @returns Makes produced by the manufacturer in the specified year
   */
  getMakesForManufacturerAndYear: async (manufacturer: string | number, year: number) => {
    const endpoint = `vehicles/GetMakesForManufacturerAndYear/${manufacturer}`;
    return fetchNhtsaApi<VehicleMake>(endpoint, { year });
  },

  /**
   * Get makes for a vehicle type
   * @param vehicleType Vehicle type name
   * @returns Makes for the specified vehicle type
   */
  getMakesForVehicleType: async (vehicleType: string) => {
    const endpoint = `vehicles/GetMakesForVehicleType/${vehicleType}`;
    return fetchNhtsaApi<VehicleMake>(endpoint);
  }
};

/**
 * Models API Endpoints
 */
export const Models = {
  /**
   * Get models for a make
   * @param make Make name
   * @returns Models for the specified make
   */
  getModelsForMake: async (make: string) => {
    const endpoint = `vehicles/GetModelsForMake/${make}`;
    return fetchNhtsaApi<VehicleModel>(endpoint);
  },

  /**
   * Get models for a make by ID
   * @param makeId Make ID
   * @returns Models for the specified make ID
   */
  getModelsForMakeId: async (makeId: number) => {
    const endpoint = `vehicles/GetModelsForMakeId/${makeId}`;
    return fetchNhtsaApi<VehicleModel>(endpoint);
  },

  /**
   * Get models for a make and year
   * @param make Make name
   * @param year Model year
   * @returns Models for the specified make and year
   */
  getModelsForMakeYear: async (make: string, year: number) => {
    const endpoint = `vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}`;
    return fetchNhtsaApi<VehicleModel>(endpoint);
  },

  /**
   * Get models for a make ID and year
   * @param makeId Make ID
   * @param year Model year
   * @returns Models for the specified make ID and year
   */
  getModelsForMakeIdYear: async (makeId: number, year: number) => {
    const endpoint = `vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}`;
    return fetchNhtsaApi<VehicleModel>(endpoint);
  },

  /**
   * Get models for a make, year, and vehicle type
   * @param make Make name
   * @param year Model year
   * @param vehicleType Vehicle type
   * @returns Models for the specified make, year, and vehicle type
   */
  getModelsForMakeYearType: async (make: string, year: number, vehicleType: string) => {
    const endpoint = `vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${vehicleType}`;
    return fetchNhtsaApi<VehicleModel>(endpoint);
  }
};

/**
 * Manufacturers API Endpoints
 */
export const Manufacturers = {
  /**
   * Get all manufacturers
   * @param page Page number for pagination (100 items per page)
   * @param manufacturerType Optional manufacturer type to filter by
   * @returns List of manufacturers
   */
  getAllManufacturers: async (page: number = 1, manufacturerType?: string) => {
    const endpoint = 'vehicles/GetAllManufacturers';
    const params: Record<string, string | number> = { page };

    if (manufacturerType) {
      params.ManufacturerType = manufacturerType;
    }

    return fetchNhtsaApi<Manufacturer>(endpoint, params);
  },

  /**
   * Get details for a specific manufacturer
   * @param manufacturer Manufacturer name or ID
   * @param page Page number for pagination when returning multiple results
   * @returns Manufacturer details
   */
  getManufacturerDetails: async (manufacturer: string | number, page: number = 1) => {
    const endpoint = `vehicles/GetManufacturerDetails/${manufacturer}`;
    return fetchNhtsaApi<Manufacturer>(endpoint, { page });
  }
};

/**
 * Parts API Endpoints
 */
export const Parts = {
  /**
   * Get parts by type and date range
   * @param type Part type (e.g., 565 for VIN guidance)
   * @param fromDate Start date (MM/DD/YYYY)
   * @param toDate End date (MM/DD/YYYY)
   * @param page Page number for pagination
   * @param manufacturer Optional manufacturer name or ID
   * @returns List of parts
   */
  getParts: async (
    type: number,
    fromDate: string,
    toDate: string,
    page: number = 1,
    manufacturer?: string | number
  ) => {
    const endpoint = 'vehicles/GetParts';
    const params: Record<string, string | number> = {
      type,
      fromDate,
      toDate,
      page
    };

    if (manufacturer) {
      params.manufacturer = manufacturer;
    }

    return fetchNhtsaApi<Part>(endpoint, params);
  }
};

/**
 * Vehicle Variables API Endpoints
 */
export const VehicleVariables = {
  /**
   * Get all vehicle variables
   * @returns List of all vehicle variables
   */
  getVehicleVariableList: async () => {
    const endpoint = 'vehicles/GetVehicleVariableList';
    return fetchNhtsaApi<VehicleVariable>(endpoint);
  },

  /**
   * Get values for a specific vehicle variable
   * @param variable Variable name or ID
   * @returns Values for the specified variable
   */
  getVehicleVariableValuesList: async (variable: string | number) => {
    const endpoint = `vehicles/GetVehicleVariableValuesList/${variable}`;
    return fetchNhtsaApi<VehicleVariableValue>(endpoint);
  }
};

/**
 * Canadian Vehicle Specifications API Endpoints
 */
export const CanadianVehicleSpecifications = {
  /**
   * Get Canadian vehicle specifications
   * @param year Model year (>= 1971)
   * @param make Vehicle make
   * @param model Optional vehicle model
   * @param units Measurement units ('Metric' or 'US')
   * @returns Canadian vehicle specifications
   */
  getCanadianVehicleSpecifications: async (
    year: number,
    make: string,
    model?: string,
    units: 'Metric' | 'US' = 'Metric'
  ) => {
    const endpoint = 'vehicles/GetCanadianVehicleSpecifications';
    const params: Record<string, string | number> = {
      year,
      make,
      units
    };

    if (model) {
      params.model = model;
    }

    return fetchNhtsaApi<CanadianVehicleSpecs>(endpoint, params);
  }
};