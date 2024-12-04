<script setup>
import VideoLinkForm from '@/components/(features)/GetTranscript/VideoLinkForm.vue';
import PostEditor2 from '@/components/(features)/addLesson/PostEditor2.vue';
import { useTranscriptStore } from '@/stores/YtTranscript.store';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { watch } from "vue";
import { useForm } from 'vee-validate';

const ytStore = useTranscriptStore()
const { defineField, values, errors, handleSubmit } = useForm();


const [content] = defineField('content')
const [title] = defineField('title')

watch(
    () => ytStore.book.content,
    () => {
        content.value = ytStore.book.content
    }
)
watch(
    () => ytStore.book.title,
    () => {
        title.value = ytStore.book.title
    }
)
watch(
    () => title.value,
    () => {
        ytStore.book.title = title.value
    }
)
watch(
    () => content.value,
    () => {
        ytStore.book.content = content.value
    }
)

const handleFormSubmit = handleSubmit((values) => {
    console.log(values)
    ytStore.handleTranscriptFormSubmit(values)
})

</script>

<template>
    <div class="p-10 w-full h-screen">
        <div class="w-[600px] mx-auto">
            <h1 class="text-md">Get transcript from youtube video</h1>
            <VideoLinkForm />
            <div class=" w-full gap-6">
                <form @submit.prevent="handleFormSubmit">
                    <Input v-model="title" class="mb-4" />
                    <PostEditor2 v-model="content" />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>

    </div>
</template>