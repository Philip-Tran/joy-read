<template>
    <div>
        <h2>Upload, Paste, or Click to Choose an Image</h2>
        <div class="upload-container" contenteditable="true" @paste="handlePaste">
            <button type="button" class="file-button" @click="triggerFileInput">
                Choose File
            </button>
            <input ref="fileInput" type="file" accept="image/*" @change="handleFileUpload" style="display: none;" />
        </div>
        <div v-if="previewImage" class="preview">
            <h3>Image Preview:</h3>
            <img :src="previewImage" alt="Uploaded Image" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            previewImage: null, // Store the preview image URL
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click(); // Programmatically trigger the file input
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith("image/")) {
                this.previewImage = URL.createObjectURL(file);
            } else {
                alert("Please upload a valid image file.");
            }
        },
        handlePaste(event) {
            const items = event.clipboardData.items;
            for (const item of items) {
                if (item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    this.previewImage = URL.createObjectURL(file);
                    break;
                }
            }
        },
    },
};
</script>

<style>
.upload-container {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;
}

.file-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

.file-button:hover {
    background-color: #0056b3;
}

.preview img {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
}
</style>