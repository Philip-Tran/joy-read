<script setup>
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import HeaderMain from './components/Shared/HeaderMain.vue';
</script>

<template>
  <VueQueryDevtools />
  <HeaderMain />
  <RouterView />
</template>
