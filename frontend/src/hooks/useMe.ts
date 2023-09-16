import { useRouter } from "next/router";
import { gql, request } from "graphql-request";
import { client, queryClient } from "../pages/_app";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface Me {
  me: {
    user: {
      username: string;
      certificateLevel: number;
      certificateNumber: number | null;
    };
  } | null;
}
const me = gql`
  query Me {
    me {
      user {
        username
        certificateLevel
        certificateNumber
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
  data: Me;
  logout: () => Promise<void>;
  isLoggedin: boolean;
} & Omit<UseQueryResult<unknown, unknown>, "data"> => {
  const cookie = Cookies.get("qid");

  const router = useRouter();

  const result = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await client.request(me);
    },
  });

  return {
    ...result,
    data: result.data as Me,
    logout: async () => {
      router.push("/logout");
      await client.request(logout);
      await queryClient.refetchQueries({ queryKey: ["me"] });
    },
    isLoggedin: result.data != null && (result.data as Me).me !== null,
  };
};

export default useMe;
