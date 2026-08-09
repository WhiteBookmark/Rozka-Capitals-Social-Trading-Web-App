/**
 * API Configuration Module
 * Automatically cleans base URL by applying .trim() and stripping trailing slashes
 */

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Sanitizes base URL to prevent silent URL breakage from whitespace or trailing slashes
 * @param {string} url 
 * @returns {string} Cleaned base URL
 */
const sanitizeBaseUrl = (url) => {
  if (typeof url !== 'string') return '';
  let cleaned = url.trim();
  // Strip trailing slashes
  while (cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
};

export const API_BASE_URL = sanitizeBaseUrl(rawBaseUrl);

/**
 * Helper to construct full API endpoint URLs safely
 * @param {string} endpoint 
 * @returns {string} Complete endpoint URL
 */
export const getApiUrl = (endpoint) => {
  if (typeof endpoint !== 'string') return API_BASE_URL;
  const cleanEndpoint = endpoint.trim().replace(/^\/+/, '');
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
