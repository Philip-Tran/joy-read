<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axios from '@/api/axios';

let selectedText = ref("");
let translatedText = ref("");
let selectionTimeout = null;

const handleTextSelection = async () => {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const textToTranslate = selection.toString().trim();

        // Clear previous refs before fetching new data
        selectedText.value = textToTranslate;
        translatedText.value = "";

        if (!textToTranslate) {
            console.log('No text selected');
            return;
        }

        try {
            const response = await axios.get(`https://lingva.ml/api/v1/en/es/${textToTranslate}`);
            translatedText.value = response.data.translation;
            console.log('Translation:', translatedText.value);
        } catch (error) {
            console.log(error);
        }

        const popupEl = document.querySelector("#popup");
        const anchorEl = document.querySelector("#qts-anchor");

        // Position popup based on the selected text
        popupEl.style.top = `${Math.round(rect.top + rect.height + 8)}px`;
        popupEl.style.left = `${Math.round(rect.left)}px`;
        popupEl.style.visibility = "visible";

        // Add a bounce animation to the popup
        nextTick(() => {
            popupEl.classList.add("popup-bounce");
        });
    }
};

// Clear the timeout if the user is still selecting text
const clearPreviousSelection = () => {
    if (selectionTimeout) {
        clearTimeout(selectionTimeout);
    }

    selectionTimeout = setTimeout(handleTextSelection, 300); // Delay API call to prevent excess requests
};

document.addEventListener('mouseup', clearPreviousSelection);

const handleClosePopup = () => {
    const popup = document.querySelector("#popup");
    popup.style.visibility = "hidden";
    popup.classList.remove("popup-bounce");

    // Clear selected text
    selectedText.value = "";
    translatedText.value = "";

    // Clear the selection from the browser
    const selection = window.getSelection();
    if (selection) {
        selection.removeAllRanges();
    }
};
</script>

<template>
    <div>
        <div ref="popupDiv" id="popup" style="visibility: hidden;"
            class="popup min-h-40 max-h-45 min-w-60 max-w-64 p-4 rounded absolute bg-slate-300 transition-transform duration-300 ease-out">
            <div class="mb-2">
                <h3 class="text-lg font-medium text-gray-800">Translation</h3>
            </div>
            <div class="text-sm text-gray-600">
                <p id="original-text" class="mb-2 font-semibold">{{ selectedText }}</p>
                <p id="translated-text" class="text-gray-800">{{ translatedText }}</p>
            </div>
            <div class="mt-4 flex justify-end space-x-2">
                <button id="audio-button"
                    class="px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                    Play Audio
                </button>
                <button @click="handleClosePopup" id="close-button"
                    class="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">
                    Close
                </button>
            </div>
        </div>
        <h1>test 2</h1>
        <p>Some meaningful English language sentences</p>
    </div>
</template>

<style scoped>
.popup-bounce {
    animation: bounce 0.3s ease-out forwards;
}

@keyframes bounce {
    0% {
        transform: scale(0.8);
        opacity: 0;
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
