<template>  
<div id="users_main" class="fl cashPanel">

    <div class="list_title pd0 mg0 brtn bor0 recharge_amount">
        <ul class="borrow_form pd0 mg0">
            <li class="borrow_f_t bor0">
                <span class="fl borrow_l_z ft14 tl">可用余额 </span>
                <span class="fl">
                    {{rechargeDetail.availableBalance}}元
                </span>
            </li>
        </ul>
    </div>
    <div class="list_title mgt0">
        <ul class="borrow_form recharge pd0 mg0">
            <li class="borrow_f_t">
                <span class="fl borrow_l_z ft14 ftbl tl">开户行 </span>
                    <span class="fl ftgray branch_name">
                        {{rechargeDetail.bankName}}
                    </span>
            </li>
            <li class="borrow_f_t bor0 mgb0 pd0">
                <span class="fl borrow_l_z ft14 ftbl tl">银行卡号</span>
                <span class="fl ftgray">{{rechargeDetail.otherAccno}}</span>
            </li>
        </ul>
    </div>
    <p class="fl pd0 recharge_title">单笔限额：20万元，每日限额：100万元</p>
    <div class="list_title">
        <ul class="borrow_form recharge pd0 mg0">
            <li class="borrow_f_t">
                <span class="fl borrow_l_z ft14 ftbl tl">预留手机号 </span>
                    <span class="fl ftgray">
                        {{rechargeDetail.reservedMobile}}
                    </span>
            </li>
            <li class="borrow_f_t bor0 mgb0 pd0">
                <span class="fl borrow_l_z ft14 ftbl tl">充值金额</span>
                    <span class="fl">
                        <input type="number" name="recharge_money" id="recharge_money" class="fl money_text" onkeyup="if(!/^-?\d+\.?\d{0,2}$/.test(this.value) || this.value == 0){var s = this.value;this.value=s.substring(0,s.length-1);}" onafterpaste="this.value=this.value.replace(/\D/g,'')" style="min-width:130px;" placeholder="充值金额1元起"/> （元）
                    </span>
            </li>
        </ul>
    </div>

    <div id="btn" class="fl w100">
        <button id="recharge_btn" class="common_btn tender_btn" @click="nextRecharge">下一步</button>
        <router-link to="/usersMain/userRechargeDepository/rechargeRecord" class="recode fr">充值记录</router-link>
    </div>
    <p class="recharge_title recharge_tip">
        <font class="ft14">温馨提示：</font> <br />
        1、充值支持14家银行，<a href="app_depository_quota.html">查看</a>资金充值功能支持的银行及充值限额。<br />
        2、请确认您的绑定账户余额充足，以保证交易顺利完成。<br />
        3、如果您在充值过程中遇到任何问题，可以直接致电400-0077-707或咨询在线客服寻求帮助。
    </p>


    <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>

    <transition name="router-slid">
         <router-view></router-view>
     </transition>
     <transition name="loading">
         <loading v-if="showLoading"></loading>
     </transition>
</div>

</template>

<script>
import Vue from 'vue'
import {getUserAccountInfo,getUserAssetInfo,queryOpenCardInfo,queryCanWithdrawMoney,queryWithdrawLimit} from '../../../service/getData'
import alertTip from '../../../components/common/alertTip'
import loading from '../../../components/common/loading'
import '../../../style/custom.css' 

Vue.filter('formatTime', function (value, str) {
   function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '/' + add0(m) + '/' + add0(d) ;
});

export default {
    data() {
        return {
            rechargeDetail: {},
            showAlert: false, 
            alertText: null, 
            showLoading: true,
        }
    },
    created() {

    },
    mounted() {
       this.initData();
    },
    components: {
        alertTip,
        loading
    },
    computed:{

    },
    methods: {
        async initData(){
            let resAccount = await getUserAccountInfo();
            let resAsset = await getUserAssetInfo();
            let resOpenCard = await queryOpenCardInfo();
            let resCanWithdraw = await queryCanWithdrawMoney();
            let resWithdrawLimit = await queryWithdrawLimit();

            this.rechargeDetail = Object.assign(
                {...resAccount.data.data}, 
                {...resAsset.data.data}, 
                {...resOpenCard.data.data}, 
                {...resCanWithdraw.data.data},
                {...resWithdrawLimit.data.data}
            )

            this.showLoading = false;
        },
        async nextRecharge(){
            this.showAlert = true; 
            this.alertText = "此版本系统暂未开放充值"; 
        }
    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scoped>
.cashPanel{
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
.recode {
    margin: 20px 0;
    color: #38c
}

.recode:active {
    color: #ff5c5f
}

.recharge select, .recharge input {
    font-size: 14px;
    border: none
}

#users_main .list_title {
    width: 100%;
    padding: 10px 3% 0 !important;
    float: left;
    display: inline-block
}

#users_main .recharge {
    float: left;
    width: 100%;
    line-height: 30px
}

.recharge_title {
    width: 94%;
    margin: 5px 3% -5px;
    float: left;
    font-size: 12px;
    color: #999;
}

.recharge_amount {
    background: #7c91c8 !important;
    color: #fff;
}

#btn {
    margin-top: 20px;
}

.recharge_tip {
    font-size: 12px;
    line-height: 20px;
    color: #999
}

.branch_name {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.recharge_title img {
    vertical-align: middle
}

#globalTip {
    top: 240px;
}

.recharge_tip a {
    color: #38c
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translateX(100%);
}
</style>