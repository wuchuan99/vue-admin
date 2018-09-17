import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: localStorage.getItem('user')
    },
    mutations: {
        getUserName(state, data){
            state.username =  data
            localStorage.setItem('user', data)
        }
    }
})
export default store