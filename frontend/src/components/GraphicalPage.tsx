import { ReactNode, ReactElement } from "react";
import styles from "./GraphicalPage.module.scss";

const GraphicalPage = ({ children }: { children: ReactNode }): ReactElement => (
  <div className={styles["home-background"]}>{children}</div>
);
export default GraphicalPage;
