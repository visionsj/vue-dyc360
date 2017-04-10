<template>  
<div class="more_detail_page">

  <div class="register_form" id="page">
      <div style="padding: 0 3% 0;margin-bottom: 20px; background: #fff">
        <ul>
          <li>
            <label class="reg_text_2 ft14">当前密码 </label>
            <input type="password" v-model="oldPassword"  maxlength="20"  class="reg_text ft14" placeholder="请输入当前密码" />
          </li>
          <li>
            <label class="reg_text_2 ft14">新密码</label>
            <input type="password" v-model="newPassword"  maxlength="20"  class="reg_text ft14" placeholder="密码由6-20位数字和字母组成" />
          </li>

          <li>
            <label class="reg_text_2 ft14">确认密码</label>
            <input type="password" v-model="repeatPassword" maxlength="20" class="reg_text ft14" placeholder="请再次输入密码" />
          </li>
        </ul>
      </div>
    <div id="btn">
      <button class="common_btn" id="set_pwd" @click="modifyPassword">确认修改</button>
    </div>
  </div>


  <alert-tip v-if="showAlert" @closeTip="reuturnSet" :alertText="alertText" :showAlertIcon="showAlertIcon=false"></alert-tip>

</div>
</template>

<script>
import Vue from 'vue'
import {modifyLoginPassword} from '../../../../service/getData'
import {MD5} from '../../../../plugins/md5'
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
    async modifyPassword(){
      modifyLoginPassword(MD5(this.oldPassword), MD5(this.newPassword), MD5(this.repeatPassword)).then(res => {
        if(res.data.retCode == "1"){
          this.showAlert = true;
          this.alertText = "修改密码成功"
        }else{
          this.showAlert = true;
          this.alertText = res.data.retMsg
        }
      })
    },
    async reuturnSet(){
      if(this.alertText == "修改密码成功"){
        this.showAlert = false;
        this.$router.push({path: "/more/usersSet", query:{'reload':true}});
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