import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircleIcon, DownloadIcon } from "lucide-react";
import type { InputFiles, TranscodedFiles } from "../types";

type Props = {
  files: InputFiles;
  transcodedFiles: TranscodedFiles;
  progress: number | null | undefined;
  selectedFormat: string;
  error: Error | null;
};

export default function TranscodedFilesProgress({
  files,
  transcodedFiles,
  progress,
  selectedFormat,
  error,
}: Props) {
  return (
    <div className="flex sm:flex-row flex-col gap-2 items-center">
      <div className="space-y-2 w-full">
        <div className="flex items-center justify-between gap-2">
          <Label className="truncate">
            Transcoded Files [{Object.values(transcodedFiles).length} /{" "}
            {Object.values(files).length}
            {progress && ` - ${progress}%`}]
          </Label>
          {error && (
            <div className="inline-flex items-center text-xs gap-1 text-destructive">
              <AlertCircleIcon className="size-4" />
              <span className="truncate">{JSON.stringify(error)}</span>
            </div>
          )}
        </div>
        <Progress value={progress} />
      </div>
      {Object.values(transcodedFiles).length > 0 && (
        <Button
          onClick={() => {
            Object.entries(transcodedFiles).map(([key, { url }]) => {
              const originalFileName = files[key].name;
              const outputFileName = `${originalFileName
                .split(".")
                .slice(0, -1)
                .join(".")}.${selectedFormat}`;
              const anchor = document.createElement("a");
              anchor.download = outputFileName;
              anchor.target = "_blank";
              anchor.href = url;
              anchor.click();
              anchor.remove();
            });
          }}
          className="sm:w-auto w-full"
        >
          <DownloadIcon className="size-5" /> Download All
        </Button>
      )}
    </div>
  );
}
