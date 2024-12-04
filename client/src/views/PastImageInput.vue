<template>
    <div class="p-20 flex flex-col w-full gap-10">
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
        <div>
            <cropper class="cropper" :src="previewImage" :stencil-props="{ aspectRatio: 9 / 16 }" ref="cropper" />
        </div>
        <button class="file-button" @click="postCroppedImage">
            Post Cropped Image
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const previewImage = ref(null); // Store the preview image URL
const fileInputRef = ref(null); // Reference to the file input element
const cropperRef = ref(null); // Reference to the Cropper component

const triggerFileInput = () => {
    fileInputRef.value.click(); // Programmatically trigger the file input
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        previewImage.value = URL.createObjectURL(file);
    } else {
        alert("Please upload a valid image file.");
    }
};

const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (const item of items) {
        if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            previewImage.value = URL.createObjectURL(file);
            break;
        }
    }
};

const postCroppedImage = async () => {
    if (!cropperRef.value) {
        alert("No cropped image available.");
        return;
    }

    const canvas = cropperRef.value.getResult().canvas;
    if (!canvas) {
        alert("Failed to extract the cropped image.");
        return;
    }

    // Convert canvas to Blob
    canvas.toBlob(async (blob) => {
        if (blob) {
            try {
                const formData = new FormData();
                formData.append("image", blob, "cropped-image.png");

                const response = await axios.post("https://your-server-endpoint/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                alert("Image uploaded successfully!");
                console.log("Response:", response.data);
            } catch (error) {
                console.error("Error uploading the image:", error);
                alert("Failed to upload the image.");
            }
        } else {
            alert("Failed to convert the cropped image to Blob.");
        }
    });
};
</script>

<style>
.cropper {
    height: 300px;
    width: 300px;
    background: #DDD;
}

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
