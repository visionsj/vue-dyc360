<template>  
<div style="padding: 0;">
    <div class="bg_icon" id="page">
            <input type="hidden" name="sourceType" v-model="sourceType" value="reg" >
            <div id="register">
                <ul class="register_form" id="login">
                    <div class="reg_01">
                        <div class="list_title common_bg">
                            <ul>
                                <li style="box-shadow: none;">
                                    <label class="reg_text_2">手机号码</label>
                                    <input type="text" name="mobilePhone"  v-model="mobilePhone" maxlength="11"  class="reg_text" placeholder="请输入手机号码" @input="checkPhone"/>
                                </li>
                                <li>
                                    <div style="position: relative;float:left;width:59%;">
                                        <label class="reg_text_2">图片验证</label>
                                        <input type="text" name="vcode" v-model="vcode" class="reg_text" placeholder="图片验证码" 
                                        @input="checkImgCode"/>
                                    </div>
                                    <div id="code_send" style="float: right; width: 30%;text-align: center;border-radius: 6px;">
                                        <img class="code_img" :src="captchaCodeImg" @click="getCaptchaCode"/>
                                    </div>
                                </li>
                                <li>
                                    <div style="position: relative;float:left;width:60%;">
                                        <label class="reg_text_2">短信验证</label>
                                        <input type="text" name="verifyCode" v-model="verifyCode" class="reg_text" placeholder="请输入短信验证码"/>
                                    </div>
                                    <div id="phone_send" :class="!showCodeBtn ? 'reg_phone_code_send' : 'reg_phone_code_send disable_btn'" :disabled="showCodeBtn" @click="getVerifyCode" v-show="!computedTime">
                                        获取验证码
                                    </div>
                                    <div class="reg_phone_code_send disable_btn" @click.prevent v-show="computedTime">
                                        已发送( {{computedTime}}s )
                                    </div>
                                </li>
                                <li >
                                    <label class="reg_text_2">密码</label>
                                    <input type="password" name="password" v-model="password" maxlength="20" class="reg_text" placeholder="输入密码6-20个字符" >
                                </li>
                                <li style="border-bottom: none" id="recommended_list">
                                    <label class="reg_text_2">推荐人</label>
                                    <input type="tel" name="inviteMobilePhone" v-model="inviteMobilePhone" maxlength="16"  class="reg_text" placeholder="请输入推荐人手机号码（选填）" >
                                </li>
                            </ul>
                        </div>


                        <div class="reg_xieyi">
                            <div class="check_radio fl">
                                <input name="xieyi" id="xieyi" type="checkbox" value="" checked >
                                <label class="radios" for="xieyi"></label>
                            </div>
                            <label class="radios fl">我已阅读并同意《<a href="agreement_reg.html" class="protocol_l" >鼎有财会员合作协议</a>》</label>
                        </div>
                    </div>

                    <div id="btn"  class="mgt20">
                        <input type="button" id="subbt" class="common_btn" value='确　认' @click="register" >
                    </div>

                </ul>
            </div>

    </div>

    <div class="copyright" style="position: relative">平凡人的卓越理财<br /><a href="tel:4000077707">400-0077-707</a></div>
    <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>
</div>

</template>

<script>
import Vue from 'vue'
import {MD5} from '../../plugins/md5'
import alertTip from '../../components/common/alertTip'
import {getVerifyCode, registerUser} from '../../service/getData'

import '../../style/custom.css' 

export default {
    data() {
        return {
            mobilePhone: null,
            vcode: null,
            verifyCode: null,
            password: null,
            inviteMobilePhone: null,
            captchaCodeImg: null,
            showCodeBtn: true,
            rightPhoneNumber: false,
            computedTime: 0,
            username: null,
            sourceType: "reg",
            showAlert: false, 
            alertText: null, 
        }
    },
    created() {

    },
    mounted() {
        this.getCaptchaCode()
    },
    components: {
        alertTip
    },
    methods: {
        async register(){
            if (!this.mobilePhone) {
                this.showAlert = true;
                this.alertText = '请输入手机号';
                 return
            }else if(!this.vcode){
                this.showAlert = true;
                this.alertText = '请输入图片验证码';
                return
            }else if(!this.verifyCode){
                this.showAlert = true;
                this.alertText = '请输入短信验证码';
                return
            }else if(!this.password){
                this.showAlert = true;
                this.alertText = '请输入密码';
                return
            }

            let registerInfo = await registerUser(this.mobilePhone, this.sourceType, this.mobilePhone, this.vcode, this.verifyCode, MD5(this.password), this.inviteMobilePhone);

            //如果返回的信息没有user_id说明登陆失败，弹出提示
            if (registerInfo.data.retCode != "1") {
                this.showAlert = true;
                this.alertText = registerInfo.data.retMsg;
            }else{
                this.$router.push({path: "/login"});
            }
        },
        //获取手机验证码
        async getVerifyCode(){
            if(!this.rightPhoneNumber){
                this.showAlert = true;
                this.alertText = '手机号不正确';
                return
            }else if(!!this.showCodeBtn){
                this.showAlert = true;
                this.alertText = '图片验证码不正确';
                return
            }else{

                //返回的数据带message，说明登陆失败
                let res = await getVerifyCode(this.mobilePhone, this.vcode, 1);
                if (res.data.retCode == "1") {
                    this.computedTime = 60;
                    //60秒倒计时，60秒后可以重新获取验证码
                    this.timer = setInterval(() => {
                        this.computedTime --;
                        if (this.computedTime == 0) {
                            clearInterval(this.timer)
                        }
                    }, 1000)
                    
                    this.showAlert = true;
                    this.alertText = "发送短信成功";
                    return
                }else{
                    this.showAlert = true;
                    this.alertText = res.data.retMsg;
                    return
                }
            }
        },

        //获取验证码图片
        async getCaptchaCode(){
            this.captchaCodeImg = 'https://m.duc360.com/vcode/gen-vcode.do?'  + Math.random();
        },
        checkImgCode(){
            if(this.vcode.length >= 4){
                this.showCodeBtn= false
            }else{
                this.showCodeBtn= true
            }
        },
        checkPhone(){
            if(/^1\d{10}$/gi.test(this.mobilePhone)){
                this.rightPhoneNumber = true;
            }else{
                this.rightPhoneNumber = false;
            }
        },

    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
