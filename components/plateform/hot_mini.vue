<template>
	<view class="hot_items" :style="{'padding-top':show?null:'0px'}">
		<view class="hot_item" v-for="(item,index) in goodsList">
			<view class="top">
				<image :src="item.goods_image_url" mode=""></image>
			</view>
			<view class="bottom">
				<view class="bottom_toprow">
					<span class="pinpai">商家</span>
					<text class="slh des">{{item.goods_name}}</text>
				</view>
				<view class="bottom_bottomrow">
					<view class="left">
						<text class="price"><text>￥</text>{{item.out_price}}</text>
					</view>
					<view class="right">
						<view class="volume">
							库存{{item.goods_count}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="none" v-if="!goodsList.length">
			暂无宝贝
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goodsList:{
				type:Array,
				default(){
					return []
				}
			},
			show:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toDetail(link){
				//console.log(uni.getSystemInfoSync().platform)
				plus.runtime.launchApplication({
					name:'淘宝',  
					pname:'com.taobao.taobao',  
					scheme:'taobao://',
					extra: {
					  url: link
					}
				}, function(res) {
					uni.showModal({
						content: '本机未检测到对应客户端,是否打开浏览器访问页面',
						success: (res) => {
							if (res.confirm) {
								plus.runtime.openURL(link)
							}
						}
					})
				})
			}
		},
		filters:{
			price(val){
				return val.slice(0,val.indexOf('.'))
			}
		}
	}
</script>

<style lang="scss" scoped>
.hot_items{
		padding: 32rpx 8rpx 0 8rpx;
		display: flex;
		overflow-x: auto;
		.hot_item{
			padding: 0 5rpx 30rpx 5rpx;
			.top{
				width:228rpx;
				height:194rpx;
				box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.2);
				position: relative;
				image{
					width: 100%;
					height: 100%;
					border-radius: 20rpx  20rpx   0rpx  0rpx;
				}
			}
			.bottom{
				box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.2);
				// height: 100rpx;
				background-color: #fff;
				border-radius:0 0 20rpx 20rpx;
				.bottom_toprow{
					padding-top: 7rpx;
					padding-left: 8rpx;
					display: flex;
					align-items: center;
					padding-bottom: 6rpx;
					.pinpai{
						background-color: #FF0000;
						padding: 0 2rpx;
						font-size: 16rpx;
						color: #FFFFFF;
						border-radius: 8rpx;
					}
					.des{
						padding-left: 14rpx;
						width:150rpx;
						font-size:24rpx;
						padding-left: 19rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
				.bottom_bottomrow{
					padding: 0 8rpx;
					margin-top: 10rpx;
					display: flex;
					justify-content: space-between;
					.left{
						display:flex;
						.price{
							font-size: 24rpx;
							color:#F00000;
							padding-bottom: 8rpx;
							text{
								font-size: 14rpx;
							}
						}
					}
					.right{
						align-items: center;
						.volume{
							color:#999;
							font-size:20rpx;
						}
					}
				}
			}
		}
	}
	

</style>
