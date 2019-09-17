<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div" v-for="ship in starships.results" v-bind:key="ship.name">
        <img class="card-image" src="../../assets/starship-1.jpg" />
        <h3>{{ship.name}}</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <span>Read More</span>
      </div>
    </div>
    <div class="read-more">View More Starships</div>
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
      starships: {}
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
  background-color: #d8d8d8;
  margin: 2em;
}
.card-container {
  display: grid;
  grid-template-columns: auto auto auto;
    width:90%;
  margin:auto
}
.popular-section-header{
    text-align: center;
    margin:auto
}
</style>
