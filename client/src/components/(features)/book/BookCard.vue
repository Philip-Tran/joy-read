<script setup lang="ts">
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
import { BookOpen, CirclePlus } from 'lucide-vue-next'

defineProps({
    book: Object
})

</script>

<template>
    <div :class="cn('space-y-3', $attrs.class ?? '')">
        <ContextMenu>
            <ContextMenuTrigger>
                <div class="overflow-hidden rounded-md relative">
                    <BookOpen :size="48" :stroke-width="1.5" class="right-0" />
                    <img class="w-[250px] h-[330px] absolute inset-0" :class="cn(
                        'h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]'
                    )" />
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
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem>Play Next</ContextMenuItem>
                <ContextMenuItem>Play Later</ContextMenuItem>
                <ContextMenuItem>Create Station</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Like</ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
        <div class="space-y-1 text-sm">
            <h3 class="font-medium leading-none">
                {{ book.title }}
            </h3>
            <p class="text-xs text-muted-foreground">
                {{ book.author }}
            </p>
        </div>
    </div>
</template>