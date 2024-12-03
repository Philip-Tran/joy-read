<script setup>
import { useRouter, useRoute } from 'vue-router';
const { params } = useRoute()
import { defineProps } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import axios from '@/api/axios.js';

defineProps({})

const getBook = async () => {
    const response = await axios.get(`/api/book/${params.bookId}`)
    return response.data
}

const { isLoading, isError, data: book, error } = useQuery({
    queryKey: ["book"],
    queryFn: getBook,
})

</script>

<template>
    <h1>
        {{ book.title }}
    </h1>
    <p>{{ params.bookId }}</p>
    <div class="prose" v-html="book.content"></div>
</template>