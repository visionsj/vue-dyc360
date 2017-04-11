<template>  
<div id="pageone">
    <div id="invest_con" class="pd0">

        <div class="ui-navbar">
            <li :class=" holdingStatus == 1 ? 'active fl' : 'fl'">
                投标中
            </li>
            <li :class=" holdingStatus == 2 ? 'active fl' : 'fl'">
                还款中
            </li>
            <li :class=" holdingStatus == 3 ? 'active fl' : 'fl'">
                已完成
            </li>
        </div>


        <!-- /content -->
        <div id="wrapper" v-load-more="loaderMore" >
            <div class="fl list_title user_tender rc_bn" v-for="value in userTenderDetail">
                <ul>
                    <li class="fl">
                        <p class="invest_list_detail_title ft16 ftgray">
                            {{value.productName}} 
                            <span class="fr ft14 ftblue2" v-if="value.status != 1">({{value.repayedNum}}/{{value.totalNum}})</span>
                        </p>
                    </li>
                    <li class="fl pd0">
                        <p class="invest_list_detail_title ft12">
                            投资金额：<font class="ftgray">{{value.investBalance}}元</font>
                            <span class="fr" v-if="value.status != 3">
                                预期总收益：<font class="ftgray">{{value.predictProfitAmount}}元</font>
                            </span>
                            <span class="fr" v-else>
                                总收益：<font class="ftgray">{{value.finishedProfitAmount}}元</font>
                            </span>
                        </p>
                    </li>

                    <li class="fl pd0">
                        <p class="invest_list_detail_title ft12">
                            投资时间：<font class="ftgray">{{value.createdTime}}</font>

                            <span class="fr" v-if="value.status == 3">
                             到期时间：<font class="ftgray">{{value.repayTime}}</font>
                            </span>

                            <span class="fr" v-if="value.status == 2">
                                剩余
                                <font class="ftgray" v-if="parseInt((value.repayTime-it.curDate)/86400000) <= 0">0</font>
                                <font class="ftgray" v-else>
                                    {{Math.ceil((value.repayTime-it.curDate)/86400000)}}
                                </font>
                            </span>

                            <span class="fr" v-if="value.status != 2 && value.status != 3">
                                <font class="ftgray">{{value.assignTypeText}}</font>
                            </span>
                        </p>
                    </li>

                </ul>
            </div>
        </div>

    </div>
    <div class="profitStatis" v-if="holdingStatus == 1">
        预期累计总收益： <font class='ft18'>{{profitStatis.predictProfitAmount}}元</font>
    </div>
    <div class="profitStatis" v-if="holdingStatus == 2">
        到期累计总收益： <font class='ft18'>{{profitStatis.collectProfitAmount}}元</font>
    </div>
    <div class="profitStatis" v-if="holdingStatus == 3">
        往期累计总收益： <font class='ft18'>{{profitStatis.finishedProfitAmount}}元</font>
    </div>

    <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>
    <transition name="loading">
        <loading v-if="showLoading"></loading>
    </transition>
</div>
</template>

<script>
import Vue from 'vue'
import {getInvestOrderList, getProfitStatis} from '../../service/getData'
import loading from '../../components/common/loading'
import {loadMore} from '../../plugins/mixin'
import alertTip from '../../components/common/alertTip'
import '../../style/custom.css' 

export default {
    data() {
        return {
            userTenderDetail: [],
            profitStatis: {},
            showAlert: false, 
            alertText: null, 
            showLoading: true,
            holdingStatus: this.$route.query.type || 1,
        }
    },
    created() {

    },
    mounted() {
        this.initData();
    },
    components: {
        loading,
        alertTip,
    },
    computed:{

    },
    methods: {
        async initData(){
            let resInvest = await getInvestOrderList(this.holdingStatus, 1, 10);
            this.userTenderDetail = [...resInvest.data.data];

            let resProfit = await getProfitStatis();
            this.profitStatis = {...resProfit.data.data}

            this.showLoading = false;
        },
        async loaderMore(){
            if (this.preventRepeat) {
                return
            }

            this.preventRepeat = true;
            this.showLoading = true;
            this.pageNo += 1;

            let res = await getInvestOrderList(this.holdingStatus, this.pageNo, 10);  

            this.userTenderDetail = this.userTenderDetail.concat([...res.data.data]);

            if(res.data.data.length == 0) {
              this.preventRepeat = true;
            }else{
              this.preventRepeat = false;
            }

            this.hideLoading();
         },
         
         hideLoading(){
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
              clearTimeout(this.timer);
              this.showLoading = false;
          }, 1000)
         }
    },
    
    props: [
    ],

    mixins: [
        loadMore
    ]
}
</script>
<style lang="scss" scoped="">
#wrapper{
    padding: 2rem 0;
    display: inline-block
}
.ui-navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999
}
  .ui-navbar {
    width: 100%;
    height: 42px;
    background: #fff;
    border-bottom: 1px solid #dcdcde
  }

  .ui-navbar li {
    width: 33.3%;
    text-align: center;
    line-height: 40px;
    border-bottom: 2px solid #fff
  }

  .ui-navbar li.active {
    color: #ff5557;
    border-bottom: 2px solid #ff5557
  }

  .ui-navbar li:active {
    background: #efeff4;
    border-bottom: 2px solid #efeff4
  }

  .user_tender li {
    width: 100%;
    color: #999;
    line-height: 28px
  }

  .user_tender li:first-child {
    padding: 0px 0 5px !important;
    margin-bottom: 5px;
    border-bottom: 1px solid #c8c8ca
  }

  #invest_con .list_title {
    margin: 5px 0;
  }

  .profitStatis {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 40px;
    text-align: right;
    padding: 0 3%;
    background: #6b80b7;
    color: #fff;
    z-index: 999
  }
</style>