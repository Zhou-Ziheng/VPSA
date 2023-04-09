"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = exports.PORT = void 0;
exports.PORT = 8080;
exports.environment = {
    development: {
        serverURL: `http://localhost:${exports.PORT}/`,
        dbString: "mongodb://localhost:27017/vpsa",
    },
    production: {
        serverURL: `http://localhost:${exports.PORT}/`,
        dbString: "mongodb://localhost:27017/vpsa-prod",
    },
};
//# sourceMappingURL=app-config.js.map