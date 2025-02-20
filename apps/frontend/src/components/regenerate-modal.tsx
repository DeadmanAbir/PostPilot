import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface RegenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: (additionalContext: string) => void;
  currentPost: string;
}

export function RegenerateModal({
  isOpen,
  onClose,
  onRegenerate,
  currentPost,
}: RegenerateModalProps) {
  const [additionalContext, setAdditionalContext] = useState("");

  const handleRegenerate = () => {
    onRegenerate(additionalContext);
    setAdditionalContext("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Regenerate Post</DialogTitle>
          <DialogDescription>
            Review the current post and provide additional context for
            regeneration.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea value={currentPost} readOnly className="min-h-[100px]" />
          <Textarea
            placeholder="Enter additional context or instructions..."
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleRegenerate}>Regenerate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
