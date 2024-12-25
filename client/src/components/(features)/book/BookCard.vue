<script setup lang="ts">
import type { BookListingCard } from "@/types/BookTypes"
import dayjs from "dayjs";

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
import { CirclePlus } from 'lucide-vue-next'

interface bookCardProps {
    book: BookListingCard,
    aspectRatio?: 'portrait' | 'square',
    width?: number
    height?: number
}

withDefaults(defineProps<bookCardProps>(), {
    aspectRatio: 'portrait',
})

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
                            <img src="https://via.placeholder.com/300x600?text=No+Image" alt="No image available"
                                :width="width" :height="height" :class="cn('h-auto w-auto object-cover transition-all hover:scale-105',
                                    aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
                                )" />
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent class="w-40">
                    <ContextMenuItem>Start Reading</ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>Edit</ContextMenuSubTrigger>
                        <ContextMenuSubContent class="w-48">
                            <ContextMenuItem>
                                <CirclePlus class="mr-2 h-4 w-4" />
                                New Playlist
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Delete book</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Play Later</ContextMenuItem>
                    <ContextMenuItem>Create Station</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Like</ContextMenuItem>
                    <ContextMenuItem>Share</ContextMenuItem>
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