<template>
  <div class="jumbotron">
    <div class="input">
      <select @change="selection">
        <option value="characters">Characters</option>
        <option value="planets">Planets</option>
        <option value="starships">StarShips</option>
      </select>
      <input type="text" placeholder="Search by anything" v-model="search" @keyup="logger" />
    </div>
    <router-link :to="`${this.selected}?query=${this.search}`">
      <button type="submit" @click="searchHandler">Search</button>
    </router-link>
  </div>
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
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 0.7em;
  background: #d8d8d8;
  border: none;
  padding: 0.5em;
  margin-left: 1em;
}
button:hover {
  cursor: pointer;
}
</style>
