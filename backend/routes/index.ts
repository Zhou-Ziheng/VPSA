import express from "express";

import { Users } from "../dbConnector";

const router = express.Router();

router.get("/certifiedAndValidatedUsers", async (req, res) => {
  const username = req.query?.username;
  const tag = req.query?.tag;

  if (!username) {
    res.status(400).send("username is required");
  }

  const a = await Users.find({
    certificateLevel: { $gte: 1 },
    username: {
      $regex: new RegExp(`^${username}`, "i"),
    },
    tag: {
      $regex: new RegExp(`^${tag ?? ""}`, "i"),
    },
  });

  const ret = a
    .map((user) => {
      return {
        username: user.username,
        tag: user.tag,
        certificateLevel: user.certificateLevel,
      };
    })
    .sort();
  console.log(ret);
  res.send(ret.slice(0, 5));
});

export default router;
