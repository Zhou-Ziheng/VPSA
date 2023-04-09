"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./resolvers/User");
const apollo_server_core_1 = require("apollo-server-core");
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
require("source-map-support/register");
const main = async () => {
    const app = (0, express_1.default)();
    const redisClient = new ioredis_1.default(6379, "localhost");
    //redisClient.connect().catch(console.error);
    let redisStore = new connect_redis_1.default({
        client: redisClient,
        prefix: "vpsa:",
    });
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000"],
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: redisStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__, // cookie only works in https
        },
        saveUninitialized: false,
        secret: "rdsrgjsdrio;gvjdsfkgvjdsrvgdsrvgdsfgvl;ji",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [User_1.UserResolver],
            validate: false,
        }),
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)({
            // options
            }),
        ],
        context: ({ req, res }) => ({ req, res, redisClient }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log("server started on locahost: 4000");
    });
};
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=server.js.map