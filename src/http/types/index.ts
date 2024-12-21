// types copied from ytdl-core package
export interface VideoInfo {
  iv_load_policy?: string;
  iv_allow_in_place_switch?: string;
  iv_endscreen_url?: string;
  iv_invideo_url?: string;
  iv3_module?: string;
  rmktEnabled?: string;
  uid?: string;
  vid?: string;
  focEnabled?: string;
  baseUrl?: string;
  storyboard_spec?: string;
  serialized_ad_ux_config?: string;
  player_error_log_fraction?: string;
  sffb?: string;
  ldpj?: string;
  videostats_playback_base_url?: string;
  innertube_context_client_version?: string;
  t?: string;
  fade_in_start_milliseconds: string;
  timestamp: string;
  ad3_module: string;
  relative_loudness: string;
  allow_below_the_player_companion: string;
  eventid: string;
  token: string;
  atc: string;
  cr: string;
  apply_fade_on_midrolls: string;
  cl: string;
  fexp: string[];
  apiary_host: string;
  fade_in_duration_milliseconds: string;
  fflags: string;
  ssl: string;
  pltype: string;
  enabled_engage_types: string;
  hl: string;
  is_listed: string;
  gut_tag: string;
  apiary_host_firstparty: string;
  enablecsi: string;
  csn: string;
  status: string;
  afv_ad_tag: string;
  idpj: string;
  sfw_player_response: string;
  account_playback_token: string;
  encoded_ad_safety_reason: string;
  tag_for_children_directed: string;
  no_get_video_log: string;
  ppv_remarketing_url: string;
  fmt_list: string[][];
  ad_slots: string;
  fade_out_duration_milliseconds: string;
  instream_long: string;
  allow_html5_ads: string;
  core_dbp: string;
  ad_device: string;
  itct: string;
  root_ve_type: string;
  excluded_ads: string;
  aftv: string;
  loeid: string;
  cver: string;
  shortform: string;
  dclk: string;
  csi_page_type: string;
  ismb: string;
  gpt_migration: string;
  loudness: string;
  ad_tag: string;
  of: string;
  probe_url: string;
  vm: string;
  afv_ad_tag_restricted_to_instream: string;
  gapi_hint_params: string;
  cid: string;
  c: string;
  oid: string;
  ptchn: string;
  as_launched_in_country: string;
  avg_rating: string;
  fade_out_start_milliseconds: string;
  midroll_prefetch_size: string;
  allow_ratings: string;
  thumbnail_url: string;
  iurlsd: string;
  iurlmq: string;
  iurlhq: string;
  iurlmaxres: string;
  ad_preroll: string;
  tmi: string;
  trueview: string;
  host_language: string;
  innertube_api_key: string;
  show_content_thumbnail: string;
  afv_instream_max: string;
  innertube_api_version: string;
  mpvid: string;
  allow_embed: string;
  ucid: string;
  plid: string;
  midroll_freqcap: string;
  ad_logging_flag: string;
  ptk: string;
  vmap: string;
  watermark: string[];
  dbp: string;
  ad_flags: string;
  html5player: string;
  formats: VideoFormat[];
  no_embed_allowed?: boolean;
  player_response: {
    playabilityStatus: {
      status: string;
      playableInEmbed: boolean;
      miniplayer: {
        miniplayerRenderer: {
          playbackMode: string;
        };
      };
      contextParams: string;
    };
  };
  videoDetails: MoreVideoDetails;
}

export interface VideoFormat {
  itag: number;
  url: string;
  mimeType?: string;
  bitrate?: number;
  audioBitrate?: number;
  width?: number;
  height?: number;
  initRange?: { start: string; end: string };
  indexRange?: { start: string; end: string };
  lastModified: string;
  contentLength: string;
  quality:
    | "tiny"
    | "small"
    | "medium"
    | "large"
    | "hd720"
    | "hd1080"
    | "hd1440"
    | "hd2160"
    | "highres"
    | string;
  qualityLabel:
    | "144p"
    | "144p 15fps"
    | "144p60 HDR"
    | "240p"
    | "240p60 HDR"
    | "270p"
    | "360p"
    | "360p60 HDR"
    | "480p"
    | "480p60 HDR"
    | "720p"
    | "720p60"
    | "720p60 HDR"
    | "1080p"
    | "1080p60"
    | "1080p60 HDR"
    | "1440p"
    | "1440p60"
    | "1440p60 HDR"
    | "2160p"
    | "2160p60"
    | "2160p60 HDR"
    | "4320p"
    | "4320p60";
  projectionType?: "RECTANGULAR";
  fps?: number;
  averageBitrate?: number;
  audioQuality?: "AUDIO_QUALITY_LOW" | "AUDIO_QUALITY_MEDIUM";
  colorInfo?: {
    primaries: string;
    transferCharacteristics: string;
    matrixCoefficients: string;
  };
  highReplication?: boolean;
  approxDurationMs?: string;
  targetDurationSec?: number;
  maxDvrDurationSec?: number;
  audioSampleRate?: string;
  audioChannels?: number;

  // Added by ytdl-core
  container: "flv" | "3gp" | "mp4" | "webm" | "ts";
  hasVideo: boolean;
  hasAudio: boolean;
  codecs: string;
  videoCodec?: string;
  audioCodec?: string;

  isLive: boolean;
  isHLS: boolean;
  isDashMPD: boolean;
}

export interface MoreVideoDetails {
  embed: {
    iframeUrl: string;
    width: number;
    height: number;
  };
  published: number;
  video_url: string;
  age_restricted: boolean;
  likes: number | null;
  description: string | null;
}
