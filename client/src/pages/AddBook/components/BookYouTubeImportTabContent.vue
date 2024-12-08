<script setup lang="ts">
import { addBookSchema } from '@/schemas/BookSchemas';
import BookFormGetYTTranscript from "@/components/(features)/book/BookFormGetYTTranscript.vue"
import { useAddBookStore } from '@/stores/BookStore';
import BookContentEditorYT from '@/components/(features)/book/BookContentEditorYT.vue';

import { watch } from 'vue';
import { Button } from '@/components/ui/button';
import { FormControl, FormMessage, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';


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
</script>

<template>
    <div>
        <pre>{{ values }}</pre>
        <form @submit.prevent="onSubmit">
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
            <div class="mt-8">
                <div class="p-4 border rounded-md">
                    <div class="w-full">
                        <div class="flex space-x-3 items-center w-full">
                            <BookFormGetYTTranscript />
                        </div>
                        <div v-if="content">
                            <BookContentEditorYT v-model="content" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    </div>
</template>
