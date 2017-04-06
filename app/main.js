import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './router/router'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from './plugins/fastClick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}


Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
　next((response) => {
	if(response.data.retCode == "-104"){
		window.location.href = "/#/login"
	}else{
		return response;
	}
  });
});

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production'
})


const app = new Vue({
	router,
}).$mount('#app')


















