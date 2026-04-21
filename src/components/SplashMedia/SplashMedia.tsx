import { useCallback, useEffect, useState } from "react";
import styles from "./SplashMedia.module.css";
import type { SplashConfig, MediaPosition } from "../../types/SplashMedia";

interface SplashMediaProps extends Omit<SplashConfig, "type"> {
  type: SplashConfig["type"] | null;
  duration?: number;
  onClose: () => void;
}

const POSITION_META: Record<
  MediaPosition,
  { origin: string; gradient: string }
> = {
  center: { origin: "center center", gradient: "center center" },
  "top-left": { origin: "top left", gradient: "left top" },
  "top-right": { origin: "top right", gradient: "right top" },
  "bottom-left": { origin: "bottom left", gradient: "left bottom" },
  "bottom-right": { origin: "bottom right", gradient: "right bottom" },
};

export const SplashMedia = ({
  type,
  src,
  position = "center",
  duration = 2000,
  scale = 1,
  offsetX = "0px",
  offsetY = "0px",
  onClose,
}: SplashMediaProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const isCorner = position !== "center";

  useEffect(() => {
    if (!type) {
      setIsVisible(false);
      setIsClosing(false);
      return;
    }
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [type]);

  const triggerClose = useCallback(() => {
    setIsVisible(false);
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (type !== "image") return;
    const timer = setTimeout(triggerClose, duration);
    return () => clearTimeout(timer);
  }, [type, duration, triggerClose]);

  if (!type) return null;

  const meta = POSITION_META[position];

  const outerStyle: React.CSSProperties = isCorner
    ? { transform: `translate(${offsetX}, ${offsetY})` }
    : {
        transform: [
          "translate(-50%, -50%)",
          `translate(${offsetX}, ${offsetY})`,
          `scale(${scale})`,
        ]
          .filter(Boolean)
          .join(" "),
        transformOrigin: meta.origin,
      };

  const gradientStyle: React.CSSProperties = {
    background: `radial-gradient(circle at ${meta.gradient}, rgba(0, 0, 0, 0.7) 0%, transparent 100%)`,
    opacity: isVisible && !isClosing ? 1 : 0,
  };

  return (
    <>
      <div
        className={styles.gradientOverlay}
        style={gradientStyle}
        aria-hidden="true"
      />

      <div
        className={`${styles.positionWrapper} ${styles[position]}`}
        style={outerStyle}
      >
        <div
          className={`${styles.animWrapper} ${
            isVisible && !isClosing ? styles.fadeIn : styles.fadeOut
          }`}
        >
          {type === "video" ? (
            <video
              src={src}
              autoPlay
              muted
              playsInline
              onEnded={triggerClose}
              className={styles.media}
            />
          ) : (
            <img src={src} alt="" aria-hidden="true" className={styles.media} />
          )}
        </div>
      </div>
    </>
  );
};
