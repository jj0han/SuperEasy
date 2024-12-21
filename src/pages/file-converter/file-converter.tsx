import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultipleFilePool } from "@/components/ui/multiple-file-pool";
import { isEmptyObject } from "@/lib/utils";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  applicationFormats,
  audioFormats,
  imageFormats,
  textFormats,
  videoFormats,
} from "./constants/file-formats";
import type { FileFormat, InputFiles, TranscodedFiles } from "./types";
import { determineFileType } from "./utils";
import { motion } from "motion/react";
import {
  DownloadListPreview,
  TargetFormat,
  TranscodedFilesProgress,
} from "./components";
import { Loader2 } from "lucide-react";
import { Container } from "@/layouts";

export default function FileConverter() {
  const [files, setFiles] = useState<InputFiles | null>(null);
  const ffmpegRef = useRef(new FFmpeg());
  const [progress, setProgress] = useState<number | null | undefined>(null);
  const [transcodedFiles, setTranscodedFiles] = useState<TranscodedFiles>({});
  const [selectedFormat, setSelectedFormat] = useState<string>("mp4");
  const [formatOptions, setFormatOptions] = useState<FileFormat[]>([
    videoFormats,
    audioFormats,
    imageFormats,
    textFormats,
  ]);

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["transcodeFiles"],
    mutationFn: (files: InputFiles) => transcodeFiles(files),
    onSuccess: () => {
      toast.success("Archives Converted!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Error! ${JSON.stringify(error)}`);
    },
  });

  // Load FFmpeg on component mount
  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;

      ffmpeg.on("progress", ({ progress }) => {
        setProgress(Number.parseFloat((progress * 100).toFixed(2)));
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
    };

    loadFFmpeg();
  }, []);

  const updateFormatOptions = (type: string) => {
    if (type === "video") {
      setFormatOptions([videoFormats, audioFormats]);
      setSelectedFormat("mp4");
    } else if (type === "audio") {
      setFormatOptions([audioFormats]);
      setSelectedFormat("mp3");
    } else if (type === "image") {
      setFormatOptions([imageFormats]);
      setSelectedFormat("png");
    } else if (type === "application") {
      setFormatOptions([applicationFormats]);
      setSelectedFormat("pdf");
    } else if (type === "text") {
      setFormatOptions([textFormats]);
      setSelectedFormat("doc");
    }
  };

  const handleFilesChange = (newFiles: InputFiles) => {
    if (!isEmptyObject(newFiles) && newFiles) {
      setTranscodedFiles({});
      setFiles(newFiles);
      const firstFileType = determineFileType(Object.values(newFiles)[0]);
      updateFormatOptions(firstFileType);
    } else {
      setFiles(null);
    }
  };

  const transcodeFiles = async (inputFiles: InputFiles) => {
    const ffmpeg = ffmpegRef.current;
    const newTranscodedFiles: TranscodedFiles = {};
    setTranscodedFiles({});

    for (const [key, file] of Object.entries(inputFiles)) {
      const fileType = determineFileType(file);
      const inputFileName = file.name;
      const outputFileName = `${inputFileName
        .split(".")
        .slice(0, -1)
        .join(".")}.${selectedFormat}`;

      // Write the input file to FFmpeg FS
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));

      // Transcode based on file type
      if (fileType !== "other") {
        await ffmpeg.exec(["-i", inputFileName, outputFileName]);
      } else {
        toast.warning(`Unsupported file type: ${file.type}`);
        console.warn(`Unsupported file type: ${file.type}`);
        continue;
      }

      // Read the output file
      const data = await ffmpeg.readFile(outputFileName);

      // Store the transcoded file URL
      const blob = new Blob([data], { type: `${file.type}/${selectedFormat}` });
      const url = URL.createObjectURL(blob);

      // Calculate size
      const size =
        blob.size > 1048576
          ? `${(blob.size / 1048576).toFixed(2)} MB`
          : blob.size > 1024
          ? `${(blob.size / 1024).toFixed(2)} KB`
          : `${blob.size} Bytes`;

      newTranscodedFiles[key] = { url, size };
      setTranscodedFiles(newTranscodedFiles);
    }
  };

  return (
    <Container className="flex justify-center">
      <div className="space-y-8 flex-col flex p-4 w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>File Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <MultipleFilePool
                onFilesChange={(newFiles) => handleFilesChange(newFiles)}
              />
              <div className="flex items-end gap-2">
                <TargetFormat
                  formatOptions={formatOptions}
                  selectedFormat={selectedFormat}
                  setSelectedFormat={setSelectedFormat}
                />
                <motion.div layout>
                  <Button
                    disabled={isPending || !files}
                    onClick={() => {
                      if (files) mutate(files);
                    }}
                  >
                    {isPending ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      "Convert Files"
                    )}
                  </Button>
                </motion.div>
              </div>
              <div className="space-y-4">
                {files && (
                  <TranscodedFilesProgress
                    files={files}
                    transcodedFiles={transcodedFiles}
                    progress={progress}
                    selectedFormat={selectedFormat}
                    error={error}
                  />
                )}
                <DownloadListPreview
                  files={files}
                  transcodedFiles={transcodedFiles}
                  selectedFormat={selectedFormat}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
