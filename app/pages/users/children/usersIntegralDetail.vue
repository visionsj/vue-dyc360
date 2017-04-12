<template>  
<div id="invest_con" data-role="content" class="pd0">
    <div class="pd0">
        <div  class="ui-body-d ui-content pd0">
            <div class="list_title mg0 pd0" style="border:none">
                <div class="fl invest_list_title " style="background: none">
                    <li class="fl w40">
                        <p class="invest_list_detail_title ft14 ftbl">说明</p>
                    </li>
                    <li class="fl w30">
                        <p class="invest_list_detail_title ft14 ftbl">金币</p>
                    </li>
                    <li class="fl w30" >
                        <p class="invest_list_detail_title ft14 ftbl">时间</p>
                    </li>
                </div>

                <!-- /content -->
                <div id="wrapper" style="top:40px;">
                    <div id="scroller">
                        <div class="fl list_title users_tender_list" id="users_tender_list" style="border-top:none;">
                            <span class="noData" v-if="!arrLength">暂无数据</span>
                            <div class="invest_list_title rc_bn" v-for="value in integralDetail">
                                <li class="fl w40">
                                    <p class="invest_list_detail_title ft13 ftgr"> &nbsp;{{value.remark}}</p>
                                </li>
                                <li class="fl w30">
                                    <p class="invest_list_detail_title ft14 ftog" v-if="value.opType==1">
                                        +{{value.credits}}
                                    </p>
                                    <p class="invest_list_detail_title ft14 ftog" v-else>
                                        -{{value.credits}}
                                    </p>
                                </li>
                                <li class="fl w30" ><p class="invest_list_detail_title ft14 ftgr">{{value.updateTime | formatTime}}</p>
                                </li>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
</div>
 
</template>

<script>
import Vue from 'vue'
import {getGoldCoinList} from '../../../service/getData'
import '../../../style/custom.css' 
Vue.filter('formatTime', function (value, str) {
   function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '/' + add0(m) + '/' + add0(d);
});
export default {
    data() {
        return {
            integralDetail: [],
            arrLength: null
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
        async initData(){
            let resGold = await getGoldCoinList(100);
            this.arrLength = resGold.data.data.length;
            this.integralDetail = [...resGold.data.data]; 
        },
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
.noData {
    text-align: center;
    margin: 30px 0;
    display: block;
    color: #999
}
#invest_con .invest_list_title {
    line-height: 30px;
    padding: 0 !important;
}

.invest_list_title li {
    padding: 5px 0 7px !important;
}


</style>