<template>	
<div id="pageone">
    <div style="margin-bottom: 15px;" id="users_main">
            <div id="userdata" class="userdata">
                <div class="fl layout">
                    <p class="head_pic">
                        <img :src="!!userInfo.isLogin && userInfo.headPicUrl != '' ? userInfo.headPicUrl : 'https://m.duc360.com/images/account/headPic.jpg'" />
                        <input id="browse" name="file" type="file" accept="image/*" v-show="!!userInfo.isLogin" />
                    </p>

                    <p class="ft18 mg0" v-if="!!userInfo.isLogin">{{userInfo.personName}}</p>
                    <p class="ft14 user-name" v-if="!!userInfo.isLogin"><img src="../../images/account/vip.png" height="23" /> {{userInfo.levelText}}</p>
          
                    <p class="ft18 "v-if="!userInfo.isLogin" style="margin: 10px 0">点击登录</p>

                </div>
                <div class="user_set">
                    <img src="../../images/um1.png?20161116" height="25" />
                </div>
            </div>


            <div class="list_title list_title_clu mg0 bor0" >
                <router-link :to="{path: !userInfo.isLogin ? '/login' : '/appFriends', query: {loginRef: '/appFriends'}}">
                    <span class="fl users_main_list">
                        <img src="../../images/um8.png?v20161116" height="30" />
                    </span>
                    邀请好友<i></i> <span class="fr ft16 ftog">30<font class="ft13 ftgray9">元红包+提成</font></span>
                </router-link>
            </div>

            <div class="list_title list_title_clu mg0">
                <router-link :to="{path: '/appHelpList'}">
                    <span class="fl users_main_list">
                        <img src="../../images/um9.png?v20161116" height="30" />
                    </span>
                    帮助中心<i></i>
                </router-link>    
            </div>

            <div class="list_title list_title_clu mgb0 bor0" >
                <router-link :to="{path: '/appNewsList'}">
                    <span class="fl users_main_list">
                    <img src="../../images/um10.png?v20161116" height="30" />
                    </span>
                    公司新闻<i></i>
                </router-link>
            </div>

            <div class="list_title list_title_clu mg0 bor0">
                <router-link :to="{path: '/appHelpList'}">
                    <span class="fl users_main_list">
                        <img src="../../images/um11.png?v20161116" height="30" />
                    </span>
                    平台公告<i></i>
                </router-link>
            </div>

            <div class="list_title list_title_clu mg0">
                <router-link :to="{path: '/appAbout'}">
                    <span class="fl users_main_list">
                    <img src="../../images/um12.png?v20161116" height="30" />
                    </span>
                    关于我们<i></i>
                </router-link>
            </div>

            <div class="list_title list_title_clu" >
                <span class="fl users_main_list">
                <img src="../../images/um13.png?v20161116" height="30" />
                </span>
                    联系我们<i></i>
                    <a href="tel:4000077707" class="fr ft14 ftog" style="width: 130px; text-align: right">400-0077-707</a>
            </div>


    </div>

    <footer-common></footer-common>

    <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>

</div>
</template>

<script>
import Vue from 'vue'
import $ from '../../plugins/zepto.min.js'
import {getUserAccountInfo, getConfigureUrl, headPicUpload} from '../../service/getData'
import alertTip from '../../components/common/alertTip'
import footerCommon from '../../components/footer/footerCommon'
import '../../style/custom.css' 

export default {
	data() {
		return {
            showAlert: false, //是否显示提示框
            alertText: null, //提示框的文字
            userInfo: {},
            userInfoUrl: {},
            isLogin: false,
		}
	},
	created() {

	},
	mounted() {
        var _self = this;
		getUserAccountInfo().then(res => {
            let userInfo = res.data.data;
            userInfo.isLogin = true;
            this.userInfo = userInfo;
        })

        getConfigureUrl().then(res => {
            this.userInfoUrl = res.data.data;

        })

        window.compressImg = function (inputId, callback) {
            var inputFile = document.getElementById(inputId);
            if (typeof(FileReader) === 'undefined') {
                _self.showAlert= true; //是否显示提示框
                _self.alertText= "抱歉，你的浏览器不支持图片上传，请使用现代浏览器操作！"; //提示框的文字
                inputFile.setAttribute('disabled', 'disabled');

            }else{
                inputFile.addEventListener("change", function () {
                    var file = this.files[0];
                    if(!/image\/\w+/.test(file.type)){
                        loadingTip.show({
                            content: "请确保文件为图像类型"
                        });
                        return false;
                    }

                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(e){
                        var srcString = this.result,src;
                        if(srcString.substring(5,10)!="image"){
                            src = srcString.replace(/(.{5})/,"$1image/jpeg;");
                        }else{
                            src = srcString;
                        }
                        if(callback!=undefined) {
                            callback(src);
                        }
                     }
                 })
             }        
        }
   

        compressImg('browse',function(src){
            var frontImage = src.substr(src.indexOf(",")+1);
            _self.picUpload(frontImage);
        })

	},
	components: {
		footerCommon,
        alertTip,
	},
	methods: {
		async picUpload(frontImage){
            let headPic = await headPicUpload(frontImage)
            if(headPic.data.retCode == "1") {
                this.userInfo.headPicUrl = headPic.data.data.url
            }else{
                 this.showAlert= true; //是否显示提示框
                this.alertText= headPic.data.data.retMsg; //提示框的文字
            }

		},
	},
	
	props: [
	],

	mixins: [
		
	]
}
</script>
<style lang="scss" scoped="">
  .userdata {
    position: relative;
    text-align: center;
    color: #fff
  }

  .head_pic img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .userdata .user-name {
    margin: 5px 0 10px;
    line-height: 30px;
  }

  .userdata .user-name img {
    vertical-align: middle
  }

  .user_set {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 25px;
    height: 25px;
  }

  #browse {
    display: block!important;
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 20px;
    margin-left: -50px;
    opacity: 0;
  }

</style>