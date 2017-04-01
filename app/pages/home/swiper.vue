<template>
<div class="loginContainer">
<app-down></app-down>
 <li v-for="todo in todos">
  {{ todo.text }}
</li>
      <button name="button" @click.prevent="targe('')"> sdafasf
      </button>
<footer-common></footer-common>
</div>
</template>


<script>
import {getBannerList} from '../../service/getData'
import footerCommon from '../../components/footer/footerCommon'
import appDown from '../../components/common/appDown'

export default {
    data(){
        return {
            todos: [
              { text: '1ssssss' },
              { text: '2test' },
              { text: '3' }
            ]
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.sig = this.$route.query.sig;
    },
    mounted(){
        this.initData();
    },
    components: {
        appDown,
        footerCommon,
    },
    methods: {
         async initData(){
            await getBannerList(2);
         }
    },
    props:[],
    mixins: [],
}

</script>
<style  scoped>
/*    @import '../../style/index';
    @import '../../style/custom';*/


</style>


