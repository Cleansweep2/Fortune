<template>
	<view class="recharge">
		<HomeNavbar title="充值" :is-show="true"></HomeNavbar>
		<view class="content">
			<view class="content_top">
				<view class="row_1">
					<view class="top">
						可使用金额 : {{user.user_money}}
					</view>
					<view class="bottom">
						<view class="left">￥</view>
						<view ckass="right">
							<input @input="changInput" placeholder="请输入充值金额" />
						</view>
					</view>
				</view>
			</view>

			<view class="content_middle">
				<view class="title">选择支付</view>
				<view class="pay_type">
					<view class="wx">
						<view class="left">
							<image src="@/static/images/user/recharge/wx.png"></image>
							<text>微信支付</text>
						</view>
						<view class="right"> <label class="radio">
								<radio @click="change(1)" value="r1" :checked="cheaced == 1" /></label></view>
					</view>
					<view class="zfb">
						<view class="left">
							<image src="@/static/images/user/recharge/zfb.png"></image>
							<text>支付宝支付</text>
						</view>
						<view class="right"> <label class="radio">
								<radio value="r1" @click="change(2)" :checked="cheaced == 2" /></label></view>
					</view>
				</view>
			</view>

			<view class="content_bottom" @click="pay">
				确定支付 
			</view>  
		</view>  
	</view>
</template>

<script>
	/*充值页面*/
	import HomeNavbar from '@/components/home/home_navbar.vue'
	export default {
		components: {
			HomeNavbar
		},
		data() {
			return {
				cheaced: '',
				recharge_money: 0,
				user:{}
			}
		},
		onLoad(){
			const user = uni.getStorageSync('user')
			this.user = user
		},
		methods: {
			changInput(e) {
				this.recharge_money = e.detail.value
			},
			change(index) {
				this.cheaced = index
			},
			async pay() {
				const cheaced = this.cheaced
				const recharge_money = this.recharge_money
				if (recharge_money <= 0) {
					return uni.showToast({
						title: '充值金额大于零',
						icon: 'none'
					})
				}
				if (!cheaced) {
					return uni.showToast({
						title: '请选择你的充值方式',
						icon: 'none'
					})
				}
				//获取订单号
				const res = await this.$http({
					method:'post',
					url: '/recharge/recharge',
					data: {
						recharge_money
					}
				})
				const data = res[1].data
				let order_number
				if (data.code == 200) {
					order_number = res[1].data.data.order_number
				}else{  
					uni.showToast({
						title:'系统繁忙',
						icon:'none'
					})
					return
				}  
				
				let provider = ''
				if(this.cheaced == 1){
					provider = 'wxpay'
				}else if(this.cheaced == 2){
					provider = 'alipay'
				}
				//支付
				const res1 = await this.$http({
					method:'post',
					url: '/recharge/pay',
					data: {
						order_number,
						recharge_type: this.cheaced
					}
				})
				const data1 = res1[1].data
				if (data1.code == 200) {
					uni.requestPayment({
						// 支付方式
						provider,  
						// 订单内容
						orderInfo: data1.data,
						//支付成功
						success: (res) => {
							uni.showToast({
								title: '支付成功'
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/user/index'
								})
							},500)
						},
						//支付失败
						fail: (err) => {
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: '系统繁忙',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #DCDCDC;
	}

	.content {
		padding: 34rpx 30rpx 0 30rpx;

		.content_top {
			width: 690rpx;
			padding: 36rpx 26rpx 43rpx 26rpx;
			height: 270rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.row_1 {
				width: 100%;
				height: 202rpx;
				background-color: #F7F7F7;

				.top {
					padding: 26rpx;
					color: #222222;
					font-size: 24rpx;
				}

				.bottom {
					padding-left: 24rpx;
					display: flex;
					align-items: center;
					margin-top: 14rpx;

					.left {
						font-size: 48rpx;
						margin-right: 32rpx;
					}

					input {
						font-size: 32rpx;
					}
				}
			}

			.row_2,
			.row_3 {
				margin-top: 8rpx;
				width: 100%;
				height: 88rpx;
				background-color: #F7F7F7;
				align-items: center;
				display: flex;
				padding: 0 28rpx;

				.left {
					font-size: 32rpx;
					color: #222222;
				}

				input {
					font-size: 32rpx;
				}
			}

			.row_2 {
				.left {
					margin-right: 96rpx;
				}
			}

			.row_3 {
				.left {
					margin-right: 64rpx;
				}
			}
		}

		.content_middle {
			margin-top: 24rpx;
			width: 690rpx;
			height: 348rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.title {
				padding: 28rpx 42rpx 38rpx 42rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #222222;
			}

			.pay_type {
				padding: 0 26rpx;

				.wx,
				.zfb {
					display: flex;
					justify-content: space-between;
					padding: 0 22rpx;
					align-items: center;
					height: 88rpx;
					background-color: #f7f7f7;

					.left {
						display: flex;
						justify-content: center;
						align-items: center;

						text {
							padding-left: 28rpx;
						}
					}

					&.zfb {
						margin-top: 8rpx;
					}
				}
			}

			image {
				width: 68rpx;
				height: 60rpx;
			}
		}

		.content_bottom {
			width: 100%;
			height: 90rpx;
			border-radius: 32rpx;
			background: #FD381E;
			text-align: center;
			line-height: 90rpx;
			color: #fff;
			font-size: 36rpx;
			margin-top: 32rpx;
		}
	}
</style>
