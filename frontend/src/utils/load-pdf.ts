import { serverUrl } from "@/constants";

const loadPDF = async (url: string, filename = "vpsa") => {
  const res = await fetch(url);
  return res;
};

export const loadCertificate = (username?: string, tag?: string) => {
  const url = `${serverUrl}/rest/getCertificate/${username}/${tag}`;
  return loadPDF(url, `${username}_${tag}`);
};

export default loadPDF;
