"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
require("reflect-metadata");
const dbConnector_1 = require("../dbConnector");
const User_1 = require("../models/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", Object)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    async login(emailOrUsername, password, { req }) {
        const user = emailOrUsername.indexOf("@") != -1
            ? await dbConnector_1.Users.findOne({ email: emailOrUsername })
            : await dbConnector_1.Users.findOne({ username: emailOrUsername });
        if (!user) {
            return {
                errors: [
                    {
                        field: "usernameOrEmail",
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
        if (await argon2_1.default.verify(user.password, password)) {
            return {
                user: {
                    isCertified: user.isCertified,
                    username: user.username,
                },
            };
        }
        else {
            return { errors: [{ field: "unknown", message: "unknown error" }] };
        }
    }
    async register(email, username, password, { req }) {
        if (await dbConnector_1.Users.exists({ email })) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "email already used;",
                    },
                ],
            };
        }
        const user = await dbConnector_1.Users.create({
            email,
            username,
            password: await argon2_1.default.hash(password),
            isCertified: false,
        });
        try {
            user.save();
            return {
                user: {
                    isCertified: user.certificateLevel,
                    username: user.username,
                },
            };
        }
        catch (ex) {
            console.log(ex);
            return { errors: [{ field: "unknown", message: "unknown error" }] };
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => UserResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("emailOrUsername")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("username")),
    __param(2, (0, type_graphql_1.Arg)("password")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map