<template>
<div id="pageone">
<app-down></app-down>
<swiper-banner></swiper-banner>



<div style="position: relative; margin-bottom: 30px;">

    <div :class="productDetail.borrowType==1 ? 'list_title_new' : 'list_title'" id="list_title" >
        <span class="activity"></span>
    </div>
    <div class="rate">
        <div class="round-wrap jqm-round-wrap">
            <div class="jqm-round-bg"></div>

            <div class="wrap_circle">
                <div class="circle" id="percentCircle" :data-percent=productDetail.process>
                    <div class="percent left"></div>
                    <div class="percent right wth0"></div>
                </div>
            </div>

            <div id="jqm-round-circle" class="jqm-round-circle">
                <div style="margin-top:5px;">
                    <h1>
                        {{productDetail.yield-productDetail.floatYield}}<font class="ft20">%</font>
                        
                        <span class="yield" <div v-if="productDetail.floatYield > 0"></div>>+{{productDetail.floatYield}}%</span>
                        
                    </h1>
                    <p class="ft2 mg0" style="padding-bottom: 8px">预期年化收益ddd</p>
                    <p class="ft1">
                        <span class="circle_list fl">
                            <font class="ftred" v-if="productDetail.durationType == 1 || productDetail.durationType == 2">{{productDetail.duration}}</font>
                            <font class="ftred" v-if="productDetail.durationType == 3 || productDetail.durationType == 2">{{productDetail.duration * 3}}</font>
                            <font class="ftred" v-if="productDetail.durationType == 4 || productDetail.durationType == 2">{{productDetail.duration * 6}}</font>
                            
                            <font class="ft14" v-if="productDetail.durationType == 1">天</font>
                            <font class="ft14" <div v-else></div>>个月</font>
                            
                            <br />
                            <font class="ft2">项目期限</font></span>
                        <span class="circle_list fl">
                            <font class="ftred">{{productDetail.orderNum}}</font>
                            <font class="ft14">人</font>
                            <br />
                            <font class="ft2">已购人数</font>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div id="recommend_btn" class="in_invest">
        <router-link 
        :to="{path: 'borrow_content.html', query: { borrowNo: productDetail.borrowNo}}"
        :class="productDetail.borrowStatus != 3 ? 'common_btn_og disable_btn' : 'common_btn_og'" >
            <span v-if="productDetail.borrowStatus == '2'">预告标</span>
            <span v-if="productDetail.borrowStatus == '3'">立即投资</span>
            <span v-if="productDetail.borrowStatus == '4'">满标待审</span>
            <span v-if="productDetail.borrowStatus == '5'">还款中</span>
            <span v-if="productDetail.borrowStatus == '6'">已完成</span>
            <span v-if="productDetail.borrowStatus == '7'">已过期</span>
            <span v-if="productDetail.borrowStatus == '9'">复审失败</span>
        </router-link >
    </div>
</div>


<footer-common></footer-common>
</div>
</template>


<script>
import {getRecommendedBorrowList} from '../../service/getData'
import footerCommon from '../../components/footer/footerCommon'
import appDown from '../../components/common/appDown'
import swiperBanner from './swiper'
// import '../../style/index.css'
// import '../../style/custom.css' 

export default {
    data(){
        return {
             productDetail: {}
        }
    },
    created(){

    },
    mounted(){
     getRecommendedBorrowList().then(res => {
        this.productDetail = res.data.data[0]
    
      })
       
        
    },
    components: {
        appDown,
        swiperBanner,
        footerCommon,
    },
    methods: {
         
    },
    props:[],
    mixins: [],
}

</script>
<style scoped>


</style>


