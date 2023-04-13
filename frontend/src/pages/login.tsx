import { useState, useEffect } from "react";
import styles from "./login.module.scss";
import GraphicalPage from "@/components/GraphicalPage";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { client } from "./_app";
import useMe from "@/hooks/useMe";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const query = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        field
        message
      }
      user {
        username
        certificateLevel
      }
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const { data } = useMe();
  useEffect(() => {
    if (data != null) {
      router.push("/");
    }
  }, [router, data]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <GraphicalPage>
      <div className={styles["Login-Register"]}>
        <h3>Welcome Back!</h3>
      </div>
      <div className={styles["Login-Register"]}>
        <TextField
          variant="outlined"
          className={styles["Login-Input"]}
          id="email"
          label="Email"
          aria-describedby="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          error={emailError !== ""}
          helperText={emailError}
        />
      </div>
      <div>
        <TextField
          className={styles["Login-Input"]}
          id="password"
          label="password"
          aria-describedby="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          error={passwordError !== ""}
          helperText={passwordError}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        className={styles["Login-Submit"]}
        variant="contained"
        onClick={async () => {
          const data = (await client
            .request(query, { email, password })
            .catch((err: unknown) => {
              console.log(err);
            })) as any;
          if (data.login.errors) {
            data.login.errors.forEach(
              (err: { field: string; message: string }) => {
                if (err.field === "email") {
                  setEmailError(err.message);
                } else {
                  setPasswordError(err.message);
                }
              }
            );
          } else {
            router.push("/");
          }
        }}
      >
        <p style={{ fontSize: "20px" }}>Sign in</p>
      </Button>
    </GraphicalPage>
  );
};

export default Login;
