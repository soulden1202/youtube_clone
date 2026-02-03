/**
 * Simple helper to validate image URLs
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Validates if the image object has a valid texture/url
 */
export const hasValidImage = (image: any): boolean => {
  if (!image) return false;
  if (typeof image === 'string') return isValidUrl(image);
  return !!(image.asset && image.asset.url);
};
