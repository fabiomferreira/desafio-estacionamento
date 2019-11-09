
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db'

export default class Entrada extends Model {
  public id!: number;
  public placa!: string;
  public modelo!: string;
  public cor!: string;
  public hora!: string;
}

Entrada.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  modelo: new DataTypes.TEXT,
  cor: new DataTypes.TEXT,
  placa: new DataTypes.STRING(8),
  hora: DataTypes.TIME
}, { tableName: 'entradas', sequelize, timestamps: false })

