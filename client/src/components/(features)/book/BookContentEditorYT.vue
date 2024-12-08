<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onMounted, ref, watch } from 'vue';
import { Bold, Heading5, Italic, List, Pilcrow, Quote, Redo, Undo } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits(['update:modelValue'])

const editor = ref<Editor | undefined>()

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
                class: "prose max-w-none text-grey-700 prose-sm  min-h-60 overflow-y-auto focus:outline-none p-4"
            },
            transformPastedText(text) {
                return text.toUpperCase()
            }
        },
    })
})

watch(
    () => props.modelValue,
    (newValue: string) => {
        if (editor.value) {
            const isSame = editor.value.getHTML() === newValue;

            // If the new value is already the same, skip updating the content
            if (!isSame) {
                editor.value.commands.setContent(newValue, false);
            }
        }
    }
);
</script>

<template>
    <div class="rounded-lg border space-y-2">

        <div v-if="editor" class="w-full min-h-12 p-2 flex flex-wrap gap-3 border-b border-slate-200">
            <Button class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
                <Bold class="text-slate-800" />
            </Button>
            <Button class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
                <Italic class="text-slate-800" />
            </Button>
            <Button class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }">
                <Pilcrow class="text-slate-800" />
            </Button>
            <Button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" variant="ghost"
                class="bg-slate-100 hover:bg-slate-200"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                Heading
            </Button>
            <Button class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                <Heading5 class="text-slate-800" />
            </Button>
            <Button class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
                <List class="text-slate-800" />
            </Button>

            <Button @click="editor.chain().focus().toggleBlockquote().run()"
                class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                :class="{ 'is-active': editor.isActive('blockquote') }">
                <Quote class="text-slate-800" />
            </Button>
            <Button class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
                <Undo class="text-slate-800" />
            </Button>
            <Button class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
                <Redo class="text-slate-800" />
            </Button>
            <Button class="rounded-full w-8 h-8 bg-slate-100 hover:bg-slate-200"
                @click="editor.chain().focus().setColor('#4056F4').run()"
                :class="{ 'is-active': editor.isActive('textStyle', { color: '#4056F4' }) }">
                <div class="w-2 h-2 bg-blue-500 rounded-full">
                </div>
            </Button>
        </div>
        <editor-content :editor="editor" />
    </div>
</template>