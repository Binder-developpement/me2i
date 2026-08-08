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
    <div className="border border-[#8c8f94] rounded-sm overflow-hidden bg-white">
      {/* WordPress-style Toolbar */}
      <div className="flex flex-wrap items-center gap-1 bg-[#f6f7f7] border-b border-[#dcdcde] p-1.5 text-xs text-[#1d2327]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] ${
            editor.isActive('bold') ? 'bg-[#dcdcde] font-bold' : ''
          }`}
          title="Gras"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] ${
            editor.isActive('italic') ? 'bg-[#dcdcde]' : ''
          }`}
          title="Italique"
        >
          <Italic className="h-4 w-4" />
        </button>
        <span className="w-px h-4 bg-[#dcdcde] mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[#dcdcde]' : ''
          }`}
          title="Titre H2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] ${
            editor.isActive('heading', { level: 3 }) ? 'bg-[#dcdcde]' : ''
          }`}
          title="Titre H3"
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <span className="w-px h-4 bg-[#dcdcde] mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] ${
            editor.isActive('bulletList') ? 'bg-[#dcdcde]' : ''
          }`}
          title="Liste à puces"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] ${
            editor.isActive('orderedList') ? 'bg-[#dcdcde]' : ''
          }`}
          title="Liste numérotée"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-[#dcdcde] ${
            editor.isActive('blockquote') ? 'bg-[#dcdcde]' : ''
          }`}
          title="Citation"
        >
          <Quote className="h-4 w-4" />
        </button>
        <span className="w-px h-4 bg-[#dcdcde] mx-1" />
        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded hover:bg-[#dcdcde] ${
            editor.isActive('link') ? 'bg-[#dcdcde]' : ''
          }`}
          title="Inserer un lien"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded hover:bg-[#dcdcde]"
          title="Insérer une image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <span className="w-px h-4 bg-[#dcdcde] mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded hover:bg-[#dcdcde]"
          title="Annuler"
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded hover:bg-[#dcdcde]"
          title="Rétablir"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[260px] focus:outline-none text-sm text-[#1e1e1e]"
      />
    </div>
  )
}
