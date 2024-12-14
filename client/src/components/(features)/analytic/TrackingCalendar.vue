<script setup>
import { CalendarHeatmap } from 'vue3-calendar-heatmap'

import { reactive, ref } from 'vue';
const data = [
    { date: '2024-01-15', count: 12 },
    { date: '2024-02-03', count: 7 },
    { date: '2024-03-18', count: 14 },
    { date: '2024-04-05', count: 9 },
    { date: '2024-05-22', count: 11 },
    { date: '2024-06-10', count: 8 },
    { date: '2024-07-19', count: 13 },
    { date: '2024-08-02', count: 10 },
    { date: '2024-09-14', count: 6 },
    { date: '2024-10-21', count: 15 },
    { date: '2024-11-08', count: 4 },
    { date: '2024-12-25', count: 17 },
    { date: '2024-01-30', count: 5 },
    { date: '2024-02-14', count: 16 },
    { date: '2024-03-07', count: 8 },
    { date: '2024-04-18', count: 12 },
    { date: '2024-05-30', count: 9 },
    { date: '2024-06-25', count: 7 },
    { date: '2024-07-05', count: 14 },
    { date: '2024-08-30', count: 10 }
];

const color = ['#fff4e0', '#ffd1a1', '#ffa45b', '#ff7b2c', '#cc5800']

const dates = ref([
    '2022-12-30',
    '2023-12-30',
    '2024-12-30',
    '2025-12-30',
    '2026-12-30',
    '2027-12-30',
    '2028-12-30',
    '2029-12-30',
    '2030-12-30'
])

const selectedDate = ref('2024-12-30')
console.log(selectedDate.value)
</script>
<template>
    <div class="mx-auto">
        <div class="">

        </div>
        <calendar-heatmap :key="selectedDate" tooltip-unit="stars" :range-color="color" :round="2"
            :end-date="selectedDate" :values="data" class="border p-1 lg:p-4 rounded-md" />
    </div>
</template>

<style scoped>
:deep(.vch__month__label) {
    font-size: 10px !important;
}

:deep(.vch__day__label) {
    font-size: 10px !important;
}


:deep(.vch__legend) {

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    row-gap: 1 rem;
    gap: 1rem;
    margin-top: .25rem;
}
</style>