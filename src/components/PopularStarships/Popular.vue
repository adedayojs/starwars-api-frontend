<template>
  <section>
    <h1 class="popular-section-header">Popular {{title}}</h1>
    <div class="card-container">
      <div class="card-div">
        <img class="card-image" src="{props.img[randomImage]" } />
        <h3>{props.name}</h3>
        <p>sample test</p>
        <span>Read More</span>
      </div>
    </div>
    <div class="read-more">Read More</div>
  </section>
</template>

<script>
export default {
  name: "Starship",
  props: {
    msg: String,
    title: String,
    character: Object
  },
  methods: {
    randomImage(imgArr) {
      randomImage = Math.floor(Math.random() * imgArr.length);
      return imgArr[randomImage];
    }
  },
  beforeMount() {
    console.log(this.character);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron {
  height: 50vh;
  background: url("../../assets/hero-banner.jpg");
}
</style>
