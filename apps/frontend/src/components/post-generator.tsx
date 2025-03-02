import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { RegenerateModal } from "./regenerate-modal";
export function PostGenerator() {
  const [generatedPost, setGeneratedPost] = useState("");
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);

  const handleGenerate = async () => {
    // TODO: Implement actual AI generation logic
    setGeneratedPost(
      "This is a sample generated post. Replace with actual AI-generated content."
    );
  };

  const handleRegenerate = async (additionalContext: string) => {
    // TODO: Implement actual AI regeneration logic
    setGeneratedPost(`Regenerated post with context: ${additionalContext}`);
    setIsRegenerateModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your prompt for AI generation..."
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate}>Generate Post</Button>
        </CardFooter>
      </Card>

      {generatedPost && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Post</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{generatedPost}</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => setIsRegenerateModalOpen(true)}
            >
              Regenerate
            </Button>
            <Button className="ml-2">Use This Post</Button>
          </CardFooter>
        </Card>
      )}

      <RegenerateModal
        isOpen={isRegenerateModalOpen}
        onClose={() => setIsRegenerateModalOpen(false)}
        onRegenerate={handleRegenerate}
        currentPost={generatedPost}
      />
    </div>
  );
}
