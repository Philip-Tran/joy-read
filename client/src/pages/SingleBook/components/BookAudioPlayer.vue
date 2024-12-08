<script setup lang="ts">
defineProps({
    audioUrlSer: String,
})
</script>

<template>
    <div>
        <audio controls>
            <source :src="`http://localhost:8008/storage/audio/${audioUrlSer}`" type="audio/wav">
        </audio>
    </div>
</template>