<script setup lang="ts">
import TrackingCalendar from "@/components/(features)/analytic/TrackingCalendar.vue"
import { useBookGeneralStore } from '@/stores/BookGeneralStore';
import BookCard from '@/components/(features)/book/BookCard.vue';
import AppHasSidebarLayout from '@/layouts/AppHasSidebarLayout.vue';

import { useQuery } from '@tanstack/vue-query';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import { CirclePlus } from 'lucide-vue-next';

const bookStore = useBookGeneralStore()

const { isLoading, data: books } = useQuery({
    queryKey: ["books"],
    queryFn: bookStore.getAllBook
})


</script>

<template>
    <AppHasSidebarLayout>
        <div class="h-full px-4 py-6 lg:px-8 w-full">
            <Tabs default-value="music" class="h-full space-y-6">
                <div class="space-y-8">
                    <div class="space-between flex items-center">
                        <TabsList>
                            <TabsTrigger value="music" class="relative">
                                Grid
                            </TabsTrigger>
                            <TabsTrigger value="podcasts">
                                List
                            </TabsTrigger>

                        </TabsList>
                        <div class="ml-auto">
                            <RouterLink to="/books/create">
                                <Button>
                                    <CirclePlus class="mr-2 h-5 w-5" />
                                    Add book
                                </Button>
                            </RouterLink>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <div class="space-y-1">
                                <h2 class="text-2xl font-semibold tracking-tight">
                                    Books
                                </h2>
                                <p class="text-sm text-muted-foreground">
                                    Read daily
                                </p>
                            </div>
                        </div>
                        <Separator class="my-4" />
                    </div>

                </div>
                <TabsContent value="music" class="border-none flex-col p-0 outline-none">

                    <div class="relative">
                        <div class="flex space-x-4 pb-4">
                            <BookCard v-for="book in books" :key="book.title" :book="book" class="w-[250px]" />
                        </div>

                    </div>
                    <div class="mt-6 space-y-1">
                        <h2 class="text-2xl font-semibold tracking-tight">
                            SenFlow
                        </h2>
                        <p class="text-sm text-muted-foreground">
                            Your personal playlists. Updated daily.
                        </p>
                    </div>
                    <Separator class="my-4" />
                    <div class="relative flex lg:flex-row w-full">
                        <ScrollArea class="w-1/2">
                            <div class="flex space-x-4 pb-4">
                                <BookCard v-for="book in books" :key="book.title" :book="book" class="w-[150px]"
                                    aspect-ratio="square" :width="150" :height="150" />
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <div class="w-1/2">
                            <TrackingCalendar />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="podcasts" class="h-full flex-col border-none p-0 data-[state=active]:flex">

                    <PodcastEmptyPlaceholder />
                </TabsContent>
            </Tabs>
        </div>
    </AppHasSidebarLayout>
</template>