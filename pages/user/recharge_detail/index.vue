<template>
	<view class="recharge_detail">
		<HomeNavbar title="充值明细" />
		<scroll-view @scrolltolower="lower" class="scroll-y" :scroll-y="true">
			<view class="content">
				<view class="bottom_1">
					<view class="list">
						<view class="list_item" @click="toDetail" v-for="(item,index) in list" :key="index">
							<view class="left_2">
								<view class="top_3">{{item.recharge_type | type}}</view>
								<view class="bottom_3">{{item.create_time}}</view>
							</view>
							<view class="right_2">
								+{{item.recharge_money}}
							</view>
						</view>
					</view>
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
	export default {
		components: {
			HomeNavbar
		},
		data() {
			return {
				show1: false,
				pages: {
					page: 1,
					page_size: 20
				},
				list: [] //充值列表
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			async getList() {
				if(this.show1) return 
				const res = await this.$http({
					url: '/recharge/lists',
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
					this.list = [...this.list, ...data.data]
				}
			},
			lower() {
				this.pages.page += 1
				this.getList()
			}
		},
		filters: {
			type(val) {
				switch (val) {
					case 1:
						return '微信'
					case 2:
						return '支付宝'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #dcdcdc;
	}

	.content {
		margin-top: 12rpx;
	}

	.scroll-y {
		height: calc(100vh - 88rpx);
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
</style>
