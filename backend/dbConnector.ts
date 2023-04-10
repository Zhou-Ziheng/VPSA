import mongoose from "mongoose";
import { User } from "./models/User";
import { getModelForClass } from "@typegoose/typegoose";

const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
 **/

mongoose
  .connect("mongodb://" + (process.env.MONGO || "localhost") + "/vpsa")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("could not connect to MongoDB: ", err));

let db = mongoose.connection;
db.on("error", () => {
  console.error("Error while connecting to DB");
});

const Users = getModelForClass(User);

export { Users };
