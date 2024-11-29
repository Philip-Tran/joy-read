<script setup>
import PostEditor from "@/components/(features)/addLesson/PostEditor.vue"

import { Input } from '@/components/ui/input';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from "zod"


const { values, defineField, errors } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            title: z.string().min(3, "Your title is too short"),
            content: z.string().min(25, "Too short is not worth reading").default("<h1>This is a heading</h1>This is content default")
        })
    )
})

const [title, titleAttrs] = defineField("title")
const [content, contentAttrs] = defineField("content")

</script>

<template>
    <section class="w-full py-20 flex flex-col items-center justify-center">
        <h1>eidtor</h1>
        <div class="min-w-[600px] max-w-[600px]">
            <div>
                <Input v-model="title" class="mb-4" />
            </div>
            <p>{{ values }}</p>
            <p>{{ errors }}</p>
            <PostEditor v-model="content" />

        </div>
    </section>
</template>