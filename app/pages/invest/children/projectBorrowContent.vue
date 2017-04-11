<template>  
<div id="content" style="margin-top: -.5rem">

</div>
</template>

<script>
import Vue from 'vue'
import {getBorrowDetail} from '../../../service/getData'
import '../../../style/custom.css' 


export default {
    data() {
        return {
        }
    },
    created() {

    },
    mounted() {
       this.initData();
    },
    components: {
    },
    methods: {
        async initData(){
            let resBorrow = await getBorrowDetail(this.$route.query.borrowNo);
            document.getElementById('content').innerHTML = resBorrow.data.data.description
        }
               
    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scoped="">
    #content{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f1f1f1;
        z-index: 999999;
        overflow-y: auto;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
</style>