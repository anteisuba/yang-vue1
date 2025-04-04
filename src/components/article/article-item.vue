<!-- 模块里面的每一条 -->
<template>
    <div class="article-item">
        <yk-space size="xl">
            <div class="article-item__cover">
                <yk-image 
                :src="coverUrl"
                width="200"
                height="200"
                :is-lazy="true"
                :preview="true"
                fit="covers"
                />
                <p class="article-item__unpublish" v-if="props.data?.state===0">未发布</p>
            </div>
            <div style="width: 100%;">
                <p class="article-item__title">{{ props.data?.title }}</p>
                <p class="article-item__introduce">{{ props.data?.introduce }}</p>
                <div class="article-item__datas">
                    <yk-space size="xl">
                        <yk-text type="secondary">
                            {{ subsetStore.subsetName(props.data?.subsetId) }}
                            <yk-text type="secondary" v-if="props.data?.label && props.data.label.length > 0" >
                                <span v-for="item in props.data?.label" style="padding-right: 4px;">{{ item }}</span>
                            </yk-text>
                        </yk-text>
                        <yk-text type="third">{{ moment(props.data?.moment) }}</yk-text>
                        <yk-space class="article-item__control">
                            <yk-text type="third">
                                <IconEyeOutline/>
                                {{ props.data?.views }}
                            </yk-text>
                            <yk-text type="third">
                                <IconLikeOutline/>
                                {{ props.data?.praise }}
                            </yk-text>
                            <yk-text type="third">
                                <IconCommentOutline/>
                                {{ props.data?.comment }}
                            </yk-text>
                        </yk-space>
                        <yk-space class="article-item__control" size="xl">
                            <yk-tooltip placement="top" title="公開" v-if="props.data?.state===0">
                                <IconSendOutline @click="updateState(1)"/>
                            </yk-tooltip>
                            <yk-tooltip placement="top" title="ロールバック" v-if="props.data?.state===1">
                                <IconRevokeOutline @click="updateState(0)"/>
                            </yk-tooltip>
                            <yk-tooltip placement="top" title="編集">
                                <IconFillOutline/>
                            </yk-tooltip>
                            <yk-popconfirm
                                trigger="click"
                                placement="topRight"
                                title="削除を確定する"
                                cancelText="キャンセル"
                                okText="確定"
                                content="削除は不可逆の操作で、この記事を削除します。"
                                @cancel="cancel"
                                @confirm="deleteAriticle()"
                            >
                                <IconDeleteOutline />
                            </yk-popconfirm>
                        </yk-space>

                    </yk-space>
                </div>
            </div>
        </yk-space>
    </div>
</template>

<script lang="ts" setup>
    import { ArticleData } from '@/utils/interface';
    import { computed,getCurrentInstance } from 'vue';
    import { useSubsetStore } from '@/store/subset';
    import { moment } from '@/utils/moment';
import { IconEyeOutline } from '@yike-design/ui/es/components/svg-icon';
import { IconLikeOutline } from '@yike-design/ui/es/components/svg-icon';
import { IconCommentOutline } from '@yike-design/ui/es/components/svg-icon';

    const subsetStore = useSubsetStore()
    type ArticleItemProps = {
        data?:ArticleData
    }
    const props = withDefaults(defineProps<ArticleItemProps>(), {})
    console.log(props.data)
    const emits = defineEmits(["delete","state"])
    //封面地址
    const coverUrl = computed(() => {
        if (!props.data?.cover) return '';
        return `/src/assets/fengmian/${props.data.cover}`;
    })

    const proxy: any = getCurrentInstance()?.proxy
    function cancel() {
    proxy.$message({ type: 'warning', message: 'キャンセルボタンをクリックしました' })
    }
    const deleteAriticle = () => {
        emits("delete",props.data!.id)
    }

    //改修状態
    const updateState = (e:number) => {
        emits("state",{id:props.data!.id,state:e})
    }



</script>

<style lang="less" scoped>
    .article-item{
        border-radius: @radius-m;
        background: @bg-color-l;
        padding: @space-xl;
        width: 100%;
        &__cover{
            position: relative;
            border-radius: @radius-m;
            overflow: hidden;
            width: 200px;
            flex: none;

        }
        &__unpublish{
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            background: @pcolor-5;
            color: white;
            line-height: 36px;
        }
        &__title{
             font-size: 20px;
             font-weight: 600;
             padding-bottom:@space-s;
             

        }

        &__introduce{
            height: 48px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            color: @font-color-l;
            margin-bottom: @space-m;
            max-width: 720px;

        }
        &__datas{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__control{
            .yk-icon{
                width: 20px;
                height: 20px;
                color: @font-color-s;
                cursor: pointer;
                &:hover{
                    color: @pcolor;
                }
            }
        }
    }
</style>