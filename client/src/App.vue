<template>
  <div id="app">
    <nav id="nav" role="navigation" class="navbar">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/relatorio">Relatório</router-link>
    </nav>
    <div class="container is-fluid">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';

#nav {
  a {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
