import fs from "fs";
import express from "express";

import { Users } from "../dbConnector";
import { genPDF } from "../pdf-gen";

const router = express.Router();

router.get("/certifiedAndValidatedUsers", async (req, res) => {
  const username = req.query?.username;
  const tag = req.query?.tag;

  if (!username) {
    res.status(400).send("username is required");
    return;
  }

  const a = await Users.find({
    certificateLevel: { $gte: 1 },
    username: {
      $regex: new RegExp(`^${username}`, "i"),
    },
    tag: {
      $regex: new RegExp(`^${tag ?? ""}`, "i"),
    },
  })
    .sort("username")
    .limit(10);

  const ret = a.map((user) => {
    return {
      username: user.username,
      tag: user.tag,
      certificateLevel: user.certificateLevel,
      label: user.username + "#" + user.tag,
    };
  });

  res.send(ret.slice(0, 5));
});

router.get("/getCertificate/:username/:tag", async (req, res) => {
  const username = req.params.username;
  const tag = req.params.tag;

  if (!username || !tag) {
    return res.status(400).send("invalid data");
  }

  const a = await Users.findOne({
    username,
    tag,
  });

  if (!a) {
    return res.status(400).send("invalid data");
  }

  if (a.certificateLevel < 1) {
    return res.status(400).send("uncertified user");
  }

  const pdf = await genPDF([
    {
      name: a.username + "#" + a.tag,
      course: "Introduction to Pocket Sages",
    },
  ]);
  const pdfBuffer = Buffer.from(pdf);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${username}_${tag}.pdf`
  );
  return res.send(pdfBuffer);
});

export default router;
