<template>
	<view class="shop_admin">
		<HomeNavbar :is-show1="true" title="商品管理"></HomeNavbar>
		<scroll-view @scrolltolower="scrolltolower" class="scroll-y" :scroll-y="true">
			<view class="hot_items">
				<view class="hot_item" :key="index" v-for="(item,index) in goodsList">
					<view class="top">
						<image :src="item.goods_image_url" mode=""></image>
						<view v-show="isEdit" @click="select(index)" class="is_select">
							<image v-show="item.is_delete" src="@/static/images/user/xuanzhong.png"></image>
						</view>
					</view>
					<view class="bottom">
						<view class="bottom_toprow">
							<span class="pinpai">商家</span>
							<text class="slh des">{{item.goods_name}}</text>
						</view>
						<view class="bottom_bottomrow">
							<view class="left">
								<text class="price"><text>￥</text>{{item.out_price}}</text>
								<!-- <text class="yuan_price">原价 <text>{{item.in_price}}</text></text> -->
							</view>
							<view class="right">
								<view class="coupon">
									<!-- {{item.couponPrice}} 元券 -->
								</view>
								<view class="volume">
									库存 {{item.goods_count}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="none" v-if="show1">
				已到达底部
			</view>
		</scroll-view>
		<image v-show="!isEdit" @click="add" class="add" src="@/static/images/user/shop_admin/add.png"></image>
		<view v-show="isEdit" class="edit_tools">
			<view class="left">
				<view @click="quanxuan" class="is_select">
					<image v-show="isquanxuan" src="@/static/images/user/xuanzhong.png"></image>
				</view>
				<view class="all">全选</view>
			</view>
			<view class="right" @click="del">
				删除
			</view>
		</view>
	</view>
</template>

<script>
	/*商品管理*/
	import HomeNavbar from '@/components/home/home_navbar.vue'
	export default {
		components: {
			HomeNavbar
		},
		data() {
			return {
				isquanxuan: false,
				isEdit: false,
				goodsList: [],
				pages:{
					page:1,
					page_size:10
				},
				show1:false
			}
		},
		onLoad() {
			this.getList()
			uni.$on('setShow', (isEdit) => {
				this.isEdit = isEdit
			})
		},
		methods: {
			//到达底部
			scrolltolower(){
				this.pages.page += 1
				this.getList()
			},
			//获取商品
			async getList(){
				const res =  await this.$http({
					url:'/store/goodsList',
					page:this.pages.page,
					page_size:this.pages.page_size
				})
				const data = res[1].data
				if(data.code == 200){
					if(data.data.length == 0 && this.pages.page == 1){
						uni.showToast({
							title:'暂无商品',
							icon:'none'
						})
						this.show1 = true
					}else if(data.data.length == 0 && this.pages.page != 1){
						this.show1 = true
					}
					this.goodsList = [...this.goodsList,...data.data]
				}
			},
			//全选
			quanxuan() {
				this.isquanxuan = !this.isquanxuan
				if (this.isquanxuan) {
					this.goodsList.forEach((v, i) => {
						this.$set(this.goodsList[i], 'is_delete', 1)
					})
				} else {
					this.goodsList.forEach((v, i) => {
						this.$set(this.goodsList[i], 'is_delete', 0)
					})
				}
			},
			async del() {
				//要删除的商品
				let goodsList = this.goodsList.filter((v) => {
					return v.is_delete
				})
				//要删除的商品ids
				let goods_ids = goodsList.map((v)=>{
					return v.id
				})
				const res = await this.$http({
					methods:'post',
					url:'/store/goodsDel',
					data:{
						goods_ids
					}
				})
				const data = res[1].data
				if(data.code == 200){
					uni.showToast({ 
						title:'删除商品成功'
					})  
					this.pages.page = 1
					this.goodsList = []
					setTimeout(()=>{
						this.getList()
					},500)
				}else{
					uni.showToast({
						title:data.message,
						icon:'none'
					})
				}
			},
			//添加商品
			add() {
				uni.navigateTo({
					url: '/pages/user/add_goods/index'
				})
			},
			async getGoodsList() {
				const res = await this.$http({
					url: '/store/goodsType',
				})
			},
			select(index) {
				this.$set(this.goodsList[index], 'is_delete', !this.goodsList[index].is_delete)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop_admin {
		height: calc(100vh);
		background-color: #dcdcdc;
	}

	.hot_items {}

	.edit_tools {
		position: absolute;
		bottom: 0;
		width: 100vw;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 36rpx;
		background-color: #fff;

		.left {
			font-size: 30rpx;
			font-weight: 500;
			color: #333333;
		}

		.right {
			width: 250rpx;
			height: 52rpx;
			line-height: 52rpx;
			background: #FF0000;
			border-radius: 10rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
		}
	}

	.add {
		position: absolute;
		width: 150rpx;
		height: 150rpx;
		right: 40rpx;
		bottom: 124rpx;
	}

	.is_select {
		width: 40rpx;
		height: 40rpx;
		background: #FFFFFF;
		border: 2px solid #c1c1c1;
		border-radius: 50%;

		image {
			width: 42rpx;
			height: 38rpx;
		}
	}

	.scroll-y {
		height: calc(100vh - 88rpx);
	}

	.hot_items {
		background-color: #dcdcdc;
		padding: 32rpx 46rpx 0 46rpx;
		flex-wrap: wrap;
		display: flex;
		justify-content: space-between;

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

				.is_select {
					position: absolute;
					top: 0;
					right: 5rpx;
					width: 36rpx;
					height: 36rpx;
					background: #FFFFFF;
					border: 2px solid #f1f1f1;
					border-radius: 50%;

					image {
						width: 42rpx;
						height: 38rpx;
					}
				}
			}

			.bottom {
				background-color: #fff;
				border-radius: 0 0 20rpx 20rpx;
				padding-bottom: 10rpx;
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
					justify-content: space-between;
					align-items: center;
					.left {
						display: flex;
						flex-direction: column;

						.price {
							font-size: 30rpx;
							color: #F00000;
							padding-bottom: 8rpx;

							text {
								font-size: 14rpx;
							}
						}

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
							}
						}
					}

					.right {
						align-items: center;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.coupon {
							display: flex;
							align-items: center;
							font-size: 20rpx;
							color: #fff;
							background-image: linear-gradient(#FC4947, #FF8764);
						}

						.volume {
							color: #999;
							font-size: 20rpx;
						}
					}
				}
			}
		}
	}
	.edit_tools{
		.left{
			display: flex;
			.all{
				font-size: 30rpx;
				color: #333333;
				padding-left: 22rpx;
			}
		}
	}
</style>
