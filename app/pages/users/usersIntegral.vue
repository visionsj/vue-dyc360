<template>  
<div id="invest_con" style="padding:0;">
    <div class="list_title ft14 brtn pd0 mg0">
        <div class="list_title bgblue bor0 brtn mg0">
            <p class="ft14 tc ftwhite mg0">金币总额</p>
            <p class="ft36 tc ftwhite" style="margin: 10px 0;" id="Coin">{{coinInfo.availableCredits}}</p>
        </div>
        <router-link class="list_title brtn mg0" :to="{path: '/usersIntegral/usersIntegralDetail'}">
            金币明细 <i></i>
        </router-link>
        <router-link class="list_title brtn mg0" :to="{path: '/usersIntegral/usersIntegralExchange'}">
            金币兑换 <i></i>
        </router-link>
        <router-link class="list_title brtn mg0" :to="{path: '/usersIntegral/usersIntegralExplain'}" style="border: none">
            金币规则 <i></i>
        </router-link>
    </div>

    <transition name="router-slid">
        <router-view></router-view>
    </transition>   
</div>



</template>

<script>
import Vue from 'vue'
import {getGoldCoinInfo} from '../../service/getData'
import '../../style/custom.css' 

export default {
    data() {
        return {
            coinInfo: {},

        }
    },
    created() {

    },
    mounted() {
        this.initData();
    },
    components: {
    },
    computed:{

    },
    methods: {
        async initData(pageNo, pageSize){
            let resGold = await getGoldCoinInfo();
            this.coinInfo = {...resGold.data.data}; 
        },
    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scoped>
#invest_con .bgblue {
    padding-top: 20px
}

.list_title {
    line-height: 30px
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translateX(100%);
}
</style>