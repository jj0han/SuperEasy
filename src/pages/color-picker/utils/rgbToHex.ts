export const rgbToHex = (rgb: string | null) => {
  const rgbArray = rgb?.match(/\d+/g)?.map(Number);
  if (rgbArray) {
    const r = rgbArray[0];
    const g = rgbArray[1];
    const b = rgbArray[2];
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  return null;
};
