import mongoose from "mongoose";
import { User } from "./models/User";
import { getModelForClass } from "@typegoose/typegoose";
import { Counter } from "./models/Counter";

/**
 * Mongoose Connection
 **/

mongoose
  .connect(process.env.MONGO || "mongodb://127.0.0.1/vpsa")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.error("could not connect to MongoDB: ", err));

let db = mongoose.connection;
db.on("error", () => {
  console.error("Error while connecting to DB");
});

const Users = getModelForClass(User);
const Counters = getModelForClass(Counter);

export { Users, Counters };
