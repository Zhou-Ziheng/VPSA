import { prop as Property } from "@typegoose/typegoose";
import { Field as GqlField, ObjectType as GqlType } from "type-graphql";

@GqlType()
export class Counter {
  @GqlField((_type) => String)
  readonly _id!: string;

  @GqlField((_type) => Number)
  @Property({ required: false })
  counter!: number;

  @GqlField((_type) => String)
  @Property({ required: true })
  type!: string;
}
