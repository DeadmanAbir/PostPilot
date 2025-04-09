import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  addLocalImagesFn,
  addRemoteImagesFn,
} from "@/lib/tanstack-query/mutation";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabaseClient";
export function ImagesTab() {
  const { user } = useAuth();
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [remoteImageUrl, setRemoteImageUrl] = useState({
    name: "",
    url: "",
  });
  const [remoteImages, setRemoteImages] = useState<
    { name: string; url: string }[]
  >([]);

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

  const { mutate: addLocalImages, isPending: isLocalFetching } =
    addLocalImagesFn(user?.accessToken!, {
      onSuccess: () => {
        alert("local images added  successfully");
        setLocalImages([]);
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in adding local images");
      },
    });

  const uploadToSupabase = async (bucket: string) => {
    const fileUrls: { name: string; url: string; storage_name: string }[] = [];
    try {
      for (const image of localImages) {
        const fileExtension = image.name.split(".").pop();
        const fileName = `${nanoid()}.${fileExtension}`;
        const actualFileName = image.name;

        const filePath = `${user?.user?.id}/${fileName}`;

        const { error } = await supabase.storage
          .from(bucket)
          .upload(filePath, image);

        if (error) {
          console.error("Error uploading file:", error.message);
          alert("error in uploading file");
          throw error;
        }

        // Get the public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        // Add the public URL to our array
        fileUrls.push({
          name: actualFileName,
          url: urlData.publicUrl,
          storage_name: fileName,
        });
      }

      return fileUrls;
    } catch (error) {
      console.error("Error in file upload process:", error);
      throw error;
    }
  };

  const handleLocalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLocalImages(Array.from(e.target.files));
    }
  };

  const handleRemoteImageLoad = async () => {
    if (remoteImageUrl) {
      const response = await fetch(remoteImageUrl.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        return;
      }

      setRemoteImages([...remoteImages, remoteImageUrl]);
      setRemoteImageUrl({ name: "", url: "" });
    }
  };

  const handleRemoveLocalImage = (index: number) => {
    setLocalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveRemoteImage = (index: number) => {
    setRemoteImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocalImageUpload = async () => {
    const bucket = "post-pilot";

    const uploadedResults = await uploadToSupabase(bucket);
    addLocalImages(uploadedResults);
  };

  const handleRemoteFileUpload = () => {
    const remoteImageData = remoteImages.map((file) => ({
      url: file.url,
      fileName: file.name,
    }));
    console.log("remoteImageData", remoteImageData);
    addRemoteImages(remoteImageData);
  };

  return (
    <div className="w-full h-full py-20">
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
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                  onChange={handleLocalImageChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: JPG, PNG, WebP, GIF, SVG
                </p>
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
                            src={
                              URL.createObjectURL(file) || "/placeholder.svg"
                            }
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
                      onClick={handleLocalImageUpload}
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRemoteImageLoad();
                  }}
                  className="flex space-x-2"
                >
                  <Input
                    id="image-name"
                    placeholder="Image Name"
                    value={remoteImageUrl.name}
                    required
                    onChange={(e) =>
                      setRemoteImageUrl((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    id="image-url"
                    placeholder="Image Url"
                    value={remoteImageUrl.url}
                    required
                    onChange={(e) =>
                      setRemoteImageUrl((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                  />

                  <Button
                    type="submit"
                    disabled={isRemoteFetching || isLocalFetching}
                  >
                    Preview Image
                  </Button>
                </form>
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
                            src={url.url || "/placeholder.svg"}
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
                      disabled={isRemoteFetching || isLocalFetching}
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
    </div>
  );
}
