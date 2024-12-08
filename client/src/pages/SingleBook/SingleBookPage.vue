<script setup lang="ts">
import FocusModeLayout from '@/layouts/FocusModeLayout.vue';
import { axiosMainApi } from '@/api/axios.express';

import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BookAudioPlayer from './components/BookAudioPlayer.vue';

interface Book {
    id: string
    title: string,
    content: string,
    createdAt: Date,
    audioUrlSer: string
}

const { params } = useRoute()

const getBook = async (): Promise<Book> => {
    const response = await axiosMainApi.get(`/api/book/${params.bookId}`)
    return response.data
}

const { isLoading, data: book } = useQuery<Book>({
    queryKey: ["book"],
    queryFn: getBook,
})

</script>

<template>
    <FocusModeLayout>
        <div class="bg-[#fffffe]">
            <div v-if="isLoading">
                Loading...
            </div>
            <div class="fixed top-3 left-5">
                <RouterLink to="/books">
                    <Button variant="ghost" class="text-sm font-light text-transparent">Back</Button>
                </RouterLink>
            </div>

            <!-- Audio player -->
            <div v-if="book?.audioUrlSer" class="w-60 h-10 bg-slate-500 fixed bottom-8 left-8">
                <BookAudioPlayer :audioUrlSer="book?.audioUrlSer" />
            </div>

            <div class="pt-12">
                <div class="px-4 lg:px-10 self-center lg:mx-auto lg:max-w-[700px]">
                    <h1 class="text-2xl font-medium mb-5">{{ book?.title }}</h1>
                    <Separator />
                    <div v-html="book?.content" class="prose font-serif text-xl leading-9 text-[#363737] mt-10">
                    </div>
                </div>
            </div>
        </div>
    </FocusModeLayout>
</template>