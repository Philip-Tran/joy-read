<script setup lang="ts">
import { addBookSchema } from '@/schemas/BookSchemas';

import { Button } from '@/components/ui/button';
import { FormControl, FormMessage, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

const { defineField, values, handleSubmit } = useForm({
    validationSchema: toTypedSchema(addBookSchema)
})



</script>

<template>
    <div>
        <form @submit.prevent="onSubmit">
            <FormField v-slot="{ componentField }" name="title">
                <FormItem class="mb-5">
                    <FormLabel>Book Title</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Your book title" />
                    </FormControl>
                    <!-- <FormDescription>
                                                    This is your public display name.
                                                </FormDescription> -->
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="audioUrl">
                <FormItem>
                    <FormLabel>Audio Url (optional)</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Audio Url" v-bind="componentField" />
                    </FormControl>
                    <!-- <FormDescription>
                                                    Audio url here, accept mp3, wav file
                                                </FormDescription> -->
                    <FormMessage />
                </FormItem>
            </FormField>
            <div class="mt-8">
                <div class="p-4 border rounded-md">
                    <div>
                        <Label for="youtube-video-link" class="mb-4">Video Link</Label>
                        <div class="flex space-x-3 items-center">
                            <Input name="youtube-video-link" placeholder="Youtube video link" />
                            <Button>Get Transcript</Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>