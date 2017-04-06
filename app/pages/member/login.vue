<template>	
<div style="padding: 0">
    <div class="bg_icon">
        <form class='login_form_wrap' autocomplete="off" method='post' id='loginForm' action="/flow/dispatch_post.do?action=submitLogin">
            <input type="hidden" name="activeId" v-model="activeId" :value="activeId" >
            <input type="hidden" name="loginRef" v-model="loginRef" :value="loginRef" >
            <input type="hidden" name="sourceType" id="sourceType" value="login" >

            <ul class="login_form" id="login">
                <li class="user_name">
                    <label class="login_text_2">手机号码</label>
                    <input type="text" name="username" class="login_text" maxlength="11" v-model="username" placeholder="请输入手机号"  value="">
                </li>
                <li>
                    <label class="login_text_2">登录密码</label>
                    <input type="password" class="login_text" name="password" v-model="password" placeholder="请输入密码"  >
                </li>
            </ul>
            <div id="btn">
                <input type="button" id="lg" class="login_btn" value="登　录" @click="login"/>
            </div>

            <div class="login-tip">
                <router-link to="/reg" class="fl" >注册</router-link>
                <router-link to="/forgetPassword" class="fr">忘记密码?</router-link>
            </div>
        </form>
    </div>
     <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>
</div>
</template>

<script>
import Vue from 'vue'
import $ from '../../plugins/zepto.min.js'
import {loginUser} from '../../service/getData'
import {MD5} from '../../plugins/md5'
import alertTip from '../../components/common/alertTip'
import '../../style/custom.css' 

export default {
	data() {
		return {
            showAlert: false, //是否显示提示框
            alertText: null, //提示框的文字
            activeId: '',
            loginRef: '',
		}
	},
	created() {
       this.activeId = this.$route.query.activeId || "";
       this.loginRef = this.$route.query.loginRef || "";
	},
	mounted() {
        

	},
	components: {
        alertTip
	},
	methods: {
		async login(){
            if (!this.username) {
                this.showAlert = true;
                this.showAlertIcon = false;
                this.alertText = '请输入手机号/邮箱/用户名';
                 return
            }else if(!this.password){
                this.showAlert = true;
                this.alertText = '请输入密码';
                return
            }

            let loginInfo = await loginUser(this.activeId, this.loginRef,  this.username, MD5(this.password));

            //如果返回的信息没有user_id说明登陆失败，弹出提示
            if (loginInfo.data.retCode != "1") {
                this.showAlert = true;
                this.alertText = loginInfo.data.retMsg;
            }else{
                //登陆成功保存用户信息，返回上一路游
                this.$router.go(-1);  
            }

        },
	},
	
	props: [
	],

	mixins: [
		
	]
}
</script>