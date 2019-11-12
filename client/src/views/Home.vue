<template>
  <div class="home">
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
      <button class="button is-success">Salvar</button>
    </form>
    <div v-if="exibeValor" class="notification is-info">
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
    valor: ''
  }),
  methods: {
    salvar () {
      const { placa, cor, modelo, tipoEntrada } = this

      if (parseInt(tipoEntrada) === 1) {
        if (!placa || !cor || !modelo) {
          alert('Dados obrigatórios não preenchidos ou inválidos')
          return
        }
        axios
          .post('http://localhost:3000/entrada', { placa, cor, modelo })
          .then(response => {
            this.limparForm()
            alert('Veículo entrou com sucesso!')
          })
          .catch(e => alert(e.response.data.error))
      } else {
        if (!placa) {
          alert('Dados obrigatórios não preenchidos ou inválidos')
          return
        }
        axios
          .post('http://localhost:3000/saida', { placa })
          .then(response => {
            this.exibeValor = true
            this.valor = response.data.valor
          })
          .catch(e => alert(e.response.data.error))
      }
    },
    limparForm () {
      this.placa = ''
      this.cor = ''
      this.modelo = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  margin-top: 1rem;
}
</style>
