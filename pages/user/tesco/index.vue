<template>
	<view class="tesco">
		<HomeNavbar title="乐购中心"></HomeNavbar>
		<view class="content">
			<view class="card">
				<view class="list">
					<view class="list_item">
						<view class="item_in" @click="toInfo">
							<image src="@/static/images/user/tesco/ren.png"></image>
							<view class="right">个人资料</view>
						</view>
					</view>
					<view class="list_item">
						<view class="item_in" @click="toShiming">
							<image src="@/static/images/user/tesco/v.png"></image>
							<view class="right">实名认证</view>
						</view>
					</view>
					<view class="list_item">
						<view class="item_in" @click="toMingxi">
							<image src="@/static/images/user/tesco/shu.png"></image>
							<view class="right">账户明细</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//乐购中心
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
			//去实名
			toShiming() {
				uni.navigateTo({
					url: '/pages/user/real_name/index'
				})
			},
			//去个人资料
			toInfo() {
				uni.navigateTo({
					url: '/pages/user/user_info/index'
				})
			},
			//去明细
			toMingxi() {
				uni.navigateTo({
					url: '/pages/user/transaction/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {}

	.content {
		padding-top: 22rpx;
		background-color: #DCDCDC;
		height: calc(100vh - 88rpx);

		.card {
			background-color: #fff;
			border-radius: 20rpx;
			margin: 0 auto;
			height: 362rpx;
			width: 702rpx;

			.list {
				display: flex;
				flex-direction: column;
				height: 100%;

				.list_item {
					flex: 1;
					padding-left: 28rpx;
					padding-right: 42rpx;

					.item_in {
						height: 100%;
						border-bottom: 2rpx solid #9a9a9a;
						display: flex;
						align-items: center;

						image {
							width: 30rpx;
							height: 30rpx;
						}

						.right {
							padding-left: 42rpx;
							color: #333333;
							font-size: 30rpx;
						}
					}

					&:nth-of-type(3) {
						.item_in {
							border: none;
						}
					}
				}
			}
		}
	}
</style>
