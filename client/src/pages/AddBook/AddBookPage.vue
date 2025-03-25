<script setup lang="ts">
import BookManualImportTabContent from '@/pages/AddBook/components/BookManualImportTabContent.vue';
import BookYouTubeImportTabContent from './components/BookYouTubeImportTabContent.vue';
import BookWebImportTabContent from './components/BookWebImportTabContent.vue';
import BookPDFImportTabContent from './components/BookPDFImportTabContent.vue';
import AppNoSidebarLayout from '@/layouts/AppNoSidebarLayout.vue';
import { useAddBookStore } from '@/stores/BookStore';

import { toast } from "vue-sonner"
import { useRouter } from 'vue-router';

const router = useRouter()
const bookStore = useAddBookStore()

import { Book, BookDescription, BookHeader, BookTitle } from "@/components/ui/book";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, ChevronLeft } from 'lucide-vue-next';
import { now, useDateFormat } from '@vueuse/core';

const handleSubmit = async () => {
    const result = await bookStore.addBookDirectFromStore()
    if (result?.success) {
        const bookId = result.bookId
        toast.info(bookStore.initialState.message)
        router.push(`/books/${bookId}`)
        bookStore.resetState()
    }
}
</script>

<template>
    <AppNoSidebarLayout>
        <Button @click="handleSubmit" class="fixed right-4 top-4 lg:hidden ">Add Book</Button>
        <div class="w-full min-h-14 px-4 md:px-5 xl:px-10 py-2 flex items-center md:fixed">
            <RouterLink to="/app">
                <Button variant="secondary" class="hover:bg-slate-200">
                    <ChevronLeft :stroke-width="1.5" />
                    Back
                </Button>
            </RouterLink>
        </div>
        <div class="w-full h-screen py-8 px-4 lg:px-20 xl:px-44 2xl:px-60 sm:py-6 md:py-16 xl:py-14 2xl:py-20">
            <div class="w-full">
                <div class="mb-12">
                    <h2 class="text-3xl font-semibold mb-3">
                        Add new book
                    </h2>
                    <p>
                        Import new book here...
                    </p>
                </div>
                <div class="flex flex-col lg:flex-row lg:space-x-20 2xl:space-x-32 ">
                    <div class="lg:w-2/3 xl:w-3/4">
                        <Tabs default-value="manual-import">
                            <!-- Tab Control -->
                            <TabsList class="grid w-full grid-cols-4 mb-10">
                                <TabsTrigger value="manual-import">
                                    Manual Import
                                </TabsTrigger>
                                <TabsTrigger value="pdf-import">
                                    PDF
                                </TabsTrigger>
                                <TabsTrigger value="web-import">
                                    Web Page
                                </TabsTrigger>
                                <TabsTrigger value="youtube-import">
                                    YouTube Subtitle
                                </TabsTrigger>
                            </TabsList>
                            <!-- Tab Content  -->
                            <TabsContent value="manual-import">
                                <BookManualImportTabContent />
                            </TabsContent>
                            <TabsContent value="pdf-import">
                                <BookPDFImportTabContent />
                            </TabsContent>
                            <TabsContent value="web-import">
                                <BookWebImportTabContent />
                            </TabsContent>
                            <TabsContent value="youtube-import">
                                <BookYouTubeImportTabContent />
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div class="lg:w-1/3 xl:w-1/4 -mt-7 ">
                        <div class="hidden lg:flex flex-col w-fit-content  lg:fixed">
                            <span class="text-lg font-md mb-2">Preview</span>
                            <div>
                                <div class="py-4">
                                    <Book>
                                        <BookHeader>
                                            <BookOpen fill="white" stroke="transparent" />
                                        </BookHeader>
                                        <BookTitle>
                                            <h1 class="text-lg font-medium">{{ bookStore.initialState.book.title }}
                                            </h1>
                                        </BookTitle>
                                        <BookDescription>
                                            <p>{{ useDateFormat(now(), "MMMM D, YYYY", { "locales": 'en-US' }) }}
                                            </p>
                                        </BookDescription>
                                    </Book>
                                </div>
                            </div>
                            <Button @click="handleSubmit" class="w-full mt-10">Add Book</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppNoSidebarLayout>
</template>