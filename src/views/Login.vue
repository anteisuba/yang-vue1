<template>
    <div class="login" :style="{height:pageHeight + 'px'}">
      <yk-space dir="vertical" :size="48" class="login__main" align="center">
        <yk-space dir="vertical" align="center">
            <img src="../assets/tubiao/jinxi1.jpeg" class="logo"/>
            <span class="name">YANG BLOG</span>
        </yk-space>
        <yk-space dir="vertical"> 
            <yk-input v-model="user.name" placeholder="ユーザ名" style="width:320px" size="xl"/>
            <yk-input v-model="user.psw" placeholder="パスワード" type="password" style="width:320px"size="xl"/>
        </yk-space>
        <yk-space dir="vertical" :size="16">
          <yk-button long @click="submit">登録</yk-button>
          <yk-button long type="outline" @click="goToRegister">新規ユーザ登録</yk-button>
        </yk-space>
      </yk-space>
    </div>
</template>
  
  <script lang="ts" setup>
    import message from '@yike-design/ui/es/components/message/src/utils';
    import { getCurrentInstance, ref } from 'vue';
    import { signinApi } from '@/api';
    import { useCode } from '@/hooks/code'
    import { useRouter } from 'vue-router';

    const router = useRouter();
    //code验证
    const {tackleCode} = useCode();
     
    const pageHeight = ref(window.innerHeight-150)
    const proxy:any = getCurrentInstance()?.proxy
    const user = ref({
        name:'',
        psw:'',
    })

    //提交
    const submit = () => {
      console.log("提交前用户输入：", user.value) // ✅ 先看这里是否打印出了你输入的内容

      if(user.value.name && user.value.psw) {
        let data = {
          name: user.value.name,
          password: user.value.psw,      // 注意字段名应和后端一致
          moment: new Date()
        }

        signinApi(data).then((res: any) => {
  const code = res.code       // 获取响应code
  if (code === 200) {
    // 保存token到localStorage
    if (res.data && res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    router.push('/index')
  } else if (code === 400) {
    proxy.$message({ type: 'error', message: 'ユーザ名とパスワードが間違っています！' })
  } else {
    proxy.$message({ type: 'warning', message: 'ログイン失敗' })
  }
})


      } else {
        proxy.$message({type:'warning',message:'入力が不完全です'})
      }
    }

    // 跳转到注册页面
    const goToRegister = () => {
      router.push('/register')
    }

  </script>
  
  <style lang="less" scoped>
  .login {
    z-index: 10;
    position: fixed;
    top:0;
    left: 0;
    background:@bg-color-m;
    width:100%;
    display:flex;
    align-items-content:center;
    justify-content:center;
    &__main{
        padding:48px;
        border-radius:@radius-xl;
        background:@bg-color-l;
        .name {
          font-size:20px ;
          font-weight: 600px;
        }
        .logo {
          width:200px;
          height:200px;
        }
    }
  }
  
  
  </style>
  
  