<template>	
<div id="invest_con" class="more_detail_page">

  <div class="ft14 user_account" style="margin:15px 0;line-height: 30px;">
    <div class="list_title mg0 list_child" >
      <router-link 
      :to="{path: userSetDetail.personAuthStatus == 3 ? '' : (userSetDetail.personAuthStatus == 1 && !!userSetDetail.forceOpenAccount) ? '/openAccountGuid' : '/usersRealname'}">
        <span v-if="userSetDetail.personAuthStatus == 3"> 实名认证 <span style="float:right">已认证</span></span>
        <span v-if="userSetDetail.personAuthStatus == 1"> 未认证 <i></i></span>
        <span v-if="userSetDetail.personAuthStatus != 1 && userSetDetail.personAuthStatus != 3"> 实名认证 <span style="float:right">认证中</span></span>
      </router-link>
    </div>
    <div class="list_title brtn mg0">
        <router-link 
        :to="{path: userSetDetail.bankAuthStatus == 3 ? '' : (userSetDetail.openAccountStatus == 0 && !!userSetDetail.forceOpenAccount) ? '/openAccountGuid' : '/usersBindBank'}">
        <span v-if="userSetDetail.bankAuthStatus == 3"> 绑定银行卡 <span style="float:right">{{bankListDetail.bankCardNo}}</span></span>
        <span v-else> 绑定银行卡 <i></i></span>
      </router-link>
    </div>
    <div class="list_title brtn mg0">
      绑定手机<span style="float:right">{{userSetDetail.mobilePhone}}</span>
    </div>
    <div  class="list_title brtn mg0 list_child">
      注册时间<span style="float:right">{{userSetDetail.registerTime}}</span>
    </div>


    <div class="list_title mgb0">
      <router-link to="/usersInfo">
          个人信息 <i></i>
        <span class="red_notice">送30元</span>
      </router-link>
    </div>

    <div class="list_title brtn mg0">
      <router-link to="/usersModifyPassword">
        登陆密码 <i></i>
      </router-link>
    </div>
    <div class="list_title brtn mg0">
      <router-link to="/usersModifyPayPassword">
        支付密码 <i></i>
      </router-link>
    </div>
  </div>

  <div id="btn">
    <a href="javascript:;" class="common_btn_wt" @click="loginOut()" >退出</a>
  </div>

  <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>

</div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
import $ from '../../../plugins/zepto.min.js'
import {getUserBindBankList, getUserAccountInfo, logoutUser} from '../../../service/getData'
import alertTip from '../../../components/common/alertTip'
import footerCommon from '../../../components/footer/footerCommon'
import '../../../style/custom.css' 

export default {
	data() {
		return {
            showAlert: false, //是否显示提示框
            alertText: null, //提示框的文字
            userSetDetail: {},
            bankListDetail: {},
		}
	},
	created() {

	},
	mounted() {
        getUserAccountInfo().then(res => {
          this.userSetDetail = res.data.data;
        });

        getUserBindBankList().then(res => {
          this.bankListDetail = res.data.data[0]
        })
	},
	components: {
		footerCommon,
    alertTip,
	},
  computed:{

  },
	methods: {
    ...mapMutations([
        'OUT_LOGIN'
    ]),
    async hideNum(){
        if(this.hideNumText){
            this.hideNumText = false
        }else{
            this.hideNumText = true
        }
    },
    async loginOut(){
        this.OUT_LOGIN()
        logoutUser().then(res => {
          window.location.href = "/#/login"
        })
    }
	},
	
	props: [
	],

	mixins: [
		
	]
}
</script>
<style lang="scss" scoped="">
    .more_detail_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f1f1f1;
        z-index: 202;
        overflow-y: auto;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
  
</style>