<template>  
<div class="fl users_tender_list" id="users_tender_list" style="border-top:none">
    <span class="noData" v-if="!arrLength">暂无数据</span>
    <div class="date_month" v-load-more="loaderMore">
        <div class="datecontent" v-for="value in record">
            <div class="nex"><b>{{value.type}}</b><i class="timenow">{{value.createdTime | formatTime}}</i>
            </div>
            <div class="last">
                <i><span class="">{{value.money}}</span><b class="msg_tab msg_a">{{value.status}}</b></i>
                <p>{{value.remark}}</p>
            </div>
        </div>
    </div>

    <transition name="loading">
        <loading v-if="showLoading"></loading>
    </transition>
</div>
</template>

<script>
import Vue from 'vue'
import {fundRecordAppPage,} from '../../service/getData'
import loading from '../../components/common/loading'
import {loadMore} from '../../plugins/mixin'
import '../../style/custom.css' 
Vue.filter('formatTime', function (value, str) {
   function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '/' + add0(m) + '/' + add0(d) ;
});
export default {
    data() {
        return {
            record: [],
            pageNo: 1,
            showLoading: true,
        }
    },
    created() {

    },
    mounted() {
        this.initData('', 1, 10);
    },
    components: {
        loading,
    },
    computed:{

    },
    methods: {
        async initData(type, pageNo, pageSize){
            let resRecord = await fundRecordAppPage(type, pageNo, pageSize);
            this.record = [...resRecord.data.data];
            this.arrLength = !resRecord.data.data ? 0 : resRecord.data.data.length;
            this.showLoading = false;
        },
        async loaderMore(){
            if (this.preventRepeat) {
                return
            }

            this.preventRepeat = true;
            this.showLoading = true;
            this.pageNo += 1;

            let res = await fundRecordAppPage('', this.pageNo, 10);  

            this.record = this.record.concat([...res.data.data]);

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
.datecontent{
    overflow: hidden;
    padding:6px 3px 2px 15px;
    margin: 8px 0;
    width: 100%;
    min-height: 68px;
    border-bottom: 1px solid #ddd;
    color: #A9A9A9;
    background:#fff;
    font-family: 'Microsoft YaHei';
    box-sizing: border-box;
    -webkit-box-sizing: border-box; 
    -moz-box-sizing: border-box;  
    -ms-box-sizing: border-box;  
    -o-box-sizing: border-box;  

}
.noData {
    text-align: center;
    margin: 30px 0;
    display: block;
    color: #999
}
.datecontent .nex{
    float: left;
    width: 110px;
    height:auto;
    text-align: left;
    font-size: 14px;
    color: #686868;
}
.datecontent .nex b{
    line-height: 30px
}
.datecontent i{
display: block;
font-style: normal;
font-size: 16px;
color: #A9A9A9; 
}
.datecontent i.timenow{
font-size: 15px;
}
.datecontent .last{
margin-left: 35%;
text-align: left;
height:auto;
}
.datecontent .last span{
    color: #f40;
}
.datecontent .last span.loss{
    color: #9dadd6;
}

.datecontent .last b.msg_tab{
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    right: 5%;
    color: #7c91c8;
    position: absolute;

}
.datecontent .last p{
margin: 0;
padding-top:5px;
font-size: 14px;
}
.datecontent .last i{
    padding-top: 5px;
}

.date_month h2{
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    padding: 0;
    line-height: 50px;
    padding-left: 12px;
    color: #666666;
}
.date_month .toptab{
    height: 49px;
    width: 100%;
    border-bottom: 1px solid #ccc;
}
</style>