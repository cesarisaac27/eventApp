import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

import {
  isDarkColor,
  lighten,
  darken,
  rgba,
} from "../utils/colorUtils";

const fac = new FastAverageColor();

const DEFAULT_THEME = {
  primary: "#1e293b",
  secondary: "#475569",
  accent: "#ec4899",

  text: "#ffffff",
  mutedText: "#e2e8f0",

  button: "#ec4899",
  buttonHover: "#db2777",

  glass: "rgba(30,41,59,.22)",
  glassBorder: "rgba(255,255,255,.15)",

  overlay: "rgba(0,0,0,.20)",

  gradientTop: "rgba(0,0,0,0)",
  gradientMiddle: "rgba(30,41,59,.35)",
  gradientBottom: "#ffffff",

  isDark: true,
};

export function useImageTheme(imageUrl) {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    if (!imageUrl) {
      setTheme(DEFAULT_THEME);
      return;
    }

    let cancelled = false;

    fac
      .getColorAsync(imageUrl, {
        mode: "precision",
      })
      .then((color) => {
        if (cancelled) return;

        const primary = color.hex;

        const dark = isDarkColor(primary);

        const secondary = dark
          ? lighten(primary, 0.18)
          : darken(primary, 0.18);

        const accent = dark
          ? lighten(primary, 0.40)
          : darken(primary, 0.40);

        setTheme({
          primary,
          secondary,
          accent,

          isDark: dark,

          text: dark ? "#FFFFFF" : "#111827",

          mutedText: dark
            ? "rgba(255,255,255,.80)"
            : "rgba(17,24,39,.75)",

          button: accent,

          buttonHover: dark
            ? lighten(accent, 0.12)
            : darken(accent, 0.12),

          glass: rgba(primary, 0.22),

          glassBorder: dark
            ? "rgba(255,255,255,.15)"
            : "rgba(0,0,0,.10)",

          overlay: dark
            ? "rgba(0,0,0,.18)"
            : "rgba(255,255,255,.08)",

          gradientTop: "rgba(0,0,0,0)",

          gradientMiddle: rgba(primary, 0.35),

          gradientBottom: "#ffffff",
        });
      })
      .catch(() => {
        setTheme(DEFAULT_THEME);
      });

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  return theme;
}