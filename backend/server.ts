import { COOKIE_NAME, __prod__ } from "./constants";
import { User } from "./models/User";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UniqueFieldDefinitionNamesRule } from "graphql";
import { UserResolver } from "./resolvers/User";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import session from "express-session";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";
import path from "path";
import "source-map-support/register";
import { Counters } from "./dbConnector";
import restRouter from "./routes";
const main = async () => {
  const app = express();

  const redisClient = new Redis(6379, process.env.REDIS || "localhost");

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "vpsa:",
  });

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://vpsa.tonyzhou.ca",
        "http://vpsa.tonyzhou.ca",
        "http://pocket-sage.com",
        "http://www.pocket-sage.com",
      ],
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60, // 10 years
        httpOnly: false,
        sameSite: "lax",
        secure: "auto", // cookie only works in https
      },
      saveUninitialized: false,
      secret: "rdsrgjsdrio;gvjdsfkgvjdsrvgdsrvgdsfgvl;ji",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
    context: ({ req, res }) => ({ req, res, redisClient }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app: app as any,
    cors: false,
  });
  app.listen(4000, () => {
    console.log("server started on locahost: 4000");
  });

  app.use("/rest", restRouter);

  const counter = await Counters.findOne({ type: "certificateId" });
  if (!counter) {
    const newCounter = new Counters({
      type: "certificateId",
      counter: 0,
    });
    newCounter.save();
  }
};

main().catch((error) => {
  console.log(error);
});
