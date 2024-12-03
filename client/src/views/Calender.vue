<script setup>
import { CalendarHeatmap } from 'vue3-calendar-heatmap'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
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
    <div class="w-[900px] mx-auto py-32">
        <h1>
            this is funny
        </h1>
        <div class="my-10">
            <Select v-model="selectedDate">
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem v-for="date in dates" :key="date" :value="date">
                            {{ date }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <p>{{ selectedDate }}</p>
            <select id="countries" v-model="selectedDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="date in dates" :key="date" :value="date">{{ date }}</option>

            </select>
        </div>
        <calendar-heatmap :key="selectedDate" tooltip-unit="stars" :range-color="color" :round="5"
            :end-date="selectedDate" :values="data" class="border h-[200px] p-4 " />
    </div>
</template>

<style scoped>
/* Use a more general selector or ::v-deep to target the labels */
::v-deep .vch__month__label {
    font-size: 10px !important;
}

::v-deep .vch__day__label {
    font-size: 10px !important;
}
</style>
