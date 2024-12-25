<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-vue-next';
import { RouterLink, useRoute } from 'vue-router';
const { params } = useRoute()

</script>

<template>
    <div class="w-full min-h-screen flex flex-col">
        <div class="flex w-full min-h-12 items-center justify-between px-4 2xl:px-8">
            <div>
                <RouterLink to="/books">
                    <Button size="icon" variant="outline">
                        <ChevronLeft />
                    </Button>
                </RouterLink>
            </div>
            <div>
                <RouterLink :to="`/books/${params.bookId}`">
                    <Button class="bg-transparent border-transparent text-transparent hover:text-black"
                        variant="secondary">Read this
                        book</Button>
                </RouterLink>
            </div>
        </div>
        <slot />
    </div>
</template>