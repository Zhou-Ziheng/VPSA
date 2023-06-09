import styles from "./Footer.module.scss";

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.disclamer}>
      VPSA is not endorsed by Riot Games and does not reflect the views or
      opinions of Riot Games or anyone officially involved in producing or
      managing Riot Games properties. Riot Games and all associated properties
      are trademarks or registered trademarks of Riot Games, Inc
    </div>
  </div>
);

export default Footer;
