import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { motion, AnimatePresence } from "motion/react";
import {
  addLocalFilesFn,
  addRemoteFilesFn,
} from "@/lib/tanstack-query/mutation";
import { nanoid } from "nanoid";

export function FilesTab() {
  const { user } = useAuth();
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [remoteFileUrl, setRemoteFileUrl] = useState("");
  const [remoteFiles, setRemoteFiles] = useState<string[]>([]);

  const { mutate: addRemoteFile, isPending: isRemoteFetching } =
    addRemoteFilesFn(user?.accessToken!, {
      onSuccess: () => {
        alert("remote file added  successfully");
        setRemoteFiles([]);
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in adding remote file");
      },
    });

  const { mutate: addLocalFile, isPending: isLocalFetching } = addLocalFilesFn(
    user?.accessToken!,
    {
      onSuccess: () => {
        alert("Local file added  successfully");
        setLocalFiles([]);
      },
      onError: (error: unknown) => {
        console.log(error);
        alert("error in adding local file");
      },
    }
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

  const handleLocalFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setLocalFiles(Array.from(e.target.files));
    }
  };

  const handleRemoteFileLoad = () => {
    if (remoteFileUrl) {
      setRemoteFiles([...remoteFiles, remoteFileUrl]);
      setRemoteFileUrl("");
    }
  };

  const removeLocalFile = (index: number) => {
    setLocalFiles(localFiles.filter((_, i) => i !== index));
  };

  const removeRemoteFile = (index: number) => {
    setRemoteFiles(remoteFiles.filter((_, i) => i !== index));
  };

  const handleRemoteFileUpload = () => {
    const remoteFileData = remoteFiles.map((url) => ({
      url,
    }));
    addRemoteFile(remoteFileData);
  };
  const handleLocalFileUpload = async () => {
    const fileData = await uploadToSupabase("post-pilot");
    addLocalFile(fileData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local">
          <TabsList>
            <TabsTrigger value="local">Local Upload</TabsTrigger>
            <TabsTrigger value="remote">Remote URL</TabsTrigger>
          </TabsList>
          <TabsContent
            id="imageLoad"
            value="local"
            className="max-h-[30vh] overflow-y-scroll"
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="file-upload">Upload Files</Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleLocalFileChange}
              />
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="file-url">File URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="file-url"
                  placeholder="https://example.com/document.pdf"
                  value={remoteFileUrl}
                  onChange={(e) => setRemoteFileUrl(e.target.value)}
                />
                <Button
                  disabled={isRemoteFetching || isLocalFetching}
                  onClick={handleRemoteFileLoad}
                >
                  Add File
                </Button>
              </div>
            </div>
            {remoteFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Remote Files:</h4>
                <ul className="gap-2 flex flex-wrap ">
                  <AnimatePresence>
                    {remoteFiles.map((url, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between bg-muted px-3 py-1 rounded-full"
                      >
                        <span className="truncate w-20 ">{url}</span>
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
  );
}
