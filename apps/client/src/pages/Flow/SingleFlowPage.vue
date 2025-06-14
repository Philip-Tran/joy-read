<script lang="ts" setup>
import { useSenFlowStore } from '@/stores/SenFlowStore';
import { useUserStore } from '@/stores/UserStore';

import { onMounted, ref, computed, watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import type { CarouselApi } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { watchOnce } from '@vueuse/core';
import SingleFlowLayout from './SingleFlowLayout.vue';

const route = useRoute();
const params = computed(() => route.params);

const userStore = useUserStore();
const senFlowStore = useSenFlowStore();

const api = ref<CarouselApi>()
const totalCount = ref(0)
const current = ref(0)

function setApi(val: CarouselApi) {
    api.value = val
}

watchOnce(api, (api) => {
    if (!api)
        return

    totalCount.value = api.scrollSnapList().length
    current.value = api.selectedScrollSnap() + 1

    api.on('select', () => {
        current.value = api.selectedScrollSnap() + 1
    })
})

const flippedCards = ref<Record<number, boolean>>({});
const currentIndex = ref(0);

const toggleFlip = (index: number) => {
    flippedCards.value[index] = !flippedCards.value[index];
};

onMounted(async () => {
    const userId = await userStore.getId();
    const bookId = params.value.bookId as string;
    if (bookId && userId) {
        await senFlowStore.getSenflows(bookId, userId);
    }

    document.addEventListener('keydown', handleKeydown);
});

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'f' || event.key === 'F') {
        toggleFlip(currentIndex.value);
    }
    if (event.key === 'q') {
        toggleFlip(currentIndex.value);

    }
};
</script>

<template>
    <SingleFlowLayout>
        <div class="flex w-full min-h-screen">
            <div class="w-full py-20 lg:py-32 xl:py-40 2xl:py-56">
                <div class="max-w-[700px] mx-auto items-center justify-center flex">
                    <Carousel v-slot="{ canScrollNext }" @init-api="setApi" class="relative w-full max-w-[600px]">
                        <CarouselContent>
                            <CarouselItem v-for="(sen, index) in senFlowStore.getSenFlowsState.senFlows"
                                :key="index + sen.frontText">
                                <div class="relative">
                                    <div class="p-1">

                                        <!-- Front Card -->
                                        <Card>
                                            <CardContent class="flex aspect-video items-center justify-center p-6">
                                                <span class="text-xl font-normal text-center self-center">{{
                                                    sen.frontText
                                                    }}</span>
                                            </CardContent>
                                        </Card>

                                        <!-- Back Card -->
                                        <Card class="absolute inset-1 transition-opacity duration-400 ease-in-out"
                                            :class="[
                                                flippedCards[index]
                                                    ? 'opacity-100'
                                                    : 'opacity-0 pointer-events-none'
                                            ]">
                                            <CardContent
                                                class="flex aspect-video items-center rounded-md justify-center p-6 bg-green-700 bg-opacity-20">
                                                <span class="text-xl font-normal text-center self-center">{{
                                                    sen.backText
                                                    }}</span>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <Button class="absolute right-2 bottom-2 border-0 text-transparent bg-transparent"
                                        @click="toggleFlip(index)" variant="outline">
                                        {{ flippedCards[index] ? 'Show Front' : 'Flip' }}
                                    </Button>
                                </div>
                            </CarouselItem>
                        </CarouselContent>

                        <CarouselPrevious />
                        <CarouselNext v-if="canScrollNext" />
                        <!-- <div>
                            <Button @click="scrollPrev">
                                click
                            </Button>
                        </div> -->
                    </Carousel>

                </div>
                <div class="py-2 text-center text-sm text-muted-foreground">
                    Slide {{ current }} of {{ totalCount }}
                </div>
            </div>
        </div>
    </SingleFlowLayout>

</template>
