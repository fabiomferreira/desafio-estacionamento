<template>
  <div class="home">
    <h1 class="title">Cadastro</h1>
    <h2 class="subtitle">Cadastre entrada e saída de veículos</h2>
    <div v-if="exibeAlerta" class="notification" :class="estadoNotificacao">
      <button class="delete" @click="exibeAlerta = false"></button>
      {{ mensagemNotificacao }}
    </div>
    <form @submit.prevent="salvar">
      <div class="control">
        <label class="radio">
          <input v-model="tipoEntrada" id="entrada" type="radio" name="tipo-entrada" value="1" />
            Entrada
        </label>
        <label class="radio">
          <input v-model="tipoEntrada" id="saida" type="radio" name="tipo-entrada" value="2" />
          Saída
        </label>
      </div>
      <div class="field">
        <label for="placa" class="label">Placa</label>
        <div class="control">
          <input id="placa" v-mask="'AAA-####'" class="input" type="text" v-model="placa" />
        </div>
      </div>
      <template v-if="tipoEntrada == 1">
        <div class="field">
          <label for="modelo" class="label">Modelo</label>
          <div class="control">
            <input id="modelo" class="input" type="text" v-model="modelo" />
          </div>
        </div>
        <div class="field">
          <label for="cor" class="label">Cor</label>
          <div class="control">
            <input id="cor" class="input" type="text" v-model="cor" />
          </div>
        </div>
      </template>
      <button class="button is-success is-pulled-right">Salvar</button>
    </form>
    <div v-if="exibeValor" class="notification is-info mensagem-valor">
      <button class="delete" @click="exibeValor = false"></button>
      Valor: {{valor}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'

export default {
  name: 'home',
  directives: {
    mask
  },
  data: () => ({
    tipoEntrada: 1,
    placa: '',
    cor: '',
    modelo: '',
    exibeValor: false,
    valor: '',
    exibeAlerta: false,
    estadoNotificacao: '',
    mensagemNotificacao: ''
  }),
  methods: {
    salvar () {
      const { placa, cor, modelo, tipoEntrada } = this

      if (parseInt(tipoEntrada) === 1) {
        if (!placa || !cor || !modelo) {
          this.exibirAlerta('Dados obrigatórios não preenchidos ou inválidos', 'danger')
          return
        }
        axios
          .post('http://localhost:3000/entrada', { placa, cor, modelo })
          .then(response => {
            this.limparForm()
            this.exibirAlerta('Veículo entrou com sucesso!', 'success')
          })
          .catch(e => {
            this.exibirAlerta(e.response.data.error, 'danger')
          })
      } else {
        if (!placa) {
          this.exibirAlerta('Dados obrigatórios não preenchidos ou inválidos', 'danger')
          return
        }
        axios
          .post('http://localhost:3000/saida', { placa })
          .then(response => {
            this.exibeValor = true
            this.valor = response.data.valor
          })
          .catch(e => {
            this.exibirAlerta(e.response.data.error, 'danger')
          })
      }
    },
    limparForm () {
      this.placa = ''
      this.cor = ''
      this.modelo = ''
    },
    exibirAlerta (mensagem, estado) {
      this.exibeAlerta = true
      this.mensagemNotificacao = mensagem
      this.estadoNotificacao = 'is-' + estado
    }
  }
}
</script>

<style lang="scss" scoped>
.mensagem-valor {
  margin-top: 4rem;
}
</style>
