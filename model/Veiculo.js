"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Veiculos extends sequelize_1.Model {
}
exports.default = Veiculos;
Veiculos.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    placa: new sequelize_1.DataTypes.STRING(8),
    modelo: new sequelize_1.DataTypes.STRING(50),
    cor: new sequelize_1.DataTypes.STRING(50),
}, { tableName: 'veiculos', sequelize: db_1.sequelize, timestamps: false });
//# sourceMappingURL=Veiculo.js.map