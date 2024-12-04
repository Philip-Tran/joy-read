<script setup>
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/';
import axios from '@/api/axios.js';

// Reactive variables
const videoUrl = ref('');
const transcript = ref('');

// Handle form submission
const handleOnSubmit = async () => {
    try {
        // Extract video ID from the URL
        const videoId = extractVideoId(videoUrl.value);
        if (!videoId) {
            transcript.value = 'Invalid YouTube URL. Please provide a valid one.';
            return;
        }

        // Send the video ID to the server
        const response = await axios.post('/api/video/get-transcript', { videoId });

        // Decode HTML entities
        transcript.value = response.data.transcript
            .map(item => decodeHtmlEntities(item.text)) // Decode HTML entities
            .join(' ');
    } catch (error) {
        console.error('Error fetching transcript:', error);
        transcript.value = 'Failed to fetch transcript. Please try again.';
    }
};

// Function to extract video ID from URL
const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Function to decode HTML entities
const decodeHtmlEntities = (text) => {
    const entities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&amp;#39;': " '",
        '&#39;': " '"
    };
    return text.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (match) => entities[match]);
};
</script>

<template>
    <h1>Get YouTube Transcript</h1>
    <div>
        <Input v-model="videoUrl" placeholder="Enter YouTube video URL" />
        <Button @click="handleOnSubmit">Submit</Button>
    </div>
    <p v-if="transcript">{{ transcript }}</p>
</template>
