import * as express from 'express';
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import EntradaController from './controller/EntradaController';
import SaidaController from './controller/SaidaController';


const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  res.send('Bem vindo à API de estacionamento!')
})

app.listen(port, () => console.log(`Escutando na porta ${port}`))

const entradaController = new EntradaController()
const saidaController = new SaidaController()

app.get('/entrada', (req, res, next) => {
  entradaController
    .fetchAll()
    .then(entradas => res.send(entradas))  
})

app.post('/entrada', (req, res, next) => {
  const { placa, cor, modelo } = req.body

  entradaController
    .save({
      placa,
      cor,
      modelo,
      ativo: true
    })
    .then(entrada => res.send(entrada))
    .catch(e => {
      res.statusCode = 400
      res.send(e)
    })
})

app.post('/saida', (req, res, next) => {
  const { placa } = req.body
  saidaController
    .save(placa)
    .then(saida => res.send(saida))
    .catch(e => {
      res.statusCode = 400
      res.send(e)
    })
})