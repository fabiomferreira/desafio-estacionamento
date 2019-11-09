import Entrada from '../model/Entrada'
import { Op, fn, col } from 'sequelize'

export default class EntradaController {
  public save(entrada) {
    const errorResponse = { error: 'Placa inválida' }
    if (!/^[A-Z]{3}-\d{4}$/g.test(entrada.placa)) 
      return Promise.reject(errorResponse)

    const placaLetras = entrada.placa.slice()

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