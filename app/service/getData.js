import fetch from '../config/fetch'

/**
 * 获取首页默认地址
 */

export const tes = (ds) => fetch('POST', '/web/noauth/post?method=/common/getBannerList', {
	bannerType: 2
});

export const getBannerList = (bannerType) => fetch('POST', '/web/noauth/post?method=/common/getBannerList', {
	bannerType: bannerType
});