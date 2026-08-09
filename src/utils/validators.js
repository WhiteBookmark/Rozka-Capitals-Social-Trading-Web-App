/**
 * Form Validation & Data Sanitization Utilities
 * Implements strict input rules for names, ages, dates of birth, phone numbers, emails, and passwords.
 */

/**
 * Sanitizes and cleans a Name input:
 * - Trims leading and trailing spaces
 * - Removes emojis and special symbols except standard letters, spaces, hyphens, and apostrophes
 * - Capitalizes each word
 * @param {string|any} name 
 * @returns {string} Sanitized name
 */
export const sanitizeName = (name) => {
  if (name === null || name === undefined || typeof name !== 'string') {
    return '';
  }
  
  // Remove emojis and special non-letter symbols
  let cleaned = name.replace(/[^\p{L}\p{M}\s'-]/gu, '');
  
  // Trim spaces
  cleaned = cleaned.trim();

  // Capitalize first letter of each word
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Validates an Age input:
 * - Type integer
 * - Min: 0, Max: 150
 * - Disallows negative numbers and out-of-bounds numbers
 * @param {number|string|any} age 
 * @returns {{ isValid: boolean, error: string, value: number|null }}
 */
export const validateAge = (age) => {
  if (age === null || age === undefined || age === '') {
    return { isValid: false, error: 'Age is required.', value: null };
  }

  const num = Number(age);
  if (isNaN(num) || !Number.isInteger(num)) {
    return { isValid: false, error: 'Age must be a valid whole number.', value: null };
  }

  if (num < 0) {
    return { isValid: false, error: 'Age cannot be negative.', value: null };
  }

  if (num > 150) {
    return { isValid: false, error: 'Age must be between 0 and 150.', value: null };
  }

  return { isValid: true, error: '', value: num };
};

/**
 * Gets today's date formatted as YYYY-MM-DD for date inputs max attribute
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Validates Date of Birth and calculates current age
 * - Disallows future dates
 * @param {string|Date|any} dob 
 * @returns {{ isValid: boolean, error: string, calculatedAge: number|null }}
 */
export const validateDobAndCalculateAge = (dob) => {
  if (!dob || typeof dob !== 'string') {
    return { isValid: false, error: 'Date of birth is required.', calculatedAge: null };
  }

  const dobDate = new Date(dob);
  const today = new Date();

  if (isNaN(dobDate.getTime())) {
    return { isValid: false, error: 'Invalid date format.', calculatedAge: null };
  }

  // Prevent future dates
  if (dobDate > today) {
    return { isValid: false, error: 'Date of birth cannot be in the future.', calculatedAge: null };
  }

  // Calculate age
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }

  if (age < 0 || age > 150) {
    return { isValid: false, error: 'Calculated age is out of valid range (0-150).', calculatedAge: null };
  }

  return { isValid: true, error: '', calculatedAge: age };
};

/**
 * Sanitizes and validates a Phone input:
 * - Only allows digits, leading '+', hyphens, and spaces
 * - Max length 20
 * - Rejects letters, emojis, and non-phone characters
 * @param {string|any} phone 
 * @returns {{ isValid: boolean, error: string, sanitizedPhone: string }}
 */
export const sanitizeAndValidatePhone = (phone) => {
  if (phone === null || phone === undefined || typeof phone !== 'string') {
    return { isValid: false, error: 'Phone number is required.', sanitizedPhone: '' };
  }

  // Keep only +, numbers, spaces, and hyphens
  let cleaned = phone.replace(/[^0-9+\s-]/g, '');

  // Truncate to max 20 characters
  if (cleaned.length > 20) {
    cleaned = cleaned.slice(0, 20);
  }

  if (cleaned.trim() === '') {
    return { isValid: false, error: 'Please enter a valid phone number.', sanitizedPhone: '' };
  }

  // Ensure there are at least 7 digits
  const digitCount = (cleaned.match(/\d/g) || []).length;
  if (digitCount < 7) {
    return { isValid: false, error: 'Phone number must contain at least 7 digits.', sanitizedPhone: cleaned };
  }

  return { isValid: true, error: '', sanitizedPhone: cleaned };
};

/**
 * Validates Email Address
 * @param {string|any} email 
 * @returns {{ isValid: boolean, error: string }}
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string' || !email.trim()) {
    return { isValid: false, error: 'Email address is required.' };
  }
  const cleanEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true, error: '' };
};

/**
 * Validates Password strength
 * @param {string|any} password 
 * @returns {{ isValid: boolean, error: string }}
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, error: 'Password is required.' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long.' };
  }
  return { isValid: true, error: '' };
};
