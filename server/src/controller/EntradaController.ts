import Entrada from '../model/Entrada'
import { Op, fn, col } from 'sequelize'

export default class EntradaController {
  public save(entrada) {
    return Entrada.create(entrada)
  }

  public fetchAll() {
    return Entrada.findAll()
  }

  public fetchLastEntradaByPlaca(placa) {
    return Entrada.findAll({ 
      where: { 
        placa: { [Op.eq]: placa },

      },
      order: [
        [fn('max', col('hora')), 'DESC'],
      ],
      group: ['id'],
      limit: 1
    })
  }

}