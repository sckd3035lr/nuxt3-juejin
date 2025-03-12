<template>
  <div>
    <GlobalHeader/>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "~/components/GlobalHeader.vue";
</script>

<style scoped>
</style>