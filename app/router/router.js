import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const invest = r => require.ensure([], () => r(require('../pages/invest/invest')), 'invest')
const login = r => require.ensure([], () => r(require('../pages/member/login')), 'login')
const register = r => require.ensure([], () => r(require('../pages/member/register')), 'register')
const forgetPassword = r => require.ensure([], () => r(require('../pages/member/forgetPassword')), 'forgetPassword')
const more = r => require.ensure([], () => r(require('../pages/more/more')), 'more')
const usersSet = r => require.ensure([], () => r(require('../pages/more/children/usersSet')), 'usersSet')

const usersMain = r => require.ensure([], () => r(require('../pages/users/usersMain')), 'usersMain')



export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面 
        {
            path: '',
            redirect: '/home'
        },
        //首页
        {
            path: '/home',
            component: home
        },
        //投资列表页
        {
            path: '/invest',
            component: invest
        },
        //会员登录
        {
            path: '/login',
            component: login
        },
        //注册
        {
            path: '/register',
            component: register
        },
        //找回密码
        {
            path: '/forgetPassword',
            component: forgetPassword
        },

        //更多
        {
            path: '/more',
            component: more,
            children: [
                {
                    path: 'usersSet',
                    component: usersSet
                },
            ]
        },

        //我的
        {
            path: '/usersMain',
            component: usersMain,
        },

    ]
}]