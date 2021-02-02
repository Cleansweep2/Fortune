<template>
	<view class="exclusive" ref="exclusive">
		<HomeNavbar ref="home_nav" title="专属客服"></HomeNavbar>
		<image ref="img" src="@/static/images/user/exclusive/bgc.png"></image>
	</view>
</template>

<script>
	import HomeNavbar from '@/components/home/home_navbar.vue'
	export default {
		components: {
			HomeNavbar
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	image {
		height: calc(100vh - 96rpx);
		width: 100vw;
	}
</style>
