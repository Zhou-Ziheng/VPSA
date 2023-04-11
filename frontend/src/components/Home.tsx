import { Box, Icon, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./home.module.scss";
import { useState } from "react";
import Image from "next/image";
import SageBackground from "../../public/background.png";
import GraphicalPage from "./GraphicalPage";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <GraphicalPage>
      <div className={styles["sage-div"]}></div>
      <div className={styles["text"]}>
        <h1 className={styles["title"]}>VALORANT POCKET SAGE ASSOCIATION</h1>
      </div>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          className={styles.search}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            placeholder: "Find a Pocket Sage, ie. Player#NA1",
          }}
        >
          {searchInput}
        </TextField>
      </Box>
    </GraphicalPage>
  );
};
export default Home;
