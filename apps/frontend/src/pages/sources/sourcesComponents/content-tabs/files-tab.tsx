import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import { LocalFileUploadDetail } from "@repo/common/types";
import { useAuth } from "@/providers/supabaseAuthProvider";
import { motion, AnimatePresence } from "motion/react";

export function FilesTab() {
  const { user } = useAuth();
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [remoteFileUrl, setRemoteFileUrl] = useState("");
  const [remoteFiles, setRemoteFiles] = useState<string[]>([]);

  const handleLocalFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let files: File[] = [];

    const uploadDetails: LocalFileUploadDetail = [];

    if (e.target.files) {
      files = Array.from(e.target.files);
      setLocalFiles(files);
    } else {
      throw new Error("No files selected");
    }
    const uploads = files.map(async (file) => {
      const encodedName = btoa(file.name);
      const filePath = `${user?.user?.id}/${encodedName}`;

      const { data, error } = await supabase.storage
        .from("post-pilot")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading file:", file.name, error);
        return null; // Skip failed uploads
      }
      uploadDetails.push({
        fileName: encodedName,
        path: data.fullPath,
      });
      return data;
    });
    await Promise.all(uploads);

    // const successfulUploads = results.filter((result) => result !== null);

    console.log("Uploaded files:", uploadDetails);
    // call insert-file endpoint before that fix naming issue
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
          <TabsContent id="imageLoad" value="local" className="max-h-[30vh] overflow-y-scroll">
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
                  <Button variant="default" size="sm" className="w-1/4">
                    Load
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
                <Button onClick={handleRemoteFileLoad}>Load File</Button>
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
                  <Button variant="default" size="sm" className="w-1/4">
                    Load
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
