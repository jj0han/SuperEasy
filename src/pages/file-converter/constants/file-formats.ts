import type { FileFormat } from "../types";

export const videoFormats: FileFormat = {
  value: "video",
  format: "Video",
  items: [
    { value: "3gp", label: ".3gp" },
    { value: "avi", label: ".avi" },
    { value: "flv", label: ".flv" },
    { value: "mkv", label: ".mkv" },
    { value: "mov", label: ".mov" },
    { value: "mp4", label: ".mp4" },
  ],
};

export const audioFormats: FileFormat = {
  value: "audio",
  format: "Audio",
  items: [
    { value: "aac", label: ".aac" },
    { value: "flac", label: ".flac" },
    { value: "m4a", label: ".m4a" },
    { value: "mp3", label: ".mp3" },
    { value: "ogg", label: ".ogg" },
    { value: "wav", label: ".wav" },
    { value: "wma", label: ".wma" },
  ],
};

export const imageFormats: FileFormat = {
  value: "image",
  format: "Image",
  items: [
    { value: "bmp", label: ".bmp" },
    { value: "gif", label: ".gif" },
    { value: "jfif", label: ".jfif" },
    { value: "jpeg", label: ".jpeg" },
    { value: "jpg", label: ".jpg" },
    { value: "png", label: ".png" },
    { value: "rgb", label: ".rgb" },
    { value: "tiff", label: ".tiff" },
    { value: "yuv", label: ".yuv" },
  ],
};

export const textFormats: FileFormat = {
  value: "text",
  format: "Text",
  items: [
    { value: "doc", label: ".doc" },
    { value: "docx", label: ".docx" },
    { value: "txt", label: ".txt" },
    { value: "asc", label: ".asc" },
    { value: "msg", label: ".msg" },
    { value: "log", label: ".log" },
  ],
};

export const applicationFormats: FileFormat = {
  value: "application",
  format: "Application",
  items: [
    { value: "pdf", label: ".pdf" },
    { value: "doc", label: ".doc" },
    { value: "pptx", label: ".pptx" },
  ],
};
