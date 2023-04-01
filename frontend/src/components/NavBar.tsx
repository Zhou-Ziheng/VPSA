import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

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
      <Button color="inherit">
        <Link href="/about">About</Link>
      </Button>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);
export default NavBar;
