import useMe from "@/hooks/useMe";
import { loadCertificate } from "@/utils/load-pdf";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Certificate = () => {
  const { data, isLoggedin, isFetching } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && !isLoggedin) {
      router.push("/login");
    }
  }, [isFetching, isLoggedin, router]);

  const cards = [
    {
      title: "Introduction to Pocket Sages",
      description:
        data?.me?.user.certificateNumber != null
          ? `CERTIFICATE #${data?.me?.user.certificateNumber}`
          : "Not Completed",
      certificateLevel: 1,
    },
    { title: "Intermediate Pocket Sages", description: "Coming Soon!" },
    { title: "Advanced Pocket Sages", description: "Coming Soon!" },
  ];

  const makeCard = (card: {
    title: string;
    description: string;
    certificateLevel?: number;
  }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          borderRadius: "20px",
          width: "350px",
        }}
        key={card.title}
      >
        <CardActionArea
          sx={{
            padding: "20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "10px",
            alignContent: "left",
          }}
          onClick={(e) => {
            if (card.certificateLevel == 1 && data?.me?.user.certificateLevel) {
              e.preventDefault();
              router.push(
                `certificate/${data?.me?.user.username}/${data?.me?.user.tag}`
              );
            } else {
              router.push("/pocket-sage-quiz");
            }
          }}
        >
          <h4>{card.title}</h4>
          <Typography variant="body2" color="text.secondary">
            {card.description}
          </Typography>
        </CardActionArea>
      </Card>
    </Box>
  );
  return (
    <>
      {data && data.me && (
        <Box
          sx={{
            padding: { sx: "0", sm: "50px" },
            paddingTop: "50px",
            paddingBottom: "50px",
            width: "80%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: "3rem",
              width: "100%",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            }}
          >
            {cards.map(makeCard)}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Certificate;
