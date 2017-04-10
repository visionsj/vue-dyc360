<template>  
<div id="pageone">
    <div style="margin-bottom: 15px;" id="users_main">
            <div id="userdata" class="userdata">
                <div class="fl layout" style="padding: 20px 3% 10px">
                    <p class="head_pic">
                        <img :src="!!userInfo.isLogin && userInfo.headPicUrl != '' ? userInfo.headPicUrl : 'https://m.duc360.com/images/account/headPic.jpg'" />
                        <input id="browse" name="file" type="file" accept="image/*" v-if="!!userInfo.isLogin" />
                    </p>

                    <p class="ft18 mg0" v-if="!!userInfo.isLogin">{{userInfo.personName}}</p>
                    <p class="ft14 user-name" v-if="!!userInfo.isLogin"><img src="../../images/account/vip.png" height="23" /> {{userInfo.levelText}}</p>
          
                    <p class="ft18 "v-if="!userInfo.isLogin" style="margin: 10px 0">
                        <router-link :to="{path: '/login'}" style="color: #fff">点击登录</router-link>
                    </p>

                </div>
                <div class="user_set">
                    <router-link :to="{path: !!userInfo.isLogin ? '/more/usersSet':'login'}" tag="div">
                        <img src="../../images/um1.png?20161116" height="25" />
                    </router-link>
                </div>
            </div>


            <div class="list_title list_title_clu mg0 bor0" >
                <a :href=" !userInfo.isLogin ? '/login' : 'https://m.duc360.com/app_friends.html?loginRef=http://rrys365.com/#/more'">
                    <span class="fl users_main_list">
                        <img src="../../images/um8.png?v20161116" height="30" />
                    </span>
                    邀请好友<i></i> <span class="fr ft16 ftog">30<font class="ft13 ftgray9">元红包+提成</font></span>
                </a>
            </div>

            <div class="list_title list_title_clu mg0">
                <router-link :to="{path: !userInfo.isLogin ? '/login' : '/appHelpList'}">
                    <span class="fl users_main_list">
                        <img src="../../images/um9.png?v20161116" height="30" />
                    </span>
                    帮助中心<i></i>
                </router-link>    
            </div>

            <div class="list_title list_title_clu mgb0 bor0" >
                <router-link :to="{path: !userInfo.isLogin ? '/login' : '/appNewsList'}">
                    <span class="fl users_main_list">
                    <img src="../../images/um10.png?v20161116" height="30" />
                    </span>
                    公司新闻<i></i>
                </router-link>
            </div>

            <div class="list_title list_title_clu mg0 bor0">
                <router-link :to="{path: !userInfo.isLogin ? '/login' : '/appNoticeList'}">
                    <span class="fl users_main_list">
                        <img src="../../images/um11.png?v20161116" height="30" />
                    </span>
                    平台公告<i></i>
                </router-link>
            </div>

            <div class="list_title list_title_clu mg0">
                <router-link :to="{path: !userInfo.isLogin ? '/login' : '/appAbout'}">
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

    <transition name="router-slid">
         <router-view></router-view>
     </transition>

    <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>

</div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
import {getUserAccountInfo, getConfigureUrl, headPicUpload} from '../../service/getData'
import alertTip from '../../components/common/alertTip'
import footerCommon from '../../components/footer/footerCommon'
import {getStore, setStore} from '../../config/mUtils'
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
        this.initData();
    },
    components: {
        footerCommon,
        alertTip,
    },
    computed:{
        ...mapState([
            'login'
        ])
    },
    methods: {
        async initData(){
            var _self = this;

            if(getStore('login') == "true"){

                let resAccount = await getUserAccountInfo();

                this.userInfo = {...resAccount.data.data};
                this.userInfo.isLogin = true;
        
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
                setTimeout(() => {
                    compressImg('browse',function(src){
                        var frontImage = src.substr(src.indexOf(",")+1);
                        _self.picUpload(frontImage);
                    })
                },200)
            }


            let resUrl = await getConfigureUrl();
            this.userInfoUrl = {...resUrl.data.data};
        },
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
   @import '../../style/mixin';
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
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translateX(100%);
  }

</style>