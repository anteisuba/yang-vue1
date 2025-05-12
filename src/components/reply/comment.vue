<template>
  <div class="card twitter" :style="{ height }">
    <!-- 用户资料区域 -->
    <div class="twitter__profile">
      <div class="twitter__header">
        <img class="twitter__cover" src="https://pbs.twimg.com/media/GqP6UBTaIAAlG2V?format=jpg&name=large" alt="封面图" />
        <div class="twitter__avatar">
          <img :src="userInfo.profile_image_url" alt="头像" />
        </div>
        <div class="twitter__info">
          <div class="twitter__username">
            <h2>{{ userInfo.name }}</h2>
            <p class="twitter__handle">@{{ userInfo.username }}</p>
          </div>
          <p class="twitter__join">{{ formatJoinDate(userInfo.created_at) }} 加入</p>
          <div class="twitter__stats">
            <span><strong>{{ userInfo.public_metrics.following_count }}</strong> 正在关注</span>
            <span><strong>{{ userInfo.public_metrics.followers_count }}</strong> 关注者</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 标签导航栏 -->
    <div class="twitter__tabs">
      <div class="twitter__tab twitter__tab--active">帖子</div>
      <div class="twitter__tab">回复</div>
      <div class="twitter__tab">亮点</div>
      <div class="twitter__tab">文章</div>
      <div class="twitter__tab">媒体</div>
      <div class="twitter__tab">喜欢</div>
    </div>
    
    <!-- 推文列表 -->
    <div class="twitter__content">
      <div v-if="filteredTweets.length > 0" class="twitter__tweets">
        <div v-for="(tweet, index) in filteredTweets" :key="index" class="twitter__tweet">
          <div class="tweet__header">
            <img class="tweet__avatar" :src="tweet.avatar" alt="头像" />
            <div class="tweet__user-info">
              <span class="tweet__name">{{ tweet.name }}</span>
              <span class="tweet__handle">{{ tweet.handle }}</span>
              <span class="tweet__time">· {{ tweet.time }}</span>
            </div>
          </div>
          <div class="tweet__content">
            <p>{{ tweet.text }}</p>
            <img v-if="tweet.image" :src="tweet.localImage || tweet.image" class="tweet__image" alt="推文图片" />
          </div>
          <div class="tweet__actions">
            <div class="tweet__action">
              <span class="tweet__icon">💬</span>
              <span>{{ tweet.commentCount }}</span>
            </div>
            <div class="tweet__action">
              <span class="tweet__icon">🔄</span>
              <span>{{ tweet.retweetCount }}</span>
            </div>
            <div class="tweet__action">
              <span class="tweet__icon">❤️</span>
              <span>{{ tweet.likeCount }}</span>
            </div>
            <div class="tweet__action">
              <span class="tweet__icon">📤</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="twitter__loading">
        <p>正在加载推文...</p>
      </div>
    </div>
    
    <!-- 分页组件 -->
    <div v-if="showPagination && tweets.length > pageSize" class="twitter__pagination">
      <div class="pagination">
        <button 
          :disabled="currentPage === 1" 
          @click="currentPage > 1 && changePage(currentPage - 1)"
          class="pagination__btn"
        >
          上一页
        </button>
        <span class="pagination__info">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          :disabled="currentPage >= totalPages" 
          @click="currentPage < totalPages && changePage(currentPage + 1)"
          class="pagination__btn"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed, getCurrentInstance } from 'vue'
  import type { CommentProps } from './replay'
  import { fetchTwitterProfileData } from '../../api/twitter'
  
  // 本地图片资源路径
  const localImages = [
    '/src/assets/touxiang/a.jpeg',
    '/src/assets/touxiang/b.jpeg',
    '/src/assets/touxiang/c.jpeg',
    '/src/assets/touxiang/d.jpeg',
    '/src/assets/touxiang/e.jpeg',
    '/src/assets/touxiang/f.jpeg',
    '/src/assets/touxiang/g.jpeg',
    '/src/assets/touxiang/h.jpeg'
  ]
  
  // 随机获取本地图片
  const getRandomLocalImage = () => {
    const randomIndex = Math.floor(Math.random() * localImages.length)
    return localImages[randomIndex]
  }
  
  const proxy: any = getCurrentInstance()?.proxy

  //props
  const props = withDefaults(defineProps<CommentProps>(), {
    pageSize: 10,
    height: '560px',
    showPagination: false
  })

  // 定义数据结构
  const userInfo = ref({
    name: '安定',
    username: 'ndng16752248', // 固定为您的账号
    profile_image_url: 'https://pbs.twimg.com/profile_images/1759288578851708928/3vfE6G6y_400x400.jpg',
    description: 'Twitter用户',
    public_metrics: {
      followers_count: 13,
      following_count: 388,
      tweet_count: 120
    },
    created_at: '2022-10-01T00:00:00.000Z'
  })
  
  // 推文数据
  const tweets = ref([])
  // 分页相关
  const currentPage = ref(1)
  
  // 计算总页数
  const totalPages = computed(() => Math.ceil(tweets.value.length / props.pageSize))
  
  // 根据当前页码筛选显示的推文
  const filteredTweets = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize
    const end = start + props.pageSize
    return tweets.value.slice(start, end)
  })
  
  // 切换页面方法
  const changePage = (page) => {
    currentPage.value = page
  }
  
  // 格式化加入日期
  const formatJoinDate = (dateString) => {
    if (!dateString) return '2022年10月'
    const date = new Date(dateString)
    return `${date.getFullYear()}年${date.getMonth() + 1}月`
  }
  
  // 获取Twitter用户信息
  const getUserInfo = async (username = 'ndng16752248') => {
    try {
      const loadingToast = proxy?.$message?.loading({
        message: '正在加载Twitter数据...',
        duration: 0
      })
      
      // 获取Twitter数据
      const twitterData = await fetchTwitterProfileData(username)
      
      // 更新数据
      userInfo.value = twitterData.userInfo
      
      // 格式化推文数据，不再限制推文数量，改为通过分页控制显示
      tweets.value = twitterData.tweets.map(tweet => {
        // 查找关联的媒体
        const mediaKey = tweet.attachments?.media_keys?.[0]
        const mediaItem = mediaKey ? twitterData.media.find(m => m.media_key === mediaKey) : null
        
        // 格式化日期
        const createdAt = new Date(tweet.created_at)
        const month = createdAt.getMonth() + 1
        const day = createdAt.getDate()
        const formattedDate = `${month}月${day}日`
        
        return {
          name: userInfo.value.name,
          handle: `@${userInfo.value.username}`,
          avatar: userInfo.value.profile_image_url,
          time: formattedDate,
          text: tweet.text,
          image: mediaItem?.url || '',
          localImage: getRandomLocalImage(), // 添加随机本地图片
          commentCount: tweet.public_metrics.reply_count,
          retweetCount: tweet.public_metrics.retweet_count,
          likeCount: tweet.public_metrics.like_count
        }
      })
      
      // 重置分页到第一页
      currentPage.value = 1
      
      // 关闭加载提示
      loadingToast?.close()
      
      // 显示成功消息
      proxy?.$message?.success({
        message: '加载Twitter数据成功！',
        duration: 2000
      })
    } catch (error) {
      console.error('加载Twitter数据失败:', error)
      proxy?.$message?.error({
        message: '加载Twitter数据失败，使用备用数据',
        duration: 2000
      })
    }
  }

  //挂载
  onMounted(() => {
    // 加载固定用户Twitter数据
    getUserInfo('ndng16752248')
  })
