<script setup lang="ts">
import type { BookListingCard } from "@/types/BookTypes"
import dayjs from "dayjs";
import { truncate } from "@/lib/composables";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'
import { BookText, CirclePlus } from 'lucide-vue-next'
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";

interface bookCardProps {
    book: BookListingCard,
    aspectRatio?: 'portrait' | 'square',
    width?: number
    height?: number
}

withDefaults(defineProps<bookCardProps>(), {
    aspectRatio: 'portrait',
})

const router = useRouter()

const goToBook = (bookId: string) => {
    router.push(`/books/${bookId}`)
}

const goToSenFlow = (bookId: string) => {
    router.push(`/flow/${bookId}`)
}

</script>

<template>
    <RouterLink :to="`/books/${book.id}`">
        <div :class="cn('space-y-3', $attrs.class ?? '')">
            <ContextMenu>
                <ContextMenuTrigger>
                    <div class="overflow-hidden rounded-md">
                        <div v-if="book.cover">
                            <img :src="book.cover" :alt="book.title" :width="width" :height="height" :class="cn('h-auto w-auto object-cover transition-all hover:scale-105',
                                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
                            )">
                        </div>
                        <div v-else>
                            <div :width="width" :height="height" :class="cn('h-auto w-auto object-cover transition-all hover:scale-105',
                                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
                            )" class="bg-slate-700 flex justify-center p-4 xl:p-5">
                                <div class="text-slate-100 font-serif text-opacity-35 text-wrap "
                                    v-html="truncate(book.content, { length: 350 })">
                                </div>
                            </div>
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent class="w-40">
                    <ContextMenuItem class="p-0">
                        <Button variant="secondary" size="sm" @click="goToBook(book.id)"
                            class="w-full text-left  flex items-center  border-transparent">
                            Start reading
                        </Button>
                    </ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>Edit</ContextMenuSubTrigger>
                        <ContextMenuSubContent class="w-48">
                            <ContextMenuItem>
                                <CirclePlus class="mr-2 h-4 w-4" />
                                New book
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Delete book</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem class="p-0">
                        <Button variant="default" size="sm" @click="goToSenFlow(book.id)"
                            class="w-full text-left  flex items-center  border-transparent">
                            SenFlow Card
                        </Button>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <div class="space-y-1 text-sm">
                <h3 class="font-medium leading-none">
                    {{ book?.title }}
                </h3>
                <p class="text-xs text-muted-foreground">
                    {{ dayjs(book.createdAt).format("MMMM D, YYYY") }}
                </p>
            </div>
        </div>
    </RouterLink>
</template>