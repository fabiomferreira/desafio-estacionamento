import Saida from '../model/Saida'
import EntradaController from './EntradaController'

const tabelaDePrecos = [
  2.00,
  3.00,
  2.50
]

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
          hora: new Date().toISOString(),
          entradaId: entrada.id
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