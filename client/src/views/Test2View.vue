<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';

document.addEventListener('mouseup', () => {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0); // Get the first range of the selection
        const rect = range.getBoundingClientRect(); // Get the position of the selected text

        if (!selection.toString().trim()) {
            console.log('No text selected');
            return;
        }

        console.log('Selected text:', selection.toString());
        console.log('Position:', {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right,
            width: rect.width,
            height: rect.height,
        });

        const anchorEl = document.createElement("div");
        anchorEl.id = 'qts-anchor'; // Set the ID attribute
        anchorEl.style.position = 'absolute'; // Add absolute positioning
        anchorEl.style.visibility = 'hidden'; // Hide the element
        anchorEl.style.top = `${rect.top}px`; // Set the top position
        anchorEl.style.left = `${rect.left}px`; // Set the left position
        anchorEl.style.width = `${rect.width}px`; // Set the width
        anchorEl.style.height = `${rect.height}px`; // Set the height

        // Append the element to the body (or any specific container)
        document.body.appendChild(anchorEl);

        console.log('Created element as anchor:', anchorEl);

        const popupEl = document.querySelector("#popup")
        console.log("this is popupel", popupEl)
        popupEl.style.visibility = "visible"

        // Adjust the popup position to appear below the text and add 8px
        const popupTopPosit = Math.round(rect.top + rect.height + 8);
        popupEl.style.top = `${popupTopPosit}px`;

        popupEl.style.left = `${Math.round(rect.left)}px`;
        // popupEl.style.width = `${rect.width}px`; 
        // popupEl.style.height = `${rect.height}px`; 


    }
});

// Handle click outside
// document.addEventListener("click", e => {
//     const popup = document.querySelector("#popup")
//     console.log(popup)
//     if (!popup.contains(e.target) && popup.style.visibility == "visible") {
//         popup.toggleAttribute("visibility")
//         console.log(popup)
//     }
// })
const handleClosePopup = () => {
    const popup = document.querySelector("#popup")
    console.log(popup)
    popup.style.visibility = "hidden"
}

</script>

<template>
    <div>
        <div ref="popupDiv" id="popup" style="visibility: hidden;"
            class="popup  min-h-40 max-h-45 min-w-60  max-w-64 p-4 rounded absolute bg-slate-300">
            <div class="mb-2">
                <h3 class="text-lg font-medium text-gray-800">Translation</h3>
            </div>
            <div class="text-sm text-gray-600">
                <p id="original-text" class="mb-2 font-semibold">Original text goes here</p>
                <p id="translated-text" class="text-gray-800">Translated text goes here</p>
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
        <h1>test 2 </h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur, hic consequuntur. Animi beatae
            doloremque temporibus voluptatibus est facilis, placeat eligendi, veritatis, numquam cum atque? Atque
            corporis porro eligendi provident aspernatur!</p>

    </div>
</template>