<script setup>
import { defineProps } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
    modelValue: String,

})

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
            class: "prose max-w-none text-grey-700 prose-sm border min-h-60 max-h-[12rem] overflow-y-auto border-blue-500 p-4"
        },
        transformPastedText(text) {
            return text.toUpperCase()
        }
    },
    extensions: [StarterKit],
})
</script>

<template>
    <div>
        <div>
            <div v-if="editor" class="w-full min-h-12 p-2 rounded bg-slate-50 flex flex-wrap gap-3">
                <button @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }">
                    Bold
                </button>
                <button @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }">
                    Italic
                </button>
                <button @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }">
                    Strike
                </button>
                <button @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }">
                    Code
                </button>
                <button @click="editor.chain().focus().unsetAllMarks().run()">
                    Clear marks
                </button>
                <button @click="editor.chain().focus().clearNodes().run()">
                    Clear nodes
                </button>
                <button @click="editor.chain().focus().setParagraph().run()"
                    :class="{ 'is-active': editor.isActive('paragraph') }">
                    Paragraph
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    H1
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    H2
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                    H3
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                    H4
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                    H5
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                    H6
                </button>
                <button @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }">
                    Bullet list
                </button>
                <button @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }">
                    Ordered list
                </button>
                <button @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'is-active': editor.isActive('codeBlock') }">
                    Code block
                </button>
                <button @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'is-active': editor.isActive('blockquote') }">
                    Blockquote
                </button>
                <button @click="editor.chain().focus().setHorizontalRule().run()">
                    Horizontal rule
                </button>
                <button @click="editor.chain().focus().setHardBreak().run()">
                    Hard break
                </button>
                <button @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()">
                    Undo
                </button>
                <button @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()">
                    Redo
                </button>
                <button @click="editor.chain().focus().setColor('#958DF1').run()"
                    :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }">
                    Purple
                </button>
            </div>
        </div>
        <div>
            <editor v-model="content" />
            <editor-content class="font-serif text-yellow-300" :editor="editor" />
        </div>
    </div>
</template>