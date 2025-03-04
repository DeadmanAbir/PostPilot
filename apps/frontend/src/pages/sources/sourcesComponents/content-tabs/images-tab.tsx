import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function ImagesTab() {
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [remoteImageUrl, setRemoteImageUrl] = useState("");
  const [remoteImages, setRemoteImages] = useState<string[]>([]);

  const handleLocalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLocalImages(Array.from(e.target.files));
    }
  };

  const handleRemoteImageLoad = () => {
    if (remoteImageUrl) {
      setRemoteImages([...remoteImages, remoteImageUrl]);
      setRemoteImageUrl("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local">
          <TabsList>
            <TabsTrigger value="local">Local Upload</TabsTrigger>
            <TabsTrigger value="remote">Remote URL</TabsTrigger>
          </TabsList>
          <TabsContent value="local">
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
          </TabsContent>
          <TabsContent value="remote">
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
          </TabsContent>
        </Tabs>
        {(localImages.length > 0 || remoteImages.length > 0) && (
          <div className="mt-4">
            <h4 className="mb-2 font-semibold">Image Previews:</h4>
            <div className="grid grid-cols-3 gap-4">
              {localImages.map((file, index) => (
                <div key={`local-${index}`} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={`Local image ${index + 1}`}
                    className="object-cover rounded"
                  />
                </div>
              ))}
              {remoteImages.map((url, index) => (
                <div key={`remote-${index}`} className="relative aspect-square">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Remote image ${index + 1}`}
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
