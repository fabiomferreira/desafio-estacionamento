"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres://postgres:postgres@localhost:5432/estacionamento');
exports.sequelize = sequelize;
//# sourceMappingURL=db.js.map