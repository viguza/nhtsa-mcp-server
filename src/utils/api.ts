import axios from 'axios';
import { NhtsaApiResponse } from '../types/nhtsa.js';

// Base URL for NHTSA API
const API_BASE_URL = process.env.NHTSA_API_BASE_URL || 'https://vpic.nhtsa.dot.gov/api';

/**
 * Available formats for API responses
 */
export enum ResponseFormat {
  JSON = 'json',
  XML = 'xml',
  CSV = 'csv',
}

/**
 * Make a GET request to the NHTSA API
 * @param endpoint The API endpoint to call
 * @param params Query parameters to include in the request
 * @param format Response format (json, xml, csv)
 * @returns The API response data
 */
export async function fetchNhtsaApi<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  format: ResponseFormat = ResponseFormat.JSON
): Promise<NhtsaApiResponse<T>> {
  try {
    // Add format parameter
    const queryParams = { ...params, format };

    // Build URL
    const url = `${API_BASE_URL}/${endpoint}`;

    // Make request
    const response = await axios.get<NhtsaApiResponse<T>>(url, { params: queryParams });

    return response.data;
  } catch (error) {
    console.error('Error fetching NHTSA API:', error);
    throw error;
  }
} 