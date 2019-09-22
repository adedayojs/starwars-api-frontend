<template>
  <section class="jumbotron">
    <div class="logo">
      <h1>
        STAR
        <br />WARS
      </h1>
      <h3>Directory</h3>
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
  border-bottom: 3px solid white;
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
</style>
