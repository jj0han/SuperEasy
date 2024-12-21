export type FileFormat = {
  value: string;
  format: string;
  items: {
    value: string;
    label: string;
  }[];
};

export type InputFiles = Record<string, File>;

export type TranscodedFiles = Record<string, { url: string; size: string }>;
