import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

interface RegenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: (additionalContext: string) => void;
  currentPost: string;
  isRegenerating: boolean;
}

export function RegenerateModal({
  isOpen,
  onClose,
  onRegenerate,
  currentPost,
  isRegenerating,
}: RegenerateModalProps) {
  const [additionalContext, setAdditionalContext] = useState("");
  const [open, setIsOpen] = useState(false);

  const handleRegenerate = () => {
    onRegenerate(additionalContext);
    setAdditionalContext("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <h1 className="text-center text-black-200 text-xl font-bold ">
          Regenerate Post
        </h1>

        <div className="bg-white  grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
          <textarea
            placeholder="Your feedback..."
            className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
            value={currentPost}
            readOnly
          ></textarea>
        </div>
        <Collapsible
          open={open}
          onOpenChange={setIsOpen}
          className="w-full space-y-2 "
        >
          <div className="flex items-center justify-between space-x-4 px-3  w-full ">
            <h4 className="text-sm font-semibold">Add Additonal Context</h4>
            <CollapsibleTrigger asChild className="">
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="space-y-2 px-3">
            <Textarea
              placeholder="Enter additional context or instructions..."
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              className="min-h-[100px]"
              readOnly={isRegenerating}
            />
          </CollapsibleContent>
        </Collapsible>
        <div className="flex items-center justify-end w-full ">
          <button
            disabled={isRegenerating}
            onClick={handleRegenerate}
            className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
              ></path>
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                d="M10.11 13.6501L13.69 10.0601"
              ></path>
            </svg>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
