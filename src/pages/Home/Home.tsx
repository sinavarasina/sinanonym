import { useState, useEffect, useCallback } from "react";
import styles from "./Home.module.css";
import yuki from "../../assets/images/yuki-background-removed.webp";
import yukiGlassesOn from "../../assets/images/yuki-background-removed-glasses.webp";
import { useRNGYukiSFX } from "../../hooks/useRNGYukiSFX";
import { useCustNavigate } from "../../hooks/useCustNavigate";
import type { SplashConfig } from "../../types/SplashMedia";
import { SplashMedia } from "../../components/SplashMedia/SplashMedia";
import { MENU_ITEMS } from "../../constants/navigation";
import { SPLASH_PRESETS } from "../../config/splashPresets";

export const Home = () => {
  const ROTATING_TEXT =
    "< observing the resulting fluctuations in data > • 長門有希 •";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [splashConfig, setSplashConfig] = useState<SplashConfig | null>(null);
  const { playRandomYukiSFX } = useRNGYukiSFX();
  const { navigateTo } = useCustNavigate();

  const handleSamePageClick = useCallback(() => {
    setSplashConfig(SPLASH_PRESETS.samePageClick);
  }, []);

  const handleNavigate = useCallback(
    (path: string) => navigateTo(path, handleSamePageClick),
    [navigateTo, handleSamePageClick],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const len = MENU_ITEMS.length;

      if (e.key === "h" || e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + len) % len);
      } else if (e.key === "l" || e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % len);
      } else if (e.key === "Enter") {
        handleNavigate(MENU_ITEMS[selectedIndex].path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNavigate]);

  return (
    <main className={styles.hero}>
      <SplashMedia
        type={splashConfig?.type ?? null}
        src={splashConfig?.src ?? ""}
        position={splashConfig?.position}
        scale={splashConfig?.scale}
        onClose={() => setSplashConfig(null)}
      />

      <header className={styles.headerContainer}>
        <div
          className={styles.avatarWrapper}
          onClick={playRandomYukiSFX}
          role="button"
          aria-label="Play Yuki sound effect"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && playRandomYukiSFX()}
        >
          <svg
            viewBox="0 0 200 200"
            className={styles.textRing}
            aria-hidden="true"
          >
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
              />
            </defs>
            <text className={styles.ringText}>
              <textPath href="#circlePath" startOffset="0%">
                {ROTATING_TEXT}
              </textPath>
            </text>
          </svg>

          <img src={yuki} alt="Yuki Nagato" className={styles.avatarBase} />
          <img
            src={yukiGlassesOn}
            alt=""
            aria-hidden="true"
            className={styles.avatarHover}
          />
        </div>

        <h1 className={styles.title}>Sinanonym</h1>
      </header>

      <section className={styles.bio} aria-label="Bio">
        <p>
          hey, i'm Varasina Farmadani, and i was trying to learn how to make
          website (since i skip most of webdev tutorials).
        </p>
        <p>よろしくお願いします</p>
      </section>

      <section className={styles.terminal} aria-label="Navigation terminal">
        <p>$ ls</p>
        <nav aria-label="Site navigation">
          <div className={styles.menuContainer}>
            <span aria-hidden="true">{">"}</span>
            {MENU_ITEMS.map((item, index) => (
              <button
                key={item.path}
                className={`${styles.menuItem} ${index === selectedIndex ? styles.active : ""}`}
                onMouseEnter={() => setSelectedIndex(index)}
                onPointerDown={() => handleNavigate(item.path)}
                aria-current={index === selectedIndex ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </section>
    </main>
  );
};
