import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ZoomIn, ZoomOut } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { ImageColorPicker } from "react-image-color-picker";
import { rgbToHex } from "./utils/rgbToHex";
import { toast } from "sonner";
import { Container } from "@/layouts";

export default function ColorPickerFromImage() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [zoom, setZoom] = useState(50);
  const [colorPick, setColorPick] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set preview to data URL
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  function handleZoom(step: number) {
    setZoom((prevState) => prevState + step);
  }

  function handleColorPick(color: string) {
    setColorPick(color);
  }

  function copyToClipBoard(text: string | null) {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Copiado para a área de transferência!");
    }
  }

  return (
    <Container className="flex justify-center">
      <div className="space-y-8 flex-col flex p-4 w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Image Color Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <div className="space-y-2">
                  <div className="aspect-square w-full">
                    <div>
                      <ImageColorPicker
                        onColorPick={handleColorPick}
                        imgSrc={preview.toString()}
                        zoom={zoom}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div className="flex gap-2">
                      <Button
                        size={"icon"}
                        onClick={() => {
                          if (zoom > 50) handleZoom(-10);
                        }}
                      >
                        <ZoomOut />
                      </Button>
                      <Button
                        size={"icon"}
                        onClick={() => {
                          if (zoom < 100) handleZoom(10);
                        }}
                      >
                        <ZoomIn />
                      </Button>
                    </div>
                    {colorPick && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            copyToClipBoard(colorPick);
                          }}
                          style={{ backgroundColor: colorPick?.toString() }}
                        >
                          <span className="mix-blend-difference">
                            {colorPick}
                          </span>
                        </Button>
                        <Button
                          onClick={() => {
                            copyToClipBoard(rgbToHex(colorPick));
                          }}
                          style={{ backgroundColor: colorPick?.toString() }}
                        >
                          <span className="mix-blend-difference">
                            {rgbToHex(colorPick)}
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
