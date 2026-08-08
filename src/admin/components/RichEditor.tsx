'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImageIcon
} from 'lucide-react'

interface RichEditorProps {
  content: string
  onChange: (html: string) => void
}

export default function RichEditor({ content, onChange }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class:
          'prose max-w-none p-4 min-h-[280px] focus:outline-none text-sm text-[#1e1e1e] cursor-text outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('URL de l\'image :')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL du lien :', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div
      onClick={() => {
        if (editor && !editor.isFocused) {
          editor.chain().focus().run()
        }
      }}
      className="border border-[#8c8f94] rounded-sm overflow-hidden bg-white cursor-text focus-within:border-[#2271b1] focus-within:ring-1 focus-within:ring-[#2271b1] transition-shadow"
    >
      {/* WordPress-style Toolbar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-wrap items-center gap-1 bg-[#f6f7f7] border-b border-[#dcdcde] p-1.5 text-xs text-[#1d2327] select-none"
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] transition-colors ${
            editor.isActive('bold') ? 'bg-[#dcdcde] font-bold text-[#2271b1]' : ''
          }`}
          title="Gras"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] transition-colors ${
            editor.isActive('italic') ? 'bg-[#dcdcde] text-[#2271b1]' : ''
          }`}
          title="Italique"
        >
          <Italic className="h-4 w-4" />
        </button>
        <span className="w-px h-4 bg-[#dcdcde] mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[#dcdcde] text-[#2271b1]' : ''
          }`}
          title="Titre H2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-[#dcdcde] text-[#2271b1]' : ''
          }`}
          title="Titre H3"
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <span className="w-px h-4 bg-[#dcdcde] mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] transition-colors ${
            editor.isActive('bulletList') ? 'bg-[#dcdcde] text-[#2271b1]' : ''
          }`}
          title="Liste à puces"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] transition-colors ${
            editor.isActive('orderedList') ? 'bg-[#dcdcde] text-[#2271b1]' : ''
          }`}
          title="Liste numérotée"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] transition-colors ${
            editor.isActive('blockquote') ? 'bg-[#dcdcde] text-[#2271b1]' : ''
          }`}
          title="Citation"
        >
          <Quote className="h-4 w-4" />
        </button>
        <span className="w-px h-4 bg-[#dcdcde] mx-1" />
        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded hover:bg-[#dcdcde] transition-colors ${
            editor.isActive('link') ? 'bg-[#dcdcde] text-[#2271b1]' : ''
          }`}
          title="Insérer un lien"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded hover:bg-[#dcdcde] transition-colors"
          title="Insérer une image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <span className="w-px h-4 bg-[#dcdcde] mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded hover:bg-[#dcdcde] transition-colors"
          title="Annuler"
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded hover:bg-[#dcdcde] transition-colors"
          title="Rétablir"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="min-h-[280px] cursor-text">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
