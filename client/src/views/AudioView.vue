<template>
    <div>
        <div class="name">
            {{ currentAudioName || audioList[0].title }}
        </div>
        <audio-player ref="audioPlayer" :audio-list="audioList" :before-play="handleBeforePlay"
            :show-play-loading="false">
        </audio-player>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive variables
const currentAudioName = ref('');
const audioList = ref([
    {
        src: 'http://music.163.com/song/media/outer/url?id=317151.mp3', // Required
        title: 'Audio Title 1', // Optional
        artist: 'Artist Name 1', // Optional
        album: 'Album Name 1', // Optional
        artwork: [
            {
                src: 'https://upload.jianshu.io/users/upload_avatars/1696356/c358e43854eb?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
                sizes: '512x512',
                type: 'image/jpg',
            },
        ],
    },
    {
        src: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3', // Required
        title: 'Audio Title 2', // Optional
    },
]);

// Refs
const audioPlayer = ref(null);

// Methods
const handleBeforePlay = (next) => {
    currentAudioName.value =
        audioList.value[audioPlayer.value.currentPlayIndex]?.title || '';
    next(); // Start play
};
</script>