<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="ship in starships" v-bind:key="ship.name">
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
      <ErrorIcon fillColor="red" :size="50" />
      <br />
      <button @click="retry()">
        <h4>Unable to Fetch Starships. Click To Retry</h4>
      </button>
    </div>
    <router-link to="starships">
      <button class="view-more" v-if="!loading && !loadError">View More Starships</button>
    </router-link>
  </section>
</template>

<script>
import ErrorIcon from "vue-material-design-icons/AlphaX";

export default {
  name: "Starship",
  props: {
    title: String
  },
  components: {
    ErrorIcon
  },
  data() {
    return {
      starships: [],
      loading: true,
      loadError: false
    };
  },

  methods: {
    randomImage() {
      const imgArr = [
        "/img/starship-1.jpg",
        "/img/starship-3.jpg",
        "/img/starship-2.jpg",
        "/img/starship-4.jpg",
        "/img/starship-5.jpg",
        "/img/starship-6.jpg"
      ];
      const randomImage = Math.floor(Math.random() * imgArr.length);
      return imgArr[randomImage];
    },
    retry() {
      this.loading = true;
      this.loadError = false;
      fetch("https://swapi.co/api/starships")
        .then(res => res.json())
        .then(res => {
          this.starships = res.results.splice(0, 6);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.loadError = true;
          return err;
        });
    }
  },
  created() {
    fetch("https://swapi.co/api/starships")
      .then(res => res.json())
      .then(res => {
        this.starships = res.results.splice(0, 6);
        this.loading = false;
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
  height: 20em;
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
