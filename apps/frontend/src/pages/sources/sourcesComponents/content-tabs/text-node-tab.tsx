import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { addNodeContentFn } from "@/lib/tanstack-query/mutation";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { lazy, Suspense, useState } from "react";
// Import the Editor component with SSR disabled
const Editor = lazy(() => import("../../../../components/tiptap-editor"));

export function TextNoteTab() {
  const { user } = useAuth();

  const [content, setContent] = useState({
    name: "Text Editor",
    description: "",
  });

  const { mutate: addNodeContent, isPending: isLoading } = addNodeContentFn(
    user?.accessToken!,
    {
      onSuccess: (data: unknown) => {
        console.log(data);
        alert("content added successfully");
        setContent({
          name: "Text Editor",
          description: "",
        });
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in adding content");
      },
    }
  );

  const handleSave = () => {
    addNodeContent(content);
  };

  return (
    <Card>
      <CardHeader>
        <input
          type="text"
          value={content.name}
          onChange={(e) => {
            setContent({
              ...content,
              name: e.target.value,
            });
          }}
          className="font-semibold outline-none dark:bg-background"
        />
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="h-20 flex items-center justify-center gap-4">
              Loading..
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
          }
        >
          <Editor
            value={content.description}
            onChange={(newValue) => {
              setContent({
                ...content,
                description: newValue,
              });
            }}
            placeholder="Write your note..."
          />
        </Suspense>

        <div className="mt-2 text-sm text-muted-foreground">
          Words: {countWords(content.description)} | Characters:{" "}
          {content.description.length}
        </div>

        {content && (
          <div className="mt-2 text-sm text-muted-foreground">
            <Button disabled={isLoading} onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const countWords = (text: string | null | undefined): number => {
  if (!text) {
    return 0;
  }

  const trimmedText = text.trim();
  if (trimmedText === "") {
    return 0;
  }

  const words = trimmedText.split(/\s+/);

  const filteredWords = words.filter((word) => word !== "");

  return filteredWords.length;
};
