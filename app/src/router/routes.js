import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';

// 引入二级路由
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';
export default [
    {
        path: '/home',
        component: Home,
        meta: {
            show: true
        }
    },

    {
        path: '/login',
        component: Login,
        meta: {
            show: false
        }
    },

    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: {
            show: true
        }
    },

    {
        path: '/register',
        component: Register,
        meta: {
            show: false
        }
    },

    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {
            show: true
        }
    },

    {
        name:'addcartsuccess', 
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },

    {
        name:'shopcart', 
        path: '/shopcart',
        component: ShopCart,
        meta: {
            show: true
        }
    },

    {
        name:'trade', 
        path: '/trade',
        component: Trade,
        meta: {
            show: true
        },
        // l路由独享守卫
        beforeEnter: (to, from, next) => {
            if(to.path == '/shopcart'){
                next();
            }else{
                // 从哪来，回哪去
                next(false);
            }
        }
    },

    {
        path: '/pay',
        component: Pay,
        meta: {
            show: true
        },
        // l路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next();
            }else{
                // 从哪来，回哪去
                next(false);
            }
        }
    },

    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            show: true
        },
        // l路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/pay'){
                next();
            }else{
                // 从哪来，回哪去
                next(false);
            }
        }
    },

    {
        path: '/center',
        component: Center,
        meta: {
            show: true
        },
        // 重定向
        redirect:{
            path:'/center/myOrder'
        },
        // 二级路由
        children:[
            {
            path:'myOrder',
            component: MyOrder
            },
            {
                path:'groupOrder',
                component:GroupOrder
            }
        ]
       
    },


    {
        path: '',
        redirect: '/home'
    }


]