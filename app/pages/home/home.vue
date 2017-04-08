<template>
<div id="pageone">
<app-down></app-down>
<swiper-banner></swiper-banner>


<div id="index" style="padding: 0">
    <div class="article">
            <div id="slider" v-if="showActicle">
               <div class="close" @click="showActicle=false"></div>
                <div id="articleSlider" > 
                    <ul style="margin-top: -40px;"> 
                        <li v-for="value in articleList"><a :href="value.source">{{value.name}}</a></li>
                    </ul>
                </div>
            </div>
            平凡人的卓越理财
      </div>

    <div style="position: relative; margin-bottom: 30px;">

        <div :class="productDetail.borrowType==1 ? 'list_title_new' : 'list_title'" id="list_title" >
            <span class="activity" @click.prevent="showActive()"></span>
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
                            {{productDetail.yield | isNAN}}<font class="ft20">%</font>
                            
                            <span class="yield" v-if="productDetail.floatYield > 0"> +{{productDetail.floatYield}}%</span>
                            
                        </h1>
                        <p class="ft2 mg0" style="padding-bottom: 8px">预期年化收益</p>
                        <p class="ft1">
                            <span class="circle_list fl">
                                <font class="ftred" v-if="productDetail.durationType == 1 || productDetail.durationType == 2">{{productDetail.duration}}</font>
                                <font class="ftred" v-if="productDetail.durationType == 3 || productDetail.durationType == 2">{{productDetail.duration * 3}}</font>
                                <font class="ftred" v-if="productDetail.durationType == 4 || productDetail.durationType == 2">{{productDetail.duration * 6}}</font>
                                
                                <font class="ft14" v-if="productDetail.durationType == 1">天</font>
                                <font class="ft14" v-else>个月</font>
                                
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
            :to="{path: '/borrow_content', query: { borrowNo: productDetail.borrowNo}}"
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
    <div id="platformInfoText" class="platformInfoText">
            <ul style="margin-top: -48px;">
                <li><img src="../../images/index/info1_ico.png"> 累计吸引<font id="investNum" class="investNum">278,931</font> 位聪明的投资人</li>
                <li><img src="../../images/index/info2_ico.png"> 由浙商银行提供资金存管</li>
                <li><img src="../../images/index/info3_ico.png"> 支持14家主流银行卡绑定</li>
                <li><img src="../../images/index/info4_ico.png"> 优质资产，稳健收益</li>
            </ul>
    </div>

    <div class="active-list" id="active_list" v-show="showActiveImg">
        <div class="swiper-container-active">
            <div class="swiper-wrapper">
                <a class="swiper-slide" v-for="value in activeActivity" :href=value.url :data-code=value.code>
                    <p><img :src=value.imageUrl /></p>
                </a> 
            </div>
        </div>
        <div class="page" style="display:none"></div>
        <div id="active_close" @click="showActiveImg=false"></div>
    </div>
</div>
<footer-common></footer-common>

<transition name="loading">
    <loading v-if="showLoading"></loading>
</transition>

</div>
</template>


<script>
import $ from '../../plugins/zepto.min.js'
import Vue from 'vue'
import {getRecommendedBorrowList, getSimpleArticleList,getActiveActivity} from '../../service/getData'
import footerCommon from '../../components/footer/footerCommon'
import appDown from '../../components/common/appDown'
import loading from '../../components/common/loading'
import swiperBanner from './swiper'
import {textSlider} from '../../plugins/textSlider'
import '../../style/index.css'
import '../../style/custom.css' 

Vue.filter('isNAN', function (value) {   
    return !value ? 0 : value ;
});


export default {
    data(){
        return {
            articleList: null,
            productDetail: {},
            activeActivity: null,
            showActicle: true,
            showActiveImg: false,
            showLoading: false, 
        }
    },
    created(){

    },
    mounted(){
        this.initData();      
    },
    components: {
        appDown,
        swiperBanner,
        footerCommon,
        loading,
    },
    methods: {
        async initData(){

            let resBorrowList = await getRecommendedBorrowList();
            this.productDetail = {...resBorrowList.data.data[0]};
            this.pieCircle(this.productDetail.process);
            this.showLoading = false;

            let resArticle = await getSimpleArticleList();
            this.articleList = [...resArticle.data.data];

            setTimeout(() => {
                $('#articleSlider').textSlider();
            },500)

            
            let resActivity = await getActiveActivity();
            this.activeActivity =  [...resActivity.data.data];
               

            $('#platformInfoText').textSlider({
                scrollHeight: 24
            });
        },

        async pieCircle(process) {
            var percent= 0, curPercent = process;
            var percnetInter = setInterval(function(){
                if(percent >= curPercent){
                    clearInterval(percnetInter);
                }else if(percent>50){
                    $('#index .circle').addClass('clip-auto');
                    $('#index .right').removeClass('wth0');
                }
                $('#index .left').css("-webkit-transform","rotate("+(18/5)*percent+"deg)");
                $('#index .num>span').text(percent);
                percent++;
            },3);
        },

        async showActive(){
            this.showActiveImg = true,
            setTimeout(() => {
                new Swiper('.swiper-container-active',{
                    pagination: '.page',
                    loop: false
                })
            },500)
        }
         
    },
    props:[],
    mixins: [],
}

</script>
<style lang="scss" scoped>
#pageone{
    background: #fff
}

</style>


