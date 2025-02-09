<template>
    <div class="head-bar">
        <yk-space align="center" size="m" style="cursor: pointer;">
            <img src="../../assets/Group18.svg" class="logo"/>
            <span class="name">博客后台</span>
        </yk-space>
        <yk-space align="center" size="xl">
            <IconMove2Fill style="font-size: 20px;"/>
            <yk-avatar img-url="https://pbs.twimg.com/profile_images/1875328788785197058/QI8qWO_0_400x400.jpg"></yk-avatar>
            <div><yk-theme skin="light" /></div>
            <yk-button>退出</yk-button>
        </yk-space>
    </div>
</template>

<script>
export default {
    name: 'component-name',
    
    data() {
        return {
            
        }
    },
    
    computed: {
        
    },
    
    methods: {
        
    }
}
</script>

<style lang="less" scoped>

    .head-bar {
        /* 固定导航栏 返回顶部按钮 固定的聊天窗口 悬浮的广告或提示框 网站的 cookie 提示条*/
        position: fixed; 
        top: 0;
        left: 0;
        width: 1440px;
        height: 72px;
        background: @bg-color-l;
        z-index: 10;
        // 分布在两边
        display: flex;
        // 上下居中
        align-content: space-between;
        // 第一个项目放在起点
        // 最后一个项目放在终点
        // 剩余空间平均分配到其他项目之间
        // 项目之间的间隔相等
        justify-content: space-between;
        padding:0 @space-xl;
        .logo {
            width: 68px;
            height: 43px;
            border-radius: 50%;
        }
        .name {
            font-size: 20px;
            font-weight: 600;
        }


    }



</style>