<template>
	<view class="category">
		<HomeNavbar :title="name"></HomeNavbar>
		<scroll-view :scroll-top="scrollTop" @scrolltolower="lower" :scroll-y="true" class="scroll-y">
			<view class="content">
				<view class="tabs1">
					<view class="tab1" :style="{color:active == index?'#F43A3A':'#333'}" @click="handleClick(index)" :key="index"
					 v-for="(item,index) in tabs1">
						<view :class="{bottom_line:active == index}"></view>
						<view class="jiantou" v-if="index == 3">
							<view :class="{top:true,show1:show}" @click.stop="handleTopClick"></view>
							<view :class="{bottom:true,show2:!show}" @click.stop="handleBottomClick"></view>
						</view>
						{{item.name}}
					</view>
				</view>
				<view class="food_hot">
					<UniHot :show1="show1" :goods-list="goodsList"></UniHot>
				</view>
			</view>
		</scroll-view>
		<goTop @click.native="goTop"></goTop>
	</view>
</template>

<script>
	import UniHot from '@/components/uni-hot.vue'
	import HomeNavbar from '@/components/home/home_navbar.vue'
	import goTop from '@/components/go-top.vue'
	export default {
		components: {
			UniHot,
			HomeNavbar,
			goTop
		},
		onLoad(options) {
			const {
				pid,
				index,
				name
			} = options
			this.pid = pid
			this.index = index
			this.name = name

			this.getGoodsList()
		},
		data() {
			return {
				active: 0,
				category: '',
				show: true,
				show1:false,
				tabs1: [{
						name: '综合',
						sort: 0
					},
					{
						name: '销量',
						sort: 2
					},
					{
						name: '最新',
						sort: 1
					},
					{
						name: '价格',
						sortT: 6,
						sortB: 5
					},
				],
				goodsList: [], //商品列表
				pages: {
					page: 1,
					pageSize: 10,
				},
				subcid: '', //二级分类
				cids: '', //一级分类 字段
				index: '',
				name: '',
				sort: 0, //按什么排序
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
			}
		},
		methods: {
			//上部箭头
			handleTopClick(){
				this.show = true
				this.sort = 6
				this.goodsList = []
				this.getGoodsList()
			},
			//下部箭头
			handleBottomClick(){
				this.show = false
				this.sort = 5
				this.goodsList = []
				this.getGoodsList()
			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 10
				});
			},
			//到达底部
			lower() {
				this.pages.page += 1
				this.getGoodsList()
			},
			handleClick(index) {
				this.show1 = false
				this.active = index
				if (index < 3) {
					this.sort = this.tabs1[index].sort
				} else {
					this.sort = this.tabs1[index].sortT
				}
				this.pages.page = 1
				this.goodsList = []
				this.getGoodsList()
			},
			//获取商品列表
			async getGoodsList() {
				if(this.show1) return
				const index = this.index
				let params = {
					page_size: this.pages.pageSize,
					page: this.pages.page,
					sort: this.sort
				}
				if (index == 0) {
					params['cids'] = this.pid
				} else {
					params['subcid'] = this.pid
				}
				const res = await this.$http({
					url: '/dtk/goodsList',
					data: params
				})

				const data = res[1].data.data
				if (data.length == 0 && this.pages.page == 1) {
					uni.showToast({
						title: '暂无数据',
						icon: 'none'
					})
					this.show1 = true
				}else if(data.length == 0 && this.pages.page != 1){
					this.show1 = true
				}
				this.goodsList = [...this.goodsList, ...data]
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-y {
		height: calc(100vh - 88rpx);
		background-color: #DCDCDC;
	}

	.content {
		padding-top: 9rpx;
	}

	.tabs1 {
		background-color: #fff;
		height: 46rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 61rpx;

		.tab1 {
			text-align: center;
			line-height: 46rpx;
			position: relative;
		}
	}

	.food_hot {
		padding-top: 16rpx;
		background-color: #DCDCDC;
	}

	.jiantou {
		position: absolute;
		height: 30rpx;
		width: 30rpx;
		left: 52rpx;
		top: 8rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.top {
			border-left: 8rpx solid rgba(255, 255, 255, 0);
			border-right: 8rpx solid rgba(255, 255, 255, 0);
			border-bottom: 10rpx solid #333333;
			margin-bottom: 6rpx;
		}

		.bottom {
			border-left: 8rpx solid rgba(255, 255, 255, 0);
			border-right: 8rpx solid rgba(255, 255, 255, 0);
			border-top: 10rpx solid #333333;
		}

		.show1 {
			border-bottom-color: #F43A3A;
		}

		.show2 {
			border-top-color: #F43A3A;
		}
	}

	.bottom_line {
		position: absolute;
		width: 100%;
		border: 2rpx solid #F43A3A;
		bottom: -4rpx;
	}
</style>
