<template>
	<view class="transaction">
		<HomeNavbar title="交易中心"></HomeNavbar>
		<scroll-view @scrolltolower="lower" :scroll-y="true" class="content scroll-y">
			<view class="user_tabs content_top">
				<view class="user_tabs_in">
					<view @click="handleClick(index)" :style="{color:current == index?'#F43A3A':'#333333'}" class="tab" v-for="(item,index) in tabs">
						{{item.name}}
						<view class="bottom_line" v-show="current == index"></view>
					</view>
				</view>
			</view>
			<view class="content_bottom">
				<view class="leijishouyi" v-if="current == 0">
					<view class="top">
						<view class="top_1">
							<view class="left_1">可提现 (元)</view>
							<view class="right_1" @click="tixian">立即提现</view>
						</view>
						<view class="bottom">
							{{user.user_money || 0.00}}
						</view>
					</view>
					<view class="bottom_1">
						<!-- <view class="list">
							<view class="list_item" v-for="(item,index) in list1.slice(1)" :key="index">
								<view class="left_2">
									<view class="top_3">购物返利</view>
									<view class="bottom_3">{{item.change_time | time}}</view>
								</view>
								<view class="right_2">
									+ {{item.user_money}}
								</view>
							</view>
						</view> -->
					</view>
				</view>
				<view class="tixanmingxi" v-if="current == 1">
					<view class="bottom_1">
						<view class="list">
							<view class="list_item" v-for="(item,index) in list1" :key="index">
								<view class="left_2">
									<view class="top_3">银行卡提现{{item.is_success | issuccess}}</view>
									<view class="money">+{{item.withdraw_money}}</view>
								</view>
								<view class="middle">手续费扣除 {{item.withdraw_sub}} 实到 {{item.final_money}}</view>
								<view class="right_2">
									<view class="bottom_3">{{item.withdraw_time}}</view>
									<uni-tag v-if="item.is_success == 0" style="display: inline-block;" text="待审核" size="small" type="warning"></uni-tag>
									<uni-tag v-if="item.is_success == 1" style="display: inline-block;" text="提现成功" size="small" type="success"></uni-tag>
									<uni-tag v-if="item.is_success == 2" style="display: inline-block;" text="提现拒绝" size="small" type="error"></uni-tag>
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
	</view>
</template>

<script>
	import HomeNavbar from '@/components/home/home_navbar.vue'
	import UserDetaild from '@/components/user/user_detailed.vue'
	export default {  
		name: 'transaction',
		components: {
			HomeNavbar,
			UserDetaild,
		},
		data() {
			return {
				show1: false,
				pages: {
					page: 1,
					page_size: 10
				},
				list1: [],
				list2: [],
				user: {},
				tabs: [{
					name: '提现金额',
				}, {
					name: '提现明细',
				}],
				current: 0
			}
		},
		onLoad() {
			this.getFanlidetail()
		},
		onShow() {
			const user = uni.getStorageSync('user')
			if (user) {
				this.user = user
			}
		},
		methods: {
			handleClick(index){
				this.current = index
				if (index == 0) {
					this.show1 = false
					this.pages.page = 1
					this.list1 = []
					this.getFanlidetail()
				} else if (index == 1) {
					this.show1 = false
					this.pages.page = 1
					this.list1 = []
					this.getTixian()
				}
			},
			async getTixian() {
				if (this.show1) return
				const res = await this.$http({
					url: '/withdraw/lists',
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
					} else if (data.data.length == 0 && this.pages.page != 1) {
						this.show1 = true
					}
					console.log(this.list1, '1')
					this.list1 = [...this.list1, ...data.data]
				}
			},
			async getFanlidetail() {
				if (this.show1) return
				const res = await this.$http({
					url: '/user/accountList',
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
					console.log(this.list1)
					this.list1 = [...this.list1, ...data.data]
				}
			},
			//去提现
			tixian() {
				const user = this.user
				if(user.real_name){
					uni.navigateTo({
						url: '/pages/user/withdrawal/index'
					})
				}else{
					uni.showToast({
						title:'请先完成实名认证',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/user/real_name/index'
						})
					},500)
				}
			},
			lower() {
				this.pages.page += 1
				const current = this.current
				switch (current) {
					case 0:
						this.getFanlidetail()
						break
					case 1:
						this.getTixian()
						break
				}
			},
		},
		filters: {
			time(val) {
				val = val * 1000
				function add0(m) {
					return m < 10 ? '0' + m : m
				}
				var time = new Date(val);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
			},
			issuccess(val) {
				switch (val) {
					case 0:
						return '申请'
					case 1:
						return '成功'
					case 2:
						return '失败'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tixanmingxi {
		margin-top: 16rpx;
	}

	.content {
		border-top: 6rpx solid #dcdcdc;
		background-color: #dcdcdc;
	}

	.scroll-y {
		height: calc(100vh - 104rpx);
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

		.tixanmingxi {
			.bottom_1 {
				background-color: #fff;
				padding: 0 36rpx;

				.list {
					.list_item {
						border-bottom: 2rpx solid #9a9a9a;
						padding-top: 22rpx;
						display: flex;
						// justify-content: space-between;
						flex-direction: column;

						.left_2 {
							font-style: PingFang-SC-Regular;
							display: flex;
							justify-content: space-between;

							.top_3 {
								padding-bottom: 18rpx;
								color: #333333;
								font-size: 30rpx;
							}

							.money {
								font-size: 48rpx;
								color: #FF0000;
							}
						}

						.right_2 {
							.bottom_3 {
								padding-bottom: 24rpx;
								color: #666666;
								font-size: 20rpx;
							}

							display: flex;
							justify-content: space-between;
							padding-top: 10rpx;
						}
					}
				}
			}
		}
	}

	.leijishouyi {
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
	
	.middle{
		color: #666;
		font-size: 28rpx;
	}
</style>
