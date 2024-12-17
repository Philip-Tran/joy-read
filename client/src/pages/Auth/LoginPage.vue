<script setup lang="ts">
import { useAuthStore } from "@/stores/AuthStore/AuthStore";

import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from 'vee-validate';
import { z } from 'zod' // Make sure to import zod
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from "vue-router";
import { useToast } from 'primevue/usetoast';

import Toast from 'primevue/toast';
import AuthLayout from "@/layouts/AuthLayout.vue";
import { supabaseCli } from "@/lib/supabase";

const authStore = useAuthStore()

// Define login schema
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

const toast = useToast();
const router = useRouter()

const { values, defineField, errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(loginSchema)
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const onSubmit = handleSubmit((values) => {
    try {
        authStore.loginUser(values)
        // Perform login logic here
        console.log('Login values:', values);
        toast.add({
            severity: 'success',
            summary: 'Login',
            detail: 'Successfully logged in',
            life: 3000
        });
        // Redirect to dashboard or home page
        router.push('/');
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: error instanceof Error ? error.message : 'An error occurred',
            life: 3000
        });
    }
}, (invalidSubmit) => {
    // Handle invalid submit
    toast.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please check your inputs',
        life: 3000
    });
});

const handleGoogleLogin = async () => {
    try {
        const { data, error } = await supabaseCli.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) throw error;
        console.log('Redirecting to Google for login:', data);
    } catch (error) {
        console.error('Login failed:', error.message);
    }
}

</script>

<template>
    <AuthLayout>
        <Toast />
        <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div class="flex items-center justify-center py-12">
                <div class="mx-auto grid w-[350px] gap-6">
                    <div class="grid gap-2 text-center">
                        <h1 class="text-3xl font-bold">
                            Login
                        </h1>
                        <!-- <div>
                            {{ user }}
                        </div> -->
                        <p class="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form @submit.prevent="onSubmit">
                        <div class="grid gap-4">
                            <div class="grid gap-2">
                                <Label for="email">Email</Label>
                                <Input v-bind="emailProps" v-model="email" id="email" type="email"
                                    placeholder="m@example.com" :class="{ 'border-red-500': errors.email }" />
                                <span v-if="errors.email" class="text-red-500 text-sm">
                                    {{ errors.email }}
                                </span>
                            </div>
                            <div class="grid gap-2">
                                <div class="flex items-center">
                                    <Label for="password">Password</Label>
                                </div>
                                <Input v-bind="passwordProps" v-model="password" id="password" type="password"
                                    :class="{ 'border-red-500': errors.password }" />
                                <span v-if="errors.password" class="text-red-500 text-sm">
                                    {{ errors.password }}
                                </span>
                            </div>
                            <Button type="submit" class="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                    <div>
                        <Button @click="handleGoogleLogin" class="w-full" variant="outline">Login With Google</Button>
                    </div>
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
    </AuthLayout>
</template>