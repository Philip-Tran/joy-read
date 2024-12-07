<script lang="ts" setup>
import AppSidebar from "@/components/shared/app-sidebar.vue";
import {
    SidebarProvider
} from "@/components/ui/sidebar"
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main class="w-full">
            <slot />
        </main>
    </SidebarProvider>
</template>