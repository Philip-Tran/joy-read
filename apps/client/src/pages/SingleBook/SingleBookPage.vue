<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore';
import { useSenFlowStore } from '@/stores/SenFlowStore';
import { useUserSettingStore } from '@/stores/UserSettingStore';
import { usePopupTranslateStore } from '@/stores/PopupTranslateStore';
import { axiosMainApi } from '@/api/axios.express';
import FocusModeLayout from '@/layouts/FocusModeLayout.vue';
import BookFloatingScrollButton from './components/BookFloatingScrollButton.vue';

import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BookAudioPlayer from './components/BookAudioPlayer.vue';
import { ref, nextTick, watch, onMounted, onUnmounted, computed, onBeforeMount } from 'vue';
import { Minus, AudioLines, ChevronLeft } from 'lucide-vue-next';
import { useAddBookStore } from '@/stores/BookStore';
import HiddenSetting from './components/HiddenSetting.vue';
import { toast } from 'vue-sonner';

interface Book {
    id: string
    title: string,
    content: string,
    createdAt: Date,
    audioUrlSer: string
}

const senflowStore = useSenFlowStore()
const userStore = useUserStore()
const bookStore = useAddBookStore()
const settingStore = useUserSettingStore()
const popupStore = usePopupTranslateStore()
const { params } = useRoute()

const userId = ref<string>()
onBeforeMount(async () => {
    const id = await userStore.getId()
    if (id) userId.value = id
})

const getBook = async (): Promise<Book> => {
    const response = await axiosMainApi.get(`/api/book/${userId.value}/${params.bookId}`)
    return response.data
}

const { isLoading, data: book } = useQuery<Book>({
    queryKey: ["book"],
    queryFn: getBook,
})

/*                              Popup Translation                             */
/* -------------------------------------------------------------------------- */
const selectedText = ref<string>("");
const translatedText = ref<string>("");
let selectionTimeout: ReturnType<typeof setTimeout> | null = null;

watch(
    () => popupStore.initialState.translatedText,
    () => {
        translatedText.value = popupStore.initialState.translatedText
    }
)

const handleTextSelection = async () => {
    if (settingStore.state.isUsePopup == false) return
    const selection: Selection | null = window.getSelection();

    if (selection && selection.rangeCount > 0) {
        const range: Range = selection.getRangeAt(0);
        const rect: DOMRect = range.getBoundingClientRect();
        const textToTranslate: string = selection.toString().trim();

        console.log(rect)

        // Clear previous refs before fetching new data
        selectedText.value = textToTranslate;
        translatedText.value = "";

        if (!textToTranslate) {
            console.log('No text selected');
            return;
        }

        popupStore.getTranslation(textToTranslate)
        translatedText.value = popupStore.initialState.translatedText
        popupStore.fetchAudio()

        const popupEl: HTMLElement | null = document.querySelector("#popup");

        // Position popup based on the selected text
        if (popupEl) {
            popupEl.style.top = `${Math.round(rect.top + rect.height + 8 + window.scrollY)}px`;
            popupEl.style.left = `${Math.round(rect.left + window.scrollX)}px`;
            popupEl.style.right = `${Math.round(rect.right)}px`;
            popupEl.style.visibility = "visible";

            nextTick(() => {
                popupEl.classList.add("popup-bounce");
            });
        }
    }
};


// Clear the timeout if the user is still selecting text
const clearPreviousSelection = (event: MouseEvent): void => {
    if (selectionTimeout) {
        clearTimeout(selectionTimeout);
    }

    const popupEl: HTMLElement | null = document.querySelector("#popup");
    if (popupEl && popupEl.contains(event.target as Node)) {
        return;
    }
    if (selectionTimeout) {
        clearTimeout(selectionTimeout);
    }
    selectionTimeout = setTimeout(handleTextSelection, 300); // Delay API call to prevent excess requests
};

document.addEventListener('mouseup', (event) => clearPreviousSelection(event));

const handleOutsideClick = (event: MouseEvent): void => {
    const popupEl: HTMLElement | null = document.querySelector("#popup");
    if (popupEl && !popupEl.contains(event.target as Node)) {
        handleClosePopup();
    }
};

// Attach and detach the global click listener
onMounted(() => {
    document.addEventListener("mousedown", handleOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener("mousedown", handleOutsideClick);
});

const handleClosePopup = () => {
    const popup: HTMLElement | null = document.querySelector("#popup");

    if (popup) {
        popup.style.visibility = "hidden";
        popup.classList.remove("popup-bounce");
    }

    // Clear selected text
    selectedText.value = "";
    translatedText.value = "";

    // Clear the selection from the browser
    const selection: Selection | null = window.getSelection();
    if (selection) {
        selection.removeAllRanges();
    }
};

const playAudio = (): void => {
    const audioUrl = popupStore.initialState.audioUrl
    if (!audioUrl) {
        console.error("Audio URL is not available");
        return;
    }
    const audio = new Audio(audioUrl);
    audio.play().catch((error) => {
        console.error("Error playing audio:", error);
    });
};

// reading time
const bookContent = computed(() => book?.value?.content);
watch(
    () => bookContent.value,
    (content) => {
        if (content) {
            bookStore.getReadingTimeStat(content)
        }
    },
    { immediate: true }
);

// add senflow through popup
const handleAddSenFlow = async () => {
    const item = {
        frontText: popupStore.initialState.selectedText,
        backText: popupStore.initialState.translatedText,
    }
    const result = await senflowStore.createSenFlow(item, userId.value as string, params.bookId as string)

    if (result?.success) {
        toast.info("New SenFlow created successfully")
    }
}

const handleFinish = async () => {
    const bookId = params.bookId
    console.log(bookId)
}
</script>

<template>
    <FocusModeLayout class="relative">
        <BookFloatingScrollButton scrollType="auto" />
        <HiddenSetting />
        <!-- anchor -->
        <!-- <div id="qts-anchor" style="visibility: hidden; position:absolute"></div> -->

        <!-- pop up -->
        <div ref="popupDiv" id="popup" style="visibility: hidden;"
            class="popup z-50 min-h-24 max-h-45 min-w-80 max-w-96 rounded-md border absolute bg-slate-800 transition-transform duration-300 ease-out">
            <div class="relative p-4">
                <div class="text-sm text-gray-400">
                    <div v-if="popupStore.initialState.isLoading">
                        <Skeleton class="w-5 h-5 rounded-full mt-2 mb-3" />
                        <Skeleton class="w-[80px] h-3 rounded-full pt-2" />
                    </div>
                    <div v-else>
                        <div class="flex flex-col items-start">
                            <span id="translated-text"
                                class="text-gray-200 text-lg text-wrap font-medium mb-1 2xl:mb-2">{{
                                    popupStore.initialState.translatedText }}
                            </span>
                            <div class="w-full flex items-center justify-start space-x-2 text-opacity-70">
                                <Button variant="link" size="icon"
                                    class="p-0 h-6 w-6 -ml-[4px] rounded-full hover:text-white hover:bg-slate-700"
                                    @click="playAudio">
                                    <AudioLines class="text-slate-400 " />
                                </Button>
                                <span id="translated-text" class="text-gray-200 text-wrap text-base">{{
                                    popupStore.initialState.selectedText }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 flex justify-end space-x-2">
                    <Button @click="handleClosePopup" variant="ghost" id="close-button"
                        class="bg-transparent rounded-full w-8 h-8 absolute top-1 right-1 p-2 py-2 focus:ring focus:ring-gray-700">
                        <Minus class="text-slate-500" />
                    </Button>
                </div>
                <div v-if="!popupStore.initialState.isLoading" class="w-full flex items-end justify-end h-min">
                    <Button @click="handleAddSenFlow" class="p-0 text-gray-500 font-normal h-min hover:text-gray-100"
                        variant="link">Create senflow card</Button>
                </div>
            </div>
        </div>

        <!-- MAIN -->
        <div class="bg-[#e9e9e9] dark:bg-[#171717]">

            <!-- Back button -->
            <div class="fixed top-3 left-5">
                <RouterLink to="/books">
                    <Button variant="ghost" class="text-sm text-transparent">
                        <ChevronLeft />
                    </Button>
                </RouterLink>
            </div>

            <!-- Audio player -->
            <div v-if="settingStore.state.audioPlayer && book?.audioUrlSer" class=" fixed bottom-8 left-8">
                <BookAudioPlayer :audioUrlSer="book?.audioUrlSer" />
            </div>

            <!-- Main -->
            <div class="py-12 font-garamond min-h-screen">
                <div v-if="isLoading"
                    class="bg-white dark:bg-[#272727] min-h-lvh border py-5 xl:py-9 2xl:py-14 px-4 lg:px-10 xl:px-12 self-center lg:mx-auto lg:max-w-[800px]">
                    <Skeleton class="w-full h-20 mb-6 dark:bg-gray-800" />
                    <Skeleton class="w-52 h-5 rounded dark:bg-gray-800" />
                    <Skeleton class="w-full h-20 mt-14 lg:mt-12 xl:mt-24 2xl:mt-28 dark:bg-gray-800" />
                </div>
                <div v-else
                    class="bg-[#f8f9f8] dark:bg-[#272727] min-h-lvh border py-5 xl:py-9 2xl:py-14 px-4 lg:px-10 xl:px-14 self-center lg:mx-auto lg:max-w-[800px]">
                    <h1 class="text-5xl dark:text-[#DDDDDD] font-bold mb-4">{{ book?.title }}</h1>
                    <div class="mb-4 font-medium text-xl dark:text-[#9EAAAA]">{{ bookStore.initialState.stats.text }}
                    </div>
                    <Separator />
                    <div v-html="`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${book?.content}`"
                        class="prose font-garamond prose-headings:font-garamond prose-headings:font-bold prose-p:font-garamond prose-p:text-2xl prose-blockquote:font-garamond prose-figcaption:italic prose-strong:font-semibold prose-strong:font-garamond prose-a:text-orange-500 text-2xl leading-relax text-[#333333] dark:text-[#DDDDDD] dark:prose-h3:text-[#DDDDDD] dark:prose-headings:text-[#DDDDDD] dark:prose-strong:text-[#DDDDDD] dark:prose-blockquote:text-[#FFFFFF] mt-10">
                    </div>
                </div>
                <div class="w-full min-h-32 items-center justify-center flex ">
                    <span class="font-medium text-base self-center">The End!</span>
                </div>

                <div class="w-full min-h-32 items-center justify-center flex ">
                    <Button @click="handleFinish" >Finish</Button>
                </div>
            </div>
        </div>
    </FocusModeLayout>
</template>