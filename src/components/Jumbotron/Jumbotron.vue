<template>
  <div class="jumbotron">
    <h1>How are You</h1>
  </div>
</template>

<script>
export default {
  name: "Jumbotron",
  props: {
    msg: String
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
