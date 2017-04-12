<template>  
<div class="explainWrap">
    <!-- /content -->
    <div data-role="content" style="font-size: 1em; line-height: 1.8em">
        <p>
            什么是金币？<br />
            金币是鼎有财在投资人注册或者购买理财产品过程中，赠送给投资人的。金币无法提现，当金币累积到一定量时可以兑换鼎有财平台的红包、礼品及参加金币抽奖活动。<br /><br />
            金币的使用规则是什么？<br />
            1.目前鼎有财金币的使用规则是：<br />
            1）每100金币，即可兑换1元红包；<br />
            2）每50金币，可参与一次金币抽奖；<br />
            3）金币可用于鼎有财平台的其他相关活动。<br />
            2.金币永久有效。<br />
            3.鼎有财平台拥有对上述规则的调整权利，如有调整，将会及时在官方渠道进行公告。<br />
            获得金币的方法有哪些？<br /><br />
            投资人获得金币的渠道有如下几种：<br />
            1) 首次注册用户，实名认证将会获得50金币奖励；<br />
            2) 首次绑定银行卡将会获得50金币奖励；<br />
            3) 用户投资购买理财产品时可获得相应金币奖励，每投资10元送1金币；<br />
            4)每日签到获得5个金币，重复签到只记一次。<br />
        </p>
    </div>
</div>
     
</template>

<script>
import '../../../style/custom.css' 

export default {
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    components: {
    },
    computed:{

    },
    methods: {

    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scoped>
.explainWrap{
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
.explainWrap{
    padding: 10px; 
    font-size: 14px
}


</style>