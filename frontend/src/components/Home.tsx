import { Box, Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./home.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import SageBackground from "../../public/background.png";
import GraphicalPage from "./GraphicalPage";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState([
    { label: "The Shawshank Redemption", year: 1994 },
  ]);

  useEffect(() => {
    const getDropdownOptions = async () => {
      const res = await fetch("/api/sages");
      const data = await res.json();
      setOptions(data);
    };
    getSages();
  }}
  return (
    <GraphicalPage>
      <div className={styles["sage-div"]}></div>
      <div className={styles["text"]}>
        <h1 className={styles["title"]}>VALORANT POCKET SAGE ASSOCIATION</h1>
      </div>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Autocomplete
          options={options}
          filterOptions={(x) => x}
          renderInput={(params) => (
            <TextField
              {...params}
              className={styles.search}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              InputProps={{
                ...params.InputProps,
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
          )}
        />
      </Box>
    </GraphicalPage>
  );
};
export default Home;
