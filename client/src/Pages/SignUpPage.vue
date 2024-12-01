<script setup lang="js">
import { registerSchema } from '@/schemas/AuthSchema'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/Auth/AuthStore'

const authStore = useAuthStore()

const { values, defineField, errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(registerSchema)
})

const [name] = defineField('name')
const [email] = defineField('email')
const [password] = defineField('password')

const handleFormSubmit = handleSubmit((values) => {
    authStore.registerUser(values)
})
</script>

<template>
    <div class="w-full h-screen py-12 lg:py-40 xl:py-40">
        <Card class="mx-auto max-w-sm">
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
                            <Input v-model="name" id="name" placeholder="Max" required />
                        </div>

                        <div class="grid gap-2">
                            <Label for="email">Email</Label>
                            <Input v-model="email" id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div class="grid gap-2">
                            <Label for="password">Password</Label>
                            <Input v-model="password" id="password" type="password" />
                        </div>
                        <Button type="submit" class="w-full">
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
</template>