<template></template>


<script>
import DataFetcher from "../../helper/DataFetcher";
export default {
  created() {
    try {
        let data = await DataFetcher.people(this.$route.params.id)
    } catch (e) {
      throw e;
    }
  }
};
</script>

<style scoped>
</style>