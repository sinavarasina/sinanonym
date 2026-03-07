import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import yuki from "../../assets/yuki-background removed.png";

const MENU_ITEMS = ["/home", "/hobby", "/about"];

export const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        // let it just print out something atleast for now
        console.log(`move to: ${MENU_ITEMS[selectedIndex]}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <main className={styles.hero}>
      <header
        className={styles.headerContainer}
        style={{ flexDirection: "row" }}
      >
        <div className={styles.avatarWrapper}>
          <div className={styles.ring}></div>
          <img src={yuki} alt="waifu" className={styles.avatar} />
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
              key={item}
              className={`${styles.menuItem} ${index === selectedIndex ? styles.active : ""}`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => console.log(`move to: ${item}`)}
              aria-current={index === selectedIndex ? "true" : undefined}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};
