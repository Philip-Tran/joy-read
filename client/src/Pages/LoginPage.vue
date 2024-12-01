<script setup lang="js">
import { useAuthStore } from "@/stores/Auth/AuthStore";
import { loginSchema } from "@/schemas/AuthSchema";

import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from 'vee-validate';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from "vue-router";
import { useToast } from 'primevue/usetoast';


import Toast from 'primevue/toast';
const toast = useToast();
const router = useRouter()
const authStore = useAuthStore()

const { values, defineField, errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(loginSchema)
})

const [email] = defineField('email')
const [password] = defineField('password')

const handleFormSubmit = handleSubmit((values) => {
    authStore.loginUser(values)
    if (authStore.initialState.user) {
        router.push("/")
    }
})

const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

</script>

<template>
    <Toast />
    <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div class="flex items-center justify-center py-12">
            <div class="mx-auto grid w-[350px] gap-6">
                <div class="grid gap-2 text-center">
                    <h1 class="text-3xl font-bold">
                        Login
                    </h1>
                    <button @click="show">Show</button>
                    <p class="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <form @submit="handleFormSubmit">
                    <div class="grid gap-4">
                        <div class="grid gap-2">
                            <Label for="email">Email</Label>
                            <Input v-model="email" id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div class="grid gap-2">
                            <div class="flex items-center">
                                <Label for="password">Password</Label>
                            </div>
                            <Input v-model="password" id="password" type="password" required />
                        </div>
                        <Button type="submit" class="w-full">
                            Login
                        </Button>
                    </div>
                </form>
                <div class="mt-6 text-center text-sm">
                    Don't have an account?
                    <RouterLink to="/sign-up" class="underline">
                        Sign up
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="hidden bg-muted lg:block">
            <img src="https://placehold.co/400" alt="Image" width="1920" height="1080"
                class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
        </div>
    </div>
</template>