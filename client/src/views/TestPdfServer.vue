<script>
import { ref } from "vue";
import axios from "axios";

export default {
    name: "TestPdfServer",
    setup() {
        const inpFile = ref(null);
        const resultText = ref("");

        const uploadFile = async () => {
            if (!inpFile.value || !inpFile.value.files[0]) {
                alert("Please select a file before uploading.");
                return;
            }

            const formData = new FormData();
            formData.append("pdfFile", inpFile.value.files[0]);
            console.log(formData)

            try {
                const response = await axios.post(
                    "http://localhost:8008/api/book/get-pdf-text",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("axios work")

                resultText.value = response.data.trim();
            } catch (error) {
                console.error("Error uploading file:", error.message);
                alert("Failed to extract text. Please check the server logs.");
            }
        };

        return {
            inpFile,
            resultText,
            uploadFile,
        };
    },
};
</script>

<template>
    <div>
        <h1>Extract Text in the Server</h1>
        <input type="file" ref="inpFile" />
        <button type="button" @click="uploadFile">Upload</button>
        <br />
        <br />
        <textarea class="text-white w-[1000px]" style=" height: 150px;" v-model="resultText"
            placeholder="Your PDF text will appear here..."></textarea>
    </div>
</template>
