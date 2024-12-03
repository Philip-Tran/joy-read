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
import { LayoutGrid, List } from "lucide-vue-next"
import { useQuery } from '@tanstack/vue-query'
import axios from "@/api/axios.js"
import BookListView from './BookListView.vue'

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
        <Tabs default-value="grid-view" class="w-full">
            <TabsList class="grid grid-cols-2 w-[200px] mb-10">
                <TabsTrigger value="grid-view">
                    <LayoutGrid size="18" :stroke-width="2" />
                </TabsTrigger>
                <TabsTrigger value="list-view">
                    <List size="18" :stroke-width="2" />
                </TabsTrigger>
            </TabsList>
            <TabsContent value="grid-view">
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
            <TabsContent value="list-view">
                <BookListView :books="books" />
            </TabsContent>
        </Tabs>
    </div>
</template>