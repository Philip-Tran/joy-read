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

// custom fullscreen mode shortcut
<script>
// Fullscreen toggle function
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

// Event listener for custom Ctrl+F
function customCtrlFListener(event) {
  // Check for Ctrl+F keypress
  if (event.ctrlKey && event.key === 'q') {
    event.preventDefault() // Prevent default browser search
    toggleFullScreen() // Trigger fullscreen mode
  }
}

// Attach the event listener
document.addEventListener('keydown', customCtrlFListener)
</script>