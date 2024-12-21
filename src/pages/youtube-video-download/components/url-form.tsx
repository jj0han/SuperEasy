import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Loader2, Search } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { VideoInfo } from "@/http/types";

type Props = {
  mutate: UseMutateFunction<VideoInfo, Error, string, unknown>;
  isPending: boolean;
  setVideoUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function UrlForm({ mutate, isPending, setVideoUrl }: Props) {
  const formSchema = z.object({
    video_url: z.string().url({ message: "URL inválida!" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video_url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setVideoUrl(values.video_url);
    mutate(values.video_url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Youtube Downloader</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 ">
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="www.youtube.com"
                      onPaste={() => {
                        setTimeout(() => {
                          const updatedValue = form.getValues("video_url");
                          form.setValue("video_url", updatedValue);
                          onSubmit({ video_url: updatedValue });
                        }, 0);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"icon"} type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                <Search className="size-5" />
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
