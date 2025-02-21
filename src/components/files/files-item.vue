<template>
    <div class="file-item">
        <div class="file-item__img">
            <yk-image :src="imgurl" width="200" height="200" :is-lazy="true" fit="contain"/>
            <yk-space class="file-item__img--tool" size="s"> 
                <IconDeleteOutline class="files__tool-delete" />
                <IconSwitchOutline class="files__tool-switch"  />  
            </yk-space>
            <div class="file-item__img--check">
                <IconTickMinOutline style="color: #fff;font-size:24px; ;" />
            </div>
        </div>
        <yk-text>{{ props.data.id }} {{ props.data.format }}</yk-text>
    </div>
</template>

<script lang="ts" setup>
    import { FileData } from '@/utils/interface';
import { computed } from 'vue';
    type FileItemProps = {
        data?:FileData

    }
    const props = withDefaults(defineProps<FileItemProps>(),{
        
    })

    //图片路径
    const imgurl = computed(()=> {
        if (!props.data?.url) {
        return 'https://pbs.twimg.com/media/GkM-ycObUAAY9wr?format=jpg&name=4096x4096'; // 或者返回一个默认图片路径
        }
        // 使用相对路径
        return "/src/assets/touxiang/" + props.data?.url
    })


</script>

<style lang="less" scoped>
    .file-item{
        &__img{
            position: relative;
            border-radius: @radius-m;
            &--tool {
                position: absolute;
                right: @space-s;
                bottom: @space-s;
                opacity: 0;
                .yk-icon {
                    width: 32px;
                    height: 32px;
                    padding: 8px;
                    background: rgba(255, 255, 255, 0.56);
                    border-radius:@radius-m;
                    transition: all @animatb;
                    cursor: pointer;
                    &:hover {
                        color: @pcolor;
                        background: rgba(255, 255, 255, 0.72);
                        background-filter:blur(2px);
                    }
                }
            }
            &--check {
                width: 26px;
                height: 26px;
                border-radius: @radius-s;
                background: @gray-4;
                position: absolute;
                left: @space-s;
                top: @space-s;
                cursor: pointer;
                border:1px solid rgba(255, 255, 255, 0.56);
                opacity: 0;
                .yk-icon {
                    color: white;

                }
            }
            &:hover {
                background: @pcolor-1; 
                .file-item__img--check {
                    opacity: 1;
                }
                .file-item__img--tool {
                    opacity: 1;
                }
            }
        }
    }
</style>