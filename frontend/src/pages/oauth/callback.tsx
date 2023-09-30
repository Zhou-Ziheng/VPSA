import GraphicalPage from "@/components/GraphicalPage";
import { gql } from "graphql-request";
import { useEffect } from "react";
import { client } from "../_app";

const query = gql`
  query LoginWithRiotCode($code: String!) {
    loginWithRiotCode(code: $code) {
      user {
        username
        certificateLevel
      }
    }
  }
`;

const Callback = () => {
  useEffect(() => {
    const makeCallback = async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (!params.code) {
        window.location.href = "/404";
      }
      const code = params.code;
      console.log("test");
      await client.request(query, { code });
      window.location.href = "/";
    };
    makeCallback();
  }, []);
  return (
    <GraphicalPage>
      <h3>Redirecting...</h3>
    </GraphicalPage>
  );
};

export default Callback;
