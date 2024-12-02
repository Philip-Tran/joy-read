<script setup>
import { useRouter, useRoute } from 'vue-router';
const { params } = useRoute()
</script>

<template>
    <h1>
        Single book page
    </h1>
    <p>{{ params.bookId }}</p>
</template>