import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api";
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result =  await reqGoodsInfo(skuId);
        // console.log(result);
        if(result.code == 200 ){
            commit('GETGOODINFO',result.data);
        }
    },

    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // console.log(result)
        if(result.code ==200){
            // commit('ADDORUPDATESHOPCART',result.data)
            return 'ok'
        }else{
            // 代表失败
            return Promise.reject(new Error(faile))
        }
    }
};
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView||{};
        // console.log(state.goodInfo.categoryView);
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}