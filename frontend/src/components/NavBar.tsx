import {
  AppBar,
  Button,
  Menu,
  Toolbar,
  Typography,
  MenuItem,
  Popper,
  Popover,
} from "@mui/material";
import Link from "next/link";
import useMe from "@/hooks/useMe";
import { useRef, useState } from "react";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import styles from "./NavBar.module.scss";
import { useRouter } from "next/router";

const NavBar = () => {
  const { data, logout, isFetched, isLoggedin } = useMe();
  const button = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
    disableAutoFocus: true,
  });

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

          <Link href="/certificate">
            <Button color="inherit">Certificates</Button>
          </Link>

          <Link href="/resources">
            <Button color="inherit">Resources</Button>
          </Link>
          {isLoggedin ? (
            <>
              <Link href="/me">
                <Button
                  variant="outlined"
                  color="primary"
                  ref={(ref) => {
                    button.current = ref;
                  }}
                  {...bindHover(popupState)}
                  startIcon={
                    isFetched && data.me?.user.certificateLevel == 1 ? (
                      <CheckCircleOutlineIcon />
                    ) : undefined
                  }
                >
                  {data?.me?.user.username}
                </Button>
              </Link>
              <HoverMenu
                {...bindMenu(popupState)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                {isFetched && data.me?.user.certificateLevel == 1 ? (
                  <MenuItem
                    href="/see-certificate"
                    onClick={async () => {
                      popupState.close();
                      router.push("/certificate");
                    }}
                  >
                    <h6> See Certificate</h6>
                  </MenuItem>
                ) : (
                  <MenuItem
                    href="/pocket-sage-quiz"
                    onClick={async () => {
                      popupState.close();
                    }}
                  >
                    <h6>Get Certified</h6>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={async () => {
                    popupState.close();
                    await logout();
                  }}
                >
                  <h6>Sign Out</h6>
                </MenuItem>
              </HoverMenu>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="outlined">Sign up</Button>
              </Link>
              <Link href="/login">
                <Button variant="contained" color="primary">
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
