<script setup lang="ts">
import AppHasSidebarLayout from '@/layouts/AppHasSidebarLayout.vue';
import BookCard from '@/components/(features)/book/BookCard.vue';
import { useBookGeneralStore } from '@/stores/BookGeneralStore';

import { useQuery } from '@tanstack/vue-query';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import { CirclePlus, LayoutGrid, LayoutList } from 'lucide-vue-next';
import BookListingView from './components/BookListingView.vue';
import BookDirTab from './components/BookDirTab.vue';

const bookStore = useBookGeneralStore()

const { isLoading, data: books } = useQuery({
    queryKey: ["books"],
    queryFn: bookStore.getAllBook
})

</script>

<template>
    <AppHasSidebarLayout>
        <div class="h-full px-4 py-6 lg:px-8 w-full">
            <BookDirTab :is-loading="isLoading" :books="books" />
        </div>
    </AppHasSidebarLayout>
</template>