import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lazy, Suspense, useState } from "react";
// Import the Editor component with SSR disabled
const Editor = lazy(() => import("../../../../components/tiptap-editor"));

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
        <Suspense fallback={ <div className="h-20 flex items-center justify-center gap-4">
          Loading..
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

        </div> }>

          <Editor
            value={content}
            onChange={setContent}
            placeholder="Write your note..."
          />
        </Suspense>

        <div className="mt-2 text-sm text-muted-foreground">
          Words: {wordCount} | Characters: {charCount}
        </div>
      </CardContent>
    </Card>
  );
}
