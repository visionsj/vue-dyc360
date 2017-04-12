<template>  
<div id="pageone">
    <div style="margin-bottom: 15px;" id="users_main">
        <div id="userdata" class="userdata">
            <div class="fl totalCount" ><p class="ft14">总资产（元） <span class="user_amount_visual" @click="hideNum">&nbsp;<img src="../../images/account/icon_eyes_open.png" width="20" /> </span></p>
                <p class="ft36 user_amount_num" >
                    {{!hideNumText ? aseetDetail.totalAmount : '*****'}}
                </p>
            </div>
            <div class="fl recoverCount">
                <div class="recoverList">
                    <div class="recoverListLeft">
                        <span class="ft13 lg30">累计收益（元）</span>
                        <span class="recoverCountNum ft18 user_amount_num" >
                            {{!hideNumText ? aseetDetail.accumulatedProfitBalance : '*****'}}
                        </span>
                    </div>
                    <div class="recoverListRight">
                        <span class="ft13 lg30">待收收益 （元）</span>
                        <span class="recoverCountNum ft18 user_amount_num" >
                            {{!hideNumText ? aseetDetail.unconfirmedProfitAmount : '*****'}}
                        </font>
                </span>
                    </div>
                </div>
                <div class="mg0 user_main_balance">
                    <div style="position: relative;">
                        <div class="ft13 tl fl">可用余额（元）<font class="ft16 user_amount_num">
                            {{!hideNumText ? aseetDetail.availableBalance : '*****'}}
                        </font>
                        &nbsp; &nbsp;</div>
      
                        <div class="fl balanceTipsIco" v-if="!!aseetDetail.transferFrozenBalanceTips">
                            <img src="../../images/account/icon_frozen.png" width="16" id="transferFrozenBalanceTips" />
                            <span>◆</span>
                        </div>
                        <div class="common_tips_left_red reg_tip tipContent" v-if="!!aseetDetail.transferFrozenBalanceTips">
                            <i><img src="../../images/account/icon_close_tips.png" height="12" /> </i>
                            <div id="password-error" class="error" style="display: block;">
                                {{aseetDetail.transferFrozenBalanceTips}}
                            </div>
                        </div>
          
                    </div>
                </div>
            </div>
        </div>
        <div class="ui-grid-a" id="btn" style="width: 100%; display: inline-block;">
            <router-link class="fl mg0 common_btn_bl w45" 
            :to="accountDetail.openAccountStatus == 0 ? (!!openAccountDetail.forceOpenAccount ? '/open_account_guid' : '/usersMain/userRechargeDepository') : '/usersMain/userRechargeDepository'" >充值</router-link>

            <router-link class="fr common_btn_og w45 br8"
            :to="accountDetail.openAccountStatus == 0 ? (!!openAccountDetail.forceOpenAccount ? '/open_account_guid' : '/usersMain/userRechargeDepository') : '/usersMain/userCashDepository'">提现</router-link>

        </div>


        <div class="list_title list_title_clu mgb0 bor0">
            <router-link :to="{path: '/usersTender'}">
                <span class="fl users_main_list">
                    <img src="../../images/um3.png?v20161116" height="30" />
                </span>
                我的投资<i></i>
            </router-link>
        </div>

        <div class="list_title list_title_clu mg0" >
            <router-link :to="{path: '/usersRecord'}">
                <span class="fl users_main_list">
                    <img src="../../images/um7.png?v20161116" height="30" />
                </span>
                资金记录<i></i>
            </router-link>
        </div>

        <div class="list_title list_title_clu mgb0 bor0">
            <router-link :to="{path: '/usersRed'}">
                <span class="fl users_main_list">
                <img src="../../images/um2.png?v20161116" height="30" />
                </span>
                优惠券<i></i><span class="fr ft16 ftog">{{aseetDetail.couponNum}} <font class="ft13 ftgray9">张</font></span>
            </router-link>
        </div>

        <div class="list_title list_title_clu mg0 bor0">
            <router-link :to="{path: '/usersIntegral'}">
                <span class="fl users_main_list">
                    <img src="../../images/um5.png?v20161116" height="30" />
                </span>
                我的金币<i></i><span class="fr ft16 ftog">{{aseetDetail.goldCoins}} <font class="ft13 ftgray9">金币</font></span>
            </router-link>
        </div>

        <div class="list_title list_title_clu mg0">
            <router-link :to="{path: '/usersRed', query : {type: 4}}">
                <span class="fl users_main_list">
                <img src="../../images/um2.png?v20161116" height="30" />
                </span>
                礼品<i></i>
            </router-link>
        </div>

        <div class="bottom_tips">
            <img src="../../images/index/info2_ico.png"/> 由浙商银行提供资金存管
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
import {getUserAssetInfo, forceOpenAccount, getUserAccountInfo} from '../../service/getData'
import alertTip from '../../components/common/alertTip'
import footerCommon from '../../components/footer/footerCommon'
import '../../style/custom.css' 

export default {
    data() {
        return {
            openAccountDetail: {},
            aseetDetail: {},
            accountDetail: {},
            hideNumText: false,
            showAlert: false, //是否显示提示框
            alertText: null, //提示框的文字
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

    },
    methods: {
        async initData(){
            let openAccountDetail = await forceOpenAccount();
            this.openAccountDetail = {...openAccountDetail.data.data};

            let aseetDetail = await getUserAssetInfo();
            this.aseetDetail = {...aseetDetail.data.data};

            let accountDetail = await getUserAccountInfo();
            this.accountDetail = {...accountDetail.data.data};
        },
        async hideNum(){
            if(this.hideNumText){
                this.hideNumText = false
            }else{
                this.hideNumText = true
            }
        }
    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scoped="">
  .list_title_clu {
    padding: 8px 0 8px 0;
    margin-top: 0;
    border-top: none;
  }

  .user_main_balance {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 3%;
    background: rgba(255,255,255,0.1)
  }

  .balance_layout {
    width: 94%;
    margin: 0 3%;
  }

  .totalCount p:last-child {
    margin: 10px 0 !important;
  }

  .user_amount_visual {
    vertical-align: middle
  }

  .common_tips_left_red {
    width: 220px;
    position: absolute;
    left: 50%;
    top: 30px;
    margin-left: -128px;
    margin-right: auto;
    text-align: left;
    font-size: 12px;
    padding: 15px 23px 10px 13px;
    line-height: 20px;
    color: #fff;
    background-color: rgba(0,0,0,.8);
    border-radius: 4px;
    z-index: 999;
    display: none
  }

  .common_tips_left_red i {
    position: absolute;
    right: 6px;
    top: -2px;
  }

  .balanceTipsIco {
    position: relative;
  }

  .balanceTipsIco span {
    position: absolute;
    width: 0 !important;
    left: 3px;
    font-size: 16px;
    top: 17px;
    height: 0;
    border-left: 5px solid transparent;
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom-width: 8px;
    border-bottom-style: solid;
    border-bottom-color: rgba(0,0,0,.4);
    border: none \9;
    text-indent: -999px;
    text-indent: 0px \9;
    opacity: .4;
    display: none
  }

  .bottom_tips {
    margin: 20px 0;
    font-size: 12px;
    color: #666;
    text-align: center
  }

  .bottom_tips img {
    max-height: 16px;
    vertical-align: middle
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translateX(100%);
  }

</style>