import { useCallback } from "react";
import { getRandomInt } from "../utils/math";
import { YUKI_SFX } from "../constants/audio";

export const useRNGYukiSFX = () => {
  const playRandomYukiSFX = useCallback(() => {
    const rng = getRandomInt(YUKI_SFX.min, YUKI_SFX.max);
    const src = `${YUKI_SFX.dir}/${YUKI_SFX.prefix}${rng}${YUKI_SFX.ext}`;
    const audio = new Audio(src);

    audio.play().catch((err) => {
      console.error("audio playback failed:", err);
    });
  }, []);

  return { playRandomYukiSFX };
};
