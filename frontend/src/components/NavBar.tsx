import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./NavBar.module.scss";

const NavBar = () => (
  <AppBar position="sticky" color="secondary">
    <Toolbar>
      <Typography
        variant="h6"
        color="background"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        <Link href="/">
          <div style={{ fontFamily: "Valorant" }}>VPSA</div>
        </Link>
      </Typography>
      <div className={styles.navBarButtons}>
        <Link href="/about">
          <Button color="inherit">About</Button>
        </Link>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);
export default NavBar;
