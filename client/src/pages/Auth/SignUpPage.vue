<script setup lang="ts">
import { useAuthStore } from "@/stores/AuthStore/AuthStore"
import AuthLayout from "@/layouts/type/AuthLayout.vue"

import { z } from 'zod'
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import SignUpSwiper from "./components/SignUpSwiper.vue"

// Zod validation schema
const signUpSchema = z.object({
    username: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //     { message: "Password must include uppercase, lowercase, number, and special character" })
})

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

const { values, defineField, errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(signUpSchema)
})

const [username, usernameProps] = defineField('username')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const handleFormSubmit = handleSubmit(async (values) => {
    try {
        const result = await authStore.signUpUser(values)
        toast.add({
            severity: 'success',
            summary: 'Registration',
            detail: 'Account created successfully',
            life: 3000
        })
        if (result?.success) {
            router.push('/login')
        }
        // Redirect to lo or dashboard
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: error instanceof Error ? error.message : 'An error occurred during registration',
            life: 3000
        })
    }
}, (invalidSubmit) => {
    // Handle invalid submit
    toast.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please check your inputs',
        life: 3000
    })
})
</script>

<template>
    <AuthLayout>
        <div class="w-full h-screen flex flex-row  p-4">
            <div class="m-auto flex flex-row sm:justify-center w-full h-full">
                <div class="hidden lg:flex h-full w-full lg:w-2/5 ">
                    <SignUpSwiper />
                </div>
                <div class="w-full mt-28 lg:w-3/5 py-10 px-4 lg:px-20">
                    <div class=" mx-auto h-full my-auto">
                        <div class="mb-8">
                            <h2 class="text-3xl font-bold sm:text-center">
                                Logo
                            </h2>
                        </div>
                        <Card class=" max-w-sm my-auto mx-auto">
                            <CardHeader>
                                <CardTitle class="text-xl">
                                    Sign Up
                                </CardTitle>
                                <CardDescription>
                                    Enter your information to create an account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form @submit.prevent="handleFormSubmit">
                                    <div class="grid gap-4">
                                        <div class="grid gap-2">
                                            <Label for="name">Name</Label>
                                            <Input v-bind="usernameProps" v-model="username" id="name" placeholder="Max"
                                                :class="{ 'border-red-500': errors.username }" />
                                            <span v-if="errors.username" class="text-red-500 text-sm">
                                                {{ errors.username }}
                                            </span>
                                        </div>

                                        <div class="grid gap-2">
                                            <Label for="email">Email</Label>
                                            <Input v-bind="emailProps" v-model="email" id="email" type="email"
                                                placeholder="m@example.com"
                                                :class="{ 'border-red-500': errors.email }" />
                                            <span v-if="errors.email" class="text-red-500 text-sm">
                                                {{ errors.email }}
                                            </span>
                                        </div>
                                        <div class="grid gap-2">
                                            <Label for="password">Password</Label>
                                            <Input v-bind="passwordProps" v-model="password" id="password"
                                                type="password" :class="{ 'border-red-500': errors.password }" />
                                            <span v-if="errors.password" class="text-red-500 text-sm">
                                                {{ errors.password }}
                                            </span>
                                        </div>
                                        <Button type="submit" class="w-full" variant="default">
                                            Create an account
                                        </Button>
                                    </div>
                                </form>
                                <div class="mt-4 text-center text-sm">
                                    Already have an account?
                                    <RouterLink to="/login" class="underline">
                                        Sign in
                                    </RouterLink>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout>
</template>