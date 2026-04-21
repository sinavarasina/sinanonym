import { useState, useEffect } from "react";
import styles from "./InlineEmote.module.css";
import { EMOTE_LOADERS, type EmoteName } from "../../config/emotes";

interface InlineEmoteProps {
  name: EmoteName;
  size?: string;
}

export const InlineEmote = ({ name, size }: InlineEmoteProps) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadEmote = async () => {
      try {
        const module = await EMOTE_LOADERS[name]();

        if (isMounted) {
          setSrc(module.default);
        }
      } catch (error) {
        console.error(`Failed to load emote: ${name}`, error);
      }
    };

    loadEmote();

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (!src) {
    return (
      <span
        className={styles.placeholder}
        style={size ? { height: size, width: size } : undefined}
      />
    );
  }

  return (
    <img
      src={src}
      alt={`emote-${name}`}
      className={styles.emote}
      style={size ? { height: size } : undefined}
      aria-hidden="true"
      draggable={false}
    />
  );
};
