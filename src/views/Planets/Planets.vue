<template>
  <section>
    <Header />

    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="planet in allPlanets" v-bind:key="planet.name">
        <img :src="randomImage()" class="planet-card-image" />
        <h2 >Name: {{planet.name}}<br/>Climate: {{planet.climate}} <br/> Diameter: {{planet.diameter}} </h2>
      </div>
    </div>
    <!-- Show Spinner if It is loading and show error if loading failed -->
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Favorite Planets</p>
    </div>
    <div v-if="loadError">
      <Icon fillColor="red" size="10em" />
      <!-- <img src="/img/load-failed.svg" /> -->
      <h4>Unable to Fetch Planets</h4>
    </div>
    <button
      class="view-more"
      @click="fetchMore()"
      v-if="!loading && this.planets.next"
    >View More Planets</button>
  </section>
</template>

<script>
import Icon from "vue-material-design-icons/AlphaX";
import Header from "../Header";

export default {
  name: "Planets",
  props: {
    title: String
  },
  components: {
    Icon,
    Header
  },

  data() {
    return {
      planets: {},
      allPlanets: [],
      loading: true,
      loadError: false
    };
  },
  computed: {},
  methods: {
    fetchMore() {
      this.loadError = false;
      this.loading = true;
      fetch(this.planets.next)
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
          this.loadError = true;
        });
    },
    randomImage() {
      const imgArr = [
        "/img/planet-1.jpg",
        "/img/planet-3.jpg",
        "/img/planet-2.jpg"
      ];
      const randomImage = Math.floor(Math.random() * imgArr.length);
      console.log(randomImage);
      return imgArr[randomImage];
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
        this.loadError = true;
      });
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-div h2 {
 position: relative;
 bottom:6em;
 color: #f2f2f2;
 font-size: 1.2em;

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
