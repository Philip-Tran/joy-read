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


import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft } from 'lucide-vue-next';

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
            <RouterLink to="/">
                <Button variant="secondary" class="hover:bg-slate-200">
                    <ChevronLeft :stroke-width="1.5" />
                    Back Home
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
                        <div class="hidden lg:flex flex-col w-full  lg:fixed">
                            <span class="text-lg font-md mb-2">Preview</span>
                            <div>
                                <div class="w-64 h-[360px] flex relative bg-slate-200 mb-4 rounded-sm lg:p-5">
                                    <div class="flex items-center justify-center align-middle w-full">
                                        <span class="text-center text-wrap text-lg self-center font-semibold">
                                            {{ bookStore.initialState.book.title }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-col w-64">
                                    <p class="text-lg font-medium">{{ bookStore.initialState.book.title }}</p>
                                </div>
                            </div>
                            <Button @click="handleSubmit" class="w-64 mt-12">Add Book</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppNoSidebarLayout>
</template>