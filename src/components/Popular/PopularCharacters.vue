<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="character in characters" v-bind:key="character.name">
        <img :src="randomImage()" class="planet-card-image" />
        <div>
          <h2>Name Of Character</h2>
          <h5>Title of Character</h5>
          <p>{{character.gender == 'female'?'Her':'His'}} name is {{character.name}}</p>
        </div>
      </div>
    </div>
    <!-- Show Spinner if It is loading and show error if loading failed -->
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Favorite Characters</p>
    </div>
    <div v-if="loadError">
      <ErrorIcon fillColor="red" size="10em" />
      <h4>Unable to Fetch Characters</h4>
      <!-- <h4 @click="created">Click To Retry</h4> -->
    </div>
    <router-link :to="title">
      <button class="view-more" v-if="!loadError && !loading">View More Characters</button>
    </router-link>
  </section>
</template>

<script>
import ErrorIcon from "vue-material-design-icons/AlphaX";
export default {
  name: "Characters",
  props: {
    title: String
  },
  components: {
    ErrorIcon
  },

  data() {
    return {
      characters: [],
      loading: true,
      loadError: false
    };
  },
  computed: {},
  methods: {
    randomImage() {
      const imgArr = [
        "/img/character-1.jpg",
        "/img/character-3.jpg",
        "/img/character-2.jpg",
        "/img/character-4.jpg"
      ];
      const randomImage = Math.floor(Math.random() * imgArr.length);
      return imgArr[randomImage];
    }
  },
  created() {
    fetch("https://swapi.co/api/people")
      .then(res => res.json())
      .then(res => {
        this.characters = res.results.splice(0, 4);
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.log(this.loading);
        this.loadError = true;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-image {
  width: 100%;
  height: 15em;
  object-fit: unset;
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
  grid-template-columns: auto auto;
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
