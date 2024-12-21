export const determineFileType = (file: File) => {
  if (file.type.startsWith("video")) {
    return "video";
  }
  if (file.type.startsWith("image")) {
    return "image";
  }
  if (file.type.startsWith("audio")) {
    return "audio";
  }
  if (file.type.startsWith("text")) {
    return "text";
  }
  if (file.type.startsWith("application")) {
    return "application";
  }
  return "other";
};
