<script setup lang="ts">
import BookContentEditor from '@/components/(features)/book/BookContentEditor.vue';
import { useAddBookStore } from '@/stores/BookStore.ts';
import type { Book } from '@/stores/BookStore.ts';

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { addBookSchema } from '@/schemas/BookSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { watch } from 'vue';

const bookStore = useAddBookStore()

const { defineField, handleSubmit, values } = useForm({
    validationSchema: toTypedSchema(addBookSchema)
})

const onSubmit = handleSubmit(values => {
    console.log(values)
    bookStore.addBook(values)
})

const [title] = defineField('title')
const [content] = defineField("content")
const [audioUrlOnl] = defineField("audioUrlOnl")

watch(
    () => values,
    (newValues) => {
        bookStore.updateBook(newValues as Book)
    },
    { deep: true }
)
</script>

<template>
    <div>
        <form @submit.prevent="onSubmit" id="addBookForm">
            <pre>{{ values }}</pre>

            <FormField name="title">
                <FormItem>
                    <FormLabel>Book Title</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Your book title" v-model="title" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField name="audioUrlOnl">
                <FormItem>
                    <FormLabel>Audio Link (Optional)</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Audio Url" v-model="audioUrlOnl" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
            </FormField>

            <div class="mt-8">
                <div class="border rounded-lg">
                    <div class="p-4 border-b flex flex-row justify-between">
                        <span class="text-lg font-semibold">
                            Add book content
                        </span>
                        <select>

                        </select>
                    </div>
                    <div class="p-4 ">
                        <BookContentEditor v-model="content" />
                    </div>
                </div>
            </div>
            <div>
                <Button type="submit"> Click</Button>
            </div>
        </form>
    </div>
</template>