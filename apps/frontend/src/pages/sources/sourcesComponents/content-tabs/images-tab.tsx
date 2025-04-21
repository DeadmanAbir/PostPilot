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
import { toast } from "sonner";

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
        toast.success("remote images added  successfully");
        setRemoteImages([]);
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in adding remote images");
      },
    });

  const { mutate: addLocalImages, isPending: isLocalFetching } =
    addLocalImagesFn(user?.accessToken!, {
      onSuccess: () => {
        toast.success("local images added  successfully");
        setLocalImages([]);
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in adding local images");
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
          toast.error("error in uploading file");
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
    <div className="w-full h-full">
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="local" className="w-full">
            <TabsList className="w-full justify-start h-10">
              <TabsTrigger value="local" className="flex-1 h-full">Local Upload</TabsTrigger>
              <TabsTrigger value="remote" className="flex-1 h-full">Remote URL</TabsTrigger>
            </TabsList>

            {/* Local Upload Tab */}
            <TabsContent
              value="local"
              className="mt-5"
            >
              {/* <div className="flex flex-col space-y-1.5">
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
              </div> */}
              <div className="flex flex-col space-y-4 mt-5">
                {/* <Label htmlFor="file-upload" className="text-base font-medium dark:text-gray-200">Upload Files</Label> */}
                <div className="flex flex-col items-center justify-center w-full ">
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">                  Supported formats: JPG, PNG, WebP, GIF, SVG
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                      onChange={handleLocalImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {localImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 font-semibold">Image Previews:</h4>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {localImages.map((file, index) => (
                        <motion.div
                          key={`local-${index}`}
                          className="relative group bg-muted rounded-lg p-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Local image ${index + 1}`}
                            className="object-cover rounded size-16"
                          />
                          <button
                            onClick={() => handleRemoveLocalImage(index)}
                            className="absolute -top-2 -right-2 bg-background border rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash className="size-3" />
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
                      disabled={isLocalFetching || isRemoteFetching}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Remote URL Tab */}
            <TabsContent
              value="remote"
              className="mt-5"
            >
              <div className="flex flex-col space-y-3">
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
                                 className="h-10 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
                    onChange={(e) =>
                      setRemoteImageUrl((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={remoteImageUrl.url}
                    required
                                 className="h-10 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
                    onChange={(e) =>
                      setRemoteImageUrl((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                  />
                  <Button
                    type="submit"
                    className="h-10"
                    disabled={isRemoteFetching || isLocalFetching}
                  >
                    Preview Image
                  </Button>
                </form>
              </div>
              {remoteImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 font-semibold">Image Previews:</h4>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {remoteImages.map((url, index) => (
                        <motion.div
                          key={`remote-${index}`}
                          className="relative group bg-muted rounded-lg p-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img
                            src={url.url || "/placeholder.svg"}
                            alt={`Remote image ${index + 1}`}
                            className="object-cover rounded size-16"
                          />
                          <button
                            onClick={() => handleRemoveRemoteImage(index)}
                            className="absolute -top-2 -right-2 bg-background border rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash className="size-3" />
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
