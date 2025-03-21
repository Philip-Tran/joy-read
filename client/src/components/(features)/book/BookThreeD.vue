<script lang="ts" setup>
import { Book, BookDescription, BookHeader, BookTitle } from "@/components/ui/book";

import { truncate } from "@/lib/composables";
import { useDateFormat } from '@vueuse/core'

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
import { RouterLink, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import type { BookListingCard } from "@/types/BookTypes";

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
        <div class="grid place-content-center p-6">
            <Book shadow-size="sm">
                <BookHeader>
                    <Icon name="heroicons:book-open-solid" size="24" />
                </BookHeader>
                <BookTitle>
                    <h1>{{ book.title }}</h1>
                </BookTitle>
                <BookDescription>
                    <!-- <p>{{ truncate(book.content, { length: 350 }) }}</p> -->
                    <p>{{ useDateFormat(book.createdAt, 'MMMM D, YYYY', { locales: 'en-US' }) }}</p>
                </BookDescription>
            </Book>
        </div>
    </RouterLink>
</template>
