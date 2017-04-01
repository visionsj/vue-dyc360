<template>
    <div class="main_nav">
      <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide food_types_container" v-for="(item,index) in bannerList" :key="index">
                  <a :href=item.webUrl  class="link_to_food">
                      <img :src=item.imageUrl>
                  </a>  
                </div>
             </div>
       </div>
      <div class="swiper-pagination"></div>
    </div>

</template>


<script>

import {getBannerList} from '../../service/getData'
import '../../plugins/swiper.min.js'
import '../../style/swiper.min.css'
import $ from '../../plugins/zepto.min.js'
export default {
    data(){
        return {
          bannerList: []
        }
    },
    created(){
         
      

    },
    mounted(){
      getBannerList(2).then(res => {
        this.bannerList = res.data.data;
      }).then(res => {
        $('.swiper-container, .swiper-container img')
            .css('height', $(document).width()/720*276);

        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true
        });
      })

    },
    components: {
    },
    methods: {

    },
    props:[],
    mixins: [],
}

</script>
<style lang="scss" scoped>

.main_nav {
  position: relative
}

.swiper-pagination{
  position:absolute;
  left:0;
  text-align:center;
  bottom:5px;
  width:100%;
  z-index:99
}

</style>


