<script setup lang="ts">
import { useAuthStore } from "@/stores/AuthStore/AuthStore";
import { loginSchema } from "@/schemas/UserSchema";

import { toast } from "vue-sonner"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from 'vee-validate';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from "vue-router";

import AuthLayout from "@/layouts/AuthLayout.vue";
import type { AuthError } from "@supabase/supabase-js";
import Separator from "@/components/ui/separator/Separator.vue";
import { Github } from "lucide-vue-next";

const authStore = useAuthStore()
const router = useRouter()

const { values, defineField, errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(loginSchema)
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
    try {
        const result = await authStore.loginUser(values)
        if (result?.success) {
            toast.success("cool", {
                description: "description"
            });
            router.push('/');
        } else {
            toast.error("Error occurs", {
                description: "Error when trying to login"
            })
        }
    } catch (error) {
        toast.success("cool", {
            description: "description"
        });
    }
}, (invalidSubmit) => {
    toast.success("cool", {
        description: "description"
    });
});

const { logInWithOAuth } = useAuthStore()
const handleGoogleLogin = async () => {
    try {
        await logInWithOAuth("google", "/app")
    } catch (error: unknown) {
        console.error('Login failed:', (error as AuthError).message);
    }
}

const handleGithubLogin = async () => {
    try {
        await logInWithOAuth("github", "/app")
    } catch (error) {
        console.error("Login faile", (error as AuthError).message)
    }
}

</script>

<template>
    <AuthLayout button-position="left">
        <div class="w-full h-screen lg:grid  lg:grid-cols-2">
            <div class="flex items-center justify-center py-32 lg:py-24 xl:py-28 px-4">
                <div class="mx-auto grid w-[350px] gap-6">
                    <div class="grid gap-2 text-center">
                        <h1 class="text-3xl font-bold">
                            Login
                        </h1>
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

                    <Separator label="OR" />
                    <div class="flex flex-col space-y-2">
                        <!-- <Button @click="handleGithubLogin" class="w-full" variant="outline">
                            <Github />
                            Login with Github here
                        </Button> -->
                        <Button @click="handleGoogleLogin" class="w-full" variant="outline">
                            Login With Google
                        </Button>
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