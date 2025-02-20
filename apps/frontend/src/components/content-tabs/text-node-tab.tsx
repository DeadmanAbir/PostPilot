import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tiptap } from "../tiptap-editor";

export function TextNoteTab() {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

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
        <Tiptap onUpdate={handleEditorUpdate} />
        <div className="mt-2 text-sm text-muted-foreground">
          Words: {wordCount} | Characters: {charCount}
        </div>
      </CardContent>
    </Card>
  );
}
