<script setup>
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ref } from "vue"
import { useForm } from 'vee-validate';
import axios from "axios"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const { defineField, values, errors, handleSubmit } = useForm()

const [videoLink] = defineField("videoLink")
const [lang] = defineField("lang")

const handleFromSubmit = handleSubmit(async (values) => {
    console.log(values)
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/get-transcript/", values)
        transcript.value = response.data.transcript

        if (!response) console.log("Error")
    } catch (error) {
        console.log("Error", error.message)
    }
})

const transcript = ref()
const languages = ref([
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' }
]);

</script>

<template>
    <div class="p-10 w-full h-screen">
        <div class="w-[600px] mx-auto">
            <h1 class="text-md">Get transcript from youtube video</h1>
            <form @submit.prevent="handleFromSubmit">
                <div class="flex flex-row gap-4 w-full">
                    <Input v-model="videoLink" class="w-3/4 !important" />
                    <Select v-model="lang" class="w-1/4 !important">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
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
            <div>
                <pre>
                    {{ transcript }}
                </pre>
            </div>
        </div>

    </div>
</template>