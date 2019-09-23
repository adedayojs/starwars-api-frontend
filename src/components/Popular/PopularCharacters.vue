<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="character in characters" v-bind:key="character.name">
        <img :src="randomImage()" class="planet-card-image" />
        <div class="info">
          <h2>{{character.name}}</h2>
          <span>Title of Character</span>
          <p>
            {{character.gender == 'male'?'His':'Her'}} name is {{character.name}}. {{character.gender == 'male'?'He':'She'}} was born in {{character.birth_year}}. {{character.gender == 'male'?'His':'Her'}} height is {{character.height}}cm. {{character.gender == 'male'?'He':'She'}} has a mass of {{character.mass}}kg. {{character.gender == 'male'?'His':'Her'}} skin color is {{character.skin_color}} and eyecolor is {{character.eye_color}}.<br><br>
            {{character.name}} has {{character.vehicles.length>0?character.vehicles.length:'No'}} Vehicle and has {{character.starships.length>0?character.starships.length:'No'}} starships
            <router-link :to="`${title}/`" style="color:black; font-weight:800;">Read More</router-link>
          </p>
        </div>
      </div>
    </div>
    <!-- Show Spinner if It is loading and show error if loading failed -->
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Favorite Characters</p>
    </div>
    <div v-if="loadError">
      <ErrorIcon fillColor="red" size="5em" />
      <br />
      <button @click="retry()">
        <h4>Unable to Fetch Characters. Click To Retry</h4>
      </button>
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
    },
    retry() {
      this.loading = true;
      this.loadError = false;
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
}
.planet-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-div {
  margin: 2em;
  background-color: #d8d8d8;
  height: 30em;
  display: grid;
  grid-template-columns: 60% 40%;
}
.info {
  padding: 5em 1em;
  text-align: left;
}
h2 {
  margin: 0;
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
