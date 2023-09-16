export const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://vpsa.tonyzhou.ca:8443";
