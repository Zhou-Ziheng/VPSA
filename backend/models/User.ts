import {
  DocumentType,
  getModelForClass,
  prop as Property,
} from "@typegoose/typegoose";
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
  PUUID!: string;

  @GqlField((_type) => String)
  @Property({ required: false })
  password!: string;

  @GqlField((_type) => Boolean)
  @Property({ required: true })
  isCertified!: boolean;
}
