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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Check, File, Globe2, Image, Twitter, X, Youtube } from "lucide-react";
import { RegenerateModal } from "@/components/regenerate-modal";
import { useAuth } from "@/providers/supabaseAuthProvider";
import {
  generatePostFn,
  regeneratePostFn,
} from "@/lib/tanstack-query/mutation";
import { LinkedinPostResponse } from "@repo/common/types";
import {
  selectPostGenerated,
  setPostGenerated,
  useAppDispatch,
  useAppSelector,
} from "../../../../store/index";
import { fetchSourcesQuery } from "@/lib/tanstack-query/query";


export function PostGenerator() {
  const { user } = useAuth();
  const [generatedPost, setGeneratedPost] = useState("");
  const postGenerated = useAppSelector(selectPostGenerated);
  const dispatch = useAppDispatch();

  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ id: string; label: string }[]>([]);

  const {
    data: optionData,
    refetch: connectLinkedinRefetch,
    isPending: isSourcesFetching,
  } = fetchSourcesQuery(user?.accessToken!);

  const { mutate, isPending } = generatePostFn(user?.accessToken!, {
    onSuccess: (data: LinkedinPostResponse) => {
      setGeneratedPost(data.post_content);
      alert("Post generated successfully");
      dispatch(setPostGenerated(true));
    },
    onError: (error: unknown) => {
      console.log(error);
      alert("error in posting");
    },
  });

  const { mutate: regeneratePost, isPending: isRegenerating } =
    regeneratePostFn(user?.accessToken!, {
      onSuccess: (data: LinkedinPostResponse) => {
        console.log(data);
        setGeneratedPost(data.post_content);
        alert("Post re-generated successfully");
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in posting");
      },
      onSettled: () => {
        setIsRegenerateModalOpen(false);
      },
    });

  const toggleSelect = (item: { id: string; label: string }) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      return exists
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item];
    });
  };

  const removeItem = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== item));
  };
  const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      query: generatedPost,
    });
    // setGeneratedPost("demo post");
    // dispatch(setPostGenerated(true));
  };

  const handleRegenerate = async (additionalContext: string) => {
    // TODO: Implement actual AI regeneration logic
    // setGeneratedPost(`Regenerated post with context: ${additionalContext}`);
    regeneratePost({
      previousPost: generatedPost,
      query: additionalContext,
    });
  };

  console.log("optionData", optionData, selectedItems);
  return (
    <form onSubmit={handleGenerate}>
      <div className="space-y-4 ">
        <Card>
          <CardHeader>
            <CardTitle>Generate Post</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <Textarea
              placeholder="Enter your prompt for AI generation..."
              className="max-h-60 h-full"
              value={generatedPost}
              disabled={isPending || isRegenerating}
              required
              rows={20}
              onChange={(e) => setGeneratedPost(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex  flex-col items-start justify-start gap-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2">
                {postGenerated ? (
                  <Button
                    type="button"
                    onClick={() => setIsRegenerateModalOpen(true)}
                    disabled={isPending || isRegenerating}
                    className="relative overflow-hidden"
                  >
                    <div
                      className={`transform transition-transform duration-300 ${isPending || isRegenerating ? "-translate-y-[250%]" : "translate-y-0"}`}
                    >
                      Regenerate Post
                    </div>
                    <div
                      className={`absolute transform transition-transform duration-300 ${isPending || isRegenerating ? "translate-y-0" : "translate-y-[250%]"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span>Loading</span>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      </div>
                    </div>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="relative overflow-hidden"
                  >
                    <div
                      className={`transform transition-transform duration-300 ${isPending || isRegenerating ? "-translate-y-[250%]" : "translate-y-0"}`}
                    >
                      {postGenerated ? "Regenerate Post" : "Generate Post"}
                    </div>
                    <div
                      className={`absolute transform transition-transform duration-300 ${isPending || isRegenerating ? "translate-y-0" : "translate-y-[250%]"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span>Loading</span>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      </div>
                    </div>
                  </Button>
                )}
                {!postGenerated && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={isSourcesFetching}>
                      <Button variant={"outline"}>Select Options</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">


                      {[
                        { label: "Files", data: optionData.files, icon: File },
                        { label: "Images", data: optionData.images, icon: Image },
                        { label: "Tweets", data: optionData.tweets, icon: Twitter },
                        { label: "Websites", data: optionData.websites, icon: Globe2 },
                        { label: "YouTube", data: optionData.youtube, icon: Youtube },
                      ].map(({ label, icon: Icon, data }) => (
                        data?.length > 0 && (
                          <DropdownMenuSub key={label}>
                            <DropdownMenuSubTrigger className="gap-2">
                              <Icon /> <span>{label}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
                                {data.map((item: { id?: string; name?: string; url?: string; tweet?: string }, index: number) => (
                                  <DropdownMenuItem
                                    key={item.id || index}
                                    onSelect={(e: Event) => {
                                      e.preventDefault();
                                      toggleSelect({
                                        id: item.id || index.toString(),
                                        label: item.name || item.url || item.tweet || "Untitled",
                                      });
                                    }}
                                    className="flex justify-between gap-2"
                                  >
                                    <span className="truncate w-48">
                                      {item.name || item.url || item.tweet || "Untitled"}
                                    </span>
                                    {selectedItems.some((i) => i.id === (item.id || index.toString())) && (
                                      <Check size={16} />
                                    )}
                                  </DropdownMenuItem>

                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        )
                      ))}

                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {selectedItems.map((item) => (
                  <Badge
                    key={item.id}
                    variant="outline"
                    className="flex items-center gap-1 w-40"
                  >
                    <span className="truncate overflow-hidden whitespace-nowrap flex-1">
                      {item.label}
                    </span>
                    <X
                      size={12}
                      className="cursor-pointer shrink-0"
                      onClick={() => removeItem(item.id)}
                    />
                  </Badge>
                ))}
              </div>
            )}

          </CardFooter>
        </Card>

        <RegenerateModal
          isRegenerating={isRegenerating}
          isOpen={isRegenerateModalOpen}
          onClose={() => setIsRegenerateModalOpen(false)}
          onRegenerate={handleRegenerate}
          currentPost={generatedPost}
        />
      </div>
    </form>
  );
}
