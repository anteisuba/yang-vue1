<template>
  <div class="head-bar" v-if="isLoggedIn">
    <yk-space align="center" size="m" style="cursor: pointer" v-on:click="backHome">
      <img src="../../assets/touxiang/c.jpeg" class="logo" />
      <span class="name">博客后台</span>
    </yk-space>
    <yk-space align="center" size="xl">
      <IconMove2Fill style="font-size: 20px" @click="changeActive(true)" />
      <yk-avatar
        img-url="https://pbs.twimg.com/profile_images/1875328788785197058/QI8qWO_0_400x400.jpg"
      ></yk-avatar>
      <div><yk-theme skin="light" /></div>
      <yk-button @click="logout">退出</yk-button>
    </yk-space>
    <Information :pageSize="10" :active="active" @close="changeActive(false)" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { Information } from '../reply'
  import { isRegisterApi } from '@/api'
  import { useCode } from '@/hooks/code'
  const router = useRouter();
  const route = useRoute();

  // 检查登录状态
  const isLoggedIn = ref(!!localStorage.getItem('token'));

  // 监听路由变化，检查登录状态
  watch(() => route.path, () => {
    isLoggedIn.value = !!localStorage.getItem('token');
  });

  //code验证
  const {tackleCode} = useCode();

  const active = ref<boolean>(false)
  //返回总览
  const backHome = () => {
    router.push('/')
  }

  // 展开/关闭私信
  const changeActive = (e: boolean) => {
    active.value = e
  }

  const isRegister=()=> {
    // 只有在登录状态下才检查注册
    if (!isLoggedIn.value) return;
    
    let data={}
    isRegisterApi(data).then((res:any)=>{
      console.log("isRegister 响应内容：", res);
      // if(res.code===200) {
      // } else if(res.code===401) {
      //   router.push('/register')
      // }
      if(tackleCode(res.code)){

      }
    })
    
  }

  // 退出登录
  const logout = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    router.push('/login');
  }

  // 检查登录状态的函数
  const checkLoginStatus = () => {
    isLoggedIn.value = !!localStorage.getItem('token');
  }

  onMounted(() => {
    isRegister();
    checkLoginStatus();
    // 监听登录事件
    window.addEventListener('storage', checkLoginStatus);
  })
</script>

<style lang="less" scoped>
  .head-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 72px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 @space-xl;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      transition: transform 0.3s ease;
      border: 2px solid transparent;

      &:hover {
        transform: scale(1.05);
        border-color: #2b5aed;
      }
    }

    .name {
      font-size: 18px;
      font-weight: 600;
      color: @font-color-m;
      margin-left: @space-m;
      transition: color 0.3s ease;

      &:hover {
        color: #2b5aed;
      }
    }

    :deep(.yk-space) {
      .yk-avatar {
        transition: transform 0.3s ease;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }
      }

      .yk-button {
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(43, 90, 237, 0.2);
        }
      }

      .icon {
        transition: all 0.3s ease;
        cursor: pointer;
        color: @font-color-m;

        &:hover {
          color: #2b5aed;
          transform: scale(1.1);
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .head-bar {
      padding: 0 @space-m;
      height: 60px;

      .logo {
        width: 32px;
        height: 32px;
      }

      .name {
        font-size: 16px;
      }
    }
  }
</style>
