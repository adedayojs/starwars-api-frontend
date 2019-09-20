<template>
  <div id="app">
    <Jumbotron />
    <Starships title="Starships" />
    <Planets title="Planets" />
  </div>
</template>

<script>
import Jumbotron from "../Jumbotron.vue";
import Starships from "../Popular/PopularStarships";
import Planets from "../Popular/PopularPlanets";

export default {
  name: "app",
  components: {
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
