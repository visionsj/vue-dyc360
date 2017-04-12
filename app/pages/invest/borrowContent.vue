<template>  
<div id="invest_con" style="padding:0 0 50px 0;">
        <div id="invest_info" class="list_title mgt0">
            <div class="invest_list_content fl">
                <p class="ft13">预期年化收益</p>
                <p class="bc_ft58" style="position: relative; margin-top: 15px;">
                    {{!(borrowDetail.yield-borrowDetail.floatYield) ? '0':(borrowDetail.yield-borrowDetail.floatYield)}}<font class="ft18">%</font>
                    <span class="floatYield" v-if="borrowDetail.floatYield > 0">+{{borrowDetail.floatYield}}%</span>
                </p>
                <div class="progressBar">
                    <div class="fl Bar">
                        <div :style="'width:' + borrowDetail.process+ '%'">
                            <span style="display: none">{{borrowDetail.process}}%</span>
                        </div>
                    </div>
                    <span class="bc_ft13 fl">剩余金额 {{borrowDetail.leftAmount}}元</span> <span class="fr bc_ft13 ">已售{{borrowDetail.process}}%</span>
                </div>
            </div>
            <div class="bn borrow_invest_detail fl">
                <ul>
                    <li class="fl">{{borrowDetail.entryUnit}}元起投</li>
                    <li class="fl"> 限期
                        <font v-if="borrowDetail.durationType == 1 || borrowDetail.durationType == 2">{{borrowDetail.duration}}</font>
                        <font v-if="borrowDetail.durationType == 3">{{borrowDetail.duration * 3}}</font>
                        <font v-if="borrowDetail.durationType == 4">{{borrowDetail.duration * 6}</font>

                        <font v-if="borrowDetail.durationType == 1">天</font>
                        <font v-else>个月</font>
                    </li>

                    <li class="fl" >
                        <font v-if="borrowDetail.assignType == 3">(按{{borrowDetail.durationTypeText}}) </font>
                        <font v-else>{{borrowDetail.assignTypeText}}</font>
                    </li>
                </ul>
            </div>
        </div>

        <div class="invest_process">
            <ul>
                <li :class="{'active': borrowDetail.borrowStatus == 3}">
                    <p class="processText">募集开始</p>
                    <p>{{borrowDetail.buyFromTime | formatTime}}</p>
                </li>
                <li :class="{'active': borrowDetail.borrowStatus == 4}">
                    <p class="processText" v-if="borrowDetail.borrowStatus > 4">起 息 日</p>
                    <p class="processText" v-else>预计起息</p>
                    <p>{{borrowDetail.actualProfitTime | formatTime}}</p>
                </li>
                <li :class="{'active': borrowDetail.borrowStatus == 5}">
                    <p class="processText">拼命赚钱</p>
                    <p style="padding-left: 5px">收益增长中</p>
                </li>
                <li :class="{'active': borrowDetail.borrowStatus == 6}">
                    <p class="processText" v-if="borrowDetail.borrowStatus == 6">到 息 日</p>
                    <p class="processText" v-else>预计到期</p>
                    <p>{{borrowDetail.repayTime | formatTime}}</p>
                </li>
            </ul>
        </div>

        <div class="list_title mg0 bor0">
            <router-link :to="{path: '/borrowContent/projectBorrowContent', query: {'borrowNo': borrowDetail.borrowNo}}" id="description">
                项目介绍 <i></i>
            </router-link>
        </div>

        <div class="list_title mg0 bor0" v-if="borrowDetail.repayUserCount > 1">
           <router-link :to="{path: '/borrowContent/projectDetail', query: {'parentId': borrowDetail.id}}">项目明细 <i></i></router-link>
        </div>

        <div class="list_title mg0">
            <router-link :to="{path: '/borrowContent/tenderRecord', query: {'borrowNo': borrowDetail.borrowNo}}">
                投资记录<i></i><span class="fr ft16">{{borrowDetail.investUserCount}} <font class="ft12">人已投 </font></span>
            </router-link>
        </div>



        <div 
            :class="borrowDetail.borrowStatus == 3 ? 'invest_tender': 'invest_tender disable_btn'" 
            @click="tender(((borrowDetail.isLogin == true && borrowDetail.openAccountStatus == 0 && !!borrowDetail.forceOpenAccount) ? '/openAccountGuid' : '/usersTenderInvest'), ((borrowDetail.openAccountStatus == 1 && borrowDetail.supportDepository != 2) ? 'no' : 'yes'))"
            >

            <span v-if="borrowDetail.borrowStatus == '2'">预告标</span>
            <span v-if="borrowDetail.borrowStatus == '3'">立即投资</span>
            <span v-if="borrowDetail.borrowStatus == '4'">满标待审</span>
            <span v-if="borrowDetail.borrowStatus == '5'">还款中</span>
            <span v-if="borrowDetail.borrowStatus == '6'">已完成</span>
            <span v-if="borrowDetail.borrowStatus == '7'">已过期</span>
            <span v-if="borrowDetail.borrowStatus == '9'">复审失败</span>
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
import {getBorrowDetail,getUserAccountInfo,forceOpenAccount} from '../../service/getData'
import '../../style/custom.css' 

Vue.filter('formatTime', function (value, str) {
   function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return add0(m) + '月' + add0(d) + '日';
});

export default {
    data() {
        return {
            borrowDetail: {},
            pageNo: 1,
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
            let resAccount = await getUserAccountInfo(this.$route.query.borrowNo);
            let resOpen = await forceOpenAccount(this.$route.query.borrowNo);

            this.borrowDetail = Object.assign({...resBorrow.data.data}, {...resOpen.data.data}, {...resAccount.data.data});
        },
        async tender(url, pass){
            if(pass == 'no'){
                this.showAlert = true;
                this.alertText = '您已开通银行存管，不能投资非存管标的'
            }else{
                this.$router.push({path: url, query:{'borrowNo' : this.$route.query.borrowNo}})
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
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translateX(100%);
  }

</style>