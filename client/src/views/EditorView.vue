<script setup>
import PostEditor from "@/components/(features)/addLesson/PostEditor.vue"

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from "zod"
// import { onMounted } from "vue";
import axios from "axios";

const { values, defineField, errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            title: z.string().min(3, "Your title is too short"),
            content: z.string().min(25, "Too short is not worth reading").default("<h1>This is a heading</h1>This is content default")
        })
    )
})

const [title, titleAttrs] = defineField("title")
const [content, contentAttrs] = defineField("content")


const handleFormSubmit = handleSubmit(async (values) => {
    try {
        const response = await axios.post("http://localhost:8008/api/book/create", values, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
    }
})


</script>

<template>
    <section class="w-full py-20 flex flex-col items-center justify-center">
        <h1>eidtor</h1>
        <p class="text-red-400">
            {{ titleAttrs }}
        </p>
        <div class="min-w-[600px] max-w-[600px]">
            <form @submit.prevent="handleFormSubmit">
                <div>
                    <Input v-model="title" class="mb-4" />
                </div>
                <p>{{ values }}</p>
                <p>{{ errors }}</p>
                <PostEditor v-model="content" />

                <Button type="submit" variant="default">Create Book</Button>
            </form>

        </div>
    </section>
</template>