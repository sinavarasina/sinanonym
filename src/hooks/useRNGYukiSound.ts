import { useCallback } from "react";
import { getRandomInt } from "../utils/math";

export const useRNGYukiSFX = () => {
  const playRandomYukiSFX = useCallback(() => {
    const audioDir = "/sounds/nagato-yuki";
    const rng = getRandomInt(1, 831);

    const audio = new Audio(`${audioDir}/tsuisou/yuki${rng}.aac`);

    audio.play().catch((error) => {
      console.error("audio playback failed:", error);
    });
  }, []);

  return { playRandomYukiSFX };
};
