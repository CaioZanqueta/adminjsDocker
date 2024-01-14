"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const adminjs_1 = require("./adminjs");
const database_1 = require("./database");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(adminjs_1.adminJs.options.rootPath, adminjs_1.adminJsRouter);
app.use((0, cors_1.default)());
app.use(routes_1.router);
const PORT = process.env.API_PORT;
app.listen(PORT, () => {
    console.log('Starting database connection...');
    database_1.database
        .authenticate()
        .then(() => {
        console.log('DB connection successful.');
    })
        .catch((error) => {
        console.error('DB connection failed.', error);
    });
    console.log(`Server started successfuly at port ${PORT}.`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    console.log(`Admin panel available at http://localhost:${PORT}/admin`);
});
