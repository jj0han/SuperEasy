import { useRef, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import {
  AudioLinesIcon,
  FileIcon,
  FileTextIcon,
  Trash2Icon,
  VideoIcon,
} from "lucide-react";
import { ScrollArea } from "./scroll-area";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import noData from "../../../assets/icons/noData.png";

export function MultipleFilePool({
  onFilesChange,
}: {
  onFilesChange: (files: { [key: string]: File }) => void;
}) {
  const [files, setFiles] = useState<{ [key: string]: File }>({});
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLUListElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const allowedTypes = ["video", "audio", "image"];
    const newFiles = { ...files };

    for (const file of Array.from(selectedFiles)) {
      const fileType = file.type.split("/")[0];
      if (allowedTypes.includes(fileType)) {
        const objectURL = URL.createObjectURL(file);
        newFiles[objectURL] = file;
      } else {
        toast.warning("Archive format not supported!");
      }
    }

    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleButtonClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileDrop = (event: React.DragEvent) => {
    event.preventDefault();
    handleFileSelect(event.dataTransfer.files);
    setIsDraggingOver(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDelete = (objectURL: string) => {
    const updatedFiles = { ...files };
    delete updatedFiles[objectURL];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleCancel = () => {
    setFiles({});
  };

  return (
    <article
      aria-label="File Upload Modal"
      className="relative h-full flex flex-col"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div
        className={cn(
          "w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md",
          isDraggingOver ? "flex bg-white/50 backdrop-blur-sm" : "hidden"
        )}
      >
        <i>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className="fill-current w-12 h-12 mb-3 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
          </svg>
        </i>
        <p className="text-lg text-blue-600">Drop files to upload</p>
      </div>
      <div className="space-y-4">
        <section className="w-full h-full space-y-4 flex flex-col">
          <header className="border-dashed rounded-[--radius] border-2 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold flex flex-wrap justify-center">
              <span>Drag and drop your</span>&nbsp;
              <span>files anywhere or</span>
            </p>
            <input
              ref={hiddenFileInput}
              id="hidden-input"
              type="file"
              multiple
              accept="image/*,video/*,audio/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <Button id="button" onClick={handleButtonClick}>
              Upload a file
            </Button>
          </header>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-semibold">To Upload</p>
              <Button variant={"ghost"} onClick={handleCancel}>
                Clear
              </Button>
            </div>
            <ScrollArea className="aspect-video w-full rounded-[--radius]">
              <ul
                ref={galleryRef}
                id="gallery"
                className="flex flex-1 gap-2 flex-wrap"
              >
                <AnimatePresence>
                  {Object.keys(files).length === 0 ? (
                    <motion.li
                      id="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="h-full w-full text-center flex flex-col items-center justify-center"
                    >
                      <img
                        className="mx-auto w-32"
                        src={noData}
                        alt="no data"
                      />
                      <span className="text-muted-foreground">
                        No files selected
                      </span>
                    </motion.li>
                  ) : (
                    Object.entries(files).map(([key, file]) => {
                      const isImage = file.type.startsWith("image");
                      const isVideo = file.type.startsWith("video");
                      const isAudio = file.type.startsWith("audio");
                      const isText = file.type.startsWith("text");
                      const isDoc = file.type.startsWith("application");
                      return (
                        <motion.li
                          key={key}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          layout
                          className="block group aspect-video min-h-32 flex-1"
                        >
                          <article
                            className={cn(
                              "w-full flex h-full rounded-md focus:outline-none focus:shadow-outline relative cursor-pointer shadow-sm",
                              isImage
                                ? "text-white border"
                                : "text-black bg-gray-100"
                            )}
                          >
                            {isImage && (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            )}
                            {isVideo && (
                              <VideoIcon className="m-auto size-10" />
                            )}
                            {isAudio && (
                              <AudioLinesIcon className="m-auto size-10" />
                            )}
                            {isText && (
                              <FileTextIcon className="m-auto size-10" />
                            )}
                            {isDoc && <FileIcon className="m-auto size-10" />}
                            <section
                              className={cn(
                                "bg-black/5 flex-col rounded-[--radius] text-xs w-full h-full overflow-hidden absolute top-0",
                                isImage ? "group-hover:flex hidden" : "flex"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex-1 truncate py-2 px-3",
                                  isImage &&
                                    "bg-gradient-to-b from-black/90 via-transparent to-transparent"
                                )}
                              >
                                <h1 className="truncate text-sm">
                                  {file.name}
                                </h1>
                              </div>
                              <div
                                className={cn(
                                  "flex justify-between items-center py-2 px-3",
                                  isImage &&
                                    "bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                                )}
                              >
                                <div className="flex items-center gap-1">
                                  <FileIcon className="size-4" />
                                  <p className="font-bold">
                                    {file.size > 1024
                                      ? file.size > 1048576
                                        ? `${Math.round(file.size / 1048576)}mb`
                                        : `${Math.round(file.size / 1024)}kb`
                                      : `${file.size}b`}
                                  </p>
                                </div>
                                <Button
                                  variant={"ghost"}
                                  size={"icon"}
                                  onClick={() => handleDelete(key)}
                                >
                                  <Trash2Icon className="size-4" />
                                </Button>
                              </div>
                            </section>
                          </article>
                        </motion.li>
                      );
                    })
                  )}
                </AnimatePresence>
              </ul>
            </ScrollArea>
          </div>
        </section>
      </div>
    </article>
  );
}
