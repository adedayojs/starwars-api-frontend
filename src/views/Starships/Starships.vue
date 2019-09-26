<template>
  <section>
    <Header v-on:searcher="searchHandler" />
    <h1 class="popular-section-header">{{title}}</h1>

    <div class="card-container">
      <div class="card-div" v-for="ship in filteredStarships" v-bind:key="ship.name">
        <img class="card-image" :src="randomImage()" />
        <div class="content">
          <div>
            <h3>{{ship.name}}</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
          </div>
          <router-link class="link read-more" :to="`/starships/${ship.name}`">
            <div>Read More --></div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Favorite Starships</p>
    </div>

    <div v-if="loadError">
      <ErrorIcon fillColor="red" :size="50" />
      <br />
      <button @click="retry()">
        <h4>Unable to Fetch Starships. Click To Retry</h4>
      </button>
    </div>

    <div style="margin:5em" v-if="!loading && !loadError">
      <span style="margin-right:1em;">{{start}} - {{end}} of {{starships.count}}</span>
      <button class="view-more">
        <span
          v-if="starships.previous"
          style="border-right:solid 2px #000"
          @click="previousItem()"
        >Prev</span>
        <span v-if="starships.next" @click="nextItem()">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import ErrorIcon from "vue-material-design-icons/AlphaX";
import Header from "../Header";

export default {
  name: "Starship",
  props: {
    title: String
  },
  components: {
    ErrorIcon,
    Header
  },
  data() {
    return {
      starships: [],
      loading: true,
      loadError: false,
      start: 1,
      end: 0,

      filteredStarships: [],
      currentSearch: ""
    };
  },

  methods: {
    randomImage() {
      const imgArr = [
        "/img/starship-1.jpg",
        "/img/starship-3.jpg",
        "/img/starship-2.jpg",
        "/img/starship-4.jpg"
      ];
      const randomImage = Math.floor(Math.random() * imgArr.length);
      return imgArr[randomImage];
    },
    nextItem() {
      this.loading = true;
      this.loadError = false;
      fetch(this.starships.next)
        .then(res => res.json())
        .then(res => {
          this.start = this.end + 1;
          this.end += res.results.length;
          this.starships = res;
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
      this.filteredStarships = []; // Empty Filtered Array
      this.loading = true;
      this.loadError = false;
      fetch(this.starships.previous)
        .then(res => res.json())
        .then(res => {
          if (!this.starships.next) {
            this.end = res.count - this.starships.results.length;
            this.start -= res.results.length;
            this.starships = res;
            this.loading = false;
            this.searchHandler(this.currentSearch); // Filter again based on input and current response
          } else {
            this.start -= res.results.length;
            this.end -= res.results.length;
            this.starships = res;
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
      fetch("https://swapi.co/api/starships")
        .then(res => res.json())
        .then(res => {
          this.starships = res;
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
      let matcher = new RegExp(search, "i");
      this.filteredStarships = this.starships.results.filter(val =>
        val.name.match(matcher)
      );
      this.currentSearch = search;
    }
  },

  created() {
    this.currentSearch = this.$route.query.query || ""; // get query passed down so that we can use them to filter results
    fetch("https://swapi.co/api/starships")
      .then(res => res.json())
      .then(res => {
        this.starships = res;
        this.loading = false;
        this.end = res.results.length;
        this.searchHandler(this.currentSearch); // Filter again based on input and current response
      })
      .catch(err => {
        this.loading = false;
        this.loadError = true;
        return err;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-image {
  width: 100%;
  height: 15em;
}
.card-div {
  margin: 2em;
  background-color: #d8d8d8;
}
.card-container {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  width: 90%;
  margin: auto;
}
.content {
  display: flex;
  flex-direction: column;
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
  padding: 1em;
  max-width: 5em;
  align-self: flex-end;
  background-color: #d8d8d8;
  flex-basis: auto;
  max-width: max-content;
}
.link {
  text-decoration: none;
  color: rgb(3, 3, 3);
  font-weight: 900;
}
.link:hover {
  color: #fff;
  box-shadow: 1em 1em 1em;
  background-color: #000;
  transform: scale(1.1);
  transition: all ease-in-out 1s;
}

/********** Loader Buttons**********/
.view-more {
  padding: 0.5em 0em;
  background-color: #fff;
  border: solid #000 2px;
  border-radius: 7px;
  font-size: 1em;
  cursor: pointer;
  font-weight: 900;
  overflow: hidden;
}
.view-more span:hover {
  background-color: #000;
  color: #fff;
  transition: ease-in-out 0.5s;
}
.view-more span {
  padding: 0.5em 2em;
}
h4 {
  font-size: 1em;
  color: red;
}
span {
  padding: 0.3em;
  font-size: 1em;
}
button span:hover {
  box-shadow: #d8d8d8 2px 2px 0.3em;
  background: #f2f2f2;
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
