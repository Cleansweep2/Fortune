<template>
	<view class="platform">
		<home-navbar :title="platformName"></home-navbar>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll" @refresherpulling="onPulling" @refresherrestore="onRestore" @refresherrefresh="onRefresh"
		 :refresher-enabled="false" :refresher-triggered="triggered">
			<view class="avatar" v-if="index != 1">
				<!-- <view class="text">
					{{platformName}}
				</view> -->
				<image v-if="index == 0" class="text" src="@/static/images/home/plateform/taobao_name.png"></image>
				<image v-if="index == 1" class="text" src="@/static/images/home/plateform/99_name.png"></image>
				<image v-if="index == 2" class="text" src="@/static/images/home/plateform/caifule_name.png"></image>
				<image v-if="index == 3" class="text" src="@/static/images/home/plateform/dianpujie_name.png"></image>
				<!-- 搜索框 -->
				<view class="search">
					<view class="search_in">
						<view class="search_in_box">
							<icon class="iconfont icon-fangdajing"></icon>
							<!-- <view class="inp">搜索</view> -->
							<input style="width:400rpx" @input="handleInput" class="inp" placeholder="搜索" />
							<image @click="searchByKeyword(true)" src="@/static/images/home/search.png"></image>
						</view>
					</view>
				</view>

				<image v-if="index == 0" src="@/static/images/home/plateform/taobao_bgc.png"></image>
				<image v-if="index == 1" src="@/static/images/home/taobao_fanli.png"></image>
				<image v-if="index == 2" src="@/static/images/home/plateform/caifule_bgc.png"></image>
				<image v-if="index == 3" src="@/static/images/home/plateform/dianpujie_bgc.png"></image>
			</view>

			<!-- 其他的tabs -->
			<view class="platform_row_tabs" v-if="index != 1">
				<view class="left">
					<view class="tabs_box">
						<uni-tabs fontSize="26rpx" pillsBorderRadius="20rpx" width="84rpx" activeColor="#fff" pillsColor="#FD381E" height="50rpx"
						 color="#333" :pills="true" v-model="current" :current="current" :tabs="tabs2" @change="changeTab"></uni-tabs>
					</view>
				</view>
				<view class="right">
					<!-- <image src="@/static/images/home/category.png" mode=""></image> -->
					<!-- <view class="more" @click="goCategorys">更多</view> -->
				</view>
			</view>

			<!-- 99特卖tabs -->
			<view class="platform_row_tabs1" v-if="index == 1">
				<view class="tabs">
					<view class="tab" :key="index" v-for="(item,index) in tabs" @click="handleClick(index)" :style="{color:current == index?'#F43A3A':'#333'}">
						<view class="top">
							<image :src="item.icon" v-if="current != index"></image>
							<image :src="item.icon_active" v-else></image>
						</view>
						<view class="bottom">
							{{item.name}}
							<view :class="{bottom_line:current == index}"></view>
						</view>
					</view>

				</view>
				<view class="tabs1">
					<view class="tab1" :style="{color:active == index?'#F43A3A':'#333'}" @click="handleClick1(index)" :key="index"
					 v-for="(item,index) in tabs1">
						<view class="jiantou" v-if="index == 3">
							<view :class="{top:true,show:show}" @click.stop="handleTopClick"></view>
							<view :class="{bottom:true,show:!show}" @click.stop="handleBottomClick"></view>
						</view>
						{{item.name}}
					</view>
				</view>
			</view>

			<!-- 商品列表 -->
			<view class="goods" v-if="index <= 2">
				<uni-hot :show1="show1" :goods-list="goodsList"></uni-hot>
			</view>
			<!-- 店铺列表 -->
			<home-shop :shop-list="shopList" :show1="show1" v-else></home-shop>
		</scroll-view>
		<go-top @click.native="goTop"></go-top>
		<view class="eject1" v-if="show2 && index == 2">
			<view class="eject_in">
				<image src="@/static/images/home/plateform/qidai.png" mode=""></image>
				<image @click="cancle" src="@/static/images/home/plateform/ok.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import HomeNavbar from '@/components/home/home_navbar.vue'
	import UniHot from '@/components/uni-hot.vue'
	import HomeShop from '@/components/home/home_shop.vue'
	//goTop
	import GoTop from '@/components/go-top.vue'
	export default {
		components: {
			HomeNavbar,
			UniHot,
			HomeShop,
			GoTop
		},
		data() {
			return {
				// 自定义下拉刷新
				triggered: false, //下拉刷新是否被触发
				_freshing: false, // 是否正在刷新
				show: true,
				current: 0,
				active: 0,
				//9.9
				tabs: [{
						name: '精选',
						icon: require('@/static/images/home/plateform/duanshi.png'),
						icon_active: require('@/static/images/home/plateform/duanshi_active.png')
					},
					{
						name: '5.9包邮',
						icon: require('@/static/images/home/plateform/9.9.png'),
						icon_active: require('@/static/images/home/plateform/9.9_active.png')
					},
					{
						name: '9.9包邮',
						icon: require('@/static/images/home/plateform/bao.png'),
						icon_active: require('@/static/images/home/plateform/bao_active.png')
					},
					{
						name: '19.9包邮',
						icon: require('@/static/images/home/plateform/che.png'),
						icon_active: require('@/static/images/home/plateform/che_active.png')
					},
				],
				tabs1: [{
						name: '综合'
					},
					{
						name: '销量'
					},
					{
						name: '最新'
					},
					{
						name: '价格'
					},
				],
				//其他的3
				tabs2: [],
				//商品列表
				goodsList: [],
				//店铺列表
				shopList: [],
				index: 0,
				current: 0,
				platformName: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				keyword: '', //搜索 关键字
				sort: 0, //价格
				cids: 1, //根据分类
				pages: {
					page: 1,
					pageSize: 10
				},
				//9.9 nine_cid
				nine_cid: -1,
				store_type_id: 1, //店铺分类
				show1: false,
				show2: true, //确定按钮显示
				store_name:'' //店铺搜索
			}
		},

		onLoad(options) {
			const {
				platformName,
				index
			} = options
			this.platformName = platformName
			this.index = index
			if (index == 1) {
				this.getGoodsList1()
			} else if (index == 0) {
				this.getTabs()
				this.getGoodsList()
			} else if(index == 3) {
				this.getTabs()
				this.getShopList()
			}
		},

		methods: {
			//确定之后
			cancle() {
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			//去分类页
			goCategorys(){
				uni.navigateTo({
					url: `/pages/home/cetegorys/index?type=${2}`
				})
			},
			//搜索
			searchByKeyword(issearch) {
				this.show1 = false
				this.pages.page = 1
				this.goodsList = []
				this.shopList = []
				const index = this.index
				if (index == 0 || index == 2) {
					this.getGoodsList(issearch)
				} else {
					this.getShopList(issearch)
				}
			},
			//搜索字段
			handleInput(e) {
					this.keyword = e.detail.value
			},
			//9.9 上面的
			handleClick(index) {
				if (index == this.current) return
				this.goodsList = []
				this.pages.page = 1
				this.current = index
				this.show1 = false
				let nine_cid = null
				switch (index) {
					case 0:
						nine_cid = -1
						break;
					case 1:
						nine_cid = 1
						break;
					case 2:
						nine_cid = 2
						break;
					case 3:
						nine_cid = 3
						break;
				}
				this.nine_cid = nine_cid
				this.getGoodsList1()
			},
			//9.9 下面的
			handleClick1(index) {
				this.active = index
			},
			//除了 9.9获取分类
			async getTabs() {
				const index = this.index
				let res
				if (index == 0 || index == 2) {
					res = await this.$http({
						url: '/dtk/category',
					})
				} else if (index == 3) {
					res = await this.$http({
						url: '/store/typeList',
					})
				}
				this.tabs2 = res[1].data.data
			},
			//获取除了9.9的商品
			async getGoodsList(issearch) {
				if (this.show1) return
				let params = {
					page_size: this.pages.pageSize,
					page: this.pages.page,
					cids: this.cids,
				}
				
				if(issearch){
					params['keyword'] = this.keyword
					delete params['cids']
				}
				const res = await this.$http({
					url: '/dtk/goodsList',
					data:params
				})
				const data = res[1].data
				if(data.code == 200){
					if (data.data.length == 0 && this.pages.page == 1) {
						uni.showToast({
							title:'暂无数据',
							icon:'none'
						})
						this.show1 = true
					}else if(data.data.length == 0 && this.pages.page != 1){
						this.show1 = true
					}
					this.goodsList = [...this.goodsList, ...data.data]
				}
			},
			//获取9.9商品
			async getGoodsList1() {
				if(this.show1) return
				const res = await this.$http({
					url: '/dtk/opGoodsList',
					data: {
						page_size: this.pages.pageSize,
						page: this.pages.page,
						nine_cid: this.nine_cid
					}
				})
				const data = res[1].data.data
				if (data.length == 0 && this.pages.page == 1) {
					uni.showToast({
						title:'暂无数据',
						icon:'none'
					})
					this.show1 = true
				}else if(data.length == 0 && this.pages.page != 1){
					this.show1 = true
				}
				this.goodsList = [...this.goodsList, ...data]
			},
			//获取店铺
			async getShopList(issearch) {
				if(this.show1) return
				const params = {
					page: this.pages.page,
					page_size: this.pages.pageSize,
					store_type_id: this.store_type_id,
				}
				if(issearch){
					delete params['store_type_id']
					params['keyword'] = this.keyword  
				}
				const res = await this.$http({
					url: '/store/lists',
					data:params
				})

				const data = res[1].data
				if (data.code == 200) {
					if (data.data.length == 0 && this.pages.page == 1) {
						uni.showToast({
							title: '暂无数据',
							icon: 'none'
						})
						this.show1 = true
					}else if(data.data.length == 0 && this.pages.page != 1){
						this.show1 = true
					}
					this.shopList = [...this.shopList,...data.data]
				}
			},
			changeTab(index) {
				this.show1 = false
				this.pages.page = 1
				const current = this.index
				if(current == 0 || current == 2){
					this.cids = index + 1
					this.goodsList = []
					this.getGoodsList()
				}else{
					this.store_type_id = index + 1
					this.shopList = []
					this.getShopList()
				}
			}, //scroll view函数
			upper(e) {
				console.log(e)
			},
			lower(e) {
				this.pages.page += 1
				const index = this.index
				if (index == 1) {
					this.getGoodsList1()
				} else if(index == 0 || index == 2) {
					this.getGoodsList()
				}else{
					this.getShopList()
				}
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},

			// 自定义下拉刷新被触发
			async onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered) this.triggered = true; //界面下拉触发，triggered可能不是true，要设为true  
				const isRefresh = true
				const index = this.index
				this.triggered = false;
				this._freshing = false;
			},
			//被复位
			onRestore() {
				this.triggered = false; // 需要重置
			},
			onPulling() {
				this.triggered = true; // 需要重置
			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.platform_row_tabs {
		padding: 6rpx 26rpx 12rpx 26rpx;
		display: flex;
		z-index: 1000;
		background-color: #fff;
		width: 100vw;
		.left {
			//width: 600rpx;
			width: 100%;
			.v-tabs__container-item {}
		}
	}
	
	.scroll-Y{
		height: calc(100vh - 88rpx);
		background-color: #DCDCDC;
	}

	.platform_row_tabs1 {
		.tabs {
			width: 100vw;
			background-color: #fff;
			font-size: 24rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 6rpx;

			.tab {
				flex: 1;
				text-align: center;
				line-height: 46rpx;

				.bottom {
					position: relative;
					display: inline-block;
				}
			}

			image {
				height: 40rpx;
				width: 50rpx;
			}
		}

		.tabs1 {
			width: 100vw;
			background-color: #fff;
			height: 46rpx;
			font-size: 24rpx;
			display: flex;
			justify-content: space-between;

			.tab1 {
				flex: 1;
				text-align: center;
				line-height: 46rpx;
				position: relative;
			}
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
		right: 40rpx;
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
			border-top: #F43A3A;
		}

		.show2 {
			border-bottom: #F43A3A;
		}
	}

	.bottom_line {
		position: absolute;
		width: 100%;
		border: 2rpx solid #F43A3A;
		bottom: -4rpx;
	}

	.goods {
		padding-top: 16rpx;
		background-color: #DCDCDC;
	}

	.avatar {
		position: relative;

		image {
			width: 100%;
			height: 444rpx;
		}

		.text {
			position: absolute;
			z-index: 3;
			left: 50%;
			transform: translate(-50%);
			top: 90rpx;
			width: 300rpx;
			height: 75rpx;
		}

		.search {
			position: absolute;
			z-index: 4;
			top: 220rpx;
			left: 50%;
			transform: translate(-50%);

			.search_in {
				height: 60rpx;
				padding-left: 66rpx;
				position: relative;
				width: 600rpx;
				display: flex;
				border: 1rpx solid #EC746C;
				border-radius: 30rpx;
				background-color: #F3F3F3;

				image {
					z-index: 5;
					position: absolute;
					right: -2rpx;
					top: -2rpx;
					width: 134rpx;
					height: 61rpx;
				}

				.inp {
					display: flex;
					align-items: center;
					height: 100%;
					font-size: 24rpx;
					color: #666;
				}

				.iconfont {
					position: absolute;
					height: 28rpx;
					width: 30rpx;
					color: #999999;
					left: 24rpx;
					top: 12rpx;
				}
			}
		}

	}

	.right {
		flex: 1;
		display: flex;
		align-items: center;

		.more {
			width: 86rpx;
			height: 50rpx;
			background-color: #FD381E;
			color: #fff;
			font-size: 26rpx;
			border-radius: 20rpx;
			text-align: center;
			line-height: 50rpx;
		}
	}

	.scroll-Y {
		height: calc(100vh - 96rpx);
		position: relative;
	}
	
	
	// 确定框
	.eject1 {
		position: absolute;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .5);
		top: 0;
		left: 0;
		z-index: 99999999;
	
		.eject_in {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 100vw;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	
		image:nth-of-type(1) {
			width: 100%;
			height: 500rpx;
		}
	
		image:nth-of-type(2) {
			width: 250rpx;
			height: 110rpx;
		}
	}
	
</style>

