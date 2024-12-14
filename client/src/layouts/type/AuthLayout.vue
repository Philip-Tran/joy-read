<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-vue-next";
</script>

<template>
    <RouterLink to="/">
        <Button class="absolute top-4 left-4" variant="ghost">
            <ArrowLeft />
            Home
        </Button>
    </RouterLink>
    <slot />
</template>