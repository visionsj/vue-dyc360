<template>  
<div id="users_main" class="fl cashPanel">
    <div class="list_title pd0 mg0 brtn bor0 recharge_amount">
        <ul class="borrow_form pd0 mg0">
            <li class="borrow_f_t bor0" style="position: relative;">
                <span class="fl borrow_l_z ft14 tl">可提额度 </span>
                <span class="fl">
                    {{cashDetail.withdrawAmount}}元 &nbsp;
                </span>
            </li>
        </ul>
    </div>
    <div class="list_title mg0">
        <ul class="borrow_form recharge pd0 mg0">
            <li class="borrow_f_t">
                <span class="fl borrow_l_z ft14 ftbl tl">开户行 </span>
                    <span class="fl ftgray branch_name">
                        {{cashDetail.bankName}}
                    </span>
            </li>
            <li class="borrow_f_t bor0 mgb0 pd0">
                <span class="fl borrow_l_z ft14 ftbl tl">银行卡号</span>
                <span class="fl ftgray">{{cashDetail.otherAccno}}</span>
            </li>
        </ul>
    </div>
    <div class="list_title">
        <ul class="borrow_form recharge pd0 mg0">
            <li class="borrow_f_t">
                <span class="fl borrow_l_z ft14 ftbl tl">预留手机号 </span>
                    <span class="fl ftgray">
                        {{cashDetail.reservedMobile}}
                    </span>
            </li>
            <li class="borrow_f_t bor0 mgb0 pd0">
                <span class="fl borrow_l_z ft14 ftbl tl">提现金额</span>
                    <span class="fl">
                        <input type="number" name="recharge_money" id="recharge_money" class="fl money_text" onkeyup="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){var s = this.value;this.value=s.substring(0,s.length-1);}" onafterpaste="this.value=this.value.replace(/\D/g,'')" style="min-width:130px;" placeholder="请输入提现金额"/> （元）
                    </span>
            </li>
        </ul>
    </div>



    <p class="recharge_title ftblue2" style="padding-bottom: 20px" v-if="cashDetail.limitCount && cashDetail.count > 0">
        您本日还有<font class="ftog"> {{cashDetail.count}} </font>次提现机会
    </p>

    <p class="recharge_title ftblue2" style="padding-bottom: 20px" v-else>
        您本日提现次数已用完，请下个工作日再试
    </p>

    <p class="fl pd0 recharge_title">手续费：0.00元 <img src="../../../images/account/icon_fee.png" /> 目前暂免，由鼎有财平台垫付 </p>

    <div id="btn" class="fl w100">
        <button id="recharge_btn" class="common_btn tender_btn" @click="nextCash">下一步</button>
        <router-link to="/usersMain/userCashDepository/cashRecord" class="recode fr">提现记录</router-link>
    </div>
    <p class="recharge_title recharge_tip" v-if="!cashDetail.limitCount">
        <font class="ft14">温馨提示：</font> <br />
        1、T日（工作日）充值的资金，需T+1（工作日）银行清算（正常为16：30前）成功后可申请提现。<br />
        2、单日提现次数不限，单次提现金额低于50000元，无手续费，提现当天到账，周末及节假日均可提现（提现交易需通过人行大小额支付系统完成，到账时间以对方行入账为准）。<br />
        3、单次提现金额大于50000元，无手续费，需通过人行支付系统处理(处理时间为工作日8:45-16:30），非系统处理时间暂不受理。
    </p>        
    <p class="recharge_title recharge_tip" v-else>
        <font class="ft14">温馨提示：</font> <br />
        1、单日提现最多{{cashDetail.count}}次，单次提现金额低于50000元，无手续费，提现当天到账，周末及节假日均可提现（提现交易需通过人行大小额支付系统完成，到账时间以对方行入账为准）。<br />
        2、单次提现金额大于50000元，无手续费，需通过人行支付系统处理(处理时间为工作日8:45-16:30），非系统处理时间暂不受理。
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
            cashDetail: {},
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

            this.cashDetail = Object.assign(
                {...resAccount.data.data}, 
                {...resAsset.data.data}, 
                {...resOpenCard.data.data}, 
                {...resCanWithdraw.data.data},
                {...resWithdrawLimit.data.data}
            )

            this.showLoading = false;
        },
        async nextCash(){
            this.showAlert = true; 
            this.alertText = "此版本系统暂未开放提现"; 
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
    color: #7c91c8
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

.common_tips_left_red {
    width: 280px;
    position: absolute;
    left: 50%;
    top: 35px;
    margin-left: -158px;
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
    top: 5px;
    background: none !important;
}

.balanceTipsIco {
    position: relative;
    margin-top: 5px;
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
    border-bottom: 8px solid #000;
    border: none \9;
    text-indent: -999px;
    text-indent: 0px \9;
    opacity: .8;
    display: none
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translateX(100%);
}
</style>