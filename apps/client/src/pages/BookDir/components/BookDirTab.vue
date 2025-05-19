<script lang="ts" setup>
import { type Book } from "@/stores/BookStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CirclePlus, LayoutGrid, LayoutList } from "lucide-vue-next";
import Separator from "@/components/ui/separator/Separator.vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import BookListingView from "./BookListingView.vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton/";
import BookThreeD from "@/components/(features)/book/BookThreeD.vue";

const props = defineProps<{
    books: Book[]
    isLoading: boolean,
}>()

</script>

<template>
    <Tabs default-value="grid-view" class="h-full space-y-6">
        <div class="space-y-8">
            <div class="space-between flex items-center">
                <TabsList>
                    <TabsTrigger value="grid-view" class="relative p-2">
                        <LayoutGrid class="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list-view" class="p-2">
                        <LayoutList class="w-4 h-4" />
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
        <TabsContent value="grid-view" class="border-none flex-col p-0 outline-none">
            <div class="relative">
                <ScrollArea>
                    <div class="flex space-x-4 pb-4">
                        <div v-if="isLoading">
                            <div class="flex flex-col lg:flex-row gap-5">
                                <div v-for="i in 4" :key="i">
                                    <Skeleton class="w-[250px] h-80 rounded-md aspect-[3/4]" />
                                </div>
                            </div>
                        </div>
                        <BookThreeD v-else v-for="book in books" :key="book.id" :book="book" />
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
</template>