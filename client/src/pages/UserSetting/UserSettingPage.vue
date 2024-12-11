<script setup lang="ts">
import { useUserSettingStore } from "@/stores/UserSettingStore"
import AppHasSidebarLayout from "@/layouts/type/AppHasSideBarLayout.vue"
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from "vue-sonner"

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import * as z from 'zod'
import AppColorModeToggle from "@/components/shared/AppColorModeToggle.vue"

const settingStore = useUserSettingStore()
const formSchema = toTypedSchema(
    z.object({
        isUsePopup: z.boolean().default(true),
        interfaceLanguage: z.enum(['en', 'vi']).default('en'),
        learningLanguage: z.enum(['en', 'es', 'vi', 'fr']).default('es'),
        colorMode: z.enum(['light', 'dark']).default('light'),
    })
);

const { handleSubmit, values, defineField } = useForm({
    validationSchema: formSchema,
    initialValues: {
        isUsePopup: true,
    },
})

const onSubmit = handleSubmit((values) => {
    toast.info('You submitted the following values:', {
        description: JSON.stringify(values, null, 2),
    })
    settingStore.updateSetting(values)

})

const [isUsePopup] = defineField("isUsePopup")
const [interfaceLanguage] = defineField("interfaceLanguage")
const [learningLanguage] = defineField("learningLanguage")
const [colorMode] = defineField("colorMode")

const selectedLang = ref("es")
const languages = ref([
    { name: "English", code: "en" },
    { name: "Mandarin Chinese", code: "zh" },
    { name: "Hindi", code: "hi" },
    { name: "Spanish", code: "es" },
    { name: "French", code: "fr" },
    { name: "Standard Arabic", code: "ar" },
    { name: "Bengali", code: "bn" },
    { name: "Portuguese", code: "pt" },
    { name: "Russian", code: "ru" },
    { name: "Japanese", code: "ja" },
    { name: "Punjabi", code: "pa" },
    { name: "German", code: "de" },
    { name: "Javanese", code: "jv" },
    { name: "Korean", code: "ko" },
    { name: "Telugu", code: "te" }
]);
</script>

<template>
    <AppHasSidebarLayout>
        <div class="p-4 lg:p-10 xl:p-24 2xl:p-52">
            <div class="flex p-4 lg:p-8 rounded-lg border">
                <pre>{{ values }}</pre>
                <form class="w-full space-y-6" @submit="onSubmit">
                    <div>
                        <h3 class="mb-4 text-lg font-medium">
                            Email Notifications
                        </h3>
                        <div class="space-y-4">
                            <FormField v-slot="{ value, handleChange }" name="isUsePopup">
                                <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div class="space-y-0.5">
                                        <FormLabel class="text-base">
                                            Use popup translation
                                        </FormLabel>
                                        <FormDescription>
                                            Whether or not to use popup translation when reading book
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch :checked="value" @update:checked="handleChange" />
                                    </FormControl>
                                </FormItem>
                            </FormField>
                            <FormField name="security_emails">
                                <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div class="space-y-0.5">
                                        <FormLabel class="text-base">
                                            Color mode
                                        </FormLabel>
                                        <FormDescription>
                                            Color mode for interface
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <AppColorModeToggle />
                                    </FormControl>
                                </FormItem>
                            </FormField>
                            <FormField name="security_emails">
                                <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div class="space-y-0.5">
                                        <FormLabel class="text-base">
                                            Language
                                        </FormLabel>
                                        <FormDescription>
                                            Set currently learning language
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Select :modelValue="learningLanguage"
                                            @update:modelValue="val => learningLanguage = val">
                                            <SelectTrigger class="w-60">
                                                <SelectValue :placeholder="'Select a language'" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Choose language</SelectLabel>
                                                    <SelectItem v-for="lang in languages" :key="lang.code"
                                                        :value="lang.code">
                                                        {{ lang.name }}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            </FormField>
                            <FormField name="security_emails">
                                <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div class="space-y-0.5">
                                        <FormLabel class="text-base">
                                            Interface language
                                        </FormLabel>
                                        <FormDescription>
                                            Choose language for the app
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Select defaultValue="en" @update:modelValue="val => interfaceLanguage = val">
                                            <SelectTrigger class="w-60">
                                                <SelectValue :placeholder="'Select a language'" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Choose language</SelectLabel>
                                                    <SelectItem value="en">
                                                        English
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            </FormField>
                        </div>
                    </div>
                    <Button type="submit">
                        Save settings
                    </Button>
                </form>
            </div>
        </div>
    </AppHasSidebarLayout>
</template>