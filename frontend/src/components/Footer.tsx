import styles from "./Footer.module.scss";
import DiscordIcon from "../../public/discord.svg";
import Image from "next/image";

const discordLink = "https://discord.gg/rpNkB2kwyb"; // Discord invite link

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.disclamer}>
      VPSA is not endorsed by Riot Games and does not reflect the views or
      opinions of Riot Games or anyone officially involved in producing or
      managing Riot Games properties. Riot Games and all associated properties
      are trademarks or registered trademarks of Riot Games, Inc
    </div>
    <a href={discordLink} target="_blank" rel="noopener noreferrer">
      <Image src={DiscordIcon} alt="Discord" width={30} height={50} />
    </a>
  </div>
);

export default Footer;
