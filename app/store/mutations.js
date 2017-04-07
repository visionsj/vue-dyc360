import {
	RECORD_USERINFO,
	GET_USERINFO,
	OUT_LOGIN,
} from './mutation-types.js'
import {
	setStore,
	getStore,
} from '../config/mUtils'

export default {
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfoNew = info;
		state.login = true;
		
		let validity = 30;
		let now = new Date();
		now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
		setStore('login', true);
		// document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
		// document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfoNew = info;
		} else {
			state.userInfoNew = null;
		}
	},
	//退出登陆
	[OUT_LOGIN](state) {
		state.userInfoNew = null;
		state.login = false;
		setStore('login', false);
	},
}