// Generates a 6-character random shortcode
export const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 8);
};
