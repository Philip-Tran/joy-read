<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from './books/columns'
import DataTable from './books/data-table.vue'
import type { BookListingCard } from '@/types/BookTypes';

const props = defineProps<{
    books: BookListingCard[];
}>()

const data = ref<BookListingCard[]>([])

onMounted(() => {
    data.value = props.books;
});

</script>

<template>
    <div class=" mx-auto">
        <DataTable :columns="columns" :data="data" />
    </div>
</template>