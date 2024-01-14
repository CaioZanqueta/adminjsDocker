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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FILEPATH: /c:/Users/alexa/Documents/Alexandre/Code/express-sequelize-adminjs-swagger/tests/routes.spec.ts
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const models_1 = require("../models");
const mocha_1 = require("mocha");
const server_1 = require("../server");
const testUser = {
    firstName: 'Test',
    lastName: 'User',
    phone: '000-0000',
    birth: '1990-01-01',
    email: 'testuser@email.com',
    password: '123456',
};
describe('POST /auth/register', () => {
    // delete test user
    (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.User.destroy({
            where: { email: testUser.email },
            force: true,
        });
    }));
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post('/auth/register').send(testUser);
        (0, chai_1.expect)(res.statusCode).equal(201);
        (0, chai_1.expect)(res.body).to.have.property('id');
        (0, chai_1.expect)(res.body).to.have.property('firstName');
        (0, chai_1.expect)(res.body).to.have.property('lastName');
        (0, chai_1.expect)(res.body).to.have.property('phone');
        (0, chai_1.expect)(res.body).to.have.property('birth');
        (0, chai_1.expect)(res.body).to.have.property('email');
        (0, chai_1.expect)(res.body).to.have.property('password');
        (0, chai_1.expect)(res.body).to.have.property('role');
        (0, chai_1.expect)(res.body).to.have.property('updatedAt');
        (0, chai_1.expect)(res.body).to.have.property('createdAt');
    }));
    it('should return 409 if email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post('/auth/register').send(testUser);
        (0, chai_1.expect)(res.statusCode).equal(409);
    }));
});
describe('POST /auth/login', () => {
    it('should authenticate a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post('/auth/login').send({
            email: testUser.email,
            password: testUser.password,
        });
        (0, chai_1.expect)(res.statusCode).equal(200);
        (0, chai_1.expect)(res.body).to.have.property('authenticated');
        (0, chai_1.expect)(res.body).to.have.property('id');
        (0, chai_1.expect)(res.body).to.have.property('firstName');
        (0, chai_1.expect)(res.body).to.have.property('email');
        (0, chai_1.expect)(res.body).to.have.property('token');
    }));
    it('should return 404 if email is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post('/auth/login').send({
            email: 'fake@email.com',
            password: testUser.password,
        });
        (0, chai_1.expect)(res.statusCode).equal(404);
    }));
});
