<template>
    <editor-content :editor="editor" />
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

onMounted(() => {
    editor.value = new Editor({
        content: props.modelValue,
        onUpdate: ({ editor }) => {
            emit('update:modelValue', editor.getHTML())
        },
        extensions: [
            StarterKit,
        ],
        editorProps: {
            attributes: {
                spellcheck: "true",
                class: "prose max-w-none text-grey-700 prose-sm border min-h-60 overflow-y-auto border-blue-500 p-4"
            },
            transformPastedText(text) {
                return text.toUpperCase()
            }
        },
    })
})

watch(() => props.modelValue, (newValue) => {
    if (editor.value) {
        const isSame = editor.value.getHTML() === newValue;

        // If the new value is already the same, skip updating the content
        if (!isSame) {
            editor.value.commands.setContent(newValue, false);
        }
    }
});




</script>
