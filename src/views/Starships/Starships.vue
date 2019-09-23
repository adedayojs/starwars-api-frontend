<template>
  <section>
    <Header />
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="ship in allStarships" v-bind:key="ship.name">
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
      <img src="/img/assets/spinner.svg" />
      <p>Loading Your Favorite Starships</p>
    </div>
    <div v-if="loadError">
      <Icon fillColor="red" size="10em" />
      <!-- <img src="/img/load-failed.svg" /> -->
      <h4>Unable to Fetch Starship</h4>
    </div>
    <button
      class="view-more"
      @click="fetchMore()"
      v-if="!loading && this.starships.next"
    >VIEW MORE STARSHIPS</button>
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
      starships: {},
      allStarships: [],
      loading: true,
      loadError: false
    };
  },

  methods: {
    randomImage() {
      const imgArr = [
        "/img/assets/starship-1.jpg",
        "/img/assets/starship-3.jpg",
        "/img/assets/starship-2.jpg",
        "/img/assets/starship-4.jpg"
      ];
      const randomImage = Math.floor(Math.random() * imgArr.length);
      return imgArr[randomImage];
    },
    fetchMore() {
      this.loading = true;
      this.loadError = false;
      fetch(this.starships.next)
        .then(res => res.json())
        .then(res => {
          this.starships = res;
          this.allStarships.push(...res.results);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.loadError = true;
        });
    }
  },
  created() {
    fetch("https://swapi.co/api/starships")
      .then(res => res.json())
      .then(res => {
        this.starships = res;
        this.allStarships.push(...res.results);
        console.log(this.allStarships);
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
  /* float: right; */

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
