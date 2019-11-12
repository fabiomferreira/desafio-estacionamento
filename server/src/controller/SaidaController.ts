import Saida from '../model/Saida'
import EntradaController from './EntradaController'
import * as moment from 'moment'
import { Op } from 'sequelize'

const tabelaDePrecos = [
  2.00,
  3.00,
  2.50
]

const calculaValorEstacionamento = (hora) => {
  const agora = moment();
  const horaEntrada = moment(hora)
  const meioDia = moment().hour(12).minutes(0)
  const minutos = agora.diff(horaEntrada, 'minutes')
  const diaDaSemana = agora.weekday()
  let valor = 0

  if(diaDaSemana > 0 && diaDaSemana < 6) {
    if (horaEntrada.hour() < 12 && agora.hour() > 12) {
      const minutosAteMeioDia = meioDia.diff(horaEntrada, 'minutes')
      const minutosAposMeioDia = agora.diff(meioDia, 'minutes')
      valor += minutosAteMeioDia * (tabelaDePrecos[0] / 60)
      valor += minutosAposMeioDia * (tabelaDePrecos[1] / 60)
      return valor
    }
    return minutos * tabelaDePrecos[1]
  }

  return minutos * (tabelaDePrecos[2] / 60)
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

  public gerarRelatorio(inicio, fim) {
    return Saida.sum('valor',{
      where:{
        hora: {[Op.between]: [inicio, fim]}
      }
    })
  }
}