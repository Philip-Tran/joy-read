<template>
    <div class="floating-buttons hover:bg-slate-100 rounded-full py-2 px-2">
        <button class="scroll-btn" @click="scrollTo('top')">
            <Minus class="w-4 text-transparent scroll-btn__icon" />
        </button>
        <button class="scroll-btn" @click="scrollTo('middle')">
            <Minus class="w-4 text-transparent scroll-btn__icon" />
        </button>
        <button class="scroll-btn" @click="scrollTo('bottom')">
            <Minus class="w-4 text-transparent scroll-btn__icon" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { Minus } from 'lucide-vue-next';

const props = defineProps<{
    scrollType: 'smooth' | "auto" | "instant"
}>()

type ScrollPosition = 'top' | 'middle' | 'bottom';

function scrollTo(position: ScrollPosition) {
    const pageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    let targetScroll = 0;

    if (position === 'top') {
        targetScroll = 0;
    } else if (position === 'middle') {
        targetScroll = (pageHeight - viewportHeight) / 2;
    } else if (position === 'bottom') {
        targetScroll = pageHeight;
    }

    window.scrollTo({
        top: targetScroll,
        behavior: props.scrollType,
    });
}
</script>

<style scoped>
.floating-buttons {
    position: fixed;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;

}

.floating-buttons button {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.floating-buttons:hover .scroll-btn .scroll-btn__icon {
    color: rgb(156, 166, 162);
}

.floating-buttons:hover .scroll-btn .scroll-btn__icon:hover {
    color: rgb(71, 71, 73);
}
</style>