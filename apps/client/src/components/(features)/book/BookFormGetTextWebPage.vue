<script setup lang="ts">
import { useAddBookStore } from '@/stores/BookStore';

import { useForm } from 'vee-validate';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from "zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface getTextFormWebFormType {
    webUrl: string,
}

const formSchema = toTypedSchema(
    z.object({
        webUrl: z.string({ required_error: "Web page url is required" }).url({ message: "Invalid url" }),
    }),
);

const bookStore = useAddBookStore()

const { defineField, values, handleSubmit } = useForm({
    validationSchema: formSchema
});

const [webUrl] = defineField("webUrl");

const handleFromSubmit = handleSubmit(values => {
    bookStore.getTextFromWeb(values as getTextFormWebFormType)
})

</script>

<template>
    <form @submit.prevent="handleFromSubmit" class="w-full flex">
        <div class="flex flex-row gap-4 w-full">
            <div class="w-3/4 !important">
                <FormField name="videoLink">
                    <FormItem>
                        <FormLabel>Web Page Link</FormLabel>
                        <FormControl>
                            <Input v-model="webUrl" class="" placeholder="Url" />
                        </FormControl>
                        <FormDescription>
                            Paste the link of the page you want to extract text from here
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <div class="w-1/4 h-full flex items-center justify-start">
                <Button type="submit" class="my-auto w-full bg-blue-500">Get Text</Button>
            </div>
        </div>
    </form>
</template>