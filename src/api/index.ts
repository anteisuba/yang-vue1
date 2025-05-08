import fetch from '../utils/axios'

//判断是否有注册
export const isRegisterApi = (data:object)=>fetch.post('/isRegister',data)

//用户注册
export const registerApi = (data:object)=>fetch.post('/register',data)

//用户登录
export const signinApi = (data: object) =>
    fetch.post('/signin', data)