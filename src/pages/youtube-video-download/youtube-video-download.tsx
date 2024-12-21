import { useMutation } from "@tanstack/react-query";
import { getYoutubeVideoInfo } from "@/http";
import { useState } from "react";
import { toast } from "sonner";
import { DownloadForm, UrlForm } from "./components";
import { Container } from "@/layouts";

export default function YoutubeVideoDownload() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["getYoutubeVideoInfo"],
    mutationFn: (videoUrl: string) => getYoutubeVideoInfo(videoUrl),
    onError: (error) => {
      toast.error(
        `Ocorreu um erro! Tente Novamente! ${JSON.stringify(error.message)}`,
        { richColors: true }
      );
    },
  });

  return (
    <Container className="flex justify-center">
      <div className="space-y-8 flex-col flex p-4 w-full max-w-2xl">
        <UrlForm
          mutate={mutate}
          isPending={isPending}
          setVideoUrl={setVideoUrl}
        />
        <div className="flex flex-wrap gap-2">
          {data?.formats && (
            <DownloadForm info={data.formats} videoUrl={videoUrl} />
          )}
        </div>
        {data?.videoDetails.embed && (
          <iframe
            title="video"
            src={data.videoDetails.embed.iframeUrl}
            className="aspect-video w-full rounded-[--radius]"
          />
        )}
      </div>
    </Container>
  );
}
