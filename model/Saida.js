"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Entrada_1 = require("./Entrada");
class Saida extends sequelize_1.Model {
}
exports.default = Saida;
Saida.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hora: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    valor: sequelize_1.DataTypes.DECIMAL(10, 2)
}, { tableName: 'saidas', sequelize: db_1.sequelize });
Saida.belongsTo(Entrada_1.default, { as: 'entrada' });
Entrada_1.default.sync().then(() => Saida.sync());
//# sourceMappingURL=Saida.js.map