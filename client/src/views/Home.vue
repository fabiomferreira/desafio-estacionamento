<template>
  <div class="home">
    <form @submit.prevent="salvar">
      <input v-model="tipoEntrada" id="entrada" type="radio" name="tipo-entrada" value="1" />
      <label for="entrada">
        Entrada
      </label>
      <input v-model="tipoEntrada" id="saida" type="radio" name="tipo-entrada" value="2" />
      <label for="saida">
        Saída
      </label>
      <div class="field">
        <label for="placa" class="label">Placa</label>
        <div class="control">
          <input id="placa" class="input" type="text" v-model="placa" />
        </div>
      </div>
      <template v-if="tipoEntrada == 1">
        <div class="field">
          <label for="cor" class="label">Cor</label>
          <div class="control">
            <input id="cor" class="input" type="text" v-model="cor" />
          </div>
        </div>
        <div class="field">
          <label for="modelo" class="label">Modelo</label>
          <div class="control">
            <input id="modelo" class="input" type="text" v-model="modelo" />
          </div>
        </div>
      </template>
      <button class="button is-success">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data: () => ({
    tipoEntrada: 1,
    placa: '',
    cor: '',
    modelo: ''
  }),
  methods: {
    salvar () {
      const { placa, cor, modelo } = this
      if (!placa || !cor || !modelo) alert('Dados obrigatórios não preenchidos ou inválidos')

      axios.post('localhost:3000/entrada', { placa, cor, modelo })
    }
  }
}
</script>
