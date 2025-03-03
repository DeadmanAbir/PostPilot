import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { RegenerateModal } from "../../../components/regenerate-modal";
export function PostGenerator() {
  const [generatedPost, setGeneratedPost] = useState("");
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const handleGenerate = async () => {
    setLoading(true)
    await new Promise((res) => {
      setTimeout(() => {
        res(undefined)
      }, 2000)
    })
    setGeneratedPost(
      "This is a sample generated post. Replace with actual AI-generated content."
    );
    setLoading(false)
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
            value={generatedPost}
          />
        </CardContent>
        <CardFooter className="flex gap-2">

          {generatedPost ? (<Button
            onClick={() => setIsRegenerateModalOpen(true)}
            disabled={loading}
            className="relative "
          >
            <div className={`transform transition-transform duration-300 ${loading ? '-translate-y-[250%]' : 'translate-y-0'}`}>
              Regenerate Post
            </div>
            <div className={`absolute transform transition-transform duration-300 ${loading ? 'translate-y-0' : 'translate-y-[250%]'}`}>
              <div className="flex items-center gap-2">
                <span>Loading</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </div>
            </div>
          </Button>) : (<Button
            onClick={handleGenerate}
            disabled={loading}
            className="relative "
          >
            <div className={`transform transition-transform duration-300 ${loading ? '-translate-y-[250%]' : 'translate-y-0'}`}>
              {generatedPost ? "Regenerate Post" : "Generate Post"}
            </div>
            <div className={`absolute transform transition-transform duration-300 ${loading ? 'translate-y-0' : 'translate-y-[250%]'}`}>
              <div className="flex items-center gap-2">
                <span>Loading</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </div>
            </div>
          </Button>)}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

        </CardFooter>
      </Card>

      {/* {generatedPost && (
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
      )} */}

      <RegenerateModal
        isOpen={isRegenerateModalOpen}
        onClose={() => setIsRegenerateModalOpen(false)}
        onRegenerate={handleRegenerate}
        currentPost={generatedPost}
      />
    </div>
  );
}
