"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Veiculo_1 = require("../model/Veiculo");
class EntradaController {
    save(veiculo) {
        return Veiculo_1.default.create(veiculo);
    }
    fetchAll() {
        return Veiculo_1.default.findAll();
    }
}
exports.default = EntradaController;
//# sourceMappingURL=VeiculoController.js.map