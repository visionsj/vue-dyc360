<template>
<transition name="fade">
	<div class="app-download" v-if="close">
		<span class="app-download-close" @click="closeAppDown()"></span>
		<div class="app-download-content">
			<router-link :to="'/download_app'">
				<span class="app-download-btn common_btn">下载app</span>
				<span class="app-download-ico"><img src="../../images/wxd_03.png" height="41"> </span>
				<p class="app-download-detail mg0">中国家庭首选<br>稳健型理财平台！</p>
			</router-link>
		</div>
	</div>
</transition>
</template>
<script>
    export default {
    	data(){
            return {
                close: true
            }
        },
        created(){
           
        },
        mounted(){
    
        },
        computed: {
         
        },
        methods: {
       		async closeAppDown() {
				this.close = false
       		}
        },

    }

</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.app-download {
	width: 100%;
	height: 60px;
	background: #fff;
	z-index: 999999;
}

.app-download-detail {
	float: left;
	width: 140px;
	padding: 10px 0 0 10px;
	color: #555;
	line-height: 20px;
	text-align: left;
	font-size: 14px;
	overflow: hidden;
	word-break: break-all;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.app-download-close {
	display: inline-block;
	padding: 0 10px 10px;
	width: 12px;
	height: 12px;
	position: absolute;
	top: 23px;
	left: 0;
	cursor: pointer;
	background: url(../../images/app-download-close.png) no-repeat;
	background-size: 12px 12px;
	background-position: 10px 0;
}

.app-download-content {
	display: block;
	height: 60px;
	cursor: pointer;
}

.app-download-content a {
	font-weight: normal;
}

.app-download-btn {
	float: right;
	margin: 10px 10px 0 0;
	padding: 8px;
	display: inline-block;
	background: #fb793a;
	font-weight: normal;
	border: none;
	color: #fff;
	text-align: center;
	border-radius: 4px;
	font-size: 15px;
}

.app-download-btn:hover {
	background: #ff5f11
}

.app-download-ico {
	float: left;
	margin: 9px 0 0 30px;
}

</style>