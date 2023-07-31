// 当前这个模块：api进行统一管理
import requests from './request';
import mockRequests from './mockRequest'
// 三级联动接口
// api/product/getBaseCategoryList get 无参数
// 发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => {
    return requests({ url: '/product/getBaseCategoryList', method: 'get' });
}
// 获取banner（home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner');
// 获取floor（floor轮播图）
export const reqFloorList = () => mockRequests.get('/floor');

// 当前这个函数需不需要接受外部传递参数
// 当前这个接口(获取搜索模块的数据),给服务器传递一个默认参数(至少是一个空对象)
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params });

// 获取产品详情信息的接口 URL:/api/item/{skuId} 请求方式
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" });

// 将产品添加到购物车中（获取更新某一个产品的个数）
//  /api/cart/addToCart/{skuId}/{skuNum}  post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 购物车页面
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });

// 删除购物车产品的界面
// url:/api/cart/deleteCart/{skuId}  method:DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

// 修改商品的选中状态
// url：/api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 请求验证码
// /api/user/passport/sendCode/{phone}获取验证码 get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册的接口
// /api/user/passport/register  方法：post 参数：phone password code
// export const reqUserRegister = 
// (phone, password, code) => requests({ url: `/user/passport/register/${phone}/${password}/${code}`, method: 'post' })
export const reqUserRegister = (data) => requests({ url:'/user/passport/register',data, method: 'post' })

// 登录
// url:/api/user/passport/login  POST  参数名称 :phone password
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:"post"});

// 获取用户信息
// url：/api/user/passport/auth/getUserInfo  get
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

// 退出登录
// /api/user/passport/logout    get
export const reqLogout =()=>requests({url:'/user/passport/logout',method:'get'});

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList   method:'get'
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

// 获取商品详情
// /api/order/auth/trade  method：get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}  method：‘post’
export const reqSubmitOrder =(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 获取支付信息
// URL:/api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo =(orderId) =>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}   GET  参数：orderId
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心的数据
// /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})