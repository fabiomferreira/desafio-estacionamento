"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entrada_1 = require("../model/Entrada");
const sequelize_1 = require("sequelize");
const estaNoHorarioDeFuncionamento = () => {
    const agora = new Date();
    const hora = agora.getHours();
    if (hora < 8 || hora >= 18)
        return false;
    return true;
};
class EntradaController {
    save(entrada) {
        const placaErrorResponse = { error: 'Placa inválida.' };
        const veiculoJaEntrouErrorResponse = { error: 'Veículo já se encontra dentro do estacionamento.' };
        const foraDoHorarioErrorResponse = { error: 'Nenhum veículo pode entrar fora do horário de funcionamento.' };
        if (!/^[A-Z]{3}-\d{4}$/g.test(entrada.placa))
            return Promise.reject(placaErrorResponse);
        if (!estaNoHorarioDeFuncionamento())
            return Promise.reject(foraDoHorarioErrorResponse);
        return this.fetchLastEntradaByPlaca(entrada.placa).then(entradaAnterior => {
            if (entradaAnterior) {
                return Promise.reject(veiculoJaEntrouErrorResponse);
            }
            return Entrada_1.default.create(entrada);
        });
    }
    fetchAll() {
        return Entrada_1.default.findAll({
            where: {
                ativo: { [sequelize_1.Op.eq]: true }
            }
        });
    }
    fetchLastEntradaByPlaca(placa) {
        return Entrada_1.default.findOne({
            where: {
                placa: { [sequelize_1.Op.eq]: placa },
                ativo: { [sequelize_1.Op.eq]: true }
            },
        });
    }
    deactivate(entrada_id) {
        Entrada_1.default.update({ 'ativo': false }, {
            where: {
                id: { [sequelize_1.Op.eq]: entrada_id }
            }
        });
    }
}
exports.default = EntradaController;
//# sourceMappingURL=EntradaController.js.map