import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import styles from "./TextPage.module.scss";
interface TextPageProps {
  children?: ReactNode;
}

const TextPage = ({ children }: TextPageProps) => {
  useEffect(() => {
    const handleResize = () => {
      const el = document.getElementById("text-page-center-column");
      if (el) {
        el.style.width = window.innerWidth - (window.innerWidth % 1000) + "px";
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div id="text-page-center-column" className={styles.TextPage}>
      {children}
    </div>
  );
};

export default TextPage;
