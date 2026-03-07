import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import yuki from "../../assets/images/yuki-background-removed.png";
import yukiGlassesOn from "../../assets/images/yuki-background-removed-glasses.png";
import { useRNGYukiSFX } from "../../hooks/useRNGYukiSound";

const MENU_ITEMS = [
  { label: "/home", path: "/home" },
  { label: "/gallery", path: "/gallery" },
  { label: "/fun-things", path: "/fun-things" },
  { label: "/about-me", path: "/about-me" },
];

const ROTATING_TEXT =
  "< observing the resulting fluctuations in data > • 長門有希 •";

export const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { playRandomYukiSFX } = useRNGYukiSFX();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : MENU_ITEMS.length - 1,
        );
      } else if (e.key === "l" || e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev < MENU_ITEMS.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "Enter") {
        navigate(MENU_ITEMS[selectedIndex].path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <main className={styles.hero}>
      <header className={styles.headerContainer}>
        <div className={styles.avatarWrapper} onClick={playRandomYukiSFX}>
          <svg viewBox="0 0 200 200" className={styles.textRing}>
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

          <img src={yuki} alt="waifu base" className={styles.avatarBase} />
          <img
            src={yukiGlassesOn}
            alt="waifu glasses"
            className={styles.avatarHover}
          />
        </div>

        <h1 className={styles.title}>Sinanonym</h1>
      </header>

      <section className={styles.bio}>
        <p>
          hey, i'm Varasina Farmadani, and i was trying to learn how to make
          website (since i skip most of webdev tutorials).
        </p>
        <p> よろしくお願いします。</p>
      </section>

      <section className={styles.terminal}>
        <p>$ ls</p>
        <div className={styles.menuContainer}>
          <span>&gt; </span>
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.path}
              className={`${styles.menuItem} ${index === selectedIndex ? styles.active : ""}`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => {
                navigate(item.path);
              }}
              aria-current={index === selectedIndex ? "true" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};
