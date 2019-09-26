<template>
  <section>
    <Header v-on:searcher="searchHandler" />
    <h1 class="popular-section-header">{{title}}</h1>

    <div class="card-container">
      <div class="card-div" v-for="character in filteredCharacters" v-bind:key="character.name">
        <img :src="randomImage()" class="planet-card-image" />
        <div class="info">
          <h2>{{character.name}}</h2>
          <span>Title of Character</span>
          <p>
            {{character.gender == 'male'?'His':'Her'}} name is {{character.name}}. {{character.gender == 'male'?'He':'She'}} was born in {{character.birth_year}}. {{character.gender == 'male'?'His':'Her'}} height is {{character.height}}cm. {{character.gender == 'male'?'He':'She'}} has a mass of {{character.mass}}kg. {{character.gender == 'male'?'His':'Her'}} skin color is {{character.skin_color}} and eyecolor is {{character.eye_color}}.
            <br />
            <br />
            {{character.name}} has {{character.vehicles.length>0?character.vehicles.length:'No'}} Vehicle and has {{character.starships.length>0?character.starships.length:'No'}} starships
            <router-link
              :to="`${title}/${character.name}`"
              style="color:black; font-weight:800;"
            >Read More</router-link>
          </p>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Favorite Characters</p>
    </div>

    <div v-if="loadError">
      <ErrorIcon fillColor="red" :size="50" />
      <br />
      <button @click="retry()">
        <h4>Unable to Fetch Characters. Click To Retry</h4>
      </button>
    </div>

    <div style="margin:5em" v-if="!loading && !loadError">
      <span style="margin-right:1em;">{{start}} - {{end}} of {{characters.count}}</span>
      <button class="view-more">
        <span
          v-if="characters.previous"
          style="border-right:solid 2px #d8d8d8"
          @click="previousItem()"
        >Prev</span>
        <span v-if="characters.next" @click="nextItem()">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import ErrorIcon from "vue-material-design-icons/AlphaX";
import Header from "../Header";

export default {
  name: "Character",
  props: {
    title: String
  },
  components: {
    ErrorIcon,
    Header
  },
  data() {
    return {
      characters: [],
      loading: true,
      loadError: false,
      start: 1,
      end: 0,

      filteredCharacters: [],
      currentSearch: ""
    };
  },

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
    nextItem() {
      this.loading = true;
      this.loadError = false;
      fetch(this.characters.next)
        .then(res => res.json())
        .then(res => {
          this.start = this.end + 1;
          this.end += res.results.length;
          this.characters = res;
          this.loading = false;
          this.searchHandler(this.currentSearch); // Filter again based on current input and current response
        })
        .catch(err => {
          this.loading = false;
          this.loadError = true;
          console.log(err);
          return err;
        });
    },
    previousItem() {
      this.filteredCharacters = []; // Empty Filtered Array
      this.loading = true;
      this.loadError = false;
      fetch(this.characters.previous)
        .then(res => res.json())
        .then(res => {
          if (!this.characters.next) {
            this.end = res.count - this.characters.results.length;
            this.start -= res.results.length;
            this.characters = res;
            this.loading = false;
            this.searchHandler(this.currentSearch); // Filter again based on input and current response
          } else {
            this.start -= res.results.length;
            this.end -= res.results.length;
            this.characters = res;
            this.loading = false;
            this.searchHandler(this.currentSearch); // Filter again based on input and current response
          }
        })
        .catch(err => {
          this.loading = false;
          this.loadError = true;
          return err;
        });
    },
    retry() {
      this.loading = true;
      this.loadError = false;
      fetch("https://swapi.co/api/people")
        .then(res => res.json())
        .then(res => {
          this.characters = res;
          this.loading = false;
          this.end = res.results.length;
          this.start = 1;
        })
        .catch(err => {
          this.loading = false;
          this.loadError = true;
          return err;
        });
    },
    searchHandler(search) {
      this.filteredCharacters = this.characters.results.filter(val =>
        val.name.match(search)
      );
      this.currentSearch = search;
    }
  },

  created() {
    fetch("https://swapi.co/api/people")
      .then(res => res.json())
      .then(res => {
        this.characters = res;
        this.loading = false;
        this.end = res.results.length;

        this.filteredCharacters = this.characters.results;
      })
      .catch(err => {
        this.loading = false;
        this.loadError = true;
        return err;
      });
  },
  mounted() {
    console.log(this.searchHandler);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.planet-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-container {
  display: block;
  width: 90%;
  margin: auto;
}
.card-div {
  margin: auto auto 2em auto;
  background-color: #d8d8d8;
  height: auto;
  display: flex;
  flex-direction: column;
}
.info {
  padding: 5em 1em;
  text-align: left;
}
.info h2 {
  margin: 0;
}
.info span,
.info p {
  font-size: 1.3em;
}

.popular-section-header {
  text-align: center;
  margin: 1em auto;
  font-size: 3em;
}

.view-more {
  padding: 0.8em 5em;
  background-color: #fff;
  border: solid #000 2px;
  border-radius: 7px;
  font-size: 1.5em;
  cursor: pointer;
  font-weight: 900;
}
.view-more:hover {
  background-color: #000;
  color: #fff;
  /* font-weight: 700; */
  transition: ease-in-out 1.2s;
}
h4 {
  font-size: 1em;
  color: red;
}
@media screen and (min-width: 1000px) {
  .card-container {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 90%;
    /* margin: auto; */
  }
  .card-div {
    margin: 1em 1em;
    background-color: #d8d8d8;
    display: grid;
    grid-template-columns: 60% 40%;
  }
  .info {
    padding: 5em 1em;
    text-align: left;
    font-size: 0.7em
  }
  .info h2 {
    margin: 0;
  }

}
@media screen and (min-width: 1200px) {
  .card-container {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 90%;
  }
  .card-div {
    margin: 2em 1em;
    background-color: #d8d8d8;
    display: grid;
    grid-template-columns: 60% 40%;
  }
  .info {
    padding: 5em 1em;
    text-align: left;
    font-size: 1em;

  }
  .info h2 {
    margin: 0;
  }
 
}
</style>
