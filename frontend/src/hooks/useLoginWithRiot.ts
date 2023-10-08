const useLoginWithRiot = () => {
  const clientId = "9e201369-2718-4f0a-b2e9-56832b3cc8a2";
  let redirectUrl = "https://pocket-sage.com/";
  const referrer =
    process.env.NODE_ENV === "development"
      ? "https://pocket-sage.com/redirect"
      : "https://pocket-sage.com/oauth/callback";
  if (typeof window !== "undefined") {
    redirectUrl = `https://auth.riotgames.com/authorize?redirect_uri=${referrer}&client_id=${clientId}&response_type=code&scope=openid`;
  }

  const color = "#d53435";
  const redirect = () => {
    if (typeof window !== "undefined") {
      window.location.href = redirectUrl;
    }
  };

  return { redirect, color };
};

export default useLoginWithRiot;
