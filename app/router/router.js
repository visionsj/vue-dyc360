import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const invest = r => require.ensure([], () => r(require('../pages/invest/invest')), 'invest')
const borrowContent = r => require.ensure([], () => r(require('../pages/invest/borrowContent')), 'borrowContent')
const projectBorrowContent = r => require.ensure([], () => r(require('../pages/invest/children/projectBorrowContent')), 'projectBorrowContent')
const projectDetail = r => require.ensure([], () => r(require('../pages/invest/children/projectDetail')), 'projectDetail')
const tenderRecord = r => require.ensure([], () => r(require('../pages/invest/children/tenderRecord')), 'tenderRecord')
const usersTenderInvest = r => require.ensure([], () => r(require('../pages/invest/usersTenderInvest')), 'usersTenderInvest')
const login = r => require.ensure([], () => r(require('../pages/member/login')), 'login')
const register = r => require.ensure([], () => r(require('../pages/member/register')), 'register')
const forgetPassword = r => require.ensure([], () => r(require('../pages/member/forgetPassword')), 'forgetPassword')
const openAccountGuid = r => require.ensure([], () => r(require('../pages/member/openAccountGuid')), 'openAccountGuid')
const more = r => require.ensure([], () => r(require('../pages/more/more')), 'more')
const usersSet = r => require.ensure([], () => r(require('../pages/more/children/usersSet')), 'usersSet')
const usersRealname = r => require.ensure([], () => r(require('../pages/more/children/children/usersRealname')), 'usersRealname')
const usersBindBank = r => require.ensure([], () => r(require('../pages/more/children/children/usersBindBank')), 'usersBindBank')
const usersModifyPassword = r => require.ensure([], () => r(require('../pages/more/children/children/usersModifyPassword')), 'usersModifyPassword')
const usersModifyPayPassword = r => require.ensure([], () => r(require('../pages/more/children/children/usersModifyPayPassword')), 'usersModifyPayPassword')
const appHelpContent = r => require.ensure([], () => r(require('../pages/more/children/appHelpContent')), 'appHelpContent')
const appHelpList = r => require.ensure([], () => r(require('../pages/more/appHelpList')), 'appHelpList')
const appNewsList = r => require.ensure([], () => r(require('../pages/more/appNewsList')), 'appNewsList')
const appNoticeList = r => require.ensure([], () => r(require('../pages/more/appNoticeList')), 'appNoticeList')
const appAbout = r => require.ensure([], () => r(require('../pages/more/appAbout')), 'appAbout')
const usersMain = r => require.ensure([], () => r(require('../pages/users/usersMain')), 'usersMain')
const usersTender = r => require.ensure([], () => r(require('../pages/users/usersTender')), 'usersTender')
const usersRecord = r => require.ensure([], () => r(require('../pages/users/usersRecord')), 'usersRecord')
const usersRed = r => require.ensure([], () => r(require('../pages/users/usersRed')), 'usersRed')
const usersIntegral = r => require.ensure([], () => r(require('../pages/users/usersIntegral')), 'usersIntegral')
const usersIntegralDetail = r => require.ensure([], () => r(require('../pages/users/children/usersIntegralDetail')), 'usersIntegralDetail')
const usersIntegralExchange = r => require.ensure([], () => r(require('../pages/users/children/usersIntegralExchange')), 'usersIntegralExchange')
const usersIntegralExplain = r => require.ensure([], () => r(require('../pages/users/children/usersIntegralExplain')), 'usersIntegralExplain')
const userRechargeDepository = r => require.ensure([], () => r(require('../pages/users/children/userRechargeDepository')), 'userRechargeDepository')
const userCashDepository = r => require.ensure([], () => r(require('../pages/users/children/userCashDepository')), 'userCashDepository')
const cashRecord = r => require.ensure([], () => r(require('../pages/users/children/children/cashRecord')), 'cashRecord')
const rechargeRecord = r => require.ensure([], () => r(require('../pages/users/children/children/rechargeRecord')), 'rechargeRecord')


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
        //投资详细页
        {
            path: '/borrowContent',
            component: borrowContent,
            children: [
                {
                    path: 'projectBorrowContent',
                    component: projectBorrowContent
                },
                {
                    path: 'projectDetail',
                    component: projectDetail
                },
                {
                    path: 'tenderRecord',
                    component: tenderRecord
                },
            ]
        },
        //投资确认页
        {
            path: '/usersTenderInvest',
            component: usersTenderInvest
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
        {
            path: '/openAccountGuid',
            component: openAccountGuid,
        },

        //更多
        {
            path: '/more',
            component: more,
            children: [
                {
                    path: 'usersSet',
                    component: usersSet,
                    children: [
                        {
                            path: 'usersRealname',
                            component: usersRealname
                        },                        
                        {
                            path: 'usersBindBank',
                            component: usersBindBank
                        },                        
                        {
                            path: 'usersModifyPassword',
                            component: usersModifyPassword
                        },                        
                        {
                            path: 'usersModifyPayPassword',
                            component: usersModifyPayPassword
                        },
                    ]
                },
            ]
        },
        {
            path: '/appHelpList',
            component: appHelpList,
            children: [
                {
                    path: 'appHelpContent',
                    component: appHelpContent
                },
            ]
        },
        {
            path: '/appNewsList',
            component: appNewsList,
            children: [
                {
                    path: 'appHelpContent',
                    component: appHelpContent
                },
            ]
        },
        {
            path: '/appNoticeList',
            component: appNoticeList,
            children: [
                {
                    path: 'appHelpContent',
                    component: appHelpContent
                },
            ]
        },
        {
            path: '/appAbout',
            component: appAbout,
        },

        //我的
        {
            path: '/usersMain',
            component: usersMain,
            children: [
                {
                    path: 'userRechargeDepository',
                    component: userRechargeDepository,
                    children: [
                        {
                            path: 'rechargeRecord',
                            component: rechargeRecord
                        },
                    ]
                },
                {
                    path: 'userCashDepository',
                    component: userCashDepository,
                    children: [
                        {
                            path: 'cashRecord',
                            component: cashRecord
                        },
                    ]
                },
            ]
        },
        {
            path: '/usersTender',
            component: usersTender,
        },
        {
            path: '/usersIntegral',
            component: usersIntegral,
            children: [
                {
                    path: 'usersIntegralDetail',
                    component: usersIntegralDetail
                },
                {
                    path: 'usersIntegralExchange',
                    component: usersIntegralExchange
                },
                {
                    path: 'usersIntegralExplain',
                    component: usersIntegralExplain
                }
            ]
        },
        {
            path: '/usersRecord',
            component: usersRecord,
        },
        {
            path: '/usersRed',
            component: usersRed,
        }
    ]
}]