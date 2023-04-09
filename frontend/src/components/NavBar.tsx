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
import styles from "./NavBar.module.scss";
import useMe from "@/hooks/useMe";
import { useRef, useState } from "react";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";

const NavBar = () => {
  const { data, logout } = useMe();
  const button = useRef<HTMLButtonElement | null>(null);

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

          <Link href="/resources">
            <Button color="inherit">Resources</Button>
          </Link>
          {data != null ? (
            <>
              <Link href="/me">
                <Button
                  variant="outlined"
                  color="primary"
                  ref={(ref) => {
                    button.current = ref;
                  }}
                  {...bindHover(popupState)}
                >
                  {data.user.username}
                </Button>
              </Link>
              <HoverMenu
                {...bindMenu(popupState)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem>
                  <h6>Profile</h6>
                </MenuItem>
                <MenuItem>
                  <h6>My account</h6>
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    popupState.close();
                    await logout();
                  }}
                >
                  <h6>Sign out</h6>
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
