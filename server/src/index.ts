import * as express from 'express';
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Escutando na porta ${port}`))

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/estacionamento');

class Entrada extends Model {
  public id!: number; 
  public placa!: string;
  public hora: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Entrada.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  placa: new DataTypes.STRING(8),
  hora: DataTypes.TIME
}, {tableName: 'entradas', sequelize, timestamps: false})

Entrada.findAll().then(c => console.log(c))

