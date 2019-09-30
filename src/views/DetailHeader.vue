<template>
  <section class="jumbotron">
    <router-link to="/" class="topmost-logo">
      <img src="/img/logo.png" />
    </router-link>
  </section>
</template>

<script>
import Search from "vue-material-design-icons/Magnify";

export default {
  name: "DetailHeader",
  components: {},
  data() {
    return {};
  },

  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron {
  height: 70vh;
  background: url("/img/hero-banner.jpg");
  font-size: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #d8d8d8;
}
.logo {
  display: flex;
  align-items: center;
  color: #fff;
  border-bottom: 3px solid white;
}
img {
  width: 8em;
  height: 3em;
}
.topmost-logo {
  position: absolute;
  left: 2em;
  top: 2em;
}
.search {
  height: 100%;
}
select {
  font-size: 0.7em;
  background: #d8d8d8;
  border: none;
  margin-right: 1em;
}
.input {
  display: flex;
  padding: 0.5em;
  background: #d8d8d8;
}

input {
  font-size: 0.7em;
  background: #d8d8d8;
  border: none;
}
input:focus {
  outline: none;
}
button {
  font-size: 1em;
  background: #d8d8d8;
  border: none;
  padding: 0.5em;
}
button:hover {
  cursor: pointer;
}

@media screen and (min-width: 850px) {
  .jumbotron {
    height: 70vh;
    background: url("/img/hero-banner.jpg");
    font-size: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #d8d8d8;
  }
  .logo {
    display: flex;
    align-items: center;
    color: #fff;
    border-bottom: 3px solid white;
  }
  .logo img {
    width: 5em;
    height: 2em;
  }
  h3 {
    font-weight: 900;
    margin-left: 0.5em;
    margin-bottom: 0px;
    position: relative;
    top: -0.5em;
  }
  .topmost-logo img {
    width: 5em;
    height: 2em;
  }
  .topmost-logo {
    position: absolute;
    top: 2em;
    left: 2em;
  }
  .search {
    height: 100%;
  }
  select {
    font-size: 0.7em;
    background: #d8d8d8;
    border: none;
    margin-right: 1em;
  }
  .input {
    display: flex;
    padding: 0.5em;
    background: #d8d8d8;
    margin-right: 3px;
  }

  input {
    width: 20em;
    font-size: 0.7em;
    background: #d8d8d8;
    border: none;
  }
  input:focus {
    outline: none;
  }
  button {
    font-size: 1em;
    background: #d8d8d8;
    border: none;
    padding: 0.5em;
  }
  button:hover {
    cursor: pointer;
    box-shadow: #fff 5px 5px 1em;
  }
}
</style>
