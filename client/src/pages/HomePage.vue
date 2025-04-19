<script setup lang="ts">
import { useBookGeneralStore } from '@/stores/BookGeneralStore';
import AppHasSidebarLayout from '@/layouts/AppHasSidebarLayout.vue';

import { useQuery } from '@tanstack/vue-query';
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
                    <!-- <TrackingCalendar /> -->
                </div>
            </div>
        </div>
    </AppHasSidebarLayout>
</template>