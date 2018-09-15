import axios from 'axios'
const baseURL = 'http://www.lovegf.cn:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

//登录拦截发送token
axios.interceptors.request.use(function(config){
    let token = localStorage.getItem('user')
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
//请求用户信息接口
export const users = params => {
    return axios.get('users', params).then(res => res.data);
}