<template>  
<div class="guid_bg" style="padding: 0; background: #fff">
    <div class="layout bggrey">
        <img src="../../images/account/ico_guid.jpg" />
    </div>
    <router-link to="/openAccountHelp" class="open_guid">
        如何开通?  <span class="fr ft14 ftgray9">查看流程 <img src="../../images/account/ico_guid_01.png" height="16" /> </span>
    </router-link>
    <div class="layout">
        <p class="ft18 ftgray">现在开户即得<font class="ftog">30元红包</font></p>
        <router-link to="/openAccountHelp" class="btn common_btn_og">开通浙商银行存管账户</router-link>
        <p class="ft12 ftgray9">提醒：开通存管账户后方可投资</p>
    </div>

</div>

</template>

<script>
import '../../style/custom.css' 

export default {
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    components: {
        
    },
    methods: {

    },
    
    props: [
    ],

    mixins: [
        
    ]
}
</script>
<style lang="scss" scope>
    .guid_bg{
        height: 100%;
        background: #fff;
    }
    .layout {
        text-align: center
    }
    .layout p, {
        margin: 25px 0
    }
    .bggrey {
        background: #efeff4
    }

    .layout img {
        max-width: 100%;
    }

    .open_guid {
        padding: 15px 3%;
        background: #efeff4;
        color: #666;
        font-size: 15px;
        border-bottom: 1px solid #c8c7cc;
        border-top: 1px solid #c8c7cc;
        display: block
    }

    .open_guid img {
        vertical-align: middle
    }

    .open_guid:active {
        color: #7c91c8
    }

    .layout .common_btn_og {
        border-radius: 8px
    }

</style>
