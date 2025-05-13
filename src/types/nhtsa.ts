/**
 * Base response structure for NHTSA API responses
 */
export interface NhtsaApiResponse<T> {
  Count: number;
  Message: string;
  Results: T[];
  SearchCriteria?: string | null;
}

/**
 * Vehicle Make information
 */
export interface VehicleMake {
  Make_ID: number;
  Make_Name: string;
}

/**
 * Vehicle Model information
 */
export interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

/**
 * Manufacturer information
 */
export interface Manufacturer {
  Mfr_ID: number;
  Mfr_Name: string;
  Country?: string;
  Mfr_CommonName?: string;
  VehicleTypes?: VehicleType[];
}

/**
 * Vehicle Type information
 */
export interface VehicleType {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

/**
 * World Manufacturer Identifier (WMI) information
 */
export interface WMI {
  WMI: string;
  Name: string;
  Country?: string;
  CreatedOn?: string;
  UpdatedOn?: string;
  DateAvailableToPublic?: string;
}

/**
 * Vehicle Variable information
 */
export interface VehicleVariable {
  ID: number;
  Name: string;
  Description: string;
  GroupName?: string;
  DataType?: string;
}

/**
 * Vehicle Variable Value information
 */
export interface VehicleVariableValue {
  ID: number;
  Name: string;
  ElementName?: string;
}

/**
 * VIN Decoding Result
 */
export interface VinDecodingResult {
  Value: string;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
}

/**
 * VIN Decoding Flat Result
 */
export interface VinDecodingFlatResult {
  [key: string]: string | null;
}

/**
 * Canadian Vehicle Specifications
 */
export interface CanadianVehicleSpecs {
  MAKE: string;
  MODEL: string;
  MYR: string;
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  E?: string;
  F?: string;
  G?: string;
  OL?: string; // Overall length
  OW?: string; // Overall width
  OH?: string; // Overall height
  WB?: string; // Wheelbase
  TWF?: string; // Front track width
  TWR?: string; // Rear track width
  CW?: string; // Curb weight
  WD?: string; // Weight distribution (Front/Rear)
}

/**
 * Part Information
 */
export interface Part {
  CoverLetterURL: string;
  LetterDate: string;
  ManufacturerId: number;
  ManufacturerName: string;
  ModelYearFrom: number;
  ModelYearTo: number;
  Name: string;
  Type: string;
  URL: string;
} 