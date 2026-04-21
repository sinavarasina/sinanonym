import lelouch from "../assets/images/code_geass_lelouch_on_chair_same_page.webp";
import type { SplashConfig } from "../types/SplashMedia";

export const SPLASH_PRESETS = {
  samePageClick: {
    type: "image",
    src: lelouch,
    position: "bottom-right",
    scale: 4.3,
    offsetX: "50px",
  },
} as const satisfies Record<string, SplashConfig>;
