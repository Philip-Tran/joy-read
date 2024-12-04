<script setup>
import { useTranscriptStore } from '@/stores/YtTranscript.store';

import { useForm } from 'vee-validate';
import { ref } from "vue"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const ytStore = useTranscriptStore()

const { defineField, values, handleSubmit } = useForm();

const [videoLink] = defineField("videoLink");
const [lang] = defineField("lang");

const handleFromSubmit = handleSubmit(values => {
    ytStore.handleGetTranscriptFormSubmit(values)
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
    <form @submit.prevent="handleFromSubmit">
        <div class="flex flex-row gap-4 w-full">
            <Input v-model="videoLink" class="w-3/4 !important" />
            <Select v-model="lang" class="w-1/4 !important">
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
        <div>
            <Button type="submit">Submit</Button>
        </div>
        <div>
            {{ values }}
        </div>

    </form>
</template>