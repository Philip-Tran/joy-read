<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
    buttonPosition: {
        type: String,
        default: "right",
        validator: (value: string) => ["left", "right"].includes(value),
    }
})

const buttonPositionClass = computed(() =>
    props.buttonPosition === "left" ? "left-4" : "right-4"
);
</script>

<template>
    <RouterLink to="/">
        <Button class="absolute top-2 lg:top-4" :class="buttonPositionClass" variant="link">
            Home
            <ChevronRight />
        </Button>
    </RouterLink>
    <slot />
</template>