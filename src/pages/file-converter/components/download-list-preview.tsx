import { Button, buttonVariants } from "@/components/ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { InputFiles, TranscodedFiles } from "../types";
import { determineFileType } from "../utils";

type Props = {
  files: InputFiles | null;
  transcodedFiles: TranscodedFiles;
  selectedFormat: string;
};

export default function DownloadListPreview({
  files,
  transcodedFiles,
  selectedFormat,
}: Props) {
  return Object.entries(transcodedFiles).map(([key, { url, size }]) => {
    if (files) {
      const originalFileName = files[key].name;
      const outputFileName = `${originalFileName
        .split(".")
        .slice(0, -1)
        .join(".")}.${selectedFormat}`;

      return (
        <div
          key={key}
          className="flex w-full -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse"
        >
          <Credenza>
            <CredenzaTrigger asChild>
              <Button
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
                variant="outline"
              >
                Preview
              </Button>
            </CredenzaTrigger>
            <CredenzaContent>
              <CredenzaHeader>
                <CredenzaTitle>Preview</CredenzaTitle>
                <CredenzaDescription>{outputFileName}</CredenzaDescription>
              </CredenzaHeader>
              <CredenzaFooter>
                <div key={key} className="flex flex-col items-start w-full">
                  {determineFileType(files[key]) === "image" ? (
                    <img
                      src={url}
                      alt={files[key].name}
                      className="w-full max-w-md mx-auto"
                    />
                  ) : determineFileType(files[key]) === "audio" ? (
                    // biome-ignore lint/a11y/useMediaCaption: <explanation>
                    <audio
                      src={url}
                      controls
                      className="w-full max-w-md mx-auto"
                    />
                  ) : determineFileType(files[key]) === "text" ? (
                    <iframe
                      title="Text Preview"
                      src={url}
                      width="100%"
                      height="100%"
                      style={{ border: "none" }}
                    />
                  ) : determineFileType(files[key]) === "application" ? (
                    <object
                      data={url}
                      type="application/pdf"
                      width="100%"
                      height="100%"
                    >
                      <iframe
                        title="PDF Preview"
                        src={url}
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                      >
                        <p>
                          Your browser does not support PDFs.
                          <a href={url} download>
                            Download the PDF
                          </a>
                          .
                        </p>
                      </iframe>
                    </object>
                  ) : determineFileType(files[key]) === "video" ? (
                    // biome-ignore lint/a11y/useMediaCaption: <explanation>
                    <video
                      src={url}
                      controls
                      className="w-full max-w-md mx-auto"
                    />
                  ) : null}
                </div>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
          <Link
            className={cn(
              buttonVariants({
                variant: "outline",
                className:
                  "rounded-none items-center truncate justify-between flex shadow-none first:rounded-s-lg whitespace-normal w-full last:rounded-e-lg focus-visible:z-10",
              })
            )}
            to={url}
            target="_blank"
            download={outputFileName}
            aria-label="Open link"
          >
            <div className="inline-flex truncate items-center">
              <DownloadIcon
                strokeWidth={2}
                aria-hidden="true"
                className="shrink-0 size-4 mr-2"
              />
              <p className="truncate">{outputFileName}</p>
            </div>
            <div className="whitespace-nowrap">
              <p>{size}</p>
            </div>
          </Link>
        </div>
      );
    }
  });
}
