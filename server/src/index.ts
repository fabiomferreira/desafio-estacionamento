import * as express from 'express';
import EntradaController from './controller/EntradaController';
import SaidaController from './controller/SaidaController';

process.env.TZ = 'Pacific/Honolulu'

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



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