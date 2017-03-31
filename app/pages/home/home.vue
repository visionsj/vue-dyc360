<template>
   
    <div class="loginContainer">
sfdf <footer-te></footer-te>
     <li v-for="todo in todos">
      {{ todo.text }}
    </li>
          <button name="button" @click.prevent="targe('')"> sdafasf
          </button>
    </div>
</template>

<script>
import {getBannerList} from '../../service/getData'
import footerTe from '../../components/footer/footer'
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
        footerTe
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


