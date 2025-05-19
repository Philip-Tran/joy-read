<script setup lang="ts">
import { addBookSchema } from '@/schemas/BookSchemas';
import { useAddBookStore } from '@/stores/BookStore';
import BookContentEditorYT from '@/components/(features)/book/BookContentEditorYT.vue';

import { watch } from 'vue';
import { Button } from '@/components/ui/button';
import { FormControl, FormMessage, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import BookFormGetTextWebPage from '@/components/(features)/book/BookFormGetTextWebPage.vue';

const bookStore = useAddBookStore()
const { defineField, values, handleSubmit } = useForm({
    validationSchema: toTypedSchema(addBookSchema)
})

const [title] = defineField('title')
const [content] = defineField('content')
const [audioUrlOnl] = defineField('audioUrlOnl')

const onSubmit = handleSubmit(values => {
    console.log(values)
    bookStore.addBook(values)
})

watch(
    () => bookStore.initialState.book.content,
    () => {
        content.value = bookStore.initialState.book.content
    }
)
watch(
    () => content.value,
    () => {
        bookStore.initialState.book.content = content.value ? content.value : ""
    },
    { deep: true }
)
watch(
    () => values.title,
    () => {
        bookStore.initialState.book.title = values.title ? values.title : ""
    }
)
watch(
    () => bookStore.initialState.book.title,
    () => {
        title.value = bookStore.initialState.book.title
    }
)
</script>

<template>
    <div class="mb-32">
        <form @submit.prevent="onSubmit">
            <div class="flex space-x-3 items-center w-full mb-8 p-4 lg:p-5 rounded bg-slate-100">
                <BookFormGetTextWebPage />
            </div>
            <FormField name="title">
                <FormItem class="mb-5">
                    <FormLabel>Book Title</FormLabel>
                    <FormControl>
                        <Input v-model="title" type="text" placeholder="Your book title" />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField name="audioUrl">
                <FormItem>
                    <FormLabel>Audio Url (optional)</FormLabel>
                    <FormControl>
                        <Input v-model="audioUrlOnl" type="text" placeholder="Audio Url" />
                    </FormControl>
                    <FormDescription>
                        Audio url here, accept mp3, wav file
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>
            <div class="mt-8 " v-if="content">
                <div class="p-4 border rounded-md">
                    <div class="w-full">
                        <div v-if="content">
                            <BookContentEditorYT v-model="content" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <Button type="submit">Add book</Button>
            </div>
        </form>
    </div>
</template>
