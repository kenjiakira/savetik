export interface TikTokData {
  id: string
  title: string
  cover: string
  origin_cover: string
  play: string
  wmplay: string
  hdplay?: string
  music?: string
  music_info?: {
    title: string
    author: string
  }
  play_count: number
  digg_count: number
  comment_count: number
  share_count: number
  download_count: number
  create_time: number
  author: {
    id: string
    unique_id: string
    nickname: string
    avatar: string
  }
  images?: string[]
}

export interface ApiResponse {
  code: number
  msg: string
  data: TikTokData
  processed_time?: number
}

export type DownloadType = 'hd' | 'sd' | 'video' | 'music' | 'image'
