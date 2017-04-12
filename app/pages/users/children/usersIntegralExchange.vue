<template>  
<div id="invest_con" data-role="content" class="pd0">
    <div class="pd0">
        <div class="fl invest_list_title column_head pd0">
            <ul>
                <li class="fl w35">
                    <p class="invest_list_detail_title ft14 ftbl">红包</p>
                </li>
                <li class="fl w30">
                    <p class="invest_list_detail_title ft14 ftbl">兑换积分</p>
                </li>
                <li class="fl w35" >
                    <p class="invest_list_detail_title ft14 ftbl">操作</p>
                </li>
            </ul>
        </div>
        <div id="users_tender_list" class="fl list_title users_tender_list">

            <div class="invest_list_title ex pd0" v-for="value in exchangeList">
                <ul>
                    <li class="fl w35 pd0">
                        <p class="red_ico ft16">{{value.amount}}<font class="ft12">元</font></p>
                    </li>
                    <li class="fl w30 pd0">
                        <p class="invest_list_detail_title ft16 ftog">{{value.amount*100}}</p>
                    </li>
                    <li class="fl w35 pd0">
                        <p class="invest_list_detail_title ft14 ftgr">
                            <button @click="exchange(value.id)" class="common_btn_yl mg0 wd80 ft14" >兑换</button>
                        </p>
                    </li>
                </ul>
            </div>

        </div>
    </div>
    <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>
</div>
</template>

<script>
import Vue from 'vue'
import {getCouponForExchange, exchangeGoldCoinWeb} from '../../../service/getData'
import alertTip from '../../../components/common/alertTip'
import '../../../style/custom.css' 

export default {
    data() {
        return {
            exchangeList: {},
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
    computed:{

    },
    methods: {
        async initData(){
            let resCoupon = await getCouponForExchange(30);
            this.exchangeList = [...resCoupon.data.data]; 
        },
        async exchange(id){
            exchangeGoldCoinWeb(id, 1).then(res => {
                if (res.data.retCode == "1") {
                    this.showAlertIcon = false;
                    this.showAlert= true; 
                    this.alertText= "兑换成功"; 
                }else{
                    this.showAlert= true; 
                    this.alertText= res.data.retMsg; 
                }
            })
        }
    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scoped>
#invest_con{
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

#invest_con .invest_list_title{
    text-align: center
}
.column_head li{
    margin: .6rem 0
}
.list_title{
    line-height: 30px
}
.common_btn_yl{
    display: inline-block
}

</style>