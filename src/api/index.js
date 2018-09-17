import axios from 'axios'
const baseURL = 'http://www.lovegf.cn:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

//登录拦截发送token
axios.interceptors.request.use(function(config){
    let token = localStorage.getItem('mytoken')
    if(token){
        config.headers['Authorization'] = token
    }
    return config
}, function (error) {
    return Promise.reject(error)
  })

//请求登录接口
export const checkUser = params => {
    return axios.post('login', params).then(res => res.data);
}
//请求用户列表接口
export const users = params => {
    return axios.get('users', params).then(res => res.data);
}
//修改用户状态接口
export const upStatus = params => {
    return axios.put(`users/${params.userId}/state/${params.type}`).then(res => res.data);
}
//添加用户
export const addUser = params => {
    return axios.post('users',params).then(res => res.data);
}