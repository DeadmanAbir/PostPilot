import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Undo,
  Redo,
} from 'lucide-react';
import { Editor as Tip } from '@tiptap/react';

import { Button } from './ui/button';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: Tip | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b py-2 px-2 flex flex-wrap items-center gap-2 dark:bg-blue-900/20 bg-gray-100/20 border">
      {/* Group 1 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`w-12 h-12 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
      >
        <Bold className="size-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`w-12 h-12 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
      >
        <Italic className="size-6" />
      </Button>
      <div className="w-px h-10 bg-border mx-1" />

      {/* Group 2 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`w-12 h-12 ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
      >
        <List className="size-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`w-12 h-12 ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
      >
        <ListOrdered className="size-6" />
      </Button>

      {/* Group 3 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`w-12 h-12 ${editor.isActive('blockquote') ? 'bg-muted' : ''}`}
      >
        <Quote className="size-6" />
      </Button>
      <div className="w-px h-10 bg-border mx-1" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`w-12 h-12 ${editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}`}
      >
        <Heading1 className="size-6" />
      </Button>

      {/* Group 4 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`w-12 h-12 ${editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}`}
      >
        <Heading2 className="size-6" />
      </Button>
      <div className="w-px h-10 bg-border mx-1" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="w-12 h-12"
      >
        <Undo className="size-6" />
      </Button>

      {/* Group 5 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="w-12 h-12"
      >
        <Redo className="size-6" />
      </Button>
    </div>
  );
};

export default function Editor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none focus:outline-none p-4 rounded-md border border-border min-h-[200px] focus-visible:ring-2 focus-visible:ring-ring dark:bg-blue-900/20 bg-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getText());
    },
  });

  return (
    <div className="w-full space-y-5">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
