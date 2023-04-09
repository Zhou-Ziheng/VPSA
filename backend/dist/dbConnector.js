"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./models/User");
const typegoose_1 = require("@typegoose/typegoose");
const env = process.env.NODE_ENV || "development";
/**
 * Mongoose Connection
 **/
mongoose_1.default
    .connect("mongodb://localhost/vpsa")
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.error("could not connect to MongoDB: ", err));
let db = mongoose_1.default.connection;
db.on("error", () => {
    console.error("Error while connecting to DB");
});
const Users = (0, typegoose_1.getModelForClass)(User_1.User);
exports.Users = Users;
//# sourceMappingURL=dbConnector.js.map