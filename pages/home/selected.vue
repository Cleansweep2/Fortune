<template>
	<view class="selected">
		
		<carousel :img-list="swiperList" url-key="url" @selected="selectedBanner" />
		<view class="fali_row">
			<view class="fali_item" v-for="(item,i) in falilist" :key="i" @click="goShop(item.name,i)">
				<image style="width:62rpx" :src="item.imgUrl" mode=""></image>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="taps">
			<view class="left">
				<view class="text">
					<text>精品特惠</text>
					<text>特色精美</text>
				</view>
				<image src="@/static/images/home/weiyi.png"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="text">
						<text>好吃零食</text>
						<text>好吃便宜</text>
					</view>
					<image src="@/static/images/home/jianguo.png"></image>
				</view>
				<view class="bottom">
					<view class="text">
						<text>热门店铺</text>
						<text>更多优惠</text>
					</view>
					<image src="@/static/images/home/zhenzi.png"></image>
				</view>
			</view>
		</view>
		<view class="like_line">
			<text class="like_line_text">
				猜你喜欢
			</text>
		</view>
		<!-- 喜欢 -->
		<UniHot :show1="show1" :goods-list="goodsList" :show="true"></UniHot>
	</view>
</template>



<script>
	import UniHot from '@/components/uni-hot.vue'
	import Carousel from '@/components/vear-carousel/vear-carousel.vue'
	export default {
		components: {
			UniHot,
			Carousel,
		},
		props: {
			show1:{
				type:Boolean,
				default(){
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
				loading:true,
				swiperList: [],
				falilist: [{
						name: '淘宝',
						imgUrl: require('@/static/images/home/taobao.png')
					},
					{
						name: '99特卖',
						imgUrl: require('@/static/images/home/99.png')
					},
					{
						name: '自营商店',
						imgUrl: require('@/static/images/home/goods.png')
					},
					{
						name: '店铺街',
						imgUrl: require('@/static/images/home/shop.png')
					},
				],
			}
		},
		created(){
			this.getSwiperList()
			uni.$on('refreshSwiper',async ()=>{
				await this.getSwiperList(true)
			})
		},
		methods: {
			async getSwiperList(isshow = false) {
				const res = await this.$http({
					url: '/ad/lists'
				},isshow)
				this.swiperList = res[1].data.data
			},
			goShop(platformName, index) {
				uni.navigateTo({
					url: `/pages/home/platform/index?platformName=${platformName}&index=${index}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.selected {}

	.swiper {
		height: 310rpx;

		.swiper-item {
			width: 100%;
			height: 100%;
			padding: 0;

			.swiper_in {
				display: flex;
				justify-content: center;

				.img {
					width: 680rpx;
					height: 310rpx;
					background: #007AFF;
					border-radius: 20rpx;
				}

				image {
					width: 680rpx;
					height: 310rpx;
				}
			}
		}
	}

	.fali_row {
		padding: 0 20rpx;
		display: flex;
		margin-top: 61rpx;
		width: 100%;
		justify-content: space-between;

		.fali_item {
			//padding:0 42.5rpx;
			width: 25%;
			flex: 1;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			&:nth-last-of-type(1) {
				padding-right: 0;
			}

			&:nth-last-of-type(4) {
				padding-left: 0;
			}

			view {
				padding-top: 19rpx;
				color: #151515;
			}

			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}

	.taps {
		margin-top: 35rpx;
		padding: 0 20rpx;
		display: flex;
		padding-bottom: 21rpx;

		.left {
			background-color: #FFC6C8;
			width: 258rpx;
			height: 275rpx;
			border-radius: 20.4rpx;
			position: relative;

			.text {
				position: absolute;
				top: 30rpx;
				left: 19rpx;
				display: flex;
				flex-direction: column;

				text:nth-last-of-type(1) {
					font-size: 30rpx;
					color: #151515;
				}

				text:nth-of-type(2) {
					margin-top: 20rpx;
					font-size: 18rpx;
					color: #151515;
				}
			}

			image {
				position: absolute;
				width: 140rpx;
				height: 190rpx;
				top: 79rpx;
				right: 4rpx;
			}
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding-left: 19rpx;

			image {}

			.top,
			.bottom {
				width: 427rpx;
				height: 130rpx;
				position: relative;

				&:nth-of-type(1) {
					image {
						width: 120rpx;
						height: 85rpx;
						position: absolute;
						top: 23rpx;
						right: 28rpx;
					}
				}

				&:nth-of-type(2) {
					image {
						width: 108rpx;
						height: 122rpx;
						position: absolute;
						top: 1rpx;
						right: 25rpx;
					}
				}
			}

			.text {
				position: absolute;
				display: flex;
				flex-direction: column;
				left: 24rpx;
				// bottom:35rpx;
				top: 30rpx;

				text:nth-of-type(1) {
					color: #151515;
					font-size: 30rpx;
				}

				text:nth-of-type(2) {
					margin-top: 19rpx;
					color: #151515;
					font-size: 18rpx;
				}
			}

			.top {
				background-color: #C6F0FF;
				border-radius: 20.4rpx;
			}

			.bottom {
				border-radius: 20.4rpx;
				background-color: #FFDEA3;
				margin-top: 14rpx;
			}
		}
	}

	.like_line {
		padding-top: 21rpx;
		position: relative;
		display: flex;
		justify-content: center;
		background-color: #DCDCDC;

		.like_line_text {
			font-size: 24rpx;
			color: #F43A3A;
			position: relative;

			&::after {
				content: '';
				display: block;
				position: absolute;
				width: 153rpx;
				left: 126rpx;
				top: 12rpx;
				border-bottom: 5rpx solid #F43A3A;
			}

			&::before {
				content: '';
				display: block;
				position: absolute;
				width: 153rpx;
				top: 12rpx;
				right: 126rpx;
				border-bottom: 5rpx solid #F43A3A;
			}
		}
	}
</style>
