import axios from 'axios'

// Twitter API配置
// 注意：这里需要替换成你自己的API密钥
const twitterApiConfig = {
  baseURL: 'https://api.twitter.com/2',
  headers: {
    // 为避免CORS问题，我们使用备用数据，不实际调用API
    'Authorization': 'Bearer EXAMPLE_TOKEN_REPLACE_WITH_YOURS'
  }
}

// 创建API客户端
const twitterClient = axios.create(twitterApiConfig)

/**
 * 获取用户信息
 * @param username Twitter用户名
 */
export const getUserInfo = async (username: string) => {
  try {
    const response = await twitterClient.get(`/users/by/username/${username}?user.fields=profile_image_url,description,public_metrics`)
    return response.data
  } catch (error) {
    console.error('获取Twitter用户信息失败:', error)
    // 返回备用数据
    return getBackupUserData(username)
  }
}

/**
 * 获取用户推文
 * @param userId 用户ID
 * @param limit 数量限制
 */
export const getUserTweets = async (userId: string, limit = 10) => {
  try {
    const response = await twitterClient.get(
      `/users/${userId}/tweets?max_results=${limit}&tweet.fields=created_at,public_metrics&expansions=attachments.media_keys&media.fields=url,preview_image_url`
    )
    return response.data
  } catch (error) {
    console.error('获取Twitter推文失败:', error)
    // 返回备用数据
    return getBackupTweets()
  }
}

/**
 * 获取推荐用户
 * @param limit 数量限制
 */
export const getRecommendedUsers = async (limit = 3) => {
  // 实际情况下，Twitter API可能没有直接提供推荐用户的接口
  // 这里可以通过获取相似用户或关注者来模拟
  try {
    // 假设使用某个API端点获取推荐用户
    // const response = await twitterClient.get(`/...`)
    // return response.data
    return getBackupRecommendedUsers()
  } catch (error) {
    console.error('获取推荐用户失败:', error)
    return getBackupRecommendedUsers()
  }
}

/**
 * 获取当前热门话题
 * @param limit 数量限制
 */
export const getTrendingTopics = async (limit = 3) => {
  try {
    // 获取全球或特定地区的热门话题
    // const response = await twitterClient.get(`/trends/place?id=1`) // 1是全球的woeid
    // return response.data
    return getBackupTrends()
  } catch (error) {
    console.error('获取热门话题失败:', error)
    return getBackupTrends()
  }
}

// 备用数据函数（当API调用失败时使用）
function getBackupUserData(username: string) {
  return {
    data: {
      id: '1234567890',
      name: '安定',
      username: username || 'ndng16752248',
      profile_image_url: 'https://pbs.twimg.com/profile_images/1759288578851708928/3vfE6G6y_400x400.jpg',
      description: 'Twitter用户',
      public_metrics: {
        followers_count: 13,
        following_count: 388,
        tweet_count: 120
      },
      created_at: '2022-10-01T00:00:00.000Z'
    }
  }
}

