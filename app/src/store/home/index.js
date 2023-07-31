import { reqCategoryList, reqGetBannerList,reqFloorList } from "@/api";
// home模块小仓库
//state:仓库存储数据的地方
const state = {
    // 初始值被瞎写,服务器返回对象，服务器返回数组。【根据接口返回值初始化】
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor轮播图
    floorList:[]
};
// mutations:修改state的唯一手段(state ,value:即函数返回的result.data)
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList,
            state.categoryList = categoryList.slice(0, 16);
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },

    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
// actions:处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        // console.log("修改数据")
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data);
            // console.log(result.data)
        }
    },
    // 轮播图请求
    async getBannerList({ commit }) {
        // 发送轮播图请求：
        // console.log("发送ajax请求")
        let result = await reqGetBannerList();
        // console.log(result)
        if (result.code == 200) {
            commit('BANNERLIST', result.data);
        }
    },

    // floor轮播图请求
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            commit('FLOORLIST',result.data);
        }
    }

};


// getters:理解为计算属性,用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}