<template>
	<view class="home" :catchtouchmove="true">
		<view class="home_row">
			<view class="home_row_search">
				<view class="search_box">
					<icon class="iconfont icon-fangdajing"></icon>
					<!-- <view class="inp">搜索</view> -->
					<input type="input" style="width: 400rpx;" class="inp" @input="changeInput" placeholder="搜索" />
					<image @click="searchByKeyWord(true)" src="@/static/images/home/search.png"></image>
					<!-- <image src="@/assets/images/home/selected/search1.png"></image> -->
				</view>
			</view>
			<view class="home_row_msg">
				<image v-show="!show2" @click="setShow2" src="@/static/images/home/hongbao.png" mode=""></image>
				<image v-show="show2" @click="setShow1" src="@/static/images/home/qiandao.png" mode=""></image>
			</view>
		</view>
		<view class="home_row_tabs">
			<view class="left">
				<view class="tabs_box">
					<uni-tabs fontSize="26rpx" pillsBorderRadius="20rpx" width="84rpx" activeColor="#fff" pillsColor="#FD381E" height="50rpx"
					 color="#333" :pills="true" v-model="current" :current="current" :tabs="tabs" @change="changeTab"></uni-tabs>
				</view>
			</view>
			<view class="right">
				<image @click="goCategorys(1)" src="@/static/images/home/category.png" mode=""></image>
			</view>
		</view>
		<scroll-view @touchstart="start" @touchmove="move" @touchend="end" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
		 @scrolltolower="lower" @refresherpulling="onPulling" @refresherrestore="onRestore" @refresherrefresh="onRefresh($event)"
		 @scroll="scroll" :refresher-enabled="enabled" :refresher-triggered="triggered">
			<view class="content">
				<!--精品  -->
				<view class="selected_box" v-if="current == 0">
					<Selected :show1="show4" :goods-list="goodsList"></Selected>
				</view>

				<!-- 手机 -->
				<view v-if="index != 0" class="phone_box">
					<CategoryPage :show1="show4" :goods-list="goodsList" :category-list="categoryList"></CategoryPage>
				</view>

			</view>

		</scroll-view>

		<view class="eject" v-if="show" @click="cancle">
			<image @click="cancle" src="@/static/images/home/jifen.png" mode=""></image>
		</view>

		<NoLogin v-if="show1"></NoLogin>

		<goTop @click.native="goTop"></goTop>

	</view>
</template>

<script>
	//精品
	import Selected from './selected.vue'
	//分类 下的页面
	import CategoryPage from './category_page.vue'
	import NoLogin from '@/components/no-login.vue'
	import goTop from '@/components/go-top.vue'
	export default {
		components: {
			Selected,
			CategoryPage,
			NoLogin,
			goTop,
		},
		data() {
			return {
				show4: false, //是否是底部
				show2: false,
				// 自定义下拉刷新
				triggered: false, //下拉刷新是否被触发
				_freshing: false, // 是否正在刷新
				_freshing1: true,
				show: false,
				show1: true,
				active: 0,
				current: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				tabs: [ //一级分类

				],
				index: 0, //让这一个代替所有
				// pid: 0, //获取分类 还是分类下的所有
				// cids: 0, //根据分类
				keyword: '', //关键字搜索
				categoryList: [], //二级分类
				pages: {
					page: 1,
					pageSize: 10,
				},
				goodsList: [], //商品列表
				sort: 0, //按什么排序默认 综合
				status: 0, //登录状态
				bs: null,
				startY: 0,
				endY: 0,
				enabled: false
			}
		},
		async onShow() {
			clearInterval(this.bs)
			const authorization = uni.getStorageSync('authorization')
			const login_info = uni.getStorageSync('login_info')
			if (!authorization) {
				this.show2 = false
				this.show1 = true
			} else if(authorization && login_info.identify != 'store') {
				console.log('进来了')
				this.show1 = false
				//获取签到状态
				await this.getStatus()
			}
		},
		onLoad() {
			this.getTabs()
			this.getGoodsList()
			uni.$on('activeChange', ({
				index,
				tabs1,
				show
			}) => {
				this.goodsList = []
				if (index < 3) {
					this.sort = tabs1[index].sort
				} else {
					this.sort = tabs1[index].sortT
				}
				this.getGoodsList()
			})
			uni.$on('jiantou', (show) => {
				this.goodsList = []
				this.pages.page = 1
				if (show) {
					this.sort = 6
				} else {
					this.sort = 5
				}
				this.getGoodsList()
			})
		},
		methods: {
			//获取签到状态
			async getStatus() {
				//获取登录的信息
				const user = uni.getStorageSync('info')
				if (!user) {
					this.show2 = false
					return uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
				}
				const res = await this.$http({
					url: '/user/signStatus'
				}, true)
				let data = res[1] && res[1].data
				if (!data) {
					data = {}
				}
				if (data.code == 200) {
					const sign_time = uni.getStorageSync(`${user.username}sign_time`)
					const status = data.data.status
					this.status = status
					if (status == 0) {
						if (!sign_time) {
							uni.setStorageSync(`${user.username}sign_time`, Date.now())
						} else {
							//1 秒刷新一次
							this.bs = setInterval(() => {
								if (Date.now() - sign_time >= 300000) {
									this.show2 = true
									clearInterval(this.bs)
									uni.removeStorageSync('${user.username}sign_time')
								}
							}, 1000)
						}
					}else{
						this.show2 = false
					}
				}
			},
			start(e) {
				this.startY = e.touches[0].pageY
			},
			move(e) {
				this.endY = e.touches[0].pageY
			},
			end(e) {
				if (this.endY - this.startY > 30) {
					this.enabled = true
					this.show4 = false
					this.onRefresh()
				} else {
					this.enabled = false
				}
				this.endY = 0
				this.startY = 0
			},
			setShow2() {
				//是否签到
				const status = this.status
				if (status == 1) {
					uni.showToast({
						title: '今天已签完到了 明天再来',
						icon: 'none'
					})
				} else if (status == 0) {
					const user = uni.getStorageSync('info')
					if (user) {
						uni.showToast({
							title: '浏览才能领积分哦',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '登录才可以领积分',
							icon: 'none'
						})
					}
				}
			},
			async setShow1() {
				const res = await this.$http({
					url: '/user/signin',
					method: 'post'
				})
				const data = res[1].data
				if (data.code == 200) {
					this.show = true
					this.show2 = false
					this.getStatus()
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					})
				}
			},
			//搜索
			changeInput(e) {
				this.keyword = e.detail.value
			},
			searchByKeyWord(issearch) {
				this.show4 = false
				this.pages.page = 1
				this.goodsList = []
				this.getGoodsList(issearch)
			},
			//获取分类
			async getTabs() {
				const index = this.index
				const res = await this.$http({
					url: '/dtk/category',
					data: {
						pid: this.index
					}
				})
				if (index == 0) {
					this.tabs = [{
						type_name: '精选'
					}, ...res[1].data.data]
				} else {
					this.categoryList = res[1].data.data
				}
			},
			//获取商品
			async getGoodsList(issearch, isshow = false) {
				if (this.show4) return
				const index = this.index
				let params = {
					page_size: this.pages.pageSize,
					page: this.pages.page,
					sort: this.sort,
				}
				if (index == 0) {
					params['sort'] = 4
				} else {
					params['cids'] = this.index
				}
				if (issearch) {
					params['keyword'] = this.keyword
					delete params['cids']
				}
				const res = await this.$http({
					url: '/dtk/goodsList',
					data: params
				}, isshow)
				const data = res[1].data
				if (data.code == 200) {
					if (data.data.length == 0 && this.pages.page == 1) {
						uni.showToast({
							title: '暂无商品数据',
							icon: 'none'
						})
						this.show4 = true
					} else if (data.data.length == 0 && this.pages.page != 1) {
						this.show4 = true
					}
					this.goodsList = [...this.goodsList, ...data.data]
				}
			},
			//去更多分类
			goCategorys(index) {
				uni.navigateTo({
					url: `/pages/home/cetegorys/index?type=${index}`,
				})
			},
			//改变tab
			changeTab(index) {
				this.index = index
				this.pages.page = 1
				this.goodsList = []
				this.show4 = false
				this.getGoodsList()
				uni.$emit('reset')
				if (index != 0) {
					this.getTabs()
				}
			},
			setShow() {
				this.show = true
			},
			cancle() {
				this.show = false
			},

			// 自定义下拉刷新被触发
			async onRefresh(e) {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered) this.triggered = true; //界面下拉触发，triggered可能不是true，要设为true 
				this._freshing = true;
				this.pages.page = 1
				this.goodsList = this.goodsList.slice(0, 10)
				await this.getGoodsList(false, true)
				uni.$emit('refreshSwiper')
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 500)
			},
			//被复位
			onRestore() {
				this.enabled = false
				this.triggered = false; // 需要重置
			},
			onPulling(e) {
				this.triggered = true; // 需要重置
			},

			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
				// if (e.detail.scrollTop < 5) {
				// 	this._freshing1 = true
				// } else {
				// 	this._freshing1 = false
				// }
			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			lower(e) {
				this.pages.page += 1
				this.getGoodsList()
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/home/index.scss';
</style>
