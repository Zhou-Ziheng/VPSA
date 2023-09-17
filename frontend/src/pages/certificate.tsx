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
      title: "Iron Pocket Saging",
      description: data?.me?.user.certificateNumber
        ? `CERTIFICATE #${data?.me?.user.certificateNumber}`
        : "Not Completed",
      certificateLevel: 1,
    },
    { title: "Bronze Saging", description: "Coming Soon!" },
    { title: "Silver Saging", description: "Coming Soon!" },
    { title: "Gold Saging", description: "Coming Soon!" },
    { title: "Platinum Saging", description: "Coming Soon!" },
    { title: "Diamond Saging", description: "Coming Soon!" },
    { title: "Ascendant Saging", description: "Coming Soon!" },
    { title: "Immortal Saging", description: "Coming Soon!" },
    { title: "Radiant Pocket Saging", description: "Coming Soon!" },
  ];

  const makeCard = (card: {
    title: string;
    description: string;
    certificateLevel?: number;
  }) => (
    <Box
      sx={{
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
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
            "flex-direction": "column",
            "justify-content": "flex-start",
            gap: "10px",
            "align-content": "left",
          }}
          onClick={(e) => {
            if (card.certificateLevel == 1) {
              e.preventDefault();
              loadCertificate(data?.me?.user.username, data?.me?.user.tag);
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
              "grid-template-columns": "repeat(auto-fit, minmax(350px, 1fr))",
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
