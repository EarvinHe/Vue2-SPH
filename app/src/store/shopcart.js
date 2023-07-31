import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        // console.log(result)
        if (result.code == 200) {
            commit('GETCARTLIST', result.data);

        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 删除勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context：小仓库，commit{提交mutation修改state} getters【计算属性】 dispatch【派发action】
        // 获取购物车中全部产品（是一个数组）
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            // 将每一次返回的Promise添加到数组中
            PromiseAll.push(promise);
        });
        // 只要全部的p1p2...都成功，返回结果为成功
        // 如果有一个失败，返回即失败
        return Promise.all(PromiseAll)
    },

    // 全选
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        // console.log(state)
        // console.log(isChecked)
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise);
        });
        // 返回最终结果
        return Promise.all(promiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}