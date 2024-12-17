<script setup lang="ts">
import AppHasSidebarLayout from '@/layouts/AppHasSidebarLayout.vue';
import BookCard from '@/components/(features)/book/BookCard.vue';
import { useBookGeneralStore } from '@/stores/BookGeneralStore';

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
import BookListingView from './components/BookListingView.vue';

const bookStore = useBookGeneralStore()

const { isLoading, data: books } = useQuery({
    queryKey: ["books"],
    queryFn: bookStore.getAllBook
})

</script>

<template>
    <AppHasSidebarLayout>
        <div class="h-full px-4 py-6 lg:px-8 w-full">
            <Tabs default-value="grid-view" class="h-full space-y-6">
                <div class="space-y-8">
                    <div class="space-between flex items-center">
                        <TabsList>
                            <TabsTrigger value="grid-view" class="relative">
                                Grid
                            </TabsTrigger>
                            <TabsTrigger value="list-view">
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
                <TabsContent value="grid-view" class="border-none flex-col p-0 outline-none">
                    <div class="relative">
                        <ScrollArea>
                            <div class="flex space-x-4 pb-4">
                                <div v-if="isLoading">
                                    Loading...
                                </div>
                                <BookCard v-else v-for="book in books" :key="book.title" :book="book" class="w-[250px]"
                                    aspect-ratio="portrait" :width="250" :height="330" />
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </TabsContent>
                <TabsContent value="list-view" class="h-full flex-col border-none p-0 data-[state=active]:flex">
                    <div>
                        <div v-if="isLoading">
                            Loading...
                        </div>
                        <BookListingView v-else :books="books" />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </AppHasSidebarLayout>
</template>