<script lang="ts" setup>
import AppSidebar from "@/components/shared/app-sidebar.vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import {
    SidebarProvider
} from "@/components/ui/sidebar"
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main class="w-full overflow-hidden">
            <AppHeader />
            <slot />
        </main>
    </SidebarProvider>
</template>