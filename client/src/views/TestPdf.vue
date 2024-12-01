<template>
    <div class="pdf-extractor">
        <div class="bg-blue-100">
            <Toast />
            <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*"
                :maxFileSize="10000000" @upload="onUpload" />
            <p>hdhf</p>
            <Button label="Upload" @click="upload" severity="secondary" />
        </div>
        <h1>PDF Text Extractor Using <span>PDFjs</span></h1>
        <input type="file" @change="handleFileUpload" accept=".pdf" />
        <button @click="processPdf" :disabled="!pdfFile">
            Extract Text
        </button>
        <div v-if="extractedText">
            <h2>Extracted Text:</h2>
            <textarea class="bg-white w-[600px]" spellcheck="true" v-model="extractedText"></textarea>
        </div>
    </div>
</template>

<script setup lang="js">
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button'; import { useToast } from "primevue/usetoast";
const toast = useToast();
const fileupload = ref();

const upload = () => {
    fileupload.value.upload();
};

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};


import { ref } from "vue";
import * as pdfjsLib from "https://mozilla.github.io/pdf.js/build/pdf.mjs";
import { Toast } from 'primevue';

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://mozilla.github.io/pdf.js/build/pdf.worker.mjs";

const pdfFile = ref(null);
const extractedText = ref("");

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
        pdfFile.value = file;
    } else {
        alert("Please upload a valid PDF file.");
        pdfFile.value = null;
    }
};

const extractText = async (pdfBlob) => {
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

    const totalPageCount = pdf.numPages;
    const textPromises = [];

    for (let currentPage = 1; currentPage <= totalPageCount; currentPage++) {
        const page = await pdf.getPage(currentPage);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join("");
        textPromises.push(pageText);
    }

    URL.revokeObjectURL(pdfUrl); // Clean up the object URL
    return textPromises.join("\n");
};

const processPdf = async () => {
    if (!pdfFile.value) {
        alert("Please upload a PDF first.");
        return;
    }

    try {
        const text = await extractText(pdfFile.value);
        extractedText.value = text;
        console.log("Extracted Text:", text);
    } catch (error) {
        console.error("Error extracting text:", error);
        alert("Failed to extract text from the PDF.");
    }
};
</script>

<style scoped>
.pdf-extractor {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
}

button {
    margin-top: 10px;
}

h2 {
    margin-top: 20px;
    font-size: 1.5rem;
}

p {
    white-space: pre-wrap;
    text-align: left;
}
</style>