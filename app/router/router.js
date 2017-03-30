import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const invest = r => require.ensure([], () => r(require('../page/invest/invest')), 'invest')



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
            path: '/home',
            component: home
        },
    ]
}]