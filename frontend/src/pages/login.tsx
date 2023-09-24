import { useState, useEffect } from "react";
import GraphicalPage from "@/components/GraphicalPage";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { client } from "./_app";
import useMe from "@/hooks/useMe";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./login.module.scss";

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
  const { isLoggedin } = useMe();

  const queryClient = useQueryClient();
  const login = useMutation({
    mutationFn: async (variables: { email: string; password: string }) => {
      return await client.request(query, variables);
    },
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      if (data.login.errors) {
        data.login.errors.forEach(
          (error: { field: string; message: string }) => {
            if (error.field === "email") {
              setEmailError(error.message);
            } else if (error.field === "password") {
              setPasswordError(error.message);
            }
          }
        );
      } else if (data.login.user) {
        router.push("/");
      }
    },
  });
  useEffect(() => {
    if (isLoggedin) {
      router.push("/");
    }
  }, [isLoggedin, router]);
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
        onClick={() => login.mutate({ email, password })}
      >
        <p style={{ fontSize: "20px" }}>Sign in</p>
      </Button>
      <Button
        className={styles["Login-Submit-Riot"]}
        variant="contained"
        onClick={() => login.mutate({ email, password })}
      >
        <p style={{ fontSize: "20px" }}>Sign in With Riot</p>
      </Button>
    </GraphicalPage>
  );
};

export default Login;
