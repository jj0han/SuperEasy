import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { VideoFormat } from "@/http/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DownloadIcon,
  VideoIcon,
  VideoOff,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = { info: VideoFormat[] | undefined; videoUrl: string | null };

export default function DownloadForm({ info, videoUrl }: Props) {
  const formSchema = z.object({
    video_format: z.string({
      required_error: "Selecione um formato de Download",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video_format: JSON.stringify(
        info?.filter((el) => el.mimeType && el.hasAudio && el.hasVideo)[0]
      ),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const format: VideoFormat = JSON.parse(values.video_format);
    if (videoUrl) {
      const link = document.createElement("a");
      link.href = `http://localhost:5000/api/v1/video/${encodeURIComponent(
        videoUrl
      )}/download?itag=${format.itag}&mimeType=${encodeURIComponent(
        format.mimeType?.split(";")[0] || "video/mp4"
      )}`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.download = "video";
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex gap-2 items-end">
          <FormField
            control={form.control}
            name="video_format"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="grid grid-cols-5 w-fit text-left gap-8 px-3">
                  <p className="w-5" />
                  <p className="w-20">Format</p>
                  <p className="w-20">Audio</p>
                  <p className="w-20">Quality</p>
                  <p className="w-20">Frame Rate</p>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o formato de download" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {info
                      ?.filter((el) => el.mimeType && el.hasAudio)
                      ?.sort((a, b) =>
                        Number(a?.mimeType?.localeCompare(b?.mimeType || ""))
                      )
                      ?.map((value) => (
                        <SelectItem
                          key={value.url}
                          value={JSON.stringify(value)}
                        >
                          <div className="grid grid-cols-5 w-full text-left gap-8">
                            <div className="gap-5 text-muted-foreground flex">
                              <p>
                                {value.hasAudio ? (
                                  <Volume2 className="size-5" />
                                ) : (
                                  <VolumeOff className="size-5" />
                                )}
                              </p>
                              <p>
                                {value.hasVideo ? (
                                  <VideoIcon className="size-5" />
                                ) : (
                                  <VideoOff className="size-5" />
                                )}
                              </p>
                              <Separator orientation="vertical" />
                            </div>
                            <p className="w-20">
                              {value?.mimeType?.split(";")[0]}
                            </p>
                            {value.audioQuality && (
                              <p className="w-20">
                                {value.audioQuality.split("_")[2]}
                              </p>
                            )}
                            {value.qualityLabel && (
                              <p className="w-20">{value.qualityLabel}</p>
                            )}
                            {value.fps && (
                              <p className="w-20">{value.fps}fps</p>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={"icon"}>
            <DownloadIcon className="size-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
