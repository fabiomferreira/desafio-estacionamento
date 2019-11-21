"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Entrada extends sequelize_1.Model {
}
exports.default = Entrada;
Entrada.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    modelo: new sequelize_1.DataTypes.TEXT,
    cor: new sequelize_1.DataTypes.TEXT,
    placa: new sequelize_1.DataTypes.STRING(8),
    hora: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ativo: sequelize_1.DataTypes.BOOLEAN
}, { tableName: 'entradas', sequelize: db_1.sequelize });
//# sourceMappingURL=Entrada.js.map