"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const timeout = process.env.JWT_TIMEOUT;
exports.jwtService = {
    signPayload: (payload) => {
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: timeout });
    },
    verifyToken: (token, callbackfn) => {
        jsonwebtoken_1.default.verify(token, secret, callbackfn);
    },
};
