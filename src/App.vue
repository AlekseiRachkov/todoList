<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Создание нового списка дел</router-link> -->
      <!-- <router-link to="/alltodolist">Мои список дел</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

.container
  margin 0 auto
  width 100%
  max-width 1200px
</style>
