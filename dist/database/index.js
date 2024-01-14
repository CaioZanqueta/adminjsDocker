"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
exports.database = new sequelize_1.Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false,
    define: {
        underscored: true,
        timestamps: true,
        paranoid: true,
    },
});
