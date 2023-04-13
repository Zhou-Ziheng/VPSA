import { useState, useEffect } from "react";
import styles from "./login.module.scss";
import GraphicalPage from "@/components/GraphicalPage";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { client } from "./_app";
import useMe from "@/hooks/useMe";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const query = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
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
  const { data, isLoggedin } = useMe();
  useEffect(() => {
    if (isLoggedin) {
      router.push("/");
    }
  }, [router, isLoggedin]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);

  const queryClient = useQueryClient();
  const register = useMutation({
    mutationFn: async (variables: {
      email: string;
      username: string;
      password: string;
    }) => {
      return await client.request(query, variables);
    },
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      if (data.register.errors) {
        data.register.errors.forEach(
          (error: { field: string; message: string }) => {
            if (error.field === "email") {
              setEmailError(error.message);
            } else if (error.field === "username") {
              setUsernameError(error.message);
            } else if (error.field === "password") {
              setPasswordError(error.message);
            }
          }
        );
      } else if (data.register.user) {
        router.push("/");
      }
    },
  });

  return (
    <GraphicalPage>
      <div className={styles["Login-Register"]}>
        <h3>Welcome!</h3>
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
      <div className={styles["Login-Register"]}>
        <TextField
          variant="outlined"
          className={styles["Login-Input"]}
          id="username"
          label="Username"
          aria-describedby="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameError("");
          }}
          error={usernameError !== ""}
          helperText={usernameError}
        />
      </div>
      <div>
        <TextField
          className={styles["Login-Input"]}
          id="password"
          label="Password"
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
      <div>
        <TextField
          className={styles["Login-Input"]}
          id="password2"
          label="Verify Password"
          aria-describedby="password2"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
            setPassword2Error("");
          }}
          error={password2Error !== ""}
          helperText={password2Error}
          type={showPassword2 ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword2(!showPassword2);
                  }}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        className={styles["Login-Submit"]}
        variant="contained"
        onClick={() => {
          register.mutate({ email, username, password });
        }}
      >
        <p style={{ fontSize: "20px" }}>Sign up</p>
      </Button>
    </GraphicalPage>
  );
};

export default Login;
