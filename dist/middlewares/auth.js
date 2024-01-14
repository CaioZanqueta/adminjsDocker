"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthViaQuery = exports.ensureAuth = void 0;
const jwtService_1 = require("../services/jwtService");
const userService_1 = require("../services/userService");
function ensureAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader === null || authorizationHeader === undefined) {
        return res.status(401).json({ message: 'Unauthorized: no token found' });
    }
    const token = authorizationHeader.replace(/Bearer /, '');
    jwtService_1.jwtService.verifyToken(token, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
        if (err instanceof Error || typeof decoded === 'undefined') {
            return res
                .status(401)
                .json({ message: 'Unauthorized: invalid token' });
        }
        const user = yield userService_1.userService.findByEmail(decoded.email);
        req.user = user;
        next();
    }));
}
exports.ensureAuth = ensureAuth;
function ensureAuthViaQuery(req, res, next) {
    const { token } = req.query;
    if (token === null || token === undefined) {
        return res.status(401).json({ message: 'Unauthorized: no token found' });
    }
    if (typeof token !== 'string') {
        return res
            .status(401)
            .json({ message: 'Unauthorized: token must be a string' });
    }
    jwtService_1.jwtService.verifyToken(token, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
        if (err instanceof Error || typeof decoded === 'undefined')
            return res.status(401).json({
                message: 'Unauthorized: invalid token',
            });
        const user = yield userService_1.userService.findByEmail(decoded.email);
        req.user = user;
        next();
    }));
}
exports.ensureAuthViaQuery = ensureAuthViaQuery;
