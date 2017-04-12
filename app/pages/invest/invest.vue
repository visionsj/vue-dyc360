<template>	
<div id="pageone">
<div style="padding: 0;">
    <div id="invest">
        <div id="wrapper" style="top: 0px">
            <div v-load-more="loaderMore">
                <div id="users_tender_list" class="ui-body-d ui-content pd0">
               
                <div id="productVote">
                    <router-link class="list_title" style="padding: 5px 10px;" v-for="value in productVote" 
                    :to="{path: (isLogin == 'true' ? '/borrowContent':'/login'), query: {borrowNo : value.borrowNo}}">
                        <div class="mg0 pd0 invest_title_name">
                	       {{value.name}}

                	        <span v-if="!!value.tagsArr" v-for="k in value.tagsArr">
                	            <span class="ft12 product_title_item">{{k}}</span>
                	        </span>
                        </div>
                        <div class="invest_list">
                            <li class="fl">
                                <p class="invest_list_detail ft34">
                                    {{value.yield-value.floatYield}}<font class="ft16">%</font>
                                    <span class="yield" v-if="value.floatYield > 0">+{{value.floatYield}}%</span>

                                </p>
                                <p class="invest_list_detail_title">预期年化收益</p>
                            </li>

                            <li class="fl">
                                <p class="invest_list_detail invest_limit ftgray ft20">
                                    
                                    <font v-if="value.durationType == 1 || value.durationType == 2">{{value.duration}}</font>
                                    <font v-if="value.durationType == 3">{{value.duration * 3}}</font>
                                    <font v-if="value.durationType == 4">{{value.duration * 6}</font>

                                    <font class="ft12" v-if="value.durationType == 1">天</font>
                                    <font class="ft12" v-else>个月</font>
                                </p>
                                <p class="invest_list_detail_title">项目期限</p>
                            </li>

                            <li class="fl">
                                <div class="wrap">
                                    <div :class="value.process > 50 ? 'invest_circle clip-auto' : 'invest_circle'">
                                        <div class="percent left" 
                                        :style="{'-webkit-transform': 'rotate('+ value.process*3.6+ 'deg)'}"></div>
                                        <div :class="value.process < 50 ? 'percent right wth0' : 'percent right'" ></div>
                                    </div>
                                    <div class="num">
                                        <span v-if="value.borrowStatus == '2'">预</span>
                                        <span v-if="value.borrowStatus == '3'">抢</span>
                                        <span v-if="value.borrowStatus == '4'">满</span>
                                        <span v-if="value.borrowStatus == '5'">还</span>
                                        <span v-if="value.borrowStatus == '6'">完</span>
                                        <span v-if="value.borrowStatus == '7'">过</span>
                                        <span v-if="value.borrowStatus == '9'">流</span>
                                    </div>
                                </div>
                            </li>
                        </div>
                        <div class="invest_list_bottom ftgray9">
                          <span class="fl">
                              <font class="ftblue2 ft15">{{value.orderNum}}</font>
                              <font class="ft12">人已投</font>
                              <font class="ft12">｜ 剩余 </font><font class="ftblue2 ft15">{{value.remainBalance}}</font>
                              <font class="ft12">元</font>
                          </span>
                            <span class="fr ft12 assign">
                               <font v-if="value.assignType == '3'">(按{{value.durationTypeText}}) </font>

                               {{value.assignTypeText}}
                            </span>
                        </div>
                    </router-link>
                </div>



                <div id="boundary" v-show="showLine">
                    <img src="../../images/product-title.png" width="100%" />
                </div>

                <div id="product">
                  
                    <router-link class="list_title" style="padding: 5px 10px;" v-for="value in product" 
                    :to="{path:'/borrow_content',query: {borrowNo : value.borrowNo}}">
                        <div class="mg0 pd0 ftgray9 invest_title_name">{{value.name}}</div>
                        <div class="invest_list">
                            <li class="fl">
                                <p class="invest_list_detail ft34 ftgray9">
                                  {{value.yield-value.floatYield}}<font class="ft16">%</font>
                                   <span class="yield brgray" v-if="value.floatYield > 0">+{{value.floatYield}}%</span>
                                </p>
                                <p class="invest_list_detail_title">预期年化收益</p>
                            </li>
                            <li class="fl">
                                <p class="invest_list_detail invest_limit ftgray9 ft20">
                                    <font v-if="value.durationType == 1 || value.durationType == 2">{{value.duration}}</font>
                                    <font v-if="value.durationType == 3">{{value.duration * 3}}</font>
                                    <font v-if="value.durationType == 4">{{value.duration * 6}</font>

                                    <font class="ft12" v-if="value.durationType == 1">天</font>
                                    <font class="ft12" v-else>个月</font>
                                </p>
                                <p class="invest_list_detail_title">项目期限</p>
                            </li>
                            <li class="fl">
                                <div class="wrap">
                                    <div class="invest_circle">
                                        <div class="percent left" style="border-color:#e7e7e7"></div>
                                        <div class="percent right wth0" style="border-color:#e7e7e7"></div>
                                    </div>
                                    <div class="num ftgray9" style="background: #e7e7e7">
                                        <span v-if="value.borrowStatus == '2'">预</span>
                                        <span v-if="value.borrowStatus == '3'">抢</span>
                                        <span v-if="value.borrowStatus == '4'">满</span>
                                        <span v-if="value.borrowStatus == '5'">还</span>
                                        <span v-if="value.borrowStatus == '6'">完</span>
                                        <span v-if="value.borrowStatus == '7'">过</span>
                                        <span v-if="value.borrowStatus == '9'">流</span>
                                    </div>
                                </div>
                            </li>
                        </div>
                        <div class="invest_list_bottom ftgray9">
                          <span class="fl">
                              <font class="ftgray9 ft15">{{value.orderNum}}</font>
                              <font class="ft12">人已投</font>
                          </span>
                            <span class="fr ft12 assign">
                               <font v-if="value.assignType == '3'">(按{{value.durationTypeText}}) </font>

                               {{value.assignTypeText}}
                            </span>
                        </div>
                    </router-link>
          
                </div>
               
                </div>
            </div>
        </div>
    </div> 
</div>

<footer-common></footer-common>

<transition name="loading">
    <loading v-if="showLoading"></loading>
</transition>

</div>
</template>

<script>
import Vue from 'vue'
import {getBorrowList} from '../../service/getData'
import footerCommon from '../../components/footer/footerCommon'
import loading from '../../components/common/loading'
import {getStore, setStore} from '../../config/mUtils'
import {loadMore} from '../../plugins/mixin'

import '../../style/custom.css' 

export default {
	data() {
		return {
			productVote: [],
			product: [],
			pageNo: 1,
            isLogin: getStore('login'),
			showLine: false,
			showLoading: true, //显示加载动画
		}
	},
	created() {

	},
	mounted() {
                this.initData();
	},
	components: {
		loading,
		footerCommon,
	},
	methods: {
                async initData(){
                    let res = await getBorrowList(this.pageNo, 15, 3);
                    let productVote = [], product = [];
                    for(var i=0; i<res.data.data.length; i++){
                        let value = res.data.data[i];
                        if(value.borrowStatus == 3 || value.borrowStatus == 4) {
                            productVote.push(value)
                        }else {
                            product.push(value)
                        }
                    };

                    this.productVote = [...productVote];
                    this.product = [...product];

                    if(productVote.length != 0 && product.length > 0){
                        this.showLine = true
                    }
                    this.showLoading = false;


                },
                async loaderMore(){
                    let productVoteNew = [], productNew = [];
                    if (this.preventRepeat) {
                        return
                    }
                    this.preventRepeat = true;
                    this.showLoading = true;
                    this.pageNo += 1;
                    let res = await getBorrowList(this.pageNo, 15, 3);  
                                    
                    
                    for(var i=0; i<res.data.data.length; i++){
                         let value = res.data.data[i];
                        if(value.borrowStatus == 3 || value.borrowStatus == 4) {
                            productVoteNew.push(value)
                        }else {
                            productNew.push(value)
                        }
                    };

                    this.productVote = this.productVote.concat(productVoteNew);
                    this.product = this.product.concat(productNew);

                    this.preventRepeat = false;
                    this.hideLoading();

                    },
                    
                    hideLoading(){
                        if (process.env.NODE_ENV !== 'development') {
                            clearTimeout(this.timer);
                            this.timer = setTimeout(() => {
                                clearTimeout(this.timer);
                                this.showLoading = false;
                            }, 1000)
                        }else{
                            this.showLoading = false;
                        }
                    },
	},
	
	props: [
	],

	mixins: [
		loadMore
	]
}
</script>