<template>
	<view class="withdrawal">
		<HomeNavbar title="提现"></HomeNavbar>
		<view class="content">
			<view class="content_top">
				<view class="row_1">
					<view class="top">
						可提现金额 : {{user.user_money || 0.00}}
					</view>
					<view class="bottom">
						<view class="left">￥</view>
						<view ckass="right">
							<input type="number" @input="changInput" placeholder="请输入提现金额" />
						</view>
					</view>
				</view>
				<view class="row_2" v-if="!user.bank_no">
					<view class="left">开户行</view>
					<view ckass="right">
						<input placeholder="请输入开户行" />
					</view>
				</view>
				<view class="row_3" v-if="!user.bank_name">
					<view class="left">银行卡号</view>
					<view ckass="right">
						<input placeholder="请输入银行卡号" />
					</view>
				</view>
			</view>
			<view class="toast">
				满100才可以提现, 提现金额必须为100的整数
			</view>

			<view class="content_bottom" @click="tiXian">
				提交
			</view>
		</view>
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
				user: {},
				money: ''
			}
		},
		onShow() {
			const user = uni.getStorageSync('user')
			if (user) {
				this.user = user
			}
		},
		methods: {
			async getUserDetail() {
				const res = await this.$http({
					url: '/user/detail'
				})
				const data = res[1].data
				const user = data.data
				this.user = user
			},
			changInput(e) {
				this.money = e.detail.value
			},
			async tiXian() {
				let money = this.money
				if (money <= 0) {
					return uni.showToast({
						title: '提现金额需大于100',
						icon: 'none'
					})
				}
				uni.showModal({
					content: '提现要扣除 6%的手续费是否继续提现',
					success: async (res) => {
						if (res.confirm) {  
							const res = await this.$http({
								url: '/withdraw/apply',
								method: 'POST',
								data: {
									money
								}
							})
							const data = res[1].data
							if (data.code == 200) {
								this.money = ''
								this.getUserDetail()
								uni.showToast({
									title: '提现成功'
								})
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/user/index'
									})
								},500)
							} else {
								uni.showToast({
									title: data.message,
									icon: 'none',
									duration: 2000
								})
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: calc(100vh - 96rpx);
		background-color: #DCDCDC;
		padding: 34rpx 30rpx 0 30rpx;

		.content_top {
			width: 690rpx;
			padding: 36rpx 26rpx 43rpx 26rpx;
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

		.content_bottom {
			width: 100%;
			height: 90rpx;
			border-radius: 32rpx;
			background-image: linear-gradient(#FF794F, #FF4740);
			text-align: center;
			line-height: 90rpx;
			color: #fff;
			font-size: 36rpx;
			margin-top: 32rpx;
		}
	}
	
	.toast {
		margin-top: 28rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		line-height: 30rpx;
		text-align: center;
	}
</style>
