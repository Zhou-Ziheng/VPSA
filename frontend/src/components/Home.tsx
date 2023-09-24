import { Box, Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Image from "next/image";
import GraphicalPage from "./GraphicalPage";
import { serverUrl } from "@/constants";
import SageSlow from "../../public/TX_Sage_Q.png";
import styles from "./home.module.scss";
import { useRouter } from "next/router";

type Option = {
  username: string;
  tag: string;
  certificateLevel: number;
  label: string;
};
const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const router = useRouter();

  const getDropdownOptions = async (searchInput: string) => {
    const splitted = searchInput.split("#");
    const username = splitted[0];
    const tag = splitted.length > 1 ? splitted[1] : "";
    const res = await fetch(
      serverUrl +
        "/rest/certifiedAndValidatedUsers" +
        "?username=" +
        username +
        "&tag=" +
        tag
    );
    const data: Option[] = await res.json();
    setOptions(data);
  };

  return (
    <GraphicalPage>
      {/* <div className={styles["sage-div"]}></div> */}
      <div className={styles["text"]}>
        <h1 className={styles["title"]}>vAlorant POCKET SAGE ASSOCIaTION</h1>
      </div>
      <div className={styles["background"]} />
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Autocomplete
          options={options}
          filterOptions={(x) => x}
          noOptionsText="No Sages found"
          renderOption={(props, options) => (
            <li
              {...props}
              key={options.username + "#" + options.tag}
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  "/certificate/" + options.username + "/" + options.tag
                );
              }}
            >
              <Box className={styles["dropdown-li"]}>
                <Image
                  src={SageSlow}
                  alt="SageSlow"
                  height={23}
                  style={{ padding: "2px" }}
                />
                {<p>{options.username}</p>}
                <Box className={styles["dropdown-tag"]}>
                  {<p style={{ fontSize: "10px" }}>{options.tag}</p>}
                </Box>
              </Box>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              className={styles.search}
              onChange={async (e) => {
                setSearchInput(e.target.value);
                if (e.target.value === "") setOptions([]);
                else await getDropdownOptions(e.target.value);
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
