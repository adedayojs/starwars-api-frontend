<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="planet in planets" v-bind:key="planet.name">
        <img :src="randomImage()" class="planet-card-image" />
        <h2 >{{planet.name}}</h2>
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
.card-div h2 {
 position: relative;
 top:-3.5em;
 color: #f2f2f2

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
}
.card-container {
  display: grid;
  grid-template-columns: 33% 33% 33%;
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

/********** Loader Buttons**********/
.view-more {
  padding: 0.5em 2em;
  background-color: #fff;
  border: solid #000 2px;
  border-radius: 7px;
  font-size: 1em;
  cursor: pointer;
  font-weight: 900;
}
.view-more:hover {
  background-color: #000;
  color: #fff;
  transition: ease-in-out 0.5s;
}

h4 {
  font-size: 1em;
  color: red;
}

@media screen and (min-width: 700px) {
  .card-container {
    grid-template-columns: 50% 50%;
    width: 90%;
    margin: auto;
  }
}
@media screen and (min-width: 1200px) {
  .card-container {
    grid-template-columns: 33% 33% 33%;
    width: 90%;
    margin: auto;
  }
}

@media screen and (max-width: 850px) {
  .card-container {
    display: block;
    width: 90%;
    margin: auto;
  }
}
</style>
