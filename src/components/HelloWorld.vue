<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <router-link to="/potions">
      <button type="button">Potions</button>
    </router-link>
    <router-link to="/sorts">
      <button type="button">Sorts</button>
    </router-link>
    <router-link to="/books">
      <button type="button">Livres</button>
    </router-link>
    <router-link to="/characters">
      <button type="button">Personnages</button>
    </router-link>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #493737;
}
</style>
