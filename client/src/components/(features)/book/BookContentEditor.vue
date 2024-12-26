<script setup lang="ts">
import { watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button';
import { Bold, Heading5, Italic, List, Pilcrow, Quote, Redo, Undo } from 'lucide-vue-next';

const props = defineProps<{
    modelValue?: string;
}>();

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: props.modelValue,
    onUpdate: ({ editor }) => {
        console.log(editor.getHTML())
        emit('update:modelValue', editor.getHTML())
    },
    editorProps: {
        attributes: {
            spellcheck: "true",
            class: "prose max-w-none text-gray-700 dark:text-slate-50 prose-sm  min-h-80  max-h-[800px] overflow-y-auto focus:outline-none p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 scrollbar-thumb-rounded-full"
        },
        transformPastedText(text) {
            return text.toUpperCase()
        }
    },
    extensions: [StarterKit],
})

watch(
    () => props.modelValue,
    (newValue) => {
        if (editor.value && typeof newValue === 'string') {
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
            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
                <Bold class="text-slate-800 dark:text-slate-50" />
            </Button>

            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
                <Italic class="text-slate-800 dark:text-slate-50" />
            </Button>

            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }">
                <Pilcrow class="text-slate-800 dark:text-slate-50" />
            </Button>

            <Button variant="ghost"
                class="bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200 dark:text-slate-50"
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                Heading
            </Button>

            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                <Heading5 class="text-slate-800 dark:text-slate-50" />
            </Button>

            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
                <List class="text-slate-800 dark:text-slate-50" />
            </Button>

            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }">
                <Quote class="text-slate-800 dark:text-slate-50" />
            </Button>

            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
                <Undo class="text-slate-800 dark:text-slate-50" />
            </Button>

            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
                <Redo class="text-slate-800 dark:text-slate-50" />
            </Button>

            <Button class="rounded-full w-8 h-8 bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-slate-200"
                @click="editor.chain().focus().setColor('#958DF1').run()"
                :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            </Button>
        </div>
        <div>
            <editor v-model="content" />
            <editor-content class="font-serif text-slate-900 dark:text-white" :editor="editor" />
        </div>
    </div>

</template>