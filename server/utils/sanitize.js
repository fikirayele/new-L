/**
 * Sanitizes a string by escaping HTML special characters to prevent XSS.
 * If the input is not a string, it returns the input as is.
 */
export function sanitizeString(val) {
  if (typeof val !== "string") return val;
  return val
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Sanitizes an object recursively by sanitizing all string properties.
 */
export function sanitizeObject(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      sanitized[key] = typeof obj[key] === "string" 
        ? sanitizeString(obj[key]) 
        : sanitizeObject(obj[key]);
    }
  }
  return sanitized;
}
