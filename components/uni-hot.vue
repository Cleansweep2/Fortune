<template>
	<view class="hot_items" :style="{'padding-top':show?null:'0px'}">
		<view class="hot_items_box">
			<view class="hot_item" :key="index" v-for="(item,index) in goodsList">
				<view class="top" @click="toDetail(item.itemLink)">
					<image :src="item.mainPic" mode=""></image>
				</view>
				<view class="bottom">
					<view class="bottom_toprow" @click="toDetail(item.itemLink)">
						<span class="pinpai">{{item.shopType == 0 ? '淘宝' : '天猫'}}</span>
						<text class="slh des">{{item.dtitle}}</text>   
					</view>
					<view class="bottom_bottomrow">
						<view class="left">   
							<text class="price"><text>￥</text>{{item.actualPrice}}</text>
							<view class="coupon" @click="toYouhuijuan(item.couponLink)">
								{{item.couponPrice}} 元券
							</view>
						</view>
						<view class="right">
							<text class="yuan_price">原价 <text>{{item.originalPrice}}</text></text>
							<view class="volume">
								销量 {{item.monthSales}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="none" v-if="show1">
			已到达底部 
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uni-hot',
		props: {
			show1: {
				type: Boolean,
				default () {
					return false
				}
			},
			show: {
				type: Boolean,
				default () {
					return false
				}
			},
			goodsList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			toYouhuijuan(url) {
				let openUrl = url;
				// 因为 url 一般是从其它地方获取的，所以这里要将 http 和 https 删去
				// 也可以直接输入 https:// 之后的内容，则不需要此步判断，直接调用 plus.runtime.openURL
				if (url.substr(0, 5) === 'https') {
					openUrl = `taobao://${url.substr(8)}`;
				} else if (url.substr(0, 4) === 'http') {
					openUrl = `taobao://${url.substr(7)}`;
				}
				plus.runtime.openURL(openUrl, function(res) {
					uni.showModal({
						content: '本机未检测到对应客户端，是否打开浏览器访问页面？',
						success: function(res) {
							if (res.confirm) {
								plus.runtime.openURL(url);
							}
						}
					});
				})
				// 注册返回键的监听事件
				// plus.key.addEventListener("backbutton",function(){
				// 	// 跳转到淘宝首页
				// 	plus.runtime.openURL('taobao://s.taobao.com')
				// 	// 移除事件   
				// 	plus.runtime.removeEventListener("backbutton")
				// });
			},
			toDetail(url) {
				let openUrl = url;
				// 因为 url 一般是从其它地方获取的，所以这里要将 http 和 https 删去
				// 也可以直接输入 https:// 之后的内容，则不需要此步判断，直接调用 plus.runtime.openURL
				if (url.substr(0, 5) === 'https') {
					openUrl = `taobao://${url.substr(8)}`;
				} else if (url.substr(0, 4) === 'http') {
					openUrl = `taobao://${url.substr(7)}`;
				}
				plus.runtime.openURL(openUrl, function(res) {
					uni.showModal({
						content: '本机未检测到对应客户端，是否打开浏览器访问页面？',
						success: function(res) {
							if (res.confirm) {
								plus.runtime.openURL(url);
							}
						}
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.none {
		text-align: center;
		width: 100%;
		padding: 10rpx;
		font-size: 23rpx;
		font-weight: 400;
		color: #999999;
	}

	.hot_items {
		background-color: #dcdcdc;

		.hot_items_box {
			padding: 32rpx 46rpx 0 46rpx;
			flex-wrap: wrap;
			display: flex;
			justify-content: space-between;
		}

		.hot_item {
			padding-bottom: 30rpx;

			.top {
				width: 320rpx;
				height: 270rpx;
				position: relative;
				background-color: #fff;
				border-radius: 20rpx 20rpx 0rpx 0rpx;

				image {
					border-radius: 20rpx 20rpx 0rpx 0rpx;
					width: 100%;
					height: 100%;
				}
			}
			.bottom {
				// height: 139rpx;
				background-color: #fff;
				border-radius: 0 0 20rpx 20rpx;
				padding-bottom: 14rpx;

				.bottom_toprow {
					padding-top: 7rpx;
					padding-left: 11rpx;
					display: flex;
					align-items: center;

					.pinpai {
						background-color: #FF0000;
						padding: 0 5rpx;
						font-size: 20rpx;
						color: #FFFFFF;
						border-radius: 8rpx;
					}

					.des {
						padding-left: 14rpx;
						width: 250rpx;
						font-size: 24rpx;
						padding-left: 19rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}

				.bottom_bottomrow {
					padding: 0 12rpx;
					margin-top: 10rpx;
					display: flex;
					//justify-content: space-between;
					flex-direction: column;

					.left {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.price {
							font-size: 30rpx;
							color: #F00000;
							padding-bottom: 8rpx;

							text {
								font-size: 14rpx;
							}
						}

						.coupon {
							display: flex;
							align-items: center;
							font-size: 20rpx;
							color: #fff;
							background-image: linear-gradient(#FC4947, #FF8764);
						}
					}

					.right {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.yuan_price {
							padding-left: 7rpx;
							padding-right: 10rpx;
							display: flex;
							align-items: center;
							height: 25rpx;
							border-radius: 8rpx;
							background-color: #F43A3A;
							color: #fff;
							font-size: 20rpx;

							text {
								padding-left: 10rpx;
								text-decoration: line-through;
							}
						}

						.volume {
							padding-top: 6rpx;
							color: #999;
							font-size: 20rpx;
						}
					}
					// .left{
					// 	display:flex;
					// 	flex-direction: column;
					// 	.price{
					// 		font-size: 30rpx;
					// 		color:#F00000;
					// 		padding-bottom: 8rpx;
					// 		text{
					// 			font-size: 14rpx;
					// 		}
					// 	}
					// 	.yuan_price{
					// 		padding-left: 7rpx;
					// 		padding-right: 10rpx;
					// 		display: flex;
					// 		align-items: center;
					// 		height:25rpx;
					// 		border-radius:8rpx;
					// 		background-color: #F43A3A;
					// 		color:#fff;
					// 		font-size:20rpx;
					// 		text{
					// 			padding-left: 10rpx;
					// 		}
					// 	}
					// }
					// .right{
					// 	align-items: center;
					// 	display: flex;
					// 	flex-direction: column;
					// 	justify-content: center;
					// 	padding-top: 10rpx;
					// 	.coupon{
					// 		display: flex;
					// 		align-items: center;
					// 		font-size: 20rpx;
					// 		color:#fff;
					// 		background-image: linear-gradient(#FC4947,#FF8764);
					// 	}
					// 	.volume{
					// 		padding-top: 6rpx;
					// 		color:#999;
					// 		font-size:20rpx;
					// 	}
					// }
				}
			}
		}
	}
</style>
