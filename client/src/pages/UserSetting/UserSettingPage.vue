<script setup lang="ts">
import { supportedLanguages } from "@/lib/AppConfig";
import { useUserSettingStore } from "@/stores/UserSettingStore"
import AppHasSidebarLayout from '@/layouts/AppHasSidebarLayout.vue';

import { useRouter } from "vue-router"
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

const router = useRouter();
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import * as z from 'zod'
import AppColorModeToggle from "@/components/shared/AppColorModeToggle.vue"

const settingStore = useUserSettingStore()
const formSchema = toTypedSchema(
    z.object({
        isUsePopup: z.boolean().default(true),
        interfaceLanguage: z.enum(['en']).default('en'),
        learningLanguage: z.enum(supportedLanguages).default(settingStore.state.learningLanguage),
        translateToLanguage: z.enum(supportedLanguages).default(settingStore.state.translateToLanguage),
        colorMode: z.enum(['light', 'dark']).default('light'),
    })
);

const { handleSubmit, values, defineField } = useForm({
    validationSchema: formSchema,
    initialValues: {
        isUsePopup: true,
    },
})

const onSubmit = handleSubmit(async (values) => {
    toast.info('You submitted the following values:', {
        description: JSON.stringify(values, null, 2),
    })
    const result = await settingStore.updateSetting(values)
    if (result.success) {
        router.go(0)
    }

})

const [isUsePopup] = defineField("isUsePopup")
const [interfaceLanguage] = defineField("interfaceLanguage")
const [learningLanguage] = defineField("learningLanguage")
const [translateToLanguage] = defineField("translateToLanguage")
const [colorMode] = defineField("colorMode")

const selectedLang = ref("")
const languages = ref([
    { name: "Afrikaans", code: "af" },
    { name: "Albanian", code: "sq" },
    { name: "Amharic", code: "am" },
    { name: "Armenian", code: "hy" },
    { name: "Azerbaijani", code: "az" },
    { name: "Bengali", code: "bn" },
    { name: "Bulgarian", code: "bg" },
    { name: "Catalan", code: "ca" },
    { name: "Croatian", code: "hr" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Estonian", code: "et" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "Georgian", code: "ka" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Gujarati", code: "gu" },
    { name: "Hebrew", code: "he" },
    { name: "Hindi", code: "hi" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Indonesian", code: "id" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Javanese", code: "jv" },
    { name: "Kannada", code: "kn" },
    { name: "Kazakh", code: "kk" },
    { name: "Khmer", code: "km" },
    { name: "Korean", code: "ko" },
    { name: "Lao", code: "lo" },
    { name: "Latvian", code: "lv" },
    { name: "Lithuanian", code: "lt" },
    { name: "Macedonian", code: "mk" },
    { name: "Malay", code: "ms" },
    { name: "Malayalam", code: "ml" },
    { name: "Mandarin Chinese", code: "zh" },
    { name: "Marathi", code: "mr" },
    { name: "Mongolian", code: "mn" },
    { name: "Nepali", code: "ne" },
    { name: "Norwegian", code: "no" },
    { name: "Persian", code: "fa" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Punjabi", code: "pa" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Serbian", code: "sr" },
    { name: "Sinhala", code: "si" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Spanish", code: "es" },
    { name: "Standard Arabic", code: "ar" },
    { name: "Swahili", code: "sw" },
    { name: "Swedish", code: "sv" },
    { name: "Tamil", code: "ta" },
    { name: "Telugu", code: "te" },
    { name: "Thai", code: "th" },
    { name: "Turkish", code: "tr" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Uzbek", code: "uz" },
    { name: "Vietnamese", code: "vi" },
]);
</script>

<template>
    <AppHasSidebarLayout>
        <div class="p-4 lg:p-10 xl:p-24 2xl:pt-32">
            <div class="flex p-4 lg:p-8 rounded-lg border max-w-[700px] mx-auto">
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
                                            Translate to language
                                        </FormLabel>
                                        <FormDescription>
                                            Translate to language
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Select :modelValue="translateToLanguage"
                                            @update:modelValue="val => translateToLanguage = val">
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
                                                <SelectValue :placeholder="'Select a language 2'" />
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