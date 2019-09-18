<template>
  <div id="app">
    <Jumbotron />
    <Starships title="Starships" />
    <Planets title="Planets" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Jumbotron from "./components/Jumbotron/Jumbotron.vue";
import Starships from "./components/PopularStarships/Popular.vue";
import Planets from "./components/Planets/PopularPlanets.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
    Jumbotron,
    Starships,
    Planets
  },
  methods: {},
  data: function() {
    return {};
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
