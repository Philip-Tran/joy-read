<script setup>
import { Button } from "@/components/ui/button"
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useCounterStore } from "@/stores/counter.js"

const store = useCounterStore()
const count = store.count

const getTodos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  return response.data
}


// Using Vue Query to fetch data
const { isLoading, isError, data: todos, error } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos,
})


</script>

<template>
  <main class="w-full ">

    <div class="p-4 grid grid-cols-1 gap-6 py-6 xl:py-10 px-10 max-w-[600px] mx-auto">
      <div class="flex mx-auto text-slate-800 italic text-md">Edit this at
        <pre>./views/HomeView</pre>
      </div>
      <div v-if="isLoading" class="col-span-full text-center">
        <p class="text-gray-500">Loading todos...</p>
      </div>

      <div v-else-if="isError" class="col-span-full text-center text-red-500">
        <p>Failed to load todos: {{ error?.message }}</p>
      </div>

      <div v-else v-for="todo in todos" :key="todo.id" class="bg-white dark:bg-slate-700 rounded-lg shadow-md p-4">
        <h2 class="font-bold text-lg mb-2">Todo #{{ todo.id }}</h2>
        <p class="">{{ todo.title }}</p>
        <p :class="todo.completed ? 'text-green-500' : 'text-red-500'">
          {{ todo.completed ? 'Completed' : 'Pending' }}
        </p>
      </div>
      <Button>Shadcn Button</Button>
    </div>
  </main>
</template>
