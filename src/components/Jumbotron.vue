<template>
  <section class="jumbotron">
    <img src="/img/logo.png" class="topmost-logo" />

    <div class="logo">
      <img src="/img/logo.png" />
      <h3 style="font-weight:900;font-size:2em;margin-left:0.5em">Directory</h3>
    </div>
    <p>
      Find Your Favourite Character, Films, Species,
      <br />Starships and Planets
    </p>
    <form style="display:flex">
      <div class="input">
        <select @change="selection">
          <option value="characters">Characters</option>
          <option value="planets">Planets</option>
          <option value="starships">StarShips</option>
        </select>
        <input type="text" placeholder="Search by anything" v-model="search" @keyup="logger" />
      </div>
      <router-link style="margin-left:1em" :to="`${this.selected}?query=${this.search}`">
        <button type="submit" @click="searchHandler">Search</button>
      </router-link>
    </form>
  </section>
</template>

<script>
export default {
  name: "Jumbotron",
  data() {
    return {
      search: "",
      selected: "characters"
    };
  },
  methods: {
    logger: function() {
      console.log(this.search);
    },
    searchHandler() {
      this.$route.query;
      console.log(this.selection);
      console.log(this.$route);
    },
    selection() {
      let select = document.getElementsByTagName("select")[0];
      this.selected = select.value;
      console.log(this.selected);
    }
  },
  computed: {},
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron {
  height: 50vh;
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
  height: 50vh;
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
.topmost-logo {
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
