import { Request, Response, Express } from "express";
import type { Session } from "express-session";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request & { session: Session };
  redisClient: Redis;
  res: Response;
};
