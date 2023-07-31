// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// 映入store
import store from "@/store";

// 使用插件
Vue.use(VueRouter);

// 备份push和replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.push;

// 重写push/replace方法
// 第一步（第一个参数）：告诉原来的push方法，你往哪里跳转，（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调
// call/aplly的区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与aplly传递参数：call传递参数用逗号隔开，aplly方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 100 };
    }
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to：可以获取到你要跳转到哪个路由信息
    // from：可以获取到你从哪个路由而来的信息
    // next:放行函数
    // next();
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    // 用户登陆了，才会有token，未登录一定不会有token
    if (token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录，去的不是login
            // 如果用户名已有
            if (name) {
                next();
            } else {
                try {
                    // 没有用户信息，派发action让仓库存储信息在跳转
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // alert(error.message)
                    // token失效了获取不到用户信息，从新登录
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }

            }
        }
    }else{
        // 未登录:不能去交易相关，不能去支付相关{pay|paysuccess},
        // 不能去个人中心，——————应该先登录，即先去登录页面
        // 去的不是上面这些路由，————那么放行
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
        //    把未登录时想去的页面的的信息传入
            next('/login?redirect='+toPath)
        }else{
             // 去的不是上面这些路由，————那么放行
            next();
        }
        
    }
    // console.log(store)
})

export default router;