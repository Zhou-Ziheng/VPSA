export const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://pocket-sage.com:8443";
