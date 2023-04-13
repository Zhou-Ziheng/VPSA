import { gql } from "graphql-request";
import { client } from "../pages/_app";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Me {
  user: { username: string; certificateLevel: number };
}
const me = gql`
  query Me {
    me {
      user {
        username
        certificateLevel
      }
    }
  }
`;

const logout = gql`
  query Logout {
    logout {
      user {
        username
      }
    }
  }
`;

const useMe = (): {
  data: Me | null;
  logout: () => Promise<void>;
  isLoggedin: boolean;
} => {
  const [data, setData] = useState<null | Me>(null);

  const cookie = Cookies.get("qid");

  const [isLoggedin, setIsLoggedin] = useState<boolean>(cookie != null);

  useEffect(() => {
    client.request(me).then((data) => {
      setData((data as any).me);
    });
  }, [cookie]);

  useEffect(() => {
    setIsLoggedin(cookie != null);
  }, [cookie]);

  return {
    data,
    logout: async () => {
      await client.request(logout);
      setData(null);
    },
    isLoggedin,
  };
};

export default useMe;
