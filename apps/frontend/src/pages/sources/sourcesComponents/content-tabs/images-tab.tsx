import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { addRemoteImagesFn } from "@/lib/tanstack-query/mutation";
import { useAuth } from "@/providers/supabaseAuthProvider";

export function ImagesTab() {
  const { user } = useAuth();
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [remoteImageUrl, setRemoteImageUrl] = useState("");
  const [remoteImages, setRemoteImages] = useState<string[]>([]);

  const { mutate: addRemoteImages, isPending: isRemoteFetching } =
    addRemoteImagesFn(user?.accessToken!, {
      onSuccess: () => {
        alert("remote images added  successfully");
        setRemoteImages([]);
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in adding remote images");
      },
    });

  const handleLocalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLocalImages(Array.from(e.target.files));
    }
  };

  const handleRemoteImageLoad = async () => {
    if (remoteImageUrl) {
      const response = await fetch(remoteImageUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        return;
      }

      setRemoteImages([...remoteImages, remoteImageUrl]);
      setRemoteImageUrl("");
    }
  };

  const handleRemoveLocalImage = (index: number) => {
    setLocalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveRemoteImage = (index: number) => {
    setRemoteImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocalFileUpload = () => {
    alert("uploading local files");
  };

  const handleRemoteFileUpload = () => {
    const remoteImageData = remoteImages.map((url) => ({
      url,
    }));
    addRemoteImages(remoteImageData);
  };

  return (
    <Card id="imageLoad">
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local">
          <TabsList>
            <TabsTrigger value="local">Local Upload</TabsTrigger>
            <TabsTrigger value="remote">Remote URL</TabsTrigger>
          </TabsList>

          {/* Local Upload Tab */}
          <TabsContent
            id="imageLoad"
            value="local"
            className="max-h-[50vh] overflow-y-scroll"
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image-upload">Upload Images</Label>
              <Input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleLocalImageChange}
              />
            </div>
            {localImages.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Image Previews:</h4>
                <div className="flex flex-wrap gap-5">
                  <AnimatePresence>
                    {localImages.map((file, index) => (
                      <motion.div
                        key={`local-${index}`}
                        className="relative aspect-square group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Local image ${index + 1}`}
                          className="object-cover rounded size-20"
                        />
                        {/* Trash Icon for Deleting Local Images */}
                        <button
                          onClick={() => handleRemoveLocalImage(index)}
                          className="absolute -top-2 -right-3 bg-white border-2 rounded-full p-1 hidden group-hover:flex cursor-pointer hover:text-red-400 hover:border-red-300"
                        >
                          <Trash className="size-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="w-full flex items-center justify-center">
                  <Button
                    onClick={handleLocalFileUpload}
                    variant="default"
                    size="sm"
                    className="w-1/4 mt-5"
                  >
                    Upload
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Remote URL Tab */}
          <TabsContent
            id="imageLoad"
            value="remote"
            className="max-h-[50vh] overflow-y-scroll"
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={remoteImageUrl}
                  onChange={(e) => setRemoteImageUrl(e.target.value)}
                />
                <Button
                  disabled={isRemoteFetching}
                  onClick={handleRemoteImageLoad}
                >
                  Preview Image
                </Button>
              </div>
            </div>
            {remoteImages.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Image Previews:</h4>
                <div className="flex flex-wrap gap-5">
                  <AnimatePresence>
                    {remoteImages.map((url, index) => (
                      <motion.div
                        key={`remote-${index}`}
                        className="relative aspect-square group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Remote image ${index + 1}`}
                          className="object-cover rounded size-20"
                        />
                        {/* Trash Icon for Deleting Remote Images */}
                        <button
                          onClick={() => handleRemoveRemoteImage(index)}
                          className="absolute -top-2 -right-3 bg-white border-2 rounded-full p-1 hidden group-hover:flex cursor-pointer hover:text-red-400 hover:border-red-300"
                        >
                          <Trash className="size-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="w-full flex items-center justify-center">
                  <Button
                    onClick={handleRemoteFileUpload}
                    disabled={isRemoteFetching}
                    variant="default"
                    size="sm"
                    className="w-1/4 mt-5"
                  >
                    Upload
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
