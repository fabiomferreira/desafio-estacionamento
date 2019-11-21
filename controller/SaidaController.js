"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Saida_1 = require("../model/Saida");
const EntradaController_1 = require("./EntradaController");
const moment = require("moment");
const sequelize_1 = require("sequelize");
const tabelaDePrecos = [
    2.00,
    3.00,
    2.50
];
const calculaValorEstacionamento = (hora) => {
    const agora = moment();
    const horaEntrada = moment(hora);
    const meioDia = moment().hour(12).minutes(0);
    const minutos = agora.diff(horaEntrada, 'minutes');
    const diaDaSemana = agora.weekday();
    let valor = 0;
    if (diaDaSemana > 0 && diaDaSemana < 6) {
        if (horaEntrada.hour() < 12 && agora.hour() > 12) {
            const minutosAteMeioDia = meioDia.diff(horaEntrada, 'minutes');
            const minutosAposMeioDia = agora.diff(meioDia, 'minutes');
            valor += minutosAteMeioDia * (tabelaDePrecos[0] / 60);
            valor += minutosAposMeioDia * (tabelaDePrecos[1] / 60);
            return valor;
        }
        return minutos * (tabelaDePrecos[1] / 60);
    }
    return minutos * (tabelaDePrecos[2] / 60);
};
class SaidaController {
    save(placa) {
        const entradaController = new EntradaController_1.default();
        return entradaController
            .fetchLastEntradaByPlaca(placa)
            .then(entrada => {
            if (!entrada) {
                return Promise.reject({ error: 'Não há nenhum veículo com essa placa no estacionamento' });
            }
            const saida = {
                entradaId: entrada.id,
                valor: calculaValorEstacionamento(entrada.hora)
            };
            return Saida_1.default
                .create(saida)
                .then(saida => {
                entradaController.deactivate(entrada.id);
                return saida;
            });
        });
    }
    gerarRelatorio(inicio, fim) {
        if (!inicio || !fim)
            return Promise.reject({ error: 'Data de início e fim são obrigatórios.' });
        if (moment(fim).diff(moment(inicio), 'days') < 0)
            return Promise.reject({ error: 'Data fim deve ser maior ou igual data início.' });
        return Saida_1.default.sum('valor', {
            where: {
                hora: { [sequelize_1.Op.between]: [inicio, fim] }
            }
        });
    }
}
exports.default = SaidaController;
//# sourceMappingURL=SaidaController.js.map