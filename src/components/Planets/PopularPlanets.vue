<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="ship in allPlanets" v-bind:key="ship.name">
        <img :src="randomImage" class="planet-card-image" />
      </div>
    </div>
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Favorite Planets</p>
    </div>
    <div v-if="loadError">
      <img src="/img/spinner.svg" />
      <p>Unable to Fetch Planets</p>
    </div>
    <button
      class="view-more"
      @click="fetchMore()"
      v-if="!loading && this.planets.next"
    >View More Planets</button>
  </section>
</template>

<script>
export default {
  name: "Planets",
  props: {
    title: String
  },

  data() {
    return {
      planets: {},
      allPlanets: [],
      loading: true,
      loadError: false
    };
  },
  computed: {
    randomImage() {
      const imgArr = [
        "/img/planet-1.jpg",
        "/img/planet-3.jpg",
        "/img/planet-2.jpg",
        "/img/planet-4.jpg"
      ];
      const randomImage = Math.floor(Math.random() * imgArr.length);
      return require(imgArr[randomImage]);
    }
  },
  methods: {
    fetchMore() {
      this.loading = true;
      fetch(this.planets.next)
        .then(res => res.json())
        .then(res => {
          this.planets = res;
          this.allPlanets.push(...res.results);
          console.log(this.allPlanets);
          console.log(res);
          this.loading = false;
        });
    }
  },
  created() {
    fetch("https://swapi.co/api/planets")
      .then(res => res.json())
      .then(res => {
        this.planets = res;
        this.allPlanets.push(...res.results);
        console.log(this.allPlanets);
        console.log(res);
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-image {
  width: 100%;
  height: 15em;
  /* object-fit: unset; */
}
.planet-card-image {
  width: 100%;
  height: 100%;
}
.card-div {
  margin: 2em;
  background-color: #d8d8d8;
}
.card-container {
  display: grid;
  grid-template-columns: auto auto auto;
  width: 90%;
  margin: auto;
}
.content {
  text-align: justify;
  position: relative;
  left: 10px;
  bottom: 0.4em;
  background-color: #f2f2f2;
  padding: 1em 2em 1em 1em;
}
.popular-section-header {
  text-align: center;
  margin: auto;
  font-size: 3em;
}
h3 {
  text-align: left;
  margin: auto 1em;
}
.read-more {
  padding: 0.8em 2em;
  max-width: 5em;

  /* margin: 2em; */
  background-color: #d8d8d8;
}
.view-more {
  padding: 0.8em 2em;
  background-color: #d8d8d8;
}
</style>
