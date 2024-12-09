<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import { RouterView } from 'vue-router';

import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <VueQueryDevtools />
  <Toaster class="pointer-events-auto" />
  <div>
    <RouterView />
  </div>
</template>