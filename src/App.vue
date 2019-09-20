<template>
  <div id="app">
    <Jumbotron />
    <router-view />
  </div>
</template>

<script>
import Jumbotron from "./components/Jumbotron/Jumbotron.vue";
export default {
  name: "app",
  components: {
    Jumbotron
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
