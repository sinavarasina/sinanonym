export const EMOTE_LOADERS = {
  "asakura-hao-front": () =>
    import("../assets/images/emoticon/emot_asakura_hao_front.webp"),

  "asakura-hao-side": () =>
    import("../assets/images/emoticon/emot_asakura_hao_side.webp"),

  "asami-lilith-sigh": () =>
    import("../assets/images/emoticon/emot_asami_lilith_sigh.webp"),

  "astil-point2left": () =>
    import("../assets/images/emoticon/emot_astil_manuscript_sora_p2l.webp"),
} as const;

export type EmoteName = keyof typeof EMOTE_LOADERS;
