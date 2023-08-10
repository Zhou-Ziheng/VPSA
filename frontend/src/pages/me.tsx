import TextPage from "@/components/TextPage";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Certificate = () => {
  const { data, isLoggedin } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedin) {
      router.push("/login");
    }
  }, [isLoggedin, router]);
  return (
    <TextPage>
      {isLoggedin && data && data.me && (
        <h3>
          {data.me.user.certificateLevel == 1 ? (
            <CheckCircleOutlineIcon fontSize="large" />
          ) : undefined}
          &nbsp;
          {data.me.user.username}
        </h3>
      )}
    </TextPage>
  );
};

export default Certificate;
