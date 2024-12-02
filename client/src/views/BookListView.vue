<script setup>
import { defineProps } from 'vue';
import TableView from './TableView.vue';

defineProps({
    books: Object,
})
</script>

<template>
    <TableView :books="books" />
</template>