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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, Search, X } from "lucide-react";
import { RegenerateModal } from "@/components/regenerate-modal";

const options = ["Profile", "Billing", "Team", "Subscription"];

export function PostGenerator() {
  const [generatedPost, setGeneratedPost] = useState("");
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelect = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const removeItem = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };
  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((res) => {
      setTimeout(() => {
        res(undefined);
      }, 2000);
    });
    setGeneratedPost(
      "This is a sample generated post. Replace with actual AI-generated content."
    );
    setLoading(false);
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
        <CardFooter className="flex  flex-col items-start justify-start gap-2">
          <div className="flex gap-2">
            {generatedPost ? (
              <Button
                onClick={() => setIsRegenerateModalOpen(true)}
                disabled={loading}
                className="relative overflow-hidden"
              >
                <div
                  className={`transform transition-transform duration-300 ${loading ? "-translate-y-[250%]" : "translate-y-0"}`}
                >
                  Regenerate Post
                </div>
                <div
                  className={`absolute transform transition-transform duration-300 ${loading ? "translate-y-0" : "translate-y-[250%]"}`}
                >
                  <div className="flex items-center gap-2">
                    <span>Loading</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </div>
                </div>
              </Button>
            ) : (
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="relative overflow-hidden"
              >
                <div
                  className={`transform transition-transform duration-300 ${loading ? "-translate-y-[250%]" : "translate-y-0"}`}
                >
                  {generatedPost ? "Regenerate Post" : "Generate Post"}
                </div>
                <div
                  className={`absolute transform transition-transform duration-300 ${loading ? "translate-y-0" : "translate-y-[250%]"}`}
                >
                  <div className="flex items-center gap-2">
                    <span>Loading</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </div>
                </div>
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>Select Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="relative">
                  <Input
                    className="focus-visible:ring-0 rounded-sm pr-8 "
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search className="absolute top-4 right-4 size-4 font-light" />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {options
                  .filter((item) =>
                    item.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onSelect={(e) => {
                        e.preventDefault();
                        toggleSelect(item);
                      }}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      {item}
                      {selectedItems.includes(item) && <Check size={16} />}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {selectedItems.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {selectedItems.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {item}
                  <X
                    size={12}
                    className="cursor-pointer"
                    onClick={() => removeItem(item)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>

      <RegenerateModal
        isOpen={isRegenerateModalOpen}
        onClose={() => setIsRegenerateModalOpen(false)}
        onRegenerate={handleRegenerate}
        currentPost={generatedPost}
      />
    </div>
  );
}
