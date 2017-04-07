import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'


Vue.use(Vuex)


const state = {
	userInfo: null, //用户信息
	login: true,    //登陆的状态，默认登陆
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})