"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminJsResources = void 0;
const models_1 = require("../../models");
const user_1 = require("./user");
exports.adminJsResources = [
    {
        resource: models_1.User,
        options: user_1.userResourceOptions,
    },
];
