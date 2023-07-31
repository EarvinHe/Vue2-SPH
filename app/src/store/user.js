// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
const state = {
    code: '',
    // token:localStorage.getItem('TOKEN'),
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state) {
        state.token = '',
            state.userInfo = {},
            removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        // console.log(result)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 完成用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 登录token
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // console.log(result)
        // 服务器下发token，用户唯一标识符 
        if (result.code == 200) {
            // 用户已经登录成功且获取到token
            commit('USERLOGIN', result.data.token);
            // 持久化存储token
            // localStorage.setItem('TOKEN',result.data.token)
            setToken(result.data.token)
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }

    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        // console.log(result)
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit('CLEAR');
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}