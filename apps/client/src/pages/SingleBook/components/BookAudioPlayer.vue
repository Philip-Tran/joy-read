<script setup lang="ts">
defineProps<{ audioUrlSer: string }>()
const appUrl = import.meta.env.VITE_PRODUCTION_URL
</script>

<template>
    <div>
        <audio controls>
            <source :src="`${appUrl}/${audioUrlSer}`" type="audio/wav">
        </audio>
    </div>
</template>