import { prop as Property } from "@typegoose/typegoose";
import { Field as GqlField, ObjectType as GqlType } from "type-graphql";

@GqlType()
export class User {
  @GqlField((_type) => String)
  readonly _id!: string;

  @GqlField((_type) => String)
  @Property({ required: false })
  email!: string;

  @GqlField((_type) => String)
  @Property({ required: true })
  username!: string;

  @GqlField((_type) => String)
  @Property({ required: false })
  riotUsername!: string;

  @GqlField((_type) => String)
  @Property({ required: false })
  authToken!: string;

  @GqlField((_type) => Date)
  @Property({ required: false })
  authTokenExpiryDate!: Date;

  @GqlField((_type) => String)
  @Property({ required: false })
  refreshToken!: string;

  @GqlField((_type) => Date)
  @Property({ required: false })
  refreshTokenExpiryDate!: Date;

  @GqlField((_type) => Number)
  @Property({ required: false })
  riotUserTag!: number;

  @GqlField((_type) => String)
  @Property({ required: false })
  PUUID!: string;

  @GqlField((_type) => String)
  @Property({ required: false })
  password!: string;

  @GqlField((_type) => Number)
  @Property({ required: true })
  certificateLevel!: number;

  @GqlField((_type) => Number, { nullable: true })
  @Property({ required: false })
  certificateNumber!: number;
}
