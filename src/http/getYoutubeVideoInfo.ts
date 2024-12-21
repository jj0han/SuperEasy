import api from "./api";
import type { VideoInfo } from "./types";

const getYoutubeVideoInfo = async (videoId: string) => {
  const { data } = await api.get(
    `api/v1/video/${encodeURIComponent(videoId)}/info`
  );
  return data as VideoInfo;
};

export default getYoutubeVideoInfo;
