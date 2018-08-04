<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {Footer}
  }
</script>

<style>
</style>
