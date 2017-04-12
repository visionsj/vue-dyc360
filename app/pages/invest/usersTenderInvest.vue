<template>  
<div data-role="page">
    <div class="tender_invest_top">
        可用余额 (元)<br />
        <font id="available" class="ft20">{{assetDetail.availableBalance}}</font>
        <router-link to="/userRechargeDepository" class="recharge ft16">充值</router-link>
    </div>

    <div id="invest_tender" data-role="content" style="padding: 0">
        <div id="tender_list_01">
            <div  class="list_title mgt0" style="padding: 0 10px;">
                <ul class="borrow_form mg0" >
                    <li class="borrow_f_t">
                        <span class="fl borrow_l_z ft14 tl">剩余可投</span>
                        <span class="fl ft13"> <font class="ft16" id="leftAmount">{{!assetDetail.leftAmount ? '0.00' : assetDetail.leftAmount}} </font> 元 &nbsp;&nbsp;</span>
                    </li>
                    <li class="borrow_f_t">
                        <span class="fl borrow_l_z ft14 tl">投资金额&nbsp;</span>
                        <span class="fl">
                            <input type="number" name="money" id="tender_money" placeholder="请输入投资金额" class="fl money_text pd0"  />(元)
                        </span>
                        <span id="btn" class="fr" style="padding:0 0 0 8px; margin-right:10px;height:28px; ">
                            <span class="common_btn tender_invest_btn">余额全投</span>
                        </span>
                    </li>
                </ul>
            </div>
            <p class="profit">
                <span class="fl ft13 borrow_l_z tl">预计收益 </span>
                <font class="ft14 ftred tender_profit">0.00元 </font><font class="ft14 ftred" id="red_amount"></font>
            </p>

            <div id="btn" style="margin-bottom: 10px">
                <button class="common_btn tender_btn" @click="tender" >下一步</button>
            </div>
        </div>
    </div>

    <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>

    <transition name="router-slid">
         <router-view></router-view>
     </transition>

</div>
</template>

<script>
import Vue from 'vue'
import alertTip from '../../components/common/alertTip'
import {getUserAssetInfo,getBorrowDetail} from '../../service/getData'
import '../../style/custom.css' 

export default {
    data() {
        return {
            assetDetail: {},
            showAlert: false, 
            alertText: null, 
        }
    },
    created() {

    },
    mounted() {
        this.initData();
    },
    components: {
        alertTip
    },
    methods: {
        async initData(){
            let resBorrow = await getBorrowDetail(this.$route.query.borrowNo);
            let resAsset = await getUserAssetInfo(this.$route.query.borrowNo);
            this.assetDetail = Object.assign({...resBorrow.data.data}, {...resAsset.data.data});
        },
        async tender(url, pass){
           this.showAlert= true;
           this.alertText = "此版本系统暂停投资"; 
        }
               
    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scoped="">
.borrow_f_t {
    padding: 5px 0;
}

.tender_invest_btn {
    padding: 0 5px !important;
    font-size: 14px !important;
    line-height: 28px !important;
    border-radius: 4px !important;
}

#more_red {
    color: #fb793a;
    text-decoration: underline;
}

.tender_invest_tip {
    width: 100%;
    margin-top: 15px;
    line-height: 40px;
    border-top: 1px solid #ddd;
    color: #aaa;
    text-align: center
}

#invest_tender .list_title, #users_main .list_title {
    margin: 15px 0 10px 0;
    padding: 8px 0;
    font-size: 14px;
}

.recharge {
    position: absolute;
    right: 20px;
    bottom: 15px;
    color: #fff
}

.tender_invest_top {
    position: relative;
    width: 100%;
    padding: 15px 0;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    background: #7c91c8
}

.borrow_form li {
    border-bottom: 1px solid #ddd
}

.borrow_form li:last-child {
    border-bottom: none
}

#tender_money {
    font-size: 14px;
    border: none
}

.profit {
    margin: 0;
    padding: 10px;
    display: inline-block
}

.money_text {
    font-size: 14px !important;
    border: none
}

#codeContent {
    display: none
}

.common_btn {
    float: right;
    display: inline-block;
    background-color: #ff5c5f;
    border: none;
    width: 90px;
    color: #fff;
    font-size: 14px;
    line-height: 200%;
    font-weight: normal;
    border-radius: 4px;
    cursor: pointer;
    padding: 2px 0;
    text-align: center;
    text-decoration: none;
    text-shadow: none;
    -webkit-appearance: none;
}

.dialog_tender {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8);
    display: none
}

.dialog_tender_btn_left {
    float: left;
    width: 50%;
    height: 50px;
    background: #fff;
    border-bottom-left-radius: 4px;
}

.dialog_tender_btn_right {
    float: left;
    width: 50%;
    height: 50px;
    background: #ff5c5f;
    color: #fff;
    border-bottom-right-radius: 4px;
}

.dialog_tender_content {
    position: absolute;
    width: 90%;
    height: 220px;
    top: 50%;
    left: 5%;
    margin-top: -110px;
    background: #fff;
    border-radius: 4px
}

.dialog_tender_content_text {
    height: 130px;
    padding: 20px
}

.dialog_tender_content_text h2 {
    margin: 0;
    font-size: 20px;
    text-align: center
}

.dialog_tender_content_text p {
    font-size: 14px;
    text-align: center
}

.btn {
    height: 50px;
    border-top: 1px solid #f0eff4;
    text-align: center;
    line-height: 50px;
}

#verifyCode {
    float: left;
    width: 60%;
    height: 40px;
    padding: 0 4px;
    border-radius: 0
}

.send_code_btn {
    float: left;
    width: 35%;
    height: 42px;
    border-radius: 0;
    padding: 0;
    line-height: 42px
}

.disable_btn {
    border: none !important;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translateX(100%);
}

</style>