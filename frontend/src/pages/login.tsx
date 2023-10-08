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
  const clientId = "9e201369-2718-4f0a-b2e9-56832b3cc8a2";
  let redirectUrl = "https://pocket-sage.com/";
  const referrer =
    process.env.NODE_ENV === "development"
      ? "https://pocket-sage.com/redirect"
      : "https://pocket-sage.com/oauth/callback";
  if (typeof window !== "undefined") {
    redirectUrl = `https://auth.riotgames.com/authorize?redirect_uri=${referrer}&client_id=${clientId}&response_type=code&scope=openid`;
  }

  const redirect = () => {
    if (typeof window !== "undefined") {
      window.location.href = redirectUrl;
    }
  };

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
        <div style={{ fontSize: "20px" }}>Sign in</div>
      </Button>
      <Button
        className={styles["Login-Submit-Riot"]}
        // color="error"
        sx={{
          width: "40ch",
          backgroundColor: "#d53435",
          color: "#e8e1ee",
        }}
        variant="contained"
        onClick={() => redirect()}
      >
        <div style={{ fontSize: "20px" }}>Sign in With Riot</div>
      </Button>
    </GraphicalPage>
  );
};

export default Login;
