<template>
	<view class="statistics">
		<HomeNavbar title="个人明细"></HomeNavbar>
		<scroll-view @scrolltolower="lower" class="scroll-y content" :scroll-y="true">
			<view class="user_tabs content_top">
				<view class="user_tabs_in">
					<view @click="handleClick(index)" :style="{color:current == index?'#F43A3A':'#333333'}" class="tab" v-for="(item,index) in tabs">
						{{item.name}}
						<view class="bottom_line" v-show="current == index"></view>
					</view>
				</view>
			</view>
			<!-- 累计收益 -->
			<view class="leijishouyi" v-show="current == 0">
				<view class="bottom_1">
					<view class="list">
						<view class="list_item" v-for="(item,index) in list1" :key="index">
							<view class="left_2">
								<view class="top_3">分润明细</view>
								<view class="bottom_3">{{item.change_time | time}}</view>
							</view>
							<view class="right_2">
								+ {{item.user_money}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 购物记录 -->
			<view class="jilu" v-show="current == 1">
				<view class="bottom_1">
					<view class="list">
						<view class="list_item" v-for="(item,index) in list1" :key="index">
							<view class="left_2">
								<view class="top_top">
									{{item.store_name}}  <text class="store_id">{{item.username}}</text>
								</view>
								<view class="top_3">
								<view class="left_4">{{item.goods_name}}</view>
								<view class="right_4">
									{{item.declaration_money}}
								</view>
								</view>
								<view class="bottom_3">{{item.create_time}}</view>
							</view>
							<!-- <view class="right_2">
								{{item.declaration_money}}
							</view> -->
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
			HomeNavbar,
		},
		data() {
			return {
				tabs: [{
					name: '累计收益',
				}, {
					name: '购物记录',
				}],
				show1:false,
				list1: [],
				pages:{
					page_size:10,
					page:1
				},
				current: 0,
				user:{}
			}
		},
		onLoad() {
			this.getFanlidetail()
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
					this.getGeren()
				}
			},
			lower(){
				const current = this.current
				switch(current){
					case 0:
					this.pages.page += 1
					this.getFanlidetail()
					break
					case 1:
					this.pages.page += 1
					this.getGeren()
					break
				}
			},
			async getFanlidetail() {
				if(this.show1) return
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
					this.list1 = [...this.list1, ...data.data]
				}
			},
			async getGeren(){
				const res = await this.$http({
					url:'/user/declarationList',
					data:{
						page:this.pages.page,
						page_size:this.pages.page_size
					}
				})
				const data = res[1].data
				if(data.code == 200){
					if(data.data.length == 0 && this.pages.page == 1){
						uni.showToast({
							title:'暂无数据',
							icon:'none'
						})
						this.show1 = true
					}else if(data.data.length == 0 && this.pages.page != 1){
						this.show1 = true
					}
					this.list1 = [...this.list1,...data.data]
				}
			}
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
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		border-top: 6rpx solid #dcdcdc;
		background-color: #dcdcdc;
	}
	
	.scroll-y {
		height: calc(100vh - 88rpx);
	}

	.scroll-y {
		height: calc(100vh - 88rpx);
		background-color: #dcdcdc;
	}

	.bottom_1 {
		background-color: #fff;
		padding: 0 36rpx;
		margin-top: 8rpx;
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

.jilu{
	.list {
		.list_item {
			border-bottom: 2rpx solid #9a9a9a;
			padding-top: 22rpx;
			display: flex;
			justify-content: space-between;
	
			.left_2 {
				width: 100%;
				font-style: PingFang-SC-Regular;
				.top_top{
					padding-bottom: 24rpx;
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.top_3 {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 18rpx;
					.left_4{
						color: #666;
						font-size: 28rpx;
					}
					.right_4{
						font-size: 48rpx;
						color: #FF0000;
					}
				}
	
				.bottom_3 {
					padding-bottom: 24rpx;
					color: #666666;
					font-size: 24rpx;
				}
			}
		}
	}
}

.store_id{
	padding-left: 30rpx;
	font-size: 28rpx;
	font-weight: 400;
}
</style>
