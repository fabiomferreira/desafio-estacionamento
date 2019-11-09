import * as express from 'express';
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import EntradaController from './controller/EntradaController';

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  res.send('Bem vindo à API de estacionamento!')
})

app.listen(port, () => console.log(`Escutando na porta ${port}`))

const entradaController = new EntradaController()

app.get('/entrada', (req, res, next) => {
  entradaController
    .fetchAll()
    .then(entradas => res.send(entradas))  
})

app.post('/entrada', (req, res, next) => {
  const { placa } = req.body
  const hora = new Date().toISOString()
  entradaController
    .save({
      placa,
      hora
    })
    .then(entrada => res.send(entrada))
})

app.post('/saida', (req, res, next) => {
  const { placa } = req.body
  entradaController
    .fetchLastEntradaByPlaca(placa)
    .then(entrada => res.send(entrada))
})