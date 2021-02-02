<template>
	<view class="list">
		<view class="list_item" :key="index" v-for="(item,index) in List">
			<view class="item_in">
				<view class="row_1">
					<view class="left">
						<text>用户名</text>: {{item.username}}
					</view>
					<view class="right">
						{{item.create_time}}
					</view>
				</view>
				<view class="row_2">
					<view class="left"><text>商品名</text>: {{item.goods_name}}</view>
					<view class="right"><text>金额: {{item.declaration_bus}}</text></view>
				</view>
				<view class="row_3">
					<view class="left">
						发票:
					</view>
					<view class="right" @click="previewOpen(item.receipt)">
						<image :src="item.receipt"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <previewImage ref="previewImage" :opacity="0.8" :imgs="imgs" :descs="descs" @longPress="longPress"></previewImage> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: []
			}
		},
		props: {
			List: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			// 图片预览
			previewOpen(receipt) {
				uni.previewImage({
					current: receipt,
					urls:[receipt]
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		background-color: #fff;

		.list_item {
			height: 332rpx;
			width: 100%;
			padding: 22rpx 42rpx 0 42rpx;

			.item_in {
				height: 100%;
				border-bottom: 2rpx solid #9A9A9A;

				.row_1 {
					display: flex;
					justify-content: space-between;

					.left {
						font-size: 30rpx;
						font-weight: 400;
						color: #333333;
					}

					.right {
						font-size: 20rpx;
						font-weight: 400;
						color: #666666;
					}
				}

				.row_2 {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						padding-top: 16rpx;
						font-size: 30rpx;
						font-weight: 400;
						color: #333333;
					}
					.right{
						font-size: 30rpx;
						font-weight: 400;
						color: #333333;
					}
				}

				.row_3 {
					padding-top: 16rpx;
					display: flex;
					justify-content: space-between;

					.left {
						font-size: 30rpx;
						font-weight: 400;
						color: #333333;
					}

					.right {
						image {
							width: 551rpx;
							height: 181rpx;
							background: #FD9A7D;
						}
					}
				}
			}
		}
	}
</style>
