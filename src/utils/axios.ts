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
        YkMessage({type:'warning',message:error.message})
        return Promise.reject();
    }
)

export default service;