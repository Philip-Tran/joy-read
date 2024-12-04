<script>
import { ref, onMounted, computed } from 'vue';

export default {
    setup() {
        const text = `<h1>Lorem ipsum dolor sit amet,</h1> consectetur adipiscing elit. 
        <p>Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante 
        hendrerit.</p>
        <p>Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, 
        ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.</p>`;

        const currentPage = ref(0);
        const pages = ref([]);
        const pageContainer = ref(null);

        const splitTextIntoPages = () => {
            const container = pageContainer.value;
            if (!container) return;

            // Temporarily set content to measure height
            container.innerHTML = '';
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = text;

            pages.value = [];
            let currentPageHtml = '';
            while (tempContainer.firstChild) {
                const node = tempContainer.firstChild;
                container.appendChild(node);
                if (container.scrollHeight > container.clientHeight) {
                    // Remove the last node that caused overflow
                    container.removeChild(node);
                    pages.value.push(currentPageHtml);
                    currentPageHtml = '';
                    continue;
                }
                currentPageHtml += node.outerHTML || node.textContent;
            }

            if (currentPageHtml.trim()) {
                pages.value.push(currentPageHtml.trim());
            }

            // Set the content for the current page
            container.innerHTML = pages.value[currentPage.value] || '';
        };

        const nextPage = () => {
            if (currentPage.value < pages.value.length - 1) {
                currentPage.value++;
                pageContainer.value.innerHTML = pages.value[currentPage.value];
            }
        };

        const prevPage = () => {
            if (currentPage.value > 0) {
                currentPage.value--;
                pageContainer.value.innerHTML = pages.value[currentPage.value];
            }
        };

        onMounted(() => {
            splitTextIntoPages();
            window.addEventListener('resize', splitTextIntoPages); // Handle resize for dynamic adjustments
        });

        return {
            pageContainer,
            currentPage,
            totalPages: computed(() => pages.value.length),
            nextPage,
            prevPage,
        };
    },
};
</script>


<template>
    <div class="reader">
        <div ref="pageContainer" class="page"></div>
        <div class="controls">
            <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
            <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages - 1">Next</button>
        </div>
    </div>
</template>

<style scoped>
.reader {
    max-width: 600px;
    margin: auto;
    font-family: Arial, sans-serif;
}

.page {
    width: 400px;
    /* Fixed width */
    height: 300px;
    /* Fixed height */
    margin: auto;
    border: 1px solid #ddd;
    padding: 20px;
    overflow: hidden;
    /* Hide overflowing content */
    text-align: justify;
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
