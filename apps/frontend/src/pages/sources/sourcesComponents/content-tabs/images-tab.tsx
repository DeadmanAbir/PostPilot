import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ImagesTab() {
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [remoteImageUrl, setRemoteImageUrl] = useState("");
  const [remoteImages, setRemoteImages] = useState<string[]>([]);

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
          <TabsContent id="imageLoad" value="local" className="max-h-[30vh] overflow-y-scroll">
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
            {(localImages.length > 0) && (
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Image Previews:</h4>
                <div className="flex flex-wrap gap-5">
                  {localImages.map((file, index) => (

                    <div
                      key={`local-${index}`}
                      className="relative aspect-square"
                    >
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Local image ${index + 1}`}
                        className="object-cover rounded size-20"
                      />
                    </div>


                  ))}
                  <div className="w-full flex items-center justify-center">
                    <Button variant="default" size="sm" className="w-1/4 mt-5">
                      Load
                    </Button>
                  </div>
                </div>

              </div>
            )}
          </TabsContent>
          <TabsContent id="imageLoad" value="remote" className="max-h-[30vh] overflow-y-scroll">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={remoteImageUrl}
                  onChange={(e) => setRemoteImageUrl(e.target.value)}
                />
                <Button onClick={handleRemoteImageLoad}>Load Image</Button>
              </div>
            </div>
            {(remoteImages.length > 0) && (
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Image Previews:</h4>
                <div className="flex flex-wrap gap-5">

                  {remoteImages.map((url, index) => (
                    <>
                      <div
                        key={`remote-${index}`}
                        className="relative aspect-square"
                      >
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Remote image ${index + 1}`}
                          className="object-cover rounded"
                        />
                      </div>

                    </>
                  ))}
                </div>
                <div className="w-full flex items-center justify-center">
                  <Button variant="default" size="sm" className="w-1/4 mt-5">
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
