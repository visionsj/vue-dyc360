import Vue from 'vue'
Vue.http.options.emulateJSON = true;


export const loginInfo =  () => Vue.http.get('/web/loginInfo', {})

export const getBannerList =  (bannerType) => Vue.http.post('/web/noauth/post?method=/common/getBannerList', {
	bannerType: bannerType
})

export const getRecommendedBorrowList =  () => Vue.http.post('/web/noauth/post?method=/product/getRecommendedBorrowList', {
})

export const getSimpleArticleList =  () => Vue.http.post('/web/noauth/post?method=/article/getSimpleArticleList', {
})

export const getActiveActivity =  () => Vue.http.post('/web/noauth/post?method=/common/getActiveActivity', {
})

//获取产品列表数据
export const getBorrowList =  (pageNo, pageSize, terminalType) => Vue.http.post('/web/noauth/post?method=/product/getBorrowList', {
	pageNo: pageNo,
	pageSize: pageSize,
	terminalType: terminalType
})
