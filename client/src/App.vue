<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue"
import { RouterView } from 'vue-router';

import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <VueQueryDevtools />
  <AppLayout>
    <div>
      <RouterView />
    </div>
  </AppLayout>
</template>