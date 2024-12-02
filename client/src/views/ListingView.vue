<script setup lang="js">
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import { useQuery } from '@tanstack/vue-query'
import axios from "@/api/axios.js"

const getBooks = async () => {
    const response = await axios.get("/api/book/")
    return response.data
}

const { isLoading, data: books, error, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks
})
</script>

<template>
    <div class="flex px-32 py-5">
        <Tabs default-value="account" class="w-full">
            <TabsList class="grid  grid-cols-2 w-[200px] mb-10">
                <TabsTrigger value="account">
                    Account
                </TabsTrigger>
                <TabsTrigger value="password">
                    Password
                </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <div class="grid grid-flow-row grid-cols-3 gap-7">
                    <Card v-for="book in books" :key="book.id">
                        <CardHeader>
                            <CardTitle>{{ book.title }}</CardTitle>
                            <CardDescription>
                                {{ book.content }}
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-2">
                        </CardContent>
                        <CardFooter>
                            <RouterLink :to="`book/${book.id}`">
                                <Button>Read</Button>
                            </RouterLink>
                        </CardFooter>

                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-2">
                        <div class="space-y-1">
                            <Label for="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div class="space-y-1">
                            <Label for="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
</template>