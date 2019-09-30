<template></template>


<script>
import DataFetcher from "../../helper/DataFetcher";

export default {
  data() {
    return {
      character: {},
      characters: []
    };
  },
  async created() {
    try {
      this.character = await DataFetcher.people(this.$route.params.id);
      this.characters = await DataFetcher.people();
    } catch (e) {
      throw e;
    }
  }
};
</script>

<style scoped>
</style>