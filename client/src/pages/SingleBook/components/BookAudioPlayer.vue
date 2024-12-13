<script setup lang="ts">
defineProps<{ audioUrlSer: string }>()

</script>

<template>
    <div>
        <audio controls>
            <source :src="`http://localhost:8008/storage/audio/${audioUrlSer}`" type="audio/wav">
            <source :src="`http://localhost:8008/storage/audio/${audioUrlSer}`" type="audio/mp4">
        </audio>
    </div>
</template>