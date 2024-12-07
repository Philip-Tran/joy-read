<script setup lang="ts">
import BookCard from '@/components/(features)/book/BookCard.vue';
import AppHasSidebarLayout from '@/layouts/type/AppHasSidebarLayout.vue';

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

const books = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        year: 1925,
        rating: 4.5,
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        year: 1960,
        rating: 4.8,
    },
    {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        year: 1949,
        rating: 4.7,
    },
    {
        title: "Moby-Dick",
        author: "Herman Melville",
        genre: "Adventure",
        year: 1851,
        rating: 3.9,
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        year: 1813,
        rating: 4.6,
    }

];

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
                        <div class="ml-auto mr-4">
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
                    <div class="relative">
                        <ScrollArea>
                            <div class="flex space-x-4 pb-4">
                                <AlbumArtwork v-for="book in books" :key="book.title" :book="book" class="w-[150px]"
                                    aspect-ratio="square" :width="150" :height="150" />
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </TabsContent>
                <TabsContent value="podcasts" class="h-full flex-col border-none p-0 data-[state=active]:flex">

                    <PodcastEmptyPlaceholder />
                </TabsContent>
            </Tabs>
        </div>
    </AppHasSidebarLayout>
</template>