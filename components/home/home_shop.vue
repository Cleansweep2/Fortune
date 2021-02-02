<template>
	<view class="shops">
		<view class="shops_item" v-for="(item,index) in shopList">
			<view class="top">
				<view class="left">
					<view class="top_toprow">
						<image :src="item.store_logo_url" mode=""></image>
						<view class="shopName">{{item.store_name}}</view>
					</view>
					<view class="top_bottomrow">
						<view class="phone">
							联系电话:<text>{{item.store_user_phone || '暂无'}}</text>
						</view>
						<view class="address" @click="weizhi(item)">
							<text>商家地址: {{item.store_address || '暂无'}}</text><image src="@/static/images/home/plateform/dingwei.png"></image>
						</view>
					</view>
				</view>
				<view class="right">
					<view class="fraction">{{item.count}}</view>
					<view class="nickname">宝贝</view>
				</view>
			</view>
			<view class="bottom">
				<HotMini :goods-list="item.product_list"></HotMini>
			</view>
		</view>
		<view class="none" v-if="show1">
			已到达底部
		</view>
	</view>
</template>

<script>
		import HotMini from '@/components/plateform/hot_mini.vue'
		import MingPop from '@/components/ming-pop/ming-pop.vue'
		export default{
			name:'home_shop',
			data(){
				return {
					id: 0, // 使用 marker点击事件 需要填写id
					title: 'map',
					latitude: 39.909,
					longitude: 116.39742,
					covers: [{
						latitude: 39.909,
						longitude: 116.39742,
						iconPath: '../../../static/location.png'
					}, {
						latitude: 39.90,
						longitude: 116.39,
						iconPath: '../../../static/location.png'
					}]
				}
			},
			props:{
				shopList:{
					type:Array,
					default(){
						return []
					}
				},
				show1:{
					type:Boolean,
					default(){
						return false
					}
				},
			},
			components:{
				HotMini
			},
			methods:{
				weizhi(o){
					uni.navigateTo({
						url:`/pages/shop_street/map_address/index?lat=${o.lat}&lng=${o.lng}&store_name=${o.store_name}&address=${o.store_address}`
					})
				}
			}
		}
</script>

<style lang="scss" scoped>
	.shops {
		padding: 0 14rpx;
		padding-top: 16rpx;
		background-color: #DCDCDC;
	
		.shops_item {
			background-color: #fff;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.top {
				padding-left: 30rpx;
				padding-top: 8rpx;
				display: flex;
				.left {
					width: 472rpx;
	
					.top_toprow {
						display: flex;
	
						image {
							width: 92rpx;
							height: 92rpx;
							;
							border-radius: 50%;
						}
	
						.shopName {
							padding-left: 16rpx;
							display: flex;
							align-items: center;
							color: #333333;
							font-size: 24rpx;
						}
					}
					
					.top_bottomrow{
						padding-top: 12rpx;
						color: #666666;
						font-size: 20rpx;
						text{
							padding-left: 8rpx;
						}
						.address{
							padding-bottom: 8rpx;
							display: flex;
							image{
								width: 24rpx;
								height: 30rpx;
								margin-left: 4rpx;
							}
							text{
								padding-left: 0;
								flex:1;
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
								border-bottom:dashed 2rpx #FF0000;
							}
						}
					}
				}
	
				.right {
					flex: 1;
					width: 248rpx;
					display: flex;
					flex-direction: column;
					margin-top: 14rpx;
					align-items: center;
					justify-content: center;
					border-left: 2rpx solid #999999;
	
					.nickname {
						font-size: 24rpx;
						color: #666666;
					}
	
					.fraction {
						color: #333333;
						font-size: 40rpx;
					}
				}
			}
	
			.bottom {
				padding-top: 27rpx;
			}
		}
	}
</style>
