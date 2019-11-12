<template>
  <div id="app">
    <nav id="nav" role="navigation" class="navbar">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>
        </div>
      </div>
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
