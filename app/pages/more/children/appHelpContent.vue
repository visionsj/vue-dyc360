<template> 

<section class="bzxx_nei">
    <h2 class="bzxx_nei_h2">{{detail.name}}</h2>
    <div id="content" class="news_content"></div>
</section>

</template>

<script>
import Vue from 'vue'
import {getArticle} from '../../../service/getData'
export default {

  data() {
    return {
      detail: {}
    }
  },
  created() {

  },
  mounted() {
    this.initData()
  },
  components: {
    
  },
  computed:{
     
  },
  methods: {
    async initData(){
      let res = await getArticle(this.$route.query.id);
      this.detail = {...res.data.data}
      document.getElementById('content').innerHTML = res.data.data.content
    },
  },
  
  props: [
  ],

  mixins: [

  ]
}
</script>
</script>
<style lang="scss" scoped="">
    .bzxx_nei{
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
    .bzxx_nei{
        width:100%;
        float:left;
        padding: 0 2%;
    }
    .bzxx_nei_h2{
        width:100%;
        font-size: .8rem;
        overflow:hidden;
        margin: .7rem 0;
        text-align:center
    }

  
</style>