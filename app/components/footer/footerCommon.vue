<template>
<footer>
	<div class="nav-bar">
		<router-link 
		:class="$route.path.indexOf('home') !== -1? 'nav-bar-wrap active':'nav-bar-wrap'" 
		:to="'/home'">
			<p class="nav-bar-content nb0">精品</p>
		</router-link>

		<router-link 
		:class="$route.path.indexOf('invest') !== -1? 'nav-bar-wrap active':'nav-bar-wrap'"
		:to="'/invest'">
			<p class="nav-bar-content nb1">产品</p>
		</router-link>
		<router-link 
		:class="$route.path.indexOf('usersMain') !== -1? 'nav-bar-wrap active':'nav-bar-wrap'"
		:to="'/usersMain'">
			<p class="nav-bar-content nb2">我的</p>
		</router-link>
		<router-link 
		:class="$route.path.indexOf('more') !== -1? 'nav-bar-wrap active':'nav-bar-wrap'"
		:to="'/more'">
			<p class="nav-bar-content nb3">更多</p>
		</router-link>
	</div>
</footer>
</template>
<script>
    export default {
    	data(){

            return {
                
            }
        },
        created(){
           
        },
        mounted(){
    
        },
        computed: {
         
        },
        methods: {
        
        },

    }

</script>
<style lang="scss" scoped>
footer {
	width: 100%;
	height: 50px;
}

footer .nav-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background: #22354b;
	z-index: 99
}

footer .nav-bar .nav-bar-wrap {
	float: left;
	width: 25%;
	height: 47px;
	padding-top: 4px;
}

footer .nav-bar .nav-bar-wrap.active {
	background: #263c54;
}

footer .nav-bar .nav-bar-wrap .nb0 {
	background: url('../../images/index/rem_ico.png') 9px 0 no-repeat;
}

footer .nav-bar .nav-bar-wrap.active .nb0 {
	background: url('../../images/index/rem_ico_active.png') 9px 0 no-repeat;
}

footer .nav-bar .nav-bar-wrap .nb1 {
	background: url('../../images/index/pro_ico.png') 9px 0 no-repeat;
}

footer .nav-bar .nav-bar-wrap.active .nb1 {
	background: url('../../images/index/pro_ico_active.png') 9px 0 no-repeat;
}

footer .nav-bar .nav-bar-wrap .nb2 {
	background: url('../../images/index/peo_ico.png') 9px 0 no-repeat;
}

footer .nav-bar .nav-bar-wrap.active .nb2 {
	background: url('../../images/index/peo_ico_active.png') 9px 0 no-repeat;
}

footer .nav-bar .nav-bar-wrap .nb3 {
	background: url('../../images/index/more_ico.png') 9px 0 no-repeat;
}

footer .nav-bar .nav-bar-wrap.active .nb3 {
	background: url('../../images/index/more_ico_active.png') 9px 0 no-repeat;
}

footer .nav-bar .nav-bar-wrap .nav-bar-content {
	width: 40px;
	height: 15px;
	padding-top: 27px;
	margin: 0 auto;
	color: #6e90aa;
	font-size: 12px;
	text-align: center;
	background-size: 22px auto;
}

footer .nav-bar .nav-bar-wrap.active .nav-bar-content {
	color: #fff !important;
	background-size: 22px auto !important;
}

</style>