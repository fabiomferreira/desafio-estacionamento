import Entrada from '../model/Entrada'
import { Op, fn, col } from 'sequelize'

const horarioAbertura = 8
const horarioFechamento = 18

const estaNoHorarioDeFuncionamento = () => {
  const agora = new Date()
  const hora = agora.getHours()

  if(hora < 8 || hora >= 18)
    return false

  return true
}
export default class EntradaController {
  public save(entrada): Promise<Entrada> {
    const placaErrorResponse = { error: 'Placa inválida.' }
    const veiculoJaEntrouErrorResponse = { error: 'Veículo já se encontra dentro do estacionamento.' }
    const foraDoHorarioErrorResponse = { error: 'Nenhum veículo pode entrar fora do horário de funcionamento.' }

    if (!/^[A-Z]{3}-\d{4}$/g.test(entrada.placa))
      return Promise.reject(placaErrorResponse)

    if(!estaNoHorarioDeFuncionamento())
      return Promise.reject(foraDoHorarioErrorResponse)

    return this.fetchLastEntradaByPlaca(entrada.placa).then(entradaAnterior => {
      if (entradaAnterior) {
        return Promise.reject(veiculoJaEntrouErrorResponse)
      }

      return Entrada.create(entrada)
    })

  }

  public fetchAll() {
    return Entrada.findAll()
  }

  public fetchLastEntradaByPlaca(placa): Promise<Entrada> {
    return Entrada.findOne({
      where: {
        placa: { [Op.eq]: placa },
        ativo: { [Op.eq]: true }
      },
    })
  }

  public deactivate(entrada_id) {
    Entrada.update({ 'ativo': false }, {
      where: {
        id: { [Op.eq]: entrada_id }
      }
    })
  }

}