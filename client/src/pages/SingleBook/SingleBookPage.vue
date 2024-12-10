<script setup lang="ts">
import { usePopupTranslateStore } from '@/stores/PopupTranslateStore';
import FocusModeLayout from '@/layouts/FocusModeLayout.vue';
import { axiosMainApi } from '@/api/axios.express';

import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BookAudioPlayer from './components/BookAudioPlayer.vue';
import { ref, nextTick, watch, onMounted, onUnmounted, computed } from 'vue';
import { Minus, AudioLines } from 'lucide-vue-next';
import { useAddBookStore } from '@/stores/BookStore';

interface Book {
    id: string
    title: string,
    content: string,
    createdAt: Date,
    audioUrlSer: string
}

const bookStore = useAddBookStore()
const popupStore = usePopupTranslateStore()
const { params } = useRoute()

const getBook = async (): Promise<Book> => {
    const response = await axiosMainApi.get(`/api/book/${params.bookId}`)
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
let selectionTimeout: number | null = null;

watch(
    () => popupStore.initialState.translatedText,
    () => {
        translatedText.value = popupStore.initialState.translatedText
    }
)

const handleTextSelection = async () => {
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
        return; // Ignore clicks inside the popup
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
</script>

<template>
    <FocusModeLayout>
        <!-- anchor -->
        <!-- <div id="qts-anchor" style="visibility: hidden; position:absolute"></div> -->
        <!-- pop up -->
        <div ref="popupDiv" id="popup" style="visibility: hidden;"
            class="popup z-50 min-h-24 max-h-45 min-w-60 max-w-80 rounded-md border absolute bg-slate-50 transition-transform duration-300 ease-out">
            <div class=" relative p-3">
                <div class="text-sm text-gray-600">
                    <Skeleton v-if="popupStore.initialState.isLoading" class="w-[50px] h-2 rounded-full" />
                    <div v-else class="flex flex-row space-x-2 items-start">
                        <Button variant="link" class="p-1" @click="playAudio">
                            <AudioLines />
                        </Button>
                        <p id="translated-text" class="text-gray-800 text-base">{{
                            popupStore.initialState.translatedText }}
                        </p>
                    </div>
                </div>
                <div class="mt-4 flex justify-end space-x-2">
                    <Button @click="handleClosePopup" variant="secondary" id="close-button"
                        class="bg-transparent rounded-full w-8 h-8 absolute top-1 right-1 p-2 py-2 focus:ring focus:ring-gray-300">
                        <Minus />
                    </Button>
                </div>
            </div>
        </div>

        <!-- MAIN -->
        <div class="bg-[#fffffe]">
            <div v-if="isLoading">
                Loading...
            </div>
            <!-- Back button -->
            <div class="fixed top-3 left-5">
                <RouterLink to="/books">
                    <Button variant="ghost" class="text-sm font-light text-transparent">Back</Button>
                </RouterLink>
            </div>

            <!-- Audio player -->
            <div v-if="book?.audioUrlSer" class="w-60 h-10 bg-slate-500 fixed bottom-8 left-8">
                <BookAudioPlayer :audioUrlSer="book?.audioUrlSer" />
            </div>

            <!-- Main -->
            <div class="pt-12">
                <div class="px-4 lg:px-10 self-center lg:mx-auto lg:max-w-[700px]">
                    <h1 class="text-2xl font-medium mb-4">{{ book?.title }}</h1>
                    <div class="mb-4">{{ bookStore.initialState.stats.text }}</div>
                    <Separator />
                    <div v-html="`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${book?.content}`"
                        class="prose font-serif text-xl leading-9 text-[#363737] mt-10">
                    </div>
                </div>
            </div>
        </div>
    </FocusModeLayout>
</template>