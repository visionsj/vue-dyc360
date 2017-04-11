<template>  
<div id="tender_record">
    <div id="invest_con" class="pg0">
        <div class="list_title">
            <div class="invest_list_title">
                <li class="fl w30">
                    <p class="invest_list_detail_title">用户</p>
                </li>
                <li class="fl w30">
                    <p class="invest_list_detail_title ">投资金额</p>
                </li>
                <li class="fl w40" >
                    <p class="invest_list_detail_title ">时间</p>
                </li>
            </div>

            <div id="wrapper">
                <div id="scroller">
                    <div id="users_tender_record_list">
                        <div class="invest_list_title rc_bn" v-for="value in projectDetail">
                            <ul>
                                <li class="fl w30">
                                    <p class="invest_list_detail_title ">{{value.repayName}}</p>
                                </li>
                                <li class="fl  w30">
                                    <p class="invest_list_detail_title ">{{value.repayCertNo}}</p>
                                </li>
                                <li class="fl w40" >
                                    <p class="invest_list_detail_title ">{{value.totalBalance}}</p>
                                </li>
                            </ul>
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
import {repayUserList} from '../../../service/getData'
import '../../../style/custom.css' 


export default {
    data() {
        return {
            projectDetail: []
        }
    },
    created() {

    },
    mounted() {
       this.initData();
    },
    components: {
    },
    methods: {
        async initData(){
            let resRepay = await repayUserList(this.$route.query.parentId, 50);
            this.projectDetail = [...resRepay.data.data]
        }
               
    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scoped="">
    #tender_record{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f1f1f1;
        z-index: 999999;
        overflow-y: auto;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    #invest_con {
        font-size: 12px
    }

    #users_tender_record_list li {
        margin: 5px 0;
    }

    #tender_record .list_title {
        padding: 10px 0;
        margin: 0;
        background: none;
        border: none
    }

    #tender_record .list_title .invest_list_title {
        border-bottom: none;
        padding-bottom: .4rem;
    }

    #tender_record #wrapper {
        top: 45px
    }

    #users_tender_record_list {
        background: #fff;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }

    #invest_con .invest_list_title {
        padding: 5px 0 0 0;
    }

</style>