import { useCallback, useEffect, useState } from "react";
import styles from "./SplashMedia.module.css";
import type { SplashConfig, MediaPosition } from "../../types/SplashMedia";

interface SplashMediaProps extends Omit<SplashConfig, "type"> {
  type: SplashConfig["type"] | null;
  duration?: number;
  onClose: () => void;
}

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

  useEffect(() => {
    if (!type) return;
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

  const getTransformOrigin = () => {
    if (position === "center") return "center";
    const v = position.includes("top") ? "top" : "bottom";
    const h = position.includes("left") ? "left" : "right";
    return `${v} ${h}`;
  };

  const outerStyle: React.CSSProperties = {
    transform: [
      position === "center" ? "translate(-50%, -50%)" : "",
      `translate(${offsetX}, ${offsetY})`,
      `scale(${scale})`,
    ]
      .filter(Boolean)
      .join(" "),
    transformOrigin: getTransformOrigin(),
  };

  const getGradientPosition = (pos: MediaPosition) => {
    switch (pos) {
      case "top-left":
        return "left top";
      case "top-right":
        return "right top";
      case "bottom-left":
        return "left bottom";
      case "bottom-right":
        return "right bottom";
      case "center":
        return "center center";
      default:
        return "center center";
    }
  };

  const gradientStyle: React.CSSProperties = {
    background: `radial-gradient(circle at ${getGradientPosition(position)}, rgba(0, 0, 0, 0.7) 0%, transparent 100%)`,
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
