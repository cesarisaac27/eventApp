export function hexToRgb(hex) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const bigint = parseInt(hex, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((v) => {
        const h = Math.max(0, Math.min(255, Math.round(v))).toString(16);
        return h.length === 1 ? "0" + h : h;
      })
      .join("")
  );
}

export function rgba(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function brightness(hex) {
  const { r, g, b } = hexToRgb(hex);

  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function isDarkColor(hex) {
  return brightness(hex) < 140;
}

export function lighten(hex, percent) {
  const { r, g, b } = hexToRgb(hex);

  return rgbToHex(
    r + (255 - r) * percent,
    g + (255 - g) * percent,
    b + (255 - b) * percent
  );
}

export function darken(hex, percent) {
  const { r, g, b } = hexToRgb(hex);

  return rgbToHex(
    r * (1 - percent),
    g * (1 - percent),
    b * (1 - percent)
  );
}