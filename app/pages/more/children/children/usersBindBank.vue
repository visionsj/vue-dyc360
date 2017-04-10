<template>  
<div class="more_detail_page">
  <div class="bg_icon" id="page">
    <div class="login_form" id="register" style="margin-bottom: 20px;">
      <ul>
        <li class="borrow_f_t w100 mg0">
          <span class="fl ft14 ftbl w20">银行卡 &nbsp;</span>
          <span class="fl w80">
            <input type="text" v-model="cardNo" onkeyup="value=value.replace(/[^0-9Xx]/g,'')" autocomplete="off" class="w100" placeholder="请输入银行卡" />
          </span>
        </li>
      </ul>
    </div>

    <div id="btn">
      <input type="button" id="bind_bank" class="common_btn" value='添加银行卡' @click="bindCard">
    </div>
 </div>

  <alert-tip v-if="showAlert" @closeTip="reuturnSet" :alertText="alertText" :showAlertIcon="showAlertIcon=false"></alert-tip>

</div>
</template>

<script>
import Vue from 'vue'
import {bindCardAuth} from '../../../../service/getData'
import alertTip from '../../../../components/common/alertTip'
import '../../../../style/custom.css' 

export default {
  data() {
    return {
      cardNo: null,
      showAlert: false, 
      alertText: null, 
    }
  },
  created() {

  },
  mounted() {
  },
  components: {
    alertTip,
  },
  computed:{

  },
  methods: {
    async bindCard(){
      bindCardAuth(this.cardNo).then(res => {
        if(res.data.retCode == "1"){
          this.showAlert = true;
          this.alertText = "绑定银行卡成功"
        }else{
          this.showAlert = true;
          this.alertText = res.data.retMsg
        }
      })
    },
    async reuturnSet(){
      if(this.alertText == "绑定银行卡成功"){
        this.showAlert = false;
        this.$router.replace({path: "/more/usersSet", query:{'reload':true}});
      }else{
        this.showAlert = false;
      }
    }
  },
  
  props: [
  ],

  mixins: [
    
  ]
}
</script>
<style lang="scss" scoped="">
    .more_detail_page{
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
  .login_form {
    margin-top: 10px;
  }
  .login_form li {
    line-height: 40px; 
    display: inline-block
  }
  .login_form li input { 
    height: 38px; 
    font-size: 14px; 
    border: none
  }

</style>