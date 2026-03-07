import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import defaultErrImg from "../../assets/images/cry-sorry.gif";

interface NotFoundProps {
  title?: string;
  message?: string;
  image?: string;
}

export const NotFound = ({
  title = "404 - Entity Not Found",
  message = "The directory you are looking for does not exist in this timeline.",
  image = defaultErrImg,
}: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <img src={image} alt="Error" className={styles.img} />

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        &lt;- Go Back
      </button>
    </main>
  );
};