</script>

<style lang="less" scoped>
  .twitter {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    
    &__profile {
      margin-bottom: 16px;
    }
    
    &__header {
      position: relative;
      margin-bottom: 16px;
    }
    
    &__cover {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
      background-color: #ccc;
    }
    
    &__avatar {
      position: absolute;
      left: 16px;
      bottom: 40px;
      transform: none;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 4px solid white;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    &__info {
      margin-top: 50px;
      padding-left: 100px;
      text-align: left;
    }
    
    &__username {
      margin-bottom: 4px;
      
      h2 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
      }
    }
    
    &__handle {
      color: @font-color-s;
      font-size: 14px;
      margin: 0;
    }
    
    &__join {
      color: @font-color-s;
      font-size: 14px;
      margin: 8px 0;
    }
    
    &__stats {
      display: flex;
      justify-content: flex-start;
      gap: 16px;
      margin-top: 12px;
      font-size: 14px;
      color: @font-color-s;
      
      strong {
        color: #000;
      }
    }
    
    &__tabs {
      display: flex;
      border-bottom: 1px solid @line-color-s;
      margin-bottom: 16px;
      overflow-x: auto;
      scrollbar-width: none;
      
      &::-webkit-scrollbar {
        display: none;
      }
    }
    
    &__tab {
      padding: 12px 16px;
      font-size: 14px;
      cursor: pointer;
      white-space: nowrap;
      
      &--active {
        border-bottom: 2px solid @pcolor;
        color: @pcolor;
        font-weight: bold;
      }
    }
    
    &__content {
      min-height: 200px;
      margin-top: 24px;
      flex: 1;
      overflow-y: auto;
    }
    
    &__tweets {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    &__tweet {
      padding: 12px 0;
      border-bottom: 1px solid @line-color-s;
    }
    
    &__loading {
      padding: 40px 0;
      text-align: center;
      color: @font-color-s;
    }
    
    // 分页样式
    &__pagination {
      padding: 12px 0;
      border-top: 1px solid @line-color-s;
      margin-top: auto;
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      
      &__btn {
        background: @pcolor;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 14px;
        transition: opacity 0.2s;
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
      
      &__info {
        font-size: 14px;
        color: @font-color-s;
      }
    }
    
    .tweet__header {
      display: flex;
      margin-bottom: 8px;
    }
    
    .tweet__avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 12px;
    }
    
    .tweet__user-info {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
    }
    
    .tweet__name {
      font-weight: bold;
    }
    
    .tweet__handle, .tweet__time {
      color: @font-color-s;
      font-size: 14px;
    }
    
    .tweet__content {
      margin-left: 60px;
      margin-bottom: 12px;
      
      p {
        margin-bottom: 8px;
        white-space: pre-line;
      }
    }
    
    .tweet__image {
      max-width: 40%;
      border-radius: 12px;
      margin-top: 8px;
    }
    
    .tweet__actions {
      display: flex;
      justify-content: space-between;
      margin-left: 60px;
      max-width: 80%;
    }
    
    .tweet__action {
      display: flex;
      align-items: center;
      gap: 4px;
      color: @font-color-s;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s ease;
      
      &:hover {
        color: @pcolor;
      }
    }
    
    .tweet__icon {
      font-size: 16px;
    }
  }
  
  @media (max-width: 600px) {
    .twitter {
      padding: 0 8px;
      
      &__avatar {
        width: 80px;
        height: 80px;
      }
      
      .tweet__content {
        margin-left: 40px;
      }
      
      .tweet__actions {
        margin-left: 40px;
      }
    }
  }
</style>
