<script setup lang="ts">
  import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div>
      <h2 class="center-text">RANDOM USER API</h2>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
  .center-text {
    text-align: center;
    font-weight: 1000;
    margin-bottom: 10px;
  }
</style>
