<template></template>


<script>
import { starshipFetcher } from "../../helper/dataFetcher";
export default {
  created() {
    try {
        let data = await dataFetcher()
    } catch (e) {
      throw e;
    }
  }
};
</script>

<style scoped>
</style>