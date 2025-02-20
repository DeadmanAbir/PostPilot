import type React from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapProps {
  onUpdate: (content: string) => void;
}

export const Tiptap: React.FC<TiptapProps> = ({ onUpdate }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      onUpdate(editor.getText());
    },
  });

  return <EditorContent editor={editor} />;
};
