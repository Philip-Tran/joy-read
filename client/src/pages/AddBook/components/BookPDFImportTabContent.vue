<script setup lang="ts">
import BookContentEditor from '@/components/(features)/book/BookContentEditor.vue';
import { useAddBookStore } from '@/stores/BookStore';
import type { Book } from '@/stores/BookStore.ts';

import { watch, ref, type Ref } from 'vue';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { addBookSchema } from '@/schemas/BookSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const bookStore = useAddBookStore()
const { defineField, handleSubmit, values } = useForm({
    validationSchema: toTypedSchema(addBookSchema)
})

const onSubmit = handleSubmit(values => {
    console.log(values)
    bookStore.addBook(values as Book)
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

watch(
    () => bookStore.initialState.book.content,
    (newValue) => {
        const isSame = content.value === newValue
        if (!isSame) {
            content.value = newValue
        }
    }
)

// handle pdf
const inpFile: Ref<HTMLInputElement | null> = ref(null);

const uploadFile = async () => {
    if (!inpFile.value || !inpFile.value.files[0]) {
        alert("Please select a file before uploading.");
        return;
    }

    const formData = new FormData();
    formData.append("pdfFile", inpFile.value.files[0]);

    bookStore.getPdfText(formData)
}

</script>

<template>
    <div>
        <form @submit.prevent="onSubmit" id="addBookForm">
            <div class="p-4 bg-slate-100 rounded mb-4 lg:mb-8">
                <input type="file" ref="inpFile"
                    class="block w-full text-sm  text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none" />
                <Button type="buttom" class="mt-5" @click="uploadFile">Extract text</Button>
            </div>
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
                            Adjust book content
                        </span>
                    </div>
                    <div class="p-4 ">
                        <BookContentEditor v-model="content" />
                    </div>
                </div>
            </div>
        </form>
        <div class="px-4 xl:px-12 bottom-0  py-3">
            <Button type="submit" form="addBookForm" class=" left-80 my-2"> Add Book</Button>
        </div>
    </div>
</template>