<script setup lang="ts">
import { useAddBookStore } from '@/stores/BookStore';

import { useForm } from 'vee-validate';
import { ref } from "vue"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from "zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface getTranscriptFormType {
    videoLink: string,
    lang: string
}

const formSchema = toTypedSchema(
    z.object({
        videoLink: z.string({ required_error: "Link is required" }).url({ message: "Invalid url" }),
        lang: z.string().optional()
    }),
);

const bookStore = useAddBookStore()

const { defineField, values, handleSubmit } = useForm({
    validationSchema: formSchema
});

const [videoLink] = defineField("videoLink");
const [lang] = defineField("lang");

const handleFromSubmit = handleSubmit(values => {
    bookStore.getTranscriptFromYoutube(values as getTranscriptFormType)
})

// Available languages for selection
const languages = ref([
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' }
]);

</script>

<template>
    <form @submit.prevent="handleFromSubmit" class="w-full">
        <div class="flex flex-row gap-4 w-full">
            <div class="w-3/4 !important">
                <FormField name="videoLink">
                    <FormItem>
                        <FormLabel>Video Link</FormLabel>
                        <FormControl>
                            <Input v-model="videoLink" class="" placeholder="Paste youtube video link here" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <div class="w-1/4 !important">
                <Label for="youtube-video-link" class="mb-4">Language</Label>
                <Select v-model="lang" class="">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Language</SelectLabel>
                            <SelectItem v-for="lang in languages" :key="lang.value" :value="lang.value">
                                {{ lang.label }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div class="mt-4">
            <Button type="submit" class="bg-red-700">Get Transcript</Button>
        </div>
        <pre>
            {{ values }}
        </pre>
    </form>
</template>