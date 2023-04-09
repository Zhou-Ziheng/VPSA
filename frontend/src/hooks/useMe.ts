import { gql } from "graphql-request";
import { client } from "../pages/_app";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Me {
  user: { username: string; isCertified: boolean };
}
const me = gql`
  query Me {
    me {
      user {
        username
        isCertified
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

const useMe = (): { data: Me | null; logout: () => Promise<void> } => {
  const [data, setData] = useState<null | Me>(null);

  const cookie = Cookies.get("qid");
  useEffect(() => {
    client.request(me).then((data) => {
      console.log(data);
      setData((data as any).me);
    });
  }, [cookie]);

  return {
    data,
    logout: async () => {
      await client.request(logout);
      setData(null);
    },
  };
};

export default useMe;
