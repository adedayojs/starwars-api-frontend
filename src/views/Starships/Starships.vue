<template>
  <section>
    <Header />
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="ship in starships.results" v-bind:key="ship.name">
        <img class="card-image" :src="randomImage()" />
        <div class="content">
          <div>
            <h3>{{ship.name}}</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
          </div>
          <div class="read-more">Read More</div>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Favorite Starships</p>
    </div>
    <div v-if="loadError">
      <Icon fillColor="red" size="10em" />
      <!-- <img src="/img/load-failed.svg" /> -->
      <h4>Unable to Fetch Starship</h4>
    </div>
    <div style="margin:5em" v-if="!loading && this.starships.next">
      <span style="margin-right:1em;">{{this.start}} - {{this.end}} of {{this.starships.count}}</span>
      <button class="view-more">
        <span style="border-right:solid 2px #d8d8d8" @click="previousItem()">Prev</span>
        <span @click="nextItem()">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import Icon from "vue-material-design-icons/AlphaX";
import Header from "../Header";

export default {
  name: "Starship",
  props: {
    title: String
  },
  components: {
    Icon,
    Header
  },
  data() {
    return {
      starships: [],
      loading: true,
      loadError: false,
      start: 1,
      end: 0
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
          this.start += res.results.length;
          this.end += res.results.length;
          this.starships = res;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.loadError = true;
          return err;
        });
    },
    previousItem() {}
  },
  created() {
    fetch("https://swapi.co/api/starships")
      .then(res => res.json())
      .then(res => {
        this.starships = res;
        this.loading = false;
        this.end = res.results.length;
      })
      .catch(err => {
        this.loading = false;
        this.loadError = true;
        return err;
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
  margin: auto;
  background-color: #d8d8d8;
}
.view-more {
  padding: 0.5em 0em;
  background-color: #fff;
  border: solid #d8d8d8 2px;
  border-radius: 7px;
  font-size: 1em;
  cursor: pointer;
}
h4 {
  font-size: 1em;
  color: red;
}
span {
  padding: 0.3em;
  font-size: 2em;
}
button span:hover {
  box-shadow: #d8d8d8 2px 2px 0.3em;
  background: #f2f2f2;
}
</style>
