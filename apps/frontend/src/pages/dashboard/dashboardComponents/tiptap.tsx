import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Code, Copy, Check } from "lucide-react";

// Unicode Converter from your code
const UnicodeConverter = {
  bold: function(text) {
    return text.replace(/[0-9A-Za-z]/g, (char) => {
      const code = char.charCodeAt(0);
      
      if (code >= 48 && code <= 57) { // 0-9
        return String.fromCodePoint(code + 120734);
      } else if (code >= 65 && code <= 90) { // A-Z
        return String.fromCodePoint(code + 120211);
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCodePoint(code + 120205);
      }
      return char;
    });
  },
  
  italic: function(text) {
    return text.replace(/[A-Za-z]/g, (char) => {
      const code = char.charCodeAt(0);
      
      if (code >= 65 && code <= 90) { // A-Z
        return String.fromCodePoint(code + 120263);
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCodePoint(code + 120257);
      }
      return char;
    });
  },
  
  boldItalic: function(text) {
    return text.replace(/[A-Za-z]/g, (char) => {
      const code = char.charCodeAt(0);
      
      if (code >= 65 && code <= 90) { // A-Z
        return String.fromCodePoint(code + 120315);
      } else if (code >= 97 && code <= 122) { // a-z
        return String.fromCodePoint(code + 120309);
      }
      return char;
    });
  }
};

// Function to process HTML content and apply Unicode formatting
export const processHTMLContent = (html) => {
  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Process the DOM tree recursively
  return processNode(tempDiv);
};
 const processNode = (node) => {
  let result = '';
  
  // Process each child node
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      // For text nodes, just add the text content
      result += child.textContent;
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const element = child;
      let text = processNode(element); // Process nested content first
      
      // Apply formatting based on the element type
      if (element.tagName === 'STRONG' || element.tagName === 'B') {
        if (element.querySelector('em') || element.querySelector('i') || 
            element.parentElement?.tagName === 'EM' || element.parentElement?.tagName === 'I') {
          text = UnicodeConverter.boldItalic(text);
        } else {
          text = UnicodeConverter.bold(text);
        }
      } else if (element.tagName === 'EM' || element.tagName === 'I') {
        if (element.querySelector('strong') || element.querySelector('b') || 
            element.parentElement?.tagName === 'STRONG' || element.parentElement?.tagName === 'B') {
          text = UnicodeConverter.boldItalic(text);
        } else {
          text = UnicodeConverter.italic(text);
        }
      } else if (element.tagName === 'P' || element.tagName === 'DIV') {
        // Add paragraph breaks for p tags, but not at the end of the content
        if (result && !result.endsWith('\n\n')) {
          text = text + '\n\n';
        }
      } else if (element.tagName === 'BR') {
        text = '\n';
      }
      
      result += text;
    }
  });
  
  return result.trim();
};

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled:boolean
}

interface MenuBarProps {
  editor: any;
  onCopy: () => void;
  copied: boolean;
}

const MenuBar = ({ editor, onCopy, copied }: MenuBarProps) => {
  if (!editor) {
    return null;
  }
  
  return (
    <div className="border-b dark:border-blue-900 p-2 flex items-center justify-between gap-2 bg-background dark:bg-blue-600/20">
      <div className='flex items-center gap-2'>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }} 
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>

      </div>
      <div className='flex items-center gap-2'>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={onCopy}
        className={copied ? "bg-green-200 dark:bg-green-800" : editor.isActive("bold") ? "bg-muted" : ""}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} 
      </Button>
     

      </div>
    </div>
  );
};

export default function Editor({ value, onChange,disabled }: EditorProps) {
  const [copied, setCopied] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
    ],
    content: value,
    editable: !disabled,

    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes (e.g., from API)
  useEffect(() => {
    if (editor) {
      if (value !== editor.getHTML()) {
        editor.commands.setContent(value);
      }
      editor.setEditable(!disabled);
    }
  }, [value, disabled, editor]);

  // Copy handler
  const handleCopy = async () => {
    if (editor) {
      const html = editor.getHTML();
      const processed = processHTMLContent(html);
      try {
        await navigator.clipboard.writeText(processed);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      } catch (err) {
        setCopied(false);
      }
    }
  };

  return (
    <div className="w-full border dark:border-blue-900">
      <MenuBar editor={editor} onCopy={handleCopy} copied={copied} />
      <div className="h-[160px] overflow-auto bg-white dark:bg-blue-900/20" id="imageLoad">
      <EditorContent editor={editor} />
    </div>
      

    </div>
  );
}