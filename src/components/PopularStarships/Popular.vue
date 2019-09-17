<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div v-if="loading">
      <img src="../../assets/spinner.svg" />
      <p>Loading Your Favorite Starships</p>
    </div>
    <div class="card-container">
      <div class="card-div" v-for="ship in starships.results" v-bind:key="ship.name">
        <img class="card-image" src="../../assets/starship-1.jpg" />
        <div class="content">
          <h3>{{ship.name}}</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </p>
          <div class="read-more">Read More</div>
        </div>
      </div>
    </div>
    <div class="read-more" v-if="!loading">View More Starships</div>
  </section>
</template>

<script>
export default {
  name: "Starship",
  props: {
    title: String
  },

  data() {
    return {
      starships: {},
      allStarships: [],
      loading: true
    };
  },

  methods: {
    randomImage() {
      const imgArr = [
        "../../assets/starship-1.jpg",
        "../../assets/starship-3.jpg",
        "../../assets/starship-2.jpg",
        "../../assets/starship-4.jpg"
      ];
      const randomImage = Math.floor(Math.random() * imgArr.length);
      return imgArr[randomImage];
    }
  },
  created() {
    fetch("https://swapi.co/api/starships")
      .then(res => res.json())
      .then(res => {
        this.starships = res;
        console.log(this.starships);
        this.loading = false;
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
  margin: auto;
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
</style>
