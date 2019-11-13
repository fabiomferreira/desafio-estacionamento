<template>
  <div id="relatorio">
    <h1 class="title">Relatório de Faturamento</h1>
    <h2 class="subtitle">Gerar relatório de faturamento por período</h2>
    <form @submit.prevent="gerarRelatorio">
      <div class="field">
        <label for="inicio" class="label">Início</label>
        <div class="control">
          <input v-model="inicio" id="inicio" type="date" class="input">
        </div>
      </div>
      <div class="field">
        <label for="fim" class="label">Fim</label>
        <div class="control">
          <input v-model="fim" id="fim" type="date" class="input">
        </div>
      </div>
      <button class="button is-success is-pulled-right">Gerar Relatório</button>
    </form>
    <div v-if="valor" class="notification is-primary">
      <strong>Faturamento</strong>: {{valor}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Relatorio',
  data: () => ({
    inicio: '',
    fim: '',
    valor: ''
  }),
  methods: {
    gerarRelatorio () {
      const { inicio, fim } = this
      const params = { inicio, fim }
      axios
        .get('http://localhost:3000/saida', { params })
        .then(response => {
          this.valor = response
            .data
            .valor
            .toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              currency: 'BRL'
            })
        })
        .catch(e => alert(e.response.data.error))
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  margin-top: 4rem;
}
</style>
