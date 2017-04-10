<template>  
<div class="more_detail_page">

  <div class="register_form" id="page">
      <div style="padding: 0 3% 0;margin-bottom: 20px; background: #fff">
        <ul>
          <li v-if="accountInfo.tradePasswordStatus == 1">
            <label class="reg_text_2 ft14">支付密码 </label>
            <input type="password" v-model="tradePassword"  maxlength="20"  class="reg_text ft14" placeholder="支付密码为6位数字" />
          </li>
          <li v-if="accountInfo.tradePasswordStatus == 1">
            <label class="reg_text_2 ft14">重复密码</label>
            <input type="password" v-model="re_tradePassword"  maxlength="20"  class="reg_text ft14" placeholder="请再次输入支付密码" />
          </li> 

          <li v-if="accountInfo.tradePasswordStatus != 1">
            <label class="reg_text_2 ft14">当前密码 </label>
            <input type="password" v-model="oldTradePassword"  maxlength="20"  class="reg_text ft14" placeholder="支付密码为6位数字" />
          </li>
          <li v-if="accountInfo.tradePasswordStatus != 1">
            <label class="reg_text_2 ft14">新支付密码</label>
            <input type="password" v-model="newTradePassword"  maxlength="20"  class="reg_text ft14" placeholder="请再次输入支付密码" />
          </li>
          <li v-if="accountInfo.tradePasswordStatus != 1">
            <label class="reg_text_2 ft14">重复密码</label>
            <input type="password" v-model="re_newTradePassword"  maxlength="20"  class="reg_text ft14" placeholder="请再次输入支付密码" />
          </li>

        </ul>
      </div>
    <div id="btn">
      <button class="common_btn" id="set_pwd" @click="modifyPassword(accountInfo.tradePasswordStatus)">确认修改</button>
    </div>
  </div>


  <alert-tip v-if="showAlert" @closeTip="reuturnSet" :alertText="alertText" :showAlertIcon="showAlertIcon=false"></alert-tip>

</div>
</template>

<script>
import Vue from 'vue'
import {getUserAccountInfo,setTradePassword, modifyTradePassword} from '../../../../service/getData'
import {MD5} from '../../../../plugins/md5'
import alertTip from '../../../../components/common/alertTip'
import '../../../../style/custom.css' 

export default {
  data() {
    return {
      accountInfo: {},
      tradePassword: null,
      re_tradePassword: null,
      oldTradePassword: null,
      newTradePassword: null,
      re_newTradePassword: null,
      showAlert: false, 
      alertText: null, 
    }
  },
  created() {

  },
  mounted() {
    this.initData()
  },
  components: {
    alertTip,
  },
  computed:{

  },
  methods: {
    async initData(){
      let res = await getUserAccountInfo();
      this.accountInfo = {...res.data.data};
    },
    async modifyPassword(type){
      if(type == 1){
        if(!this.tradePassword){
          this.showAlert = true;
          this.alertText = "请输入支付密码";
          return;
        }else if(!this.re_tradePassword){
          this.showAlert = true;
          this.alertText = "请输入重复密码";
          return;
        }else if(this.tradePassword != this.re_tradePassword){
          this.showAlert = true;
          this.alertText = "两次密码不一样";
          return;
        }
        setTradePassword(MD5(this.tradePassword)).then(res => {
          if(res.data.retCode == "1"){
            this.showAlert = true;
            this.alertText = "设置支付密码成功"
          }else{
            this.showAlert = true;
            this.alertText = res.data.retMsg
          }
        })
      }else{
        if(!this.oldTradePassword){
          this.showAlert = true;
          this.alertText = "请输入当前支付密码";
          return;
        }else if(!this.newTradePassword){
          this.showAlert = true;
          this.alertText = "请输入新密码";
          return;
        }else if(this.newTradePassword != this.re_newTradePassword){
          this.showAlert = true;
          this.alertText = "两次密码不一样";
          return;
        }
        modifyTradePassword(MD5(this.oldTradePassword), MD5(this.newTradePassword)).then(res => {
          if(res.data.retCode == "1"){
            this.showAlert = true;
            this.alertText = "修改支付密码成功"
          }else{
            this.showAlert = true;
            this.alertText = res.data.retMsg
          }
        })
      }
    },
    async reuturnSet(){
      if(this.alertText == "修改支付密码成功"){
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

</style>