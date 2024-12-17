<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-vue-next";
</script>

<template>
    <RouterLink to="/home">
        <Button class="absolute top-4 right-4" variant="ghost">
            Home
            <ChevronRight />
        </Button>
    </RouterLink>
    <slot />
</template>