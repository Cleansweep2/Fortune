<template>
	<view class="shop_street">
			<view class="tabs_box">
				<uni-tabs fontSize="26rpx" pillsBorderRadius="20rpx" width="84rpx" activeColor="#fff" pillsColor="#FD381E" height="50rpx"
				 color="#333" :pills="true" v-model="current" :current="current" :tabs="tabs" @change="changeTab"></uni-tabs>
			</view>
		<scroll-view @touchstart="start" @touchmove="move" @touchend="end" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll" @refresherpulling="onPulling" @refresherrestore="onRestore" @refresherrefresh="onRefresh"
		 :refresher-enabled="enabled" :refresher-triggered="triggered">
			<HomeShop :show1="show1" :shop-list="shopList"></HomeShop>
		</scroll-view>
		<goTop @click.native="goTop"></goTop>
	</view>
</template>

<script>
	import HomeShop from '@/components/home/home_shop.vue'
	//goTop
	import goTop from '@/components/go-top.vue'
	export default {
		components: {
			HomeShop,
			goTop
		},
		data() {
			return {
				show1:false,
				triggered: false, //下拉刷新是否被触发
				_freshing: false, // 是否正在刷新
				scrollTop: 0,
				old: {
					scrollTop: 0  
				},
				current: 0,
				tabs: ['精选', '手机', '酒类', '家居', '食品', '服装', '营养保健', '家用电器'],
				shopList: [],
				pages: {
					page: 1,
					page_size: 10
				},
				store_type_id: 1,
				keyword:'',
				startY:0,
				endY:0,
				enabled:false
			}
		},
		onLoad() {  
			this.getTabs()
			this.getShopList(0)
		},
		methods: {
			start(e){
				this.startY = e.touches[0].pageY
			},
			move(e){
				this.endY = e.touches[0].pageY
			},
			end(e){
				if(this.endY - this.startY > 30){
					this.enabled = true
					this.show1 = false
					this.onRefresh()
				}else{
					this.enabled = false
				}
				this.endY = 0
				this.startY = 0
			},
			//获取店铺列表
			async getShopList(i,isshow = false) {
				if(this.show1) return
				const res = await this.$http({
					url: '/store/lists',
					data: {
						page: this.pages.page,
						page_size: this.pages.page_size,
						store_type_id: this.store_type_id ,
						keyword:this.keyword
					}
				},isshow)
				const data = res[1].data
				if (data.code == 200) {
					if (data.data.length == 0 && this.pages.page == 1) {
						uni.showToast({
							title: '暂无数据',
							icon: 'none'
						})
						this.show1 = true
					}else if(data.data.length == 0&& this.pages.page != 1){
							this.show1 = true
					}
					if(i){
						this.shopList = data.data
						return 
					}
					this.shopList = [...this.shopList,...data.data]
				}
			},
			//获取tab
			async getTabs() {
				const res = await this.$http({
					url: '/store/typeList',
				})
				this.tabs = res[1].data.data
				console.log(res)
			},
			//改变tab
			async changeTab(i) {
				this.show1 = false
				this.store_type_id = i + 1
				this.shopList = []
				this.pages.page = 1
				this.getShopList()
			},
			//scroll view函数
			upper(e) {
				console.log(e)
			},
			lower(e) {
				this.pages.page += 1
				this.getShopList()
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			// 自定义下拉刷新被触发
			async onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered) this.triggered = true; //界面下拉触发，triggered可能不是true，要设为true  
				this.pages.page = 1
				this.shopList = this.shopList.slice(0,10)
				await this.getShopList(true,true)
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
	@import '@/assets/css/shop_street/index.scss'
</style>
