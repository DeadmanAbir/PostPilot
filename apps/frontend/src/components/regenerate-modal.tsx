import { useState } from 'react';
import { Wand } from 'lucide-react';

import { Dialog, DialogContent } from './ui/dialog';

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
  const [additionalContext, setAdditionalContext] = useState('');

  const handleRegenerate = () => {
    onRegenerate(additionalContext);
    setAdditionalContext('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <div className=" rounded-lg w-full  relative">
          {/* Header */}
          <h2 className="text-xl font-bold mb-2">Regenerate Post</h2>
          <p className="text-gray-400 text-sm mb-6">
            Review your previous content and provide additional instructions for
            regeneration.
          </p>

          {/* Previous Content Section */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">
              Previous Content
            </label>
            <textarea
              className="w-full border border-gray-300 dark:bg-blue-900/20 rounded-lg p-3 min-h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentPost}
              readOnly
            />
          </div>

          {/* Additional Instructions Section */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">
              Additional Instructions
            </label>
            <textarea
              className="w-full border border-gray-300 dark:bg-blue-900/20 rounded-lg p-3 min-h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide instructions for regenerating your post..."
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              disabled={isRegenerating}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleRegenerate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-600 disabled:opacity-70"
              disabled={isRegenerating}
            >
              <Wand className="size-5" />
              Regenerate
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
