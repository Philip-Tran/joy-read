<script setup>
import axios from "axios"
import { ref, onMounted } from "vue"
import { Input } from '@/components/ui/input'


const text = ref("I love you")
const translatedText = ref("")
const definitionText = ref("")

onMounted(async () => {
  try {
    const response = await axios.get(`https://lingva.ml/api/v1/en/es/${text.value}`)
    console.log(response.data)
    console.log(translatedText.value)
    translatedText.value = response.data.translation
    return await response.data
  } catch (error) {
    console.log(error)
  }
})

const handleTranslate = async () => {
  try {
    const response = await axios.get(`https://lingva.ml/api/v1/${lang.value}/${toLang.value}/${text.value}`)
    console.log(response.data)
    console.log(translatedText.value)
    translatedText.value = response.data.translation
    definitionText.value = response.data.info.definitions
    console.log(response.data.info.definitions)
    return await response.data
  } catch (error) {
    console.log(error)
  }
}

const fetchAudio = async (txt, lang) => {
  try {
    const encodedText = encodeURIComponent(txt)
    const response = await axios.get(`https://lingva.ml/api/v1/audio/${lang}/${encodedText}`)

    const audioBlob = new Blob([new Uint8Array(response.data.audio)], { type: "audio/mpeg" });

    audioUrl.value = URL.createObjectURL(audioBlob);
    return response.data.audio
  } catch (error) {
    console.error("error", error)
  }
}

console.log("hehe", fetchAudio("Este es interesante", "es"))

const lang = ref("es")
const toLang = ref("en")
const audioUrl = ref("");

</script>

<template>
  <div class="w-full flex flex-col items-center">
    <h1>This is an about page</h1>
    <div>
      <h1>Play Audio</h1>
      <!-- Only render the audio element if the URL is ready -->
      <audio v-if="audioUrl" :src="audioUrl" controls></audio>
    </div>
    <div class="flex bg-slate-300">{{ lang }}, {{ toLang }}</div>
    <select v-model="lang" name="lang" id="lang">
      <option value="es">Espanol</option>
      <option value="en">English</option>
      <option value="vi">VietNamese</option>
    </select>
    <select v-model="toLang" id="toLang">
      <option value="es">Espanol</option>
      <option value="en">English</option>
      <option value="vi">VietNamese</option>
    </select>
    <Input v-model="text" type="text" placeholder="text" />
    <button @click="handleTranslate">trans</button>
    <p>This is the translation</p>
    <p>{{ text }}</p>
    <p v-if="translatedText">{{ translatedText }}</p>
    <h1 class="text-blue-500">{{ definitionText }}</h1>
    <div>

    </div>

  </div>
</template>

<style></style>
