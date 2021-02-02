<template>
	<view class="navbar">
		<icon @click="back" type="" class="iconfont icon-huise"></icon>
		<view class="name">{{title}}</view>
		<image v-if="isShow" @click="toChongzhi" src="@/static/images/home/liquor/qita.png"></image>   
		<image @click="setShow" v-if="isShow1 && !show2" src="@/static/images/user/shop_admin/edit.png"></image>   
		<image @click="setShow" v-if="isShow1 && show2" src="@/static/images/user/shop_admin/edit_active.png"></image>   
	</view>
</template>

<script>
	export default {
		name:'home_nav',
		props:{
			title:String,
			isShow:{
				type:Boolean,
				default(){
					return false
				}
			},
			isShow1:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		data(){
			return {
				show2:false
			}
		},
		methods:{
			setShow(){   
				this.show2 = !this.show2
				if(this.show2 == false){
					uni.$emit('setShow',false)
				}else{
					uni.$emit('setShow',true)
				}
			},
			back(){
				uni.navigateBack({})
			},
			toChongzhi(){
				uni.navigateTo({
					url:'/pages/user/recharge_detail/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar{
		height: 88rpx;
		width: 100%;
		background-color: #fff;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.name{
			position: absolute;
			left: 50%;
			top:50%;
			transform: translate(-50%,-50%);
			font-size: 36rpx;
			color:#333333;
			position: absolute;
		}
	}
	.iconfont{
		font-size: 41rpx;
		width: 40rpx;
		padding-left: 22rpx;
		height: 100%;
		line-height: 88rpx;
	}
	image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 22rpx;
	}
</style>
