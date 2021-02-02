<template>
	<view class="transaction">
		<HomeNavbar title="交易中心"></HomeNavbar>
		<scroll-view @scrolltolower="lower" :scroll-y="true" class="content srcoll-y">

			<!-- <UserTabs :tabs="tabs"></UserTabs> -->

			<view class="content_bottom">
				<view class="leijishouyi" v-if="current == 0">
					<view class="top">
						<view class="top_1">
							<view class="left_1">可提现 元</view>
							<view class="right_1" @click="tixian">立即提现</view>
						</view>
						<view class="bottom">
							{{user.user_money || 0.00}}
						</view>
					</view>
					<view class="bottom_1">
						<view class="list">
							<view class="list_item" @click="toDetail(item)" v-for="(item,index) in list1" :key="index">
								<view class="left_2">
									<view class="top_3">{{item.goods_name}}</view>  
									<view class="bottom_3">{{item.create_time}}</view>
								</view>
								<view class="right_2">
									+{{item.declaration_money}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tixanmingxi" v-if="current == 1">
					<UserDetaild :List="list1"></UserDetaild>
				</view>
			</view>
			<view class="none" v-if="show1">
				已到达底部
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import HomeNavbar from '@/components/home/home_navbar.vue'
	// import UserTabs from '@/components/user/user_tabs.vue'
	import UserDetaild from '@/components/user/user_detailed.vue'
	export default {
		components: {
			HomeNavbar,
			// UserTabs,
			UserDetaild
		},
		created() {
			uni.$on('tabChange', (index) => {
				this.current = index
				if (index == 0) {
					this.pages.page = 1
					this.list1 = []
					this.getList()
				} else if (index == 1) {
					this.pages.page = 1
					this.list1 = []
					this.getList()
				}
			})
		},
		data() {
			return {
				pages: {
					page: 1,
					page_size: 10
				},
				list1: [],
				user: {},
				tabs: [{
					name: '累计收益',
				}, {
					name: '订单明细',
				}],
				current: 0,
				show1: false
			}
		},
		onLoad() {
			this.getList()
		},
		onShow() {
			const user = uni.getStorageSync('user')
			if (user) {
				this.user = user
			}
		},
		methods: {
			async getList() {
				//获取报单列表
				const res = await this.$http({
					url: '/declaration/lists',
					data: {
						page: this.pages.page,
						page_size: this.pages.page_size
					}
				})
				const data = res[1].data
				if (data.code == 200) {
					if (data.data.length == 0 && this.pages.page == 1) {
						uni.showToast({
							title: '暂无数据',
							icon: 'none'
						})
						this.show1 = true
					} else if (data.data.length == 0 && this.pages.page != 1) {
						this.show1 = true
					}

					this.list1 = [...this.list1, ...data.data]
				}
			},
			//去提现
			tixian() {
				uni.navigateTo({
					url: '/pages/user/withdrawal/index'
				})
			},
			toDetail(item) {
				uni.setStorageSync('goodsDetail', item)
				uni.navigateTo({
					url: `/pages/user/order_detaild/index`
				})
			},
			lower() {
				const current = this.current
				switch (current) {
					case 0:
						this.pages.page += 1
						this.getList()
						break
					case 1:
						this.pages.page += 1
						this.getList()
						break
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.srcoll-y {
		height: calc(100vh - 94rpx);
	}

	.tixanmingxi {
		margin-top: 16rpx;
	}

	.content {
		border-top: 6rpx solid #dcdcdc;
		background-color: #dcdcdc;
	}

	.content_bottom {
		.top {
			background-color: #fff;
			margin-top: 16rpx;

			.top_1 {
				padding-top: 20rpx;
				display: flex;
				justify-content: center;
				position: relative;

				.left_1 {
					font-size: 30rpx;
				}

				.right_1 {
					position: absolute;
					top: 18rpx;
					right: 66rpx;
					width: 144rpx;
					height: 42rpx;
					color: #FB4040;
					border: 2rpx solid #FF0000;
					font-size: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.bottom {
				text-align: center;
				color: #FF0000;
				font-size: 60rpx;
				padding-top: 30rpx;
				padding-bottom: 46rpx;
				margin: 0 36rpx;
				border-bottom: 2rpx solid #9a9a9a;
			}
		}

		.bottom_1 {
			background-color: #fff;
			padding: 0 36rpx;

			.list {
				.list_item {
					border-bottom: 2rpx solid #9a9a9a;
					padding-top: 22rpx;
					display: flex;
					justify-content: space-between;

					.left_2 {
						font-style: PingFang-SC-Regular;

						.top_3 {
							padding-bottom: 18rpx;
							color: #333333;
							font-size: 30rpx;
						}

						.bottom_3 {
							padding-bottom: 24rpx;
							color: #666666;
							font-size: 24rpx;
						}
					}

					.right_2 {
						font-size: 48rpx;
						color: #FF0000;
						padding-top: 10rpx;
					}
				}
			}
		}
	}
</style>
