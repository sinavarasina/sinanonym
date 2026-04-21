import styles from "./NotFound.module.css";
import defaultVid from "../../assets/videos/nazoxkano.webm";
import { useCustNavigate } from "../../hooks/useCustNavigate";

interface NotFoundProps {
  title?: string;
  message?: string;
  animVid?: string;
}

export const NotFound = ({
  title = "404 - Entity Not Found",
  message = "The directory you are looking for does not exist in this timeline.",
  animVid = defaultVid,
}: NotFoundProps) => {
  const { goBack } = useCustNavigate();

  return (
    <main className={styles.container}>
      <video
        src={animVid}
        className={styles.anim}
        autoPlay
        loop
        muted
        playsInline
      />

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>

      <button onClick={() => goBack()} className={styles.backButton}>
        Go Back
      </button>
    </main>
  );
};
