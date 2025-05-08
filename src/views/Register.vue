<template>
    <div class="login" :style="{height:pageHeight + 'px'}">
      <yk-space dir="vertical" :size="48" class="login__main" align="center">
        <yk-space dir="vertical" align="center">
            <img src="../assets/tubiao/jinxi2.jpeg" class="logo"/>
            <span class="name">ご登録ありがとうございます</span>
        </yk-space>
        <yk-space dir="vertical"> 
            <yk-input v-model="user.name" placeholder="ユーザ名" style="width:320px" size="xl"/>
            <yk-input v-model="user.psw" placeholder="パスワードは４桁未満にすることはできません" type="password" style="width:320px"size="xl"/>
        </yk-space>
        <yk-space dir="vertical" :size="16">
          <yk-button long @click="submit">登録</yk-button>
          <yk-button long type="outline" @click="goToLogin">ログインに戻る</yk-button>
        </yk-space>
      </yk-space>
    </div>
</template>
  
  <script lang="ts" setup>
    import message from '@yike-design/ui/es/components/message/src/utils';
    import { getCurrentInstance, ref } from 'vue';
    import { registerApi } from '@/api';
    import { useCode } from '@/hooks/code'
    import { useRouter } from 'vue-router';

    const router = useRouter();
  //code验证
  const {tackleCode} = useCode();

  

    const pageHeight = ref(window.innerHeight-150)
    const proxy:any = getCurrentInstance()?.proxy
    //用户
    const user = ref({
        name:'',
        psw:'',
    })

    //提交
    const submit = () => {
    if (user.value.name && user.value.psw && user.value.psw.length > 3) {
      let data = {
        name: user.value.name,
        password: user.value.psw,
        mail: `${user.value.name}@test.com`, // 🔥 加上这一行
        moment: new Date()
      }

    registerApi(data).then((res: any) => {
      if (tackleCode(res.code)) {
        proxy.$message({ type: 'primary', message: '登録成功' })
        router.push('/login')
      }
    })
  } else {
    proxy.$message({ type: 'warning', message: '入力が不完全です' })
  }
}

  // 返回登录页面
  const goToLogin = () => {
    router.push('/login')
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
  
  