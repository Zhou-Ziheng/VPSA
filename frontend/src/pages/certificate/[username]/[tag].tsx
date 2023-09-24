import GraphicalPage from "@/components/GraphicalPage";
import Layout from "@/components/Layout";
import { serverUrl } from "@/constants";
import { loadCertificate } from "@/utils/load-pdf";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tag = () => {
  const router = useRouter();
  const { username, tag } = router.query;

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setModalOpen(true);
    }, 5000);
  }, []);

  useEffect(() => {
    const loadPdf = async () => {
      const res = await loadCertificate(username as string, tag as string);
      if (res.status !== 200) {
        router.push("/404");
      }
      const blob = await res.blob();
      const pdfBlobUrl = URL.createObjectURL(blob);
      const iframe = document.getElementById("pdfIframe");
      if (iframe && iframe instanceof HTMLIFrameElement) {
        iframe.src = pdfBlobUrl;
      }
    };
    if (tag && username) {
      loadPdf();
    }
  }, [router, tag, username]);

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <GraphicalPage>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Enjoying VPSA?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Become a verified pocket sage today!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => router.push("/signup")} autoFocus>
            LETS GO
          </Button>
        </DialogActions>
      </Dialog>
      <iframe id="pdfIframe" width="100%" height="100%" />
    </GraphicalPage>
  );
};

export default Tag;
