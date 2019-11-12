import Saida from '../model/Saida'
import EntradaController from './EntradaController'
import * as moment from 'moment'

const tabelaDePrecos = [
  2.00,
  3.00,
  2.50
]

const calculaValorEstacionamento = (hora) => {
  const agora = moment();
  const horaEntrada = moment(hora)

  const horas = agora.diff(horaEntrada, 'hours') + 1

  const diaDaSemana = agora.weekday()

  if(diaDaSemana > 0 && diaDaSemana < 6)
    return horas * tabelaDePrecos[3]

  return horas * tabelaDePrecos[0]
}

export default class SaidaController {
  public save(placa): Promise<Saida> {
    const entradaController = new EntradaController()
    return entradaController
      .fetchLastEntradaByPlaca(placa)
      .then(entrada => {
        if (!entrada) {
          return Promise.reject({ error: 'Não há nenhum veículo com essa placa no estacionamento' })
        }

        const saida = {
          entradaId: entrada.id,
          valor: calculaValorEstacionamento(entrada.hora)
        }

        return Saida
          .create(saida)
          .then(saida => {
            entradaController.deactivate(entrada.id)
            return saida
          })
      })
  }
}