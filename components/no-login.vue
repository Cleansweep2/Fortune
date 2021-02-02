<template>
	<view class="no_login">
		<view class="left">
			<image src="@/static/images/home/determine.png"></image>
			<view>马上登陆,开启你的购物体验</view>
		</view>
		<image @click="login" src="@/static/images/home/yijian_login.png"></image>
	</view>
</template>

<script>
	export default {
		name:'no-login',
		data(){
			return {
				
			}
		},
		methods:{
			login(){
				uni.navigateTo({
					url:'/pages/login/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no_login{
		position: absolute;
		bottom:0;
		display: flex;
		width: 100%;
		height: 90rpx;
		background-color: rgba(0,0,0,.4);
		justify-content: space-between;
		padding-left: 28rpx;
		padding-right: 41rpx;
		align-items: center;
		.left{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color:#fff;
			view{
				padding-left: 16rpx;
			}
			image{
				width: 37rpx;
				height:48rpx;
			}
		}
			image{
				width: 188rpx;
				height: 48rpx;
			}
	}
</style>
