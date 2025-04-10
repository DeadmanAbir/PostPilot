import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react';
import { useCallback, useState } from 'react';

// Text conversion utility for LinkedIn formatting
const textFormat = {
  bold: function(text: string) {
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
  
  italic: function(text: string) {
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
  
  boldItalic: function(text: string) {
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

// Convert HTML with formatting tags to Unicode formatted text
const convertHtmlToLinkedInFormat = (html: string): string => {
  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Process the DOM tree recursively to maintain paragraph structure
  const processNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      let result = '';
      
      // Get inner content first
      let content = '';
      element.childNodes.forEach(child => {
        content += processNode(child);
      });
      
      // Apply formatting based on element type
      const tagName = element.tagName.toLowerCase();
      if (tagName === 'strong' && element.classList.contains('em')) {
        result = textFormat.boldItalic(content);
      } else if (tagName === 'strong') {
        result = textFormat.bold(content);
      } else if (tagName === 'em') {
        result = textFormat.italic(content);
      } else {
        result = content;
      }
      
      // Add line breaks for paragraph elements
      if (tagName === 'p') {
        result += '\n\n';
      }
      
      return result;
    }
    
    return '';
  };
  
  // Process the entire content
  const result = processNode(tempDiv);
  
  // Trim extra line breaks
  return result.trim();
};

// Handles the case when both bold and italic are applied to the same text
const handleNestedFormatting = (html: string): string => {
  // Replace nested <strong><em>text</em></strong> or <em><strong>text</strong></em> patterns
  // with <strong class="em">text</strong> for easier processing
  const processedHtml = html
    .replace(/<strong><em>(.*?)<\/em><\/strong>/g, '<strong class="em">$1</strong>')
    .replace(/<em><strong>(.*?)<\/strong><\/em>/g, '<strong class="em">$1</strong>');
    
  return processedHtml;
};

interface TiptapEditorProps {
  initialValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  rows?: number;
}

const TiptapEditor = ({
  initialValue = "",
  placeholder = "Enter your prompt for AI generation...",
  disabled = false,
  onChange,
  className = "max-h-[30vh] min-h-[20vh] h-full",
  rows = 20
}: TiptapEditorProps) => {
  const [linkedInContent, setLinkedInContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: initialValue || `<p>${placeholder}</p>`,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Update parent component if onChange is provided
      if (onChange) {
        onChange(html);
      }
      
      // Calculate the LinkedIn formatted version
      const processedHtml = handleNestedFormatting(html);
      const formatted = convertHtmlToLinkedInFormat(processedHtml);
      setLinkedInContent(formatted);
    }
  });
  
  // Toggle bold formatting on the current selection
  const toggleBold = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
  }, [editor]);
  
  // Toggle italic formatting on the current selection
  const toggleItalic = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleItalic().run();
  }, [editor]);
  
  // This function would be called when posting to LinkedIn
  const postToLinkedIn = useCallback(() => {
    console.log('Content ready for LinkedIn:', linkedInContent);
    // apiClient.postToLinkedIn(linkedInContent);
  }, [linkedInContent]);
  
  // Calculate appropriate height based on rows
  const editorHeight = `${Math.max(20, Math.min(30, rows * 1.5))}vh`;
  
  return (
    <div className="tiptap-editor-container">
      <div className="editor-toolbar mb-2">
        <button 
          onClick={toggleBold} 
          className={`mr-2 px-3 py-1 rounded ${editor?.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          disabled={disabled}
          type='button'
        >
          Bold
        </button>
        <button 
          onClick={toggleItalic} 
          className={`px-3 py-1 rounded ${editor?.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          disabled={disabled}
          type='button'
        >
          Italic
        </button>
      </div>
      
      <div 
        className={`tiptap-editor-content border rounded p-3 ${className}`} 
        style={{ height: editorHeight }}
      >
        <EditorContent editor={editor} />
      </div>
      
   
    </div>
  );
};

export default TiptapEditor;