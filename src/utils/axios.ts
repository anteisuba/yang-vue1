import { baseUrl } from "./env";
import { YkMessage } from "@yike-design/ui";
import axios from "axios";


const service = axios.create({
    baseURL:baseUrl,
    timeout:8000
});

service.interceptors.request.use(
    //发送请求前做些什么
    config=> {
        // 添加token认证
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    //对请求错误做些什么
    error=> {
        YkMessage({type:'warning',message:error.message})
        return Promise.reject();
    }
)

//添加响应起拦截器
service.interceptors.response.use(
    response=>{
        if(response.status===200) {
            return response.data;
        } else {
            YkMessage({ type: 'warning', message: '请求发送错误' });
            return Promise.reject(new Error('请求发送错误'));
        }
    },
    error=>{
        console.error('请求错误:', error);
        // 处理401未授权错误
        if (error.response && error.response.status === 401) {
            YkMessage({type:'error', message:'登录已失效，请重新登录'});
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject();
        }
        YkMessage({type:'warning', message: error.message || '请求失败'})
        return Promise.reject();
    }
)

export default service;