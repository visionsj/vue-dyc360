<template>  
<div class="bzxx_lei_box" >
    <div class="bzxx_lei" >
        <div id="wrapper" style="top: 0px;">
            <div v-load-more="loaderMore" >
                <ul class="bzxx_lei_nav">
                  <li v-for="value in newsList">
                      <router-link :to="{path: '/appHelpList/appHelpContent', query: {'id': value.id}}">
                          <span>{{value.name}}</span><b></b>
                      </router-link>
                  </li>
                </ul>
            </div>
        </div>
    </div>

    <transition name="loading">
        <loading v-if="showLoading"></loading>
    </transition>
    
    <transition name="router-slid">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
import {getArticleWebPage} from '../../service/getData'
import loading from '../../components/common/loading'
import {loadMore} from '../../plugins/mixin'
import '../../style/custom.css' 

export default {
  data() {
    return {
      newsList: null,
      pageNo: 1,
      showLine: false,
      showLoading: true, //显示加载动画
    }
  },
  created() {

  },
  mounted() {
    this.initData()
  },
  components: {
    loading
  },
  computed:{
     
  },
  methods: {
    async initData(){
     let resNews = await getArticleWebPage(1, 7, 20);
     this.newsList = [...resNews.data.data]
     this.showLoading = false;
    },

    async loaderMore(){
        if (this.preventRepeat) {
            return
        }

        this.preventRepeat = true;
        this.showLoading = true;
        this.pageNo += 1;

        let res = await getArticleWebPage(this.pageNo, 7, 20);  

        this.newsList = this.newsList.concat([...res.data.data]);

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
  ]
}
</script>
</script>
<style lang="scss" scoped="">
.bzxx_lei_box{

}
.bzxx_lei_nav li:first-child{
    margin-top:1rem
}

.bzxx_lei_nav li {
    width: 100%;
    margin-bottom: .6rem;

    border-bottom: 1px #ddd solid;
}

.bzxx_lei_nav li a{
    width:90%;
    height:1.4rem;
    margin:0 auto;

    display:block;
    color: #666;
}
.bzxx_lei_nav li a span{
    float:left; 
    max-width: 12rem;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.bzxx_lei_nav li a b{
    width:.4rem;
    height: .6rem;
    margin-top: .2rem;
    float:right;
    background:url(../../images/bzxxl.png) no-repeat;
    background-size: 100% 100%;
}

.bzxx_nei{
    width:96%;
    float:left;
    padding: 0 2%;
}
.bzxx_nei_h2{
    width:100%;
    font-size: 2rem;
    line-height:3rem;
    overflow:hidden;
    border-top:1rem #fff solid;
    text-align:center
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translateX(100%);
}
</style>