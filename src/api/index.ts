import fetch from '../utils/axios'
import type { ApiResponse, Photo, Album } from '../types/api'

//判断是否有注册
export const isRegisterApi = (data:object): Promise<ApiResponse> => fetch.post('/isRegister',data)

//用户注册
export const registerApi = (data:object): Promise<ApiResponse> => fetch.post('/register',data)

//用户登录
export const signinApi = (data: object): Promise<ApiResponse> =>
    fetch.post('/signin', data)

// 上传单张图片
export const uploadImageApi = (formData: FormData): Promise<ApiResponse<Photo>> => 
    fetch.post('/upload/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

// 批量上传图片
export const uploadImagesApi = (formData: FormData): Promise<ApiResponse<Photo[]>> => 
    fetch.post('/upload/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

// 获取所有相册
export const getAllAlbumsApi = (): Promise<ApiResponse<Album[]>> => 
    fetch.get('/albums')

// 创建新相册
export const createAlbumApi = (data: object): Promise<ApiResponse<Album>> => 
    fetch.post('/albums', data)

// 获取所有照片
export const getAllPhotosApi = (): Promise<ApiResponse<Photo[]>> => 
    fetch.get('/photos')

// 获取特定相册的照片
export const getPhotosByAlbumApi = (albumId: number): Promise<ApiResponse<Photo[]>> => 
    fetch.get(`/photos/album/${albumId}`)

// 移动照片到其他相册
export const movePhotoToAlbumApi = (photoId: number, albumId: number): Promise<ApiResponse> => 
    fetch.post('/photos/move', { photoId, albumId })

// 删除照片
export const deletePhotoApi = (photoId: number): Promise<ApiResponse> => 
    fetch.delete(`/photos/${photoId}`)