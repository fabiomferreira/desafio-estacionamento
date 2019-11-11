import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db'
import Entrada from './Entrada'

export default class Saida extends Model {
  public id!: number;
  public hora!: string;
  public valor!: number;
}

Saida.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  hora: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  valor: DataTypes.DECIMAL(10, 2)
}, { tableName: 'saidas', sequelize})

Saida.belongsTo(Entrada, {as: 'entrada'})

Saida.sync()
