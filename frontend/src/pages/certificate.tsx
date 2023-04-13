import useMe from "@/hooks/useMe";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Certificate = () => {
  const { data, isLoggedin } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedin) {
      router.push("/login");
    }
  }, [isLoggedin, router]);
  return (
    <>{data.me && <div>CERTIFICATE #{data.me.user.certificateNumber}</div>}</>
  );
};

export default Certificate;
