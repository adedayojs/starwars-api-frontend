<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="ship in planets" v-bind:key="ship.name">
        <img :src="randomImage()" class="planet-card-image" />
      </div>
    </div>
    <!-- Show Spinner if It is loading and show error if loading failed -->
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Favorite Planets</p>
    </div>
    <div v-if="loadError">
      <ErrorIcon fillColor="red" :size="5" />
      <br />
      <button @click="retry()">
        <h4>Unable to Fetch Planets. Click To Retry</h4>
      </button>
    </div>
    <router-link to="planets">
      <button class="view-more" v-if="!loading && !loadError">View More Planets</button>
    </router-link>
  </section>
</template>

<script>
import ErrorIcon from "vue-material-design-icons/AlphaX";
export default {
  name: "Planets",
  props: {
    title: String
  },
  components: {
    ErrorIcon
  },

  data() {
    return {
      planets: {},
      loading: true,
      loadError: false
    };
  },
  computed: {},
  methods: {
    randomImage() {
      const imgArr = [
        "/img/planet-1.jpg",
        "/img/planet-3.jpg",
        "/img/planet-2.jpg"
      ];
      const randomImage = Math.floor(Math.random() * imgArr.length);
      return imgArr[randomImage];
    },
    retry() {
      fetch("https://swapi.co/api/planets")
        .then(res => res.json())
        .then(res => {
          this.planets = res.results.splice(0, 3);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.loadError = true;
        });
    }
  },
  created() {
    fetch("https://swapi.co/api/planets")
      .then(res => res.json())
      .then(res => {
        this.planets = res.results.splice(0, 3);
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.loadError = true;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 400px) {
  .card-container {
    display: block;
    width: 90%;
    margin: auto;
  }
}
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
  margin: 1em auto;
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
  padding: 0.8em 5em;
  background-color: #fff;
  border: solid #000 2px;
  border-radius: 7px;
  font-size: 1.5em;
  cursor: pointer;
}
h4 {
  font-size: 1em;
  color: red;
}
</style>
