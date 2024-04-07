<script setup>
import { useRoute } from 'vue-router'
const currentRoute = useRoute()
</script>

<template>
  <div>
    <router-link to="/">
      <p  class="logo"> HARRY POTTER DB</p>
    </router-link>
    <router-view  />
  </div>
</template>

<style scoped>
.logo {
  height: 5em;
  padding: 1em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #ff6666);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #33cc33);
}
</style>
