import { Typography, TextField } from "@mui/material";
import TextPage from "../components/TextPage";

const About = () => (
  <TextPage>
    <Typography variant="h3">Resources</Typography>
    <TextField variant="outlined" />
    <TextField variant="filled" />
    <TextField variant="standard" />
    <input style={{ color: "red", backgroundColor: "purple" }}></input>
  </TextPage>
);
export default About;
