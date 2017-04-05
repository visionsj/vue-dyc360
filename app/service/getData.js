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