import { Model, DataTypes, Sequelize} from 'sequelize';
import { sequelize } from '../config/db'
import Saida from './Saida';

export default class Entrada extends Model {
  public id!: number;
  public placa!: string;
  public modelo!: string;
  public cor!: string;
  public hora!: string;
  public ativo!: boolean;
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
  hora: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  ativo: DataTypes.BOOLEAN
}, { tableName: 'entradas', sequelize})

Entrada.sync()