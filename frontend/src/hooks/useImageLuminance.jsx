import { useEffect, useState } from "react";

export function useImageLuminance(imageUrl) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = 50;
      canvas.height = 50;

      ctx.drawImage(img, 0, 0, 50, 50);

      const data = ctx.getImageData(0, 0, 50, 50).data;

      let total = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        total += brightness;
      }

      const avg = total / (data.length / 4);

      setIsDark(avg < 130);
    };
  }, [imageUrl]);

  return isDark;
}