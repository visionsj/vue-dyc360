<template>
	<transition name="router-fade" mode="out-in">
    	<router-view></router-view>
    </transition>
</template>

<script>
  	export default {

  	}

</script>

<style lang="scss">
  	@import './style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .2s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>


