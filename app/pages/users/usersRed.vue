<template>  
<div>
    <div class="search red_search_wrap">
        <div class="right"><button id="btn_red_redeem" @click="redeem">兑 换</button></div>
        <div class="red_input"><input type="text" v-model="code" class="fl w60" placeholder="请输入兑换码" /></div>
    </div>

    <div id="invest_con" data-role="content" class="pd0">
        <div id="wrapper" style="margin-top: 60px;">
            <div id="scroller">
                <div class="fl list_title mg0 pd0" style="width: 100%;  border:none"  v-load-more="loaderMore">

                    <div class="fl list_title mg0 bor0" style="width: 100%; padding: 0 3%; border-top:none" 
                        v-if="queryType == 1">
                        <span class="noData" v-if="!arrLength">暂无数据</span>

                        <div v-for="value in red" :class="value.status == 1 ? 'coupons_div' : 'coupons_div_1'" v-else>
                            <div class="few">
                                <h3>￥<span>{{value.amount}}</span></h3>
                                <p>{{value.redName}}</p>
                            </div>
                            <div class="nex">
                                <span>{{value.statusText}}</span>
                                <p>有效期至 {{value.expiredTime}}<br>备注：{{value.remark}}</p>
                            </div>
                        </div>

                    </div>

                    <div class="fl list_title mg0 bor0" style="width: 100%; padding: 0 3%; border-top:none"  v-else>

                        <span class="noData" v-if="!arrLength">暂无数据</span>

                        <div v-for="value in gift" :class="value.status == 2 ? 'present present_1' : 'present margi1'">
                            <div class="rlef">
                                <img :src="value.imgUrl" />
                            </div>
                            <div class="rnex">
                                <div class="top">{{value.giftName}}</div>
                                <p>获得时间：{{value.receiveTime}}<br>备　注：{{value.remark}}</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>

    <alert-tip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText" :showAlertIcon="showAlertIcon"></alert-tip>

    <transition name="loading">
        <loading v-if="showLoading"></loading>
    </transition>
</div>
</template>

<script>
import Vue from 'vue'
import {getRedPacketList, getUserGiftList, activate} from '../../service/getData'
import loading from '../../components/common/loading'
import {loadMore} from '../../plugins/mixin'
import alertTip from '../../components/common/alertTip'
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
            red: [],
            gift: [],
            code: null,
            pageNo: 1,
            arrLength: 0,
            queryType: this.$route.query.type || 1,
            showAlert: false, 
            alertText: null, 
            showLoading: true,
        }
    },
    created() {

    },
    mounted() {
        this.initData(1, 15);
    },
    components: {
        loading,
        alertTip
    },
    computed:{

    },
    methods: {
        async initData(pageNo, pageSize){
            if(this.queryType == 1) {
                let resRed = await getRedPacketList(pageNo, pageSize);
                this.arrLength = !resRed.data.data ? 0 : resRed.data.data.length;

                this.red = [...resRed.data.data];
            }else{
                let resGift = await getUserGiftList(pageNo, pageSize);
                this.arrLength = !resGift.data.data ? 0 : resGift.data.data.length;
                this.gift = [...resGift.data.data];
            }

            this.showLoading = false;
        },
        async redeem(){
            if(!this.code){
                this.showAlert= true; 
                this.alertText= "兑换码不能为空"; 
                return;
            }
            activate(this.code).then(res => {
                if (res.data.retCode == "1") {
                    this.showAlertIcon = false;
                    this.showAlert= true; 
                    this.alertText= "兑换成功"; 
                }else{
                    this.showAlert= true; 
                    this.alertText= res.data.retMsg; 
                }
            })
        },
        async loaderMore(){
            if (this.preventRepeat) {
                return
            }

            this.preventRepeat = true;
            this.showLoading = true;
            this.pageNo += 1;
          

            if(this.queryType == 1) {
                var res = await getRedPacketList(this.pageNo, 15);
                this.red = this.red.concat([...res.data.data]);
            }else{
                  console.log(this.pageNo)
                var res = await getUserGiftList(this.pageNo, 15);
               this.gift = this.gift.concat([...res.data.data]);
            }

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
         },

    },
    
    props: [
    ],

    mixins: [
        loadMore
    ],
    watch: {
        $route(){
            this.holdingStatus = this.$route.query.type || 1
            this.initData(this.holdingStatus);
        }
    }
}
</script>
<style lang="scss" scoped="">
.red_search_wrap{
    position: fixed;
    top:0;
    left: 0;
    background: #efeff4;
    z-index: 99999;
}
.red_input input {
    padding: 10px;
    line-height: 20px
}

.noData {
    text-align: center;
    margin: 30px 0;
    display: block;
    color: #999
}
/*以下为我的搜索区域代码*/
.search{
    border-bottom: 1px solid #dedede;
    border-top: 1px solid #ccc;
    overflow: hidden;
    padding:9px 15px;
    width: 100%;
    height: 62px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box; -moz-box-sizing: border-box;  -ms-box-sizing: border-box;  -o-box-sizing: border-box;  

}
.search .right button{
    height: 40px;
    width: 106px;
    border-radius: 4px;
    background: #f55c5e;
    color: #fff;
    line-height: 40px;
    float: right;
    font-size: 16px;
    font-weight: normal;

    
}
.search .left{
    
    margin-right: 120px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #999;
    border-radius: 10px;
    background: #fff;
    text-indent: 1em;
    color: #999;

}
.wrap_1{
    display: none;
}
.coupons_div{
    /*border: 1px solid #000;*/
    height: 120px;
    font-size: 14px;
    width: 98%;
    margin: 24px auto;
    box-sizing: border-box;
    -webkit-box-sizing: border-box; -moz-box-sizing: border-box;  -ms-box-sizing: border-box;  -o-box-sizing: border-box;  
    background: url(../../images/h5tab.png) no-repeat;
    /*display: -webkit-flex;
    display: -moz-flex;
    display: flex;*/
    max-height: 150px;
    background-size: 100% 100%;


}
.coupons_div_1{
    /*border: 1px solid #000;*/
    height: 120px;
    width: 98%;
    margin: 24px auto;
    box-sizing: border-box;
    -webkit-box-sizing: border-box; -moz-box-sizing: border-box;  -ms-box-sizing: border-box;  -o-box-sizing: border-box;  
    background: url(../../images/h5tab1.png) no-repeat;
    /*display: -webkit-flex;
    display: -moz-flex;
    display: flex;*/
    background-size: 100% 100%;



}
.few{
    width: 30%;
    display: inline-block;
    padding-left: 5%;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #fff;
    padding-top: 10px;
    font-weight: normal;

    /*background: red;*/
}
.few h3 {
    margin: 8px 0;
}
.nex{
    width: 66%;
    display: inline-block;
    max-width: 50%;
    /*padding-top: 14px;*/
    font-size: 12px;
    margin-left: 1.75rem;
    line-height: 18px;
    margin-top:10px;
    /*-webkit-flex: 0.6;*/
    position: absolute;


}
.nex span{
    margin: 5px 0;
    line-height: 30px;
    font-size: 14px;
    color: #000;
    font-weight: bold;
    display: block;
}
.nex i{
    font-size: 24px;
    font-style: normal;
}
.nex p{
    line-height: 20px;
    vertical-align: middle;
}
.few h3 span{
    font-size: 50px;
    line-height: 50px;
    font-weight: normal;
}


/*以下为礼品未过期*/
.present{
    width: 96%;
    margin: 14px 2%;
    padding: 10px 2%;
    /*box-sizing: border-box;
    -webkit-box-sizing: border-box; -moz-box-sizing: border-box;  -ms-box-sizing: border-box;  -o-box-sizing: border-box;  */
    background: #EEF2FE;
    background-size: 100% 100%;
    display: inline-block;
}

.rlef{float:left;width:35%;margin-right:2%;background: #ffffff;text-align: center;}
.rlef img{width:90%;margin:auto 5%;max-height:8rem;vertical-align: middle;}
.rnex{float:left;width:63%;font-size: .5rem;line-height: 1.3rem;text-align: left;}
.ui-navbar ul{width:90% !important; margin: 0 auto;border-radius: 10px !important;overflow: hidden;}
.ui-tabs-acitve{background: #7c91c8 !important; color:#fff !important;}
.top{
    font-size: .7rem;
    line-height: 18px;
    margin-bottom:10px;
}
.rnex .top #msg{margin-right: 6% !important;
                display: inline-block;}
.rnex .top i{
    font-style: normal;

}
/*过期手环背景*/
.present_1{
    background: #ccc;
}
.rlef_1{background: #DBDBDB;}
/*第一个彩色手环隐藏*/
.disnone1{
    display: none;
}
/*第2个彩色手环隐藏*/
.disnone2{
    display: none;
}

.search .left.red_input{
    border: none;
}

.search .red_input input{
    border: none;
}

</style>