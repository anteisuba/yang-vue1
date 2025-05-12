<template>
  <yk-modal v-model="visible" title="上传照片">
    <div class="upload-container">
      <div class="upload-area">
        <input 
          type="file" 
          id="file-upload" 
          multiple 
          accept="image/*" 
          class="file-input" 
          @change="handleFileChange"
        />
        <label for="file-upload" class="upload-button">
          <span style="margin-right: 4px">⬆️</span>上传照片
        </label>
        
        <div class="upload-preview" v-if="uploadFiles.length > 0">
          <div v-for="(file, index) in uploadFilesPreview" :key="index" class="preview-item">
            <img :src="file.url" class="preview-thumbnail" @click="handlePreview(index)" />
            <div class="preview-actions">
              <span class="preview-name">{{ file.name }}</span>
              <span class="preview-remove" @click="handleRemove(index)">×</span>
            </div>
            
            <div class="preview-rename">
              <yk-input 
                v-model="file.customName" 
                placeholder="自定义名称(可选)" 
                size="s"
                show-counter
                :limit="50"
              />
            </div>
          </div>
        </div>
        
        <div class="upload-progress" v-if="isUploading">
          <yk-progress :percent="uploadProgress" :show-info="true" status="active" />
        </div>
      </div>
      
      <div class="upload-tips">
        <yk-title :level="5">上传提示</yk-title>
        <yk-text type="secondary">• 支持 JPG、PNG、GIF 格式</yk-text>
        <yk-text type="secondary">• 单张照片大小不超过 10MB</yk-text>
        <yk-text type="secondary">• 请确保拥有照片版权</yk-text>
        <yk-text type="secondary">• 可为每张照片添加自定义名称</yk-text>
        
        <div class="upload-album-select" v-if="uploadFiles.length > 0">
          <yk-title :level="5" style="margin-top: 16px">选择相册</yk-title>
          <div class="custom-select">
            <select v-model="selectedUploadAlbum" class="album-select">
              <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <yk-space>
        <yk-button @click="handleCancel">取消</yk-button>
        <yk-button type="primary" @click="handleUpload" :disabled="uploadFiles.length === 0 || isUploading" :loading="isUploading">
          {{ isUploading ? '上传中...' : '确认上传' }}
        </yk-button>
      </yk-space>
    </template>
  </yk-modal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  albums: any[]
  selectedAlbumId: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'upload', files: File[], albumId: number, customNames: string[]): void
}>()

const visible = ref(props.modelValue)
const uploadFiles = ref<File[]>([])
const uploadFilesPreview = ref<{name: string, url: string, customName?: string}[]>([])
const selectedUploadAlbum = ref(props.selectedAlbumId)
const uploadProgress = ref(0)
const isUploading = ref(false)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(() => visible.value, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.selectedAlbumId, (val) => {
  selectedUploadAlbum.value = val
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return
  
  const newFiles: File[] = Array.from(target.files)
  const validFiles: File[] = []
  const validFilesPreview: {name: string, url: string, customName?: string}[] = []
  
  for (const file of newFiles) {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      continue
    }
    
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
      continue
    }
    
    validFiles.push(file)
    validFilesPreview.push({
      name: file.name,
      url: URL.createObjectURL(file),
      customName: ''
    })
  }
  
  uploadFiles.value = [...uploadFiles.value, ...validFiles]
  uploadFilesPreview.value = [...uploadFilesPreview.value, ...validFilesPreview]
  
  target.value = ''
}

const handlePreview = (index: number) => {
  // 触发预览事件
  emit('preview', uploadFilesPreview.value[index].url)
}

const handleRemove = (index: number) => {
  uploadFiles.value.splice(index, 1)
  uploadFilesPreview.value.splice(index, 1)
}

const handleUpload = () => {
  if (uploadFiles.value.length === 0) return
  
  const customNames = uploadFilesPreview.value.map(item => item.customName || '')
  emit('upload', uploadFiles.value, selectedUploadAlbum.value, customNames)
}

const handleCancel = () => {
  uploadFiles.value = []
  uploadFilesPreview.value = []
  visible.value = false
}
</script>

<style lang="less" scoped>
.upload-container {
  display: flex;
  gap: @space-xl;
}

.upload-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  .file-input {
    display: none;
  }
  
  .upload-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 120px;
    border: 2px dashed @line-color-m;
    border-radius: @radius-m;
    cursor: pointer;
    background-color: @bg-color-m;
    color: @font-color-s;
    font-size: 16px;
    transition: all 0.3s;
    
    &:hover {
      border-color: @pcolor;
      color: @pcolor;
      background-color: @pcolor-1;
    }
  }
}

.upload-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 16px;
  
  .preview-item {
    position: relative;
    border-radius: @radius-s;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
      
      .preview-actions {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .preview-thumbnail {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      cursor: pointer;
    }
    
    .preview-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.7);
      padding: 5px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 0;
      transform: translateY(100%);
      transition: all 0.3s;
    }
    
    .preview-name {
      font-size: 12px;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 70%;
    }
    
    .preview-remove {
      color: white;
      font-size: 18px;
      cursor: pointer;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    
    .preview-rename {
      margin-top: 8px;
      padding: 0 4px;
    }
  }
}

.upload-tips {
  display: flex;
  flex-direction: column;
  gap: @space-s;
  min-width: 200px;
}

.upload-album-select {
  margin-top: @space-m;
}

.custom-select {
  position: relative;
  width: 100%;
  margin-top: 8px;
  
  .album-select {
    width: 100%;
    padding: 8px 12px;
    border-radius: @radius-s;
    border: 1px solid @line-color-m;
    background-color: @bg-color-m;
    font-size: 14px;
    appearance: none;
    cursor: pointer;
    transition: all 0.3s;
    
    &:focus {
      outline: none;
      border-color: @pcolor;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    }
    
    &:hover {
      border-color: @pcolor-1;
    }
  }
  
  &:after {
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid @font-color-m;
    pointer-events: none;
  }
}

.upload-progress {
  margin-top: 16px;
}
</style> 