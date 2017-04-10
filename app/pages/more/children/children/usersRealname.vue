<template>  
<div class="more_detail_page">

  <div class="warn_info">*监管部门规定,购买理财产品需提供实名信息以确保投资安全！</div>
    <div>
      <div class="users_realname">
        <ul>
          <li>
            <label class="reg_text_2 ft14">姓名 </label>
            <input type="text" v-model="personName" maxlength="11" class="reg_text ft14" placeholder="输入真实姓名" />
          </li>
          <li style="border-bottom: none">
            <label class="reg_text_2 ft14">身份证</label>
            <input type="text" v-model="personCardNo" maxlength="24" autocomplete="off" class="reg_text ft14" placeholder="输入身份证"  />
          </li>
        </ul>
      </div>
      <div id="btn">
        <input type="button" id="realname" class="common_btn" value='立即认证' @click="realNameAuth" />
      </div>

  </div>

  <alert-tip v-if="showAlert" @closeTip="reuturnSet" :alertText="alertText" :showAlertIcon="showAlertIcon=false"></alert-tip>

</div>
</template>

<script>
import Vue from 'vue'
import {checkRealNameAuth} from '../../../../service/getData'
import alertTip from '../../../../components/common/alertTip'
import '../../../../style/custom.css' 

export default {
  data() {
    return {
      personName: null,
      personCardNo: null,
      showAlert: false, 
      alertText: null, 
    }
  },
  created() {

  },
  mounted() {
    let info = this.$route.query.info;
    if(info){
      this.showAlert = true;
      this.alertText = info
    }
  },
  components: {
    alertTip,
  },
  computed:{

  },
  methods: {
    async realNameAuth(){
      checkRealNameAuth(this.personName, this.personCardNo).then(res => {
        if(res.data.retCode == "1"){
          this.showAlert = true;
          this.alertText = "实名认证成功"
        }else{
          this.showAlert = true;
          this.alertText = res.data.retMsg
        }
      })
    },
    async reuturnSet(){
      if(this.alertText == "实名认证成功"){
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