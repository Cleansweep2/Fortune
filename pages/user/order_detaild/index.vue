<template>
	<view class="order_detail">
		<HomeNavbar title="订单详情"></HomeNavbar>
		<view class="top">
			<view class="list">
				<!-- <view class="list_item">
					<view class="left">陈晨</view>
					<input placeholder="13561308602" />
				</view> -->
				<view class="list_item">
					<view class="left">下单时间</view>
					<view class="right">{{item.create_time}}</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="title">订单详情</view>
			<view class="detail">
				<!-- <view class="top_1">车载无线充电算得上是所所所所所所所所所所所所所所所所所所所所所所所所所少时诵诗书所所所所所所所所所所所所</view> -->
				<view class="bottom_1">
					<view class="left_1">￥{{item.declaration_money}}</view>
					<view class="right_2">x1</view>
				</view>
			</view>
		</view>
		<view class="code">
			<image v-if="item.receipt" style="width: 100%;height: 100%;" :src="item.receipt"></image>
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
				item:{}
			}
		},
		onLoad(){
			const goodsDetail = uni.getStorageSync('goodsDetail')
			console.log(goodsDetail)
			this.item = goodsDetail
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}

	.top {
		.list {
			background-color: #fff;
			//padding: 0 24rpx 28rpx 24rpx;
			padding: 0 24rpx 0rpx 24rpx;
			.list_item {
				height: 80rpx;
				display: flex;
				align-items: center;
				border-top: 1px solid #F7F7F7;

				.left {
					margin-right: 88rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #999999;
				}

				.right {
					font-size: 28rpx;
					color: #999;
				}

				&:nth-of-type(2) {
					.left {
						margin-right: 60rpx;
					}
				}
			}
		}
	}

	.bottom {
		.title {
			font-size: 26rpx;
			font-weight: bold;
			color: #666666;
			padding: 18rpx 16rpx 18rpx 24rpx;
		}

		.detail {
			// height: 188rpx;
			background: #FFFFFF;
			padding: 0 24rpx;

			.top_1 {
				font-size: 24rpx;
				font-weight: bold;
				color: #333333;
				padding-top: 32rpx;
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.bottom_1 {
				display: flex;
				justify-content: space-between;
				padding: 24rpx 0;

				.left_1 {
					font-size: 30rpx;
					font-weight: bold;
					color: #FF3824;
				}

				.right_1 {
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
				}
			}
		}
	}

	.code {
		margin: 0 auto;
		width: 692rpx;
		height: 302rpx;
		background: #FD9A7D;
		border-radius: 10px;
		margin-top: 24rpx;
	}
</style>
