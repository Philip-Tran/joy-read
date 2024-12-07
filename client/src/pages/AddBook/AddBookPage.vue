<script setup lang="ts">
import BookManualImportTabContent from '@/pages/AddBook/components/BookManualImportTabContent.vue';
import BookYouTubeImportTabContent from './components/BookYouTubeImportTabContent.vue';
import BookContentEditor from '@/components/(features)/book/BookContentEditor.vue';
import AppNoSidebarLayout from '@/layouts/type/AppNoSidebarLayout.vue';
import { useAddBookStore } from '@/stores/BookStore';
import { addBookSchema } from "@/schemas/BookSchemas"

const bookStore = useAddBookStore()

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ChevronLeft } from 'lucide-vue-next';


</script>

<template>
    <AppNoSidebarLayout>
        <div class="w-full min-h-14 px-4 xl:px-8 py-2 flex items-center">
            <RouterLink to="/">
                <Button variant="secondary" class="hover:bg-slate-200">
                    <ChevronLeft :stroke-width="1.5" />
                    Back Home
                </Button>
            </RouterLink>
        </div>
        <div class="w-full h-screen py-4 px-4 lg:px-20 xl:px-44 2xl:px-60">
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
                            <TabsList class="grid w-full grid-cols-3 mb-10">
                                <TabsTrigger value="manual-import">
                                    Manual Import
                                </TabsTrigger>
                                <TabsTrigger value="pdf-import">
                                    PDF Import
                                </TabsTrigger>
                                <TabsTrigger value="youtube-import">
                                    YouTube Caption Import
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="manual-import">
                                <BookManualImportTabContent />
                            </TabsContent>
                            <TabsContent value="pdf-import">
                                <div>
                                    <form @submit.prevent="onSubmit">
                                        <FormField v-slot="{ componentField }" name="title">
                                            <FormItem class="mb-5">
                                                <FormLabel>Book Title</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Your book title"
                                                        v-bind="componentField" />
                                                </FormControl>
                                                <!-- <FormDescription>
                                                    This is your public display name.
                                                </FormDescription> -->
                                                <FormMessage />
                                            </FormItem>
                                        </FormField>
                                        <FormField v-slot="{ componentField }" name="audioUrl">
                                            <FormItem>
                                                <FormLabel>Audio Url (optional)</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Audio Url"
                                                        v-bind="componentField" />
                                                </FormControl>
                                                <!-- <FormDescription>
                                                    Audio url here, accept mp3, wav file
                                                </FormDescription> -->
                                                <FormMessage />
                                            </FormItem>
                                        </FormField>
                                        <div class="mt-8">
                                            <BookContentEditor v-model="content" />
                                        </div>
                                    </form>
                                </div>
                            </TabsContent>
                            <TabsContent value="youtube-import">
                                <BookYouTubeImportTabContent />
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div class="lg:w-1/3 xl:w-1/4">
                        <div>
                            <span class="text-lg font-md">Preview</span>
                            <div>
                                <div class="w-72 h-[360px] flex relative bg-slate-200 mb-4">
                                    <div class="flex items-center justify-center align-middle w-full">
                                        <span class="text-center text-wrap text-lg self-center font-semibold">{{
                                            bookStore.initialState.book.title }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <p class="text-lg font-medium">{{ bookStore.initialState.book.title }}</p>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppNoSidebarLayout>
</template>