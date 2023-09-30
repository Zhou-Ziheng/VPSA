import "reflect-metadata";
import { Counters, Users } from "../dbConnector";
import { User } from "../models/User";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "../types";
import { DocumentType, errors } from "@typegoose/typegoose";
import request from "request";

const mapUserToSimplifiedUser = (user: DocumentType<User>): SimplifiedUser => {
  return {
    certificateLevel: user.certificateLevel,
    username: user.username,
    certificateNumber: user.certificateNumber,
    tag: user.tag,
  };
};

interface SimplifiedUser {
  certificateLevel: number;
  certificateNumber: number | null;
  username: string;
  tag: string | null;
}
@ObjectType()
class FieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: SimplifiedUser;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse, { nullable: true })
  async logout(@Ctx() { res }: MyContext) {
    res.clearCookie("qid");
    return null;
  }

  @Query(() => UserResponse, { nullable: true })
  async me(@Ctx() { res, req }: MyContext) {
    if (!req.session.userid) {
      res.clearCookie("qid");
      return null;
    }
    const user = await Users.findById(req.session.userid);
    if (!user) {
      res.clearCookie("qid");
      return null;
    }
    return {
      user: mapUserToSimplifiedUser(user),
    };
  }

  @Query(() => UserResponse, { nullable: true })
  async loginWithRiotCode(
    @Arg("code") code: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    console.log(code);
    const provider = "https://auth.riotgames.com";
    const tokenUrl = provider + "/token";
    const clientID = "9e201369-2718-4f0a-b2e9-56832b3cc8a2";

    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    if (process.env.NODE_ENV === "production") {
      formData.append(
        "redirect_uri",
        "https://vpsa.tonyzhou.ca/oauth/callback"
      );
    } else {
      formData.append("redirect_uri", "https://vpsa.tonyzhou.ca/redirect");
    }

    const token = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientID}:${process.env.RSOKey}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then(async (res) => res.json())
      .then((json) => {
        return {
          refresh_token: json.refresh_token,

          id_token: json.id_token,

          access_token: json.access_token,
        };
      });

    const riotAPI = "https://americas.api.riotgames.com";
    const path = "/riot/account/v1/accounts/me";
    const riotUser = await fetch(riotAPI + path, {
      headers: { Authorization: `Bearer ${(token as any).access_token}` },
    });

    const riotUserJson = await riotUser.json();

    const { puuid, gameName, tagLine } = riotUserJson;

    const vpsaUser = await Users.findOne({ PUUID: puuid });
    if (req.session.userid) {
      const user = await Users.findById(req.session.userid);
      if (user && !user.PUUID && !vpsaUser) {
        // loggedin, not linkeded, no connected account
        user.PUUID = puuid;
        user.tag = tagLine;
        user.username = gameName;
        user.save();
        return {
          user: mapUserToSimplifiedUser(user),
        };
      } else if (user && user.PUUID && vpsaUser) {
        // loggedin, linkeded, has connected account
        return {
          user: mapUserToSimplifiedUser(vpsaUser),
        };
      } else if (user && !user.PUUID && vpsaUser) {
        // loggedin, not linked, has connected account
        return { errors: [{ field: "account", message: "duplicate account" }] };
      }
    }

    if (vpsaUser == null) {
      // create a new user
      const newUser = await Users.create({
        username: gameName,
        tag: tagLine,
        PUUID: puuid,
        certificateLevel: 0,
      });
      await newUser.save();
      req.session.userid = newUser._id.toString();
      return {
        user: mapUserToSimplifiedUser(newUser),
      };
    }

    req.session.userid = vpsaUser._id.toString();
    return {
      user: mapUserToSimplifiedUser(vpsaUser),
    };
  }

  @Query(() => UserResponse, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "that email doesn't exist",
          },
        ],
      };
    }
    if (!user.password) {
      return {
        errors: [
          {
            field: "password",
            message: "password incorrect",
          },
        ],
      };
    }

    if (await argon2.verify(user.password, password)) {
      req.session.userid = user._id.toString();
      return {
        user: mapUserToSimplifiedUser(user),
      };
    } else {
      return {
        errors: [
          {
            field: "password",
            message: "password incorrect",
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse, { nullable: true })
  async certify(@Ctx() { req }: MyContext): Promise<UserResponse> {
    const user = await Users.findById(req.session.userid);
    if (!user) {
      return {
        errors: [
          {
            field: "login status",
            message: "you are not logged in",
          },
        ],
      };
    }
    user.certificateLevel = 1;

    let counter = await Counters.findOne({ type: "certificateId" });
    if (!counter) {
      counter = await Counters.create({
        type: "certificateId",
        counter: 0,
      });
      counter.save();
    }

    user.certificateNumber = counter.counter;
    counter.counter += 1;
    counter.save();
    user.save();
    return {
      user: mapUserToSimplifiedUser(user),
    };
  }

  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    console.log("register");
    if (await Users.exists({ email })) {
      return {
        errors: [
          {
            field: "email",
            message: "email already used;",
          },
        ],
      };
    }

    const user = await Users.create({
      email,
      username,
      password: await argon2.hash(password),
      certificateLevel: 0,
    });

    try {
      user.save();
      req.session.userid = user._id;
      return {
        user: mapUserToSimplifiedUser(user),
      };
    } catch (ex) {
      console.log(ex);
      return { errors: [{ field: "unknown", message: "unknown error" }] };
    }
  }
}