function getBackupTweets() {
  return {
    data: [
      {
        id: '1',
        text: '#WutheringWaves #Wuwafanart #Phoebe Phoebe 太漂亮了！',
        created_at: '2023-04-15T10:00:00.000Z',
        public_metrics: {
          retweet_count: 5,
          reply_count: 3,
          like_count: 78
        },
        attachments: {
          media_keys: ['media1']
        }
      },
      {
        id: '2',
        text: '♨️そしてなんと、#ピンクツリリーフ の社員しか着れないはずの法被をいただいてしまいました！\n\nイベントで同じ法被の社員さんに声をかけたら、驚かれました...🙀💦💦\n\n皆様もぜひ、会場でこの法被を着た方を探してみてくださいね🌸\n#第四境界 #人の絵与明細',
        created_at: '2023-04-17T14:30:00.000Z',
        public_metrics: {
          retweet_count: 18,
          reply_count: 42,
          like_count: 153
        },
        attachments: {
          media_keys: ['media2']
        }
      },
      {
        id: '3',
        text: '今天玩了崩坏：星穹铁道的新版本，角色立绘太精致了！#崩坏星穹铁道 #星穹铁道',
        created_at: '2023-05-05T09:15:00.000Z',
        public_metrics: {
          retweet_count: 12,
          reply_count: 8,
          like_count: 96
        },
        attachments: {
          media_keys: ['media3']
        }
      },
      {
        id: '4',
        text: '原神3.6版本的须弥地图扩展区域真的很美，沙漠和雨林的过渡处理得很自然 #原神 #须弥',
        created_at: '2023-05-12T16:45:00.000Z',
        public_metrics: {
          retweet_count: 7,
          reply_count: 15,
          like_count: 122
        }
      },
      {
        id: '5',
        text: '昨日の東京侵食イベント、すごく楽しかったです！皆さんにたくさん会えて嬉しかった～ #東京侵食 #東京侵食2025',
        created_at: '2023-06-02T21:30:00.000Z',
        public_metrics: {
          retweet_count: 24,
          reply_count: 17,
          like_count: 185
        },
        attachments: {
          media_keys: ['media5']
        }
      },
      {
        id: '6',
        text: 'ブリーチの千年血戦篇、アニメ化おめでとうございます！🎉 楽しみにしています！ #BLEACH #千年血戦篇',
        created_at: '2023-06-10T08:00:00.000Z',
        public_metrics: {
          retweet_count: 9,
          reply_count: 3,
          like_count: 67
        }
      },
      {
        id: '7',
        text: '今日はスタジオに行ってきました！新しい曲を録音中... 😊 もうすぐ皆さんに聞いていただけると思います！',
        created_at: '2023-06-22T15:20:00.000Z',
        public_metrics: {
          retweet_count: 15,
          reply_count: 28,
          like_count: 142
        },
        attachments: {
          media_keys: ['media7']
        }
      },
      {
        id: '8',
        text: '美しい夕日を見ながら、ちょっと一息... 今日も1日お疲れ様でした！',
        created_at: '2023-07-03T18:45:00.000Z',
        public_metrics: {
          retweet_count: 6,
          reply_count: 12,
          like_count: 89
        },
        attachments: {
          media_keys: ['media8']
        }
      },
      {
        id: '9',
        text: '「鬼滅の刃」遊郭編、アニメの演出が素晴らしいですね！特に煉獄さんのシーンは感動しました。#鬼滅の刃 #遊郭編',
        created_at: '2023-07-12T22:10:00.000Z',
        public_metrics: {
          retweet_count: 31,
          reply_count: 22,
          like_count: 215
        }
      },
      {
        id: '10',
        text: '明日から新宿マルイのアニメイベントが始まります！皆さん、ぜひ遊びに来てください！特別なグッズも用意していますよ～ #新宿マルイ #アニメイベント',
        created_at: '2023-07-20T13:00:00.000Z',
        public_metrics: {
          retweet_count: 45,
          reply_count: 36,
          like_count: 278
        },
        attachments: {
          media_keys: ['media10']
        }
      }
    ],
    includes: {
      media: [
        {
          media_key: 'media1',
          type: 'photo',
          url: 'https://pbs.twimg.com/media/GIKG7NQXsAARPIu?format=jpg&name=medium'
        },
        {
          media_key: 'media2',
          type: 'photo',
          url: 'https://pbs.twimg.com/media/Gjqk9TsbwAEmbf5?format=jpg&name=medium'
        },
        {
          media_key: 'media3',
          type: 'photo',
          url: 'https://pbs.twimg.com/media/FvXn9IfakAEbear?format=jpg&name=medium'
        },
        {
          media_key: 'media5',
          type: 'photo',
          url: 'https://pbs.twimg.com/media/FvSj4gVaAAEvW08?format=jpg&name=medium'
        },
        {
          media_key: 'media7',
          type: 'photo',
          url: 'https://pbs.twimg.com/media/FzXHINuaIAI5hJ_?format=jpg&name=medium'
        },
        {
          media_key: 'media8',
          type: 'photo',
          url: 'https://pbs.twimg.com/media/FzfLsZ2aMAAC8Yc?format=jpg&name=medium'
        },
        {
          media_key: 'media10',
          type: 'photo',
          url: 'https://pbs.twimg.com/media/FzmFoKTaYAAtGI_?format=jpg&name=medium'
        }
      ]
    }
  }
}

function getBackupRecommendedUsers() {
  return {
    data: [
      {
        id: '1',
        name: '新宿マルイ アニメ...',
        username: 'marui_shinjuku',
        profile_image_url: 'https://pbs.twimg.com/profile_images/1483236570197811206/mGieuZ4I_400x400.jpg'
      },
      {
        id: '2',
        name: '杉並区（地震・水防情報等...',
        username: 'suginami_tokyo',
        profile_image_url: 'https://pbs.twimg.com/profile_images/1293341497262178307/N_0JHcot_400x400.jpg'
      },
      {
        id: '3',
        name: 'せんべろnet（二千ベ...',
        username: '1000bero.net',
        profile_image_url: 'https://pbs.twimg.com/profile_images/1544151706464944128/dvrJ84Hn_400x400.jpg'
      }
    ]
  }
}

function getBackupTrends() {
  return {
    data: [
      {
        name: '#崩坏星穹铁道',
        tweet_volume: 24000,
        category: '日本趋势',
        time: '1小时前'
      },
      {
        name: '#原神',
        tweet_volume: 52000,
        category: '游戏趋势',
        time: '现在'
      },
      {
        name: '#BLEACH',
        tweet_volume: 18000,
        category: '动漫趋势',
        time: '2小时前'
      }
    ]
  }
}

// 提供一个统一的获取Twitter数据的方法
export const fetchTwitterProfileData = async (username: string = 'ndng16752248') => {
  try {
    // 由于CORS限制，直接使用备用数据
    console.log('使用备用Twitter数据')
    
    return {
      userInfo: getBackupUserData(username).data,
      tweets: getBackupTweets().data,
      media: getBackupTweets().includes.media,
      recommendedUsers: getBackupRecommendedUsers().data,
      trends: getBackupTrends().data
    }
    
    /* 注释掉原始的API调用代码
    // 获取用户信息
    const userInfo = await getUserInfo(username)
    const userId = userInfo.data.id
    
    // 获取用户推文
    const tweets = await getUserTweets(userId)
    
    // 获取推荐用户
    const recommendedUsers = await getRecommendedUsers()
    
    // 获取热门话题
    const trends = await getTrendingTopics()
    
    return {
      userInfo: userInfo.data,
      tweets: tweets.data,
      media: tweets.includes?.media || [],
      recommendedUsers: recommendedUsers.data,
      trends: trends.data
    }
    */
  } catch (error) {
    console.error('获取Twitter数据失败:', error)
    
    // 返回备用数据
    return {
      userInfo: getBackupUserData(username).data,
      tweets: getBackupTweets().data,
      media: getBackupTweets().includes.media,
      recommendedUsers: getBackupRecommendedUsers().data,
      trends: getBackupTrends().data
    }
  }
} 