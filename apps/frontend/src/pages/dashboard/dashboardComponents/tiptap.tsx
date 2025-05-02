import { useState, useEffect } from "react";
import { useEditor, EditorContent, Editor as Tip } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

// Unicode Converter from your code
interface UnicodeConverterInterface {
  bold: (text: string) => string;
  italic: (text: string) => string;
  boldItalic: (text: string) => string;
}

const UnicodeConverter: UnicodeConverterInterface = {
  bold: function (text: string): string {
    return text.replace(/[0-9A-Za-z]/g, (char: string) => {
      const code: number = char.charCodeAt(0);

      if (code >= 48 && code <= 57) {
        // 0-9
        return String.fromCodePoint(code + 120734);
      } else if (code >= 65 && code <= 90) {
        // A-Z
        return String.fromCodePoint(code + 120211);
      } else if (code >= 97 && code <= 122) {
        // a-z
        return String.fromCodePoint(code + 120205);
      }
      return char;
    });
  },

  italic: function (text: string): string {
    return text.replace(/[A-Za-z]/g, (char: string) => {
      const code: number = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        // A-Z
        return String.fromCodePoint(code + 120263);
      } else if (code >= 97 && code <= 122) {
        // a-z
        return String.fromCodePoint(code + 120257);
      }
      return char;
    });
  },

  boldItalic: function (text: string): string {
    return text.replace(/[A-Za-z]/g, (char: string) => {
      const code: number = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        // A-Z
        return String.fromCodePoint(code + 120315);
      } else if (code >= 97 && code <= 122) {
        // a-z
        return String.fromCodePoint(code + 120309);
      }
      return char;
    });
  },
};

// Function to process HTML content and apply Unicode formatting
export const processHTMLContent = (html: string): string => {
  // Create a temporary div to parse the HTML
  const tempDiv: HTMLDivElement = document.createElement("div");
  tempDiv.innerHTML = html;

  // Process the DOM tree recursively
  return processNode(tempDiv);
};

const processNode = (node: Node): string => {
  let result = "";

  // Process each child node
  node.childNodes.forEach((child: ChildNode) => {
    if (child.nodeType === Node.TEXT_NODE) {
      // For text nodes, just add the text content
      result += (child as Text).textContent || "";
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const element = child as HTMLElement;
      let text = processNode(element); // Process nested content first

      // Apply formatting based on the element type
      if (element.tagName === "STRONG" || element.tagName === "B") {
        if (
          element.querySelector("em") ||
          element.querySelector("i") ||
          element.parentElement?.tagName === "EM" ||
          element.parentElement?.tagName === "I"
        ) {
          text = UnicodeConverter.boldItalic(text);
        } else {
          text = UnicodeConverter.bold(text);
        }
      } else if (element.tagName === "EM" || element.tagName === "I") {
        if (
          element.querySelector("strong") ||
          element.querySelector("b") ||
          element.parentElement?.tagName === "STRONG" ||
          element.parentElement?.tagName === "B"
        ) {
          text = UnicodeConverter.boldItalic(text);
        } else {
          text = UnicodeConverter.italic(text);
        }
      } else if (element.tagName === "P" || element.tagName === "DIV") {
        // Add paragraph breaks for p tags, but not at the end of the content
        if (result && !result.endsWith("\n\n")) {
          text = text + "\n\n";
        }
      } else if (element.tagName === "BR") {
        text = "\n";
      }

      result += text;
    }
  });

  return result.trim();
};

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

interface MenuBarProps {
  editor: Tip | null;
  onCopy: () => void;
  copied: boolean;
}

const MenuBar = ({ editor, onCopy, copied }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b dark:border-blue-900 p-2 flex items-center justify-between gap-2 bg-background dark:bg-blue-600/20">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${editor.isActive("bold") ? "bg-muted" : ""} hover:text-blue-500 dark:hover:bg-blue-900/40`}
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
          className={`${editor.isActive("italic") ? "bg-muted" : ""} hover:text-blue-500 dark:hover:bg-blue-900/40`}
        >
          <Italic className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={onCopy}
          className={(() => {
            if (copied) {
              return "bg-green-200 dark:bg-green-800";
            }
            if (editor.isActive("bold")) {
              return "bg-muted";
            }
            return "";
          })()}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default function Editor({ value, onChange, disabled }: EditorProps) {
  const [copied, setCopied] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
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
        const htmlValue = value.replace(/\n/g, "<br>");
        editor.commands.setContent(htmlValue);
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
        console.log(err);
      }
    }
  };

  return (
    <div className="w-full ">
      <MenuBar editor={editor} onCopy={handleCopy} copied={copied} />
      <div
        className="h-[160px] overflow-auto bg-white dark:bg-blue-900/20 cursor-text"
        id="editor"
        onClick={() => editor?.commands.focus()}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            editor?.commands.focus();
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
