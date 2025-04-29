import type React from "react";
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/providers/supabaseAuthProvider";
import {
  addLocalFilesFn,
  addRemoteFilesFn,
} from "@/lib/tanstack-query/mutation";

export function FilesTab() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [remoteFileUrl, setRemoteFileUrl] = useState({
    name: "",
    url: "",
  });
  const [remoteFiles, setRemoteFiles] = useState<
    { name: string; url: string }[]
  >([]);

  const { mutate: addRemoteFile, isPending: isRemoteFetching } =
    addRemoteFilesFn(user?.accessToken!, {
      onSuccess: () => {
        toast.success("remote file added  successfully");
        setRemoteFiles([]);
        queryClient.invalidateQueries({ queryKey: ["sources"] });
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in adding remote file");
      },
    });

  const { mutate: addLocalFile, isPending: isLocalFetching } = addLocalFilesFn(
    user?.accessToken!,
    {
      onSuccess: () => {
        toast.success("Local file added  successfully");
        setLocalFiles([]);
        queryClient.invalidateQueries({ queryKey: ["sources"] });
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("error in adding local file");
      },
    },
  );

  const uploadToSupabase = async (bucket: string) => {
    const fileUrls: { name: string; url: string; storage_name: string }[] = [];
    try {
      for (const file of localFiles) {
        const fileExtension = file.name.split(".").pop();
        const fileName = `${nanoid()}.${fileExtension}`;
        const actualFileName = file.name;

        const filePath = `${user?.user?.id}/${fileName}`;

        const { error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file);
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

  const handleLocalFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setLocalFiles(Array.from(e.target.files));
    }
  };

  const handleRemoteFileLoad = () => {
    if (remoteFileUrl.name && remoteFileUrl.url) {
      setRemoteFiles([...remoteFiles, remoteFileUrl]);
      setRemoteFileUrl({ name: "", url: "" });
    }
  };

  const removeLocalFile = (index: number) => {
    setLocalFiles(localFiles.filter((_, i) => i !== index));
  };

  const removeRemoteFile = (index: number) => {
    setRemoteFiles(remoteFiles.filter((_, i) => i !== index));
  };

  const handleRemoteFileUpload = () => {
    const remoteFileData = remoteFiles.map((file) => ({
      url: file.url,
      fileName: file.name,
    }));
    addRemoteFile(remoteFileData);
  };
  const handleLocalFileUpload = async () => {
    const fileData = await uploadToSupabase("post-pilot");
    addLocalFile(fileData);
  };

  return (
    <div className="w-full h-full ">
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="local" className="w-full">
            <TabsList className="w-full h-10">
              <TabsTrigger value="local" className="w-full h-full">
                Local Upload
              </TabsTrigger>
              <TabsTrigger value="remote" className="w-full h-full">
                Remote URL
              </TabsTrigger>
            </TabsList>
            <TabsContent id="imageLoad" value="local" className="max-h-[40vh] ">
              <div className="flex flex-col space-y-4 mt-5">
                {/* <Label htmlFor="file-upload" className="text-base font-medium dark:text-gray-200">Upload Files</Label> */}
                <div className="flex flex-col items-center justify-center w-full ">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, DOC, DOCX (MAX. 10MB)
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleLocalFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {localFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 font-semibold">Uploaded Files:</h4>
                  <ul className="gap-2 flex flex-wrap ">
                    <AnimatePresence>
                      {localFiles.map((file, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between bg-muted px-3 py-1 rounded-full"
                        >
                          <span className="truncate w-20 ">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLocalFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  <div className="w-full flex items-center justify-center mt-2">
                    <Button
                      disabled={isLocalFetching || isRemoteFetching}
                      onClick={handleLocalFileUpload}
                      variant="default"
                      size="sm"
                      className="w-1/4"
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="remote">
              <div className="flex flex-col space-y-3 mt-5">
                <Label htmlFor="file-url">File URL</Label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRemoteFileLoad();
                  }}
                  className="flex space-x-2 "
                >
                  <Input
                    id="file-name"
                    placeholder="File Name"
                    required
                    value={remoteFileUrl.name}
                    className="h-10 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
                    onChange={(e) =>
                      setRemoteFileUrl((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    id="file-url"
                    required
                    placeholder="https://example.com/document.pdf"
                    value={remoteFileUrl.url}
                    className="h-10 focus:outline-none focus:ring-2 focus:ring-offset-[3px] focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
                    onChange={(e) =>
                      setRemoteFileUrl((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                  />
                  <Button
                    type="submit"
                    disabled={isRemoteFetching || isLocalFetching}
                    className="h-10"
                  >
                    Add File
                  </Button>
                </form>
              </div>
              {remoteFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 font-semibold">Remote Files:</h4>
                  <ul className="gap-2 flex flex-wrap ">
                    <AnimatePresence>
                      {remoteFiles.map((file, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between bg-muted px-3 py-1 rounded-full max-w-[12rem]"
                        >
                          <span className="truncate w-full">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRemoteFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  <div className="w-full flex items-center justify-center mt-2">
                    <Button
                      onClick={handleRemoteFileUpload}
                      disabled={isRemoteFetching || isLocalFetching}
                      variant="default"
                      size="sm"
                      className="w-1/4"
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
