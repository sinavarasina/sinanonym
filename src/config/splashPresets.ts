import lelouch from "../assets/images/code_geass_lelouch_on_chair_same_page.webp";
import type { SplashConfig } from "../types/SplashMedia";

export const SPLASH_PRESETS = {
  samePageClick: {
    type: "image",
    src: lelouch,
    position: "bottom-right",
  },
} as const satisfies Record<string, SplashConfig>;
