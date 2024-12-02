<script setup lang="js">
import { columns } from "@/components/BooksTable/column.js"
import DataTable from '@/components/BooksTable/data-table.vue'
import { defineProps } from 'vue';

defineProps({
    books: Array
})
</script>

<template>
    <div class="">
        <DataTable :columns="columns" :data="books" />
    </div>
</template>