import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./NavBar.module.scss";
import useMe from "@/hooks/useMe";
import { gql } from "graphql-request";
import { client } from "@/pages/_app";

const NavBar = () => {
  const { data, logout } = useMe();
  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        <Typography
          variant="h6"
          color="background"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <Link href="/">
            <h3 style={{ fontSize: "25px", fontFamily: "Valorant" }}>VPSA</h3>
          </Link>
        </Typography>
        <div className={styles.navBarButtons}>
          <Link href="/about">
            <Button color="inherit">About</Button>
          </Link>

          <Link href="/resources">
            <Button color="inherit">Resources</Button>
          </Link>

          {data != null ? (
            <>
              <Button color="inherit" onClick={logout}>
                Sign out
              </Button>

              <Link href="/me">
                <Button variant="contained" color="primary">
                  {data.user.username}
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <Button variant="contained" color="primary">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
