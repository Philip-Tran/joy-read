<template>
    <div class="w-full h-full ">
        <swiper :slides-per-view="1" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange"
            :modules="modules" :pagination="{ clickable: true }" class="h-full rounded-xl">
            <swiper-slide>
                <div class="w-400  h-full bg-yellow-900 text-yellow-50 lg:p-10 xl:p-14 rounded-lg">
                    <p class="lg:mt-28 text-2xl font-bold">Reading Tool You've Been Asking For</p>
                    <p class="mt-4 text-lg">Transform your language learning with intelligent reading assistance. Unlock
                        comprehension, expand vocabulary, and read with confidence.</p>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="w-400  h-full bg-green-900 text-green-50 lg:p-10 xl:p-14 rounded-lg">
                    <p class="lg:mt-28 text-2xl font-bold">Adaptive Learning Experience</p>
                    <p class="mt-4 text-lg">Personalized difficulty levels that grow with you. Our AI adapts to your
                        skill level, making every reading session a perfect challenge.</p>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="w-400  h-full bg-blue-950 text-blue-50 lg:p-10 xl:p-14 rounded-lg">
                    <p class="lg:mt-28 text-2xl font-bold">Learn in Context</p>
                    <p class="mt-4 text-lg">Instant translations, contextual explanations, and smart vocabulary
                        tracking. Turn every text into a personalized language lesson.</p>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Scrollbar, A11y],

        };
    },
};
</script>

<style scoped>
:deep(.swiper-pagination) {
    bottom: 28px
}

:deep(.swiper-pagination-bullet) {
    width: 42px !important;
    height: 5px;
    border-radius: 12px
}

:deep(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
    width: 62px !important;
    height: 6px;
    border-radius: 12px;
    background: white
}
</style>