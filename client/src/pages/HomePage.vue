<script setup lang="ts">
import TrackingCalendar from "@/components/(features)/analytic/TrackingCalendar.vue"
import { useBookGeneralStore } from '@/stores/BookGeneralStore';
import BookCard from '@/components/(features)/book/BookCard.vue';
import AppHasSidebarLayout from '@/layouts/AppHasSidebarLayout.vue';

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
import { CirclePlus } from 'lucide-vue-next';
import BookDirTab from "./BookDir/components/BookDirTab.vue";

const bookStore = useBookGeneralStore()

const { isLoading, data: books } = useQuery({
    queryKey: ["books"],
    queryFn: bookStore.getAllBook
})


</script>

<template>
    <AppHasSidebarLayout>
        <div class="h-full px-4 py-6 lg:px-8 w-full">
            <div>
                <BookDirTab :books="books" :is-loading="isLoading" />
            </div>
            <div class="w-full mt-10 xl:mt-20">
                <div>

                </div>
                <div class="xl:w-2/5">
                    <TrackingCalendar />
                </div>
            </div>
        </div>
    </AppHasSidebarLayout>
</template>