import { lazy, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// Import the Editor component with SSR disabled
const Editor = lazy(() => import("../tiptap-editor"));

export function TextNoteTab() {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [content, setContent] = useState("");
  const handleEditorUpdate = (content: string) => {
    setWordCount(content.split(/\s+/).filter(Boolean).length);
    setCharCount(content.length);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text Note</CardTitle>
      </CardHeader>
      <CardContent>
        <Editor
          value={content}
          onChange={setContent}
          placeholder="Write your note..."
        />
        <div className="mt-2 text-sm text-muted-foreground">
          Words: {wordCount} | Characters: {charCount}
        </div>
      </CardContent>
    </Card>
  );
}
