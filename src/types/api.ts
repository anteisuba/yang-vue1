export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface Photo {
  id: number
  name: string
  url: string
  size: string
  date: string
  albumId: number
  filename: string
}

export interface Album {
  id: number
  name: string
  count: number
  description: string
  cover: string
} 