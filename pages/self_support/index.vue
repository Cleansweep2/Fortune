<template>
	<view class="self_support">
		<view class="home_row_tabs">
			<view class="left">
				<view class="tabs_box">
					<uni-tabs fontSize="26rpx" pillsBorderRadius="20rpx" width="84rpx" activeColor="#fff" pillsColor="#FD381E" height="50rpx"
					 color="#333" :pills="true" v-model="current" :current="current" :tabs="tabs" @change="changeTab"></uni-tabs>
				</view>
			</view>
			<view class="right">
				<image @click="goCategorys" src="@/static/images/home/category.png" mode=""></image>
			</view>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll" @refresherpulling="onPulling" @refresherrestore="onRestore" @refresherrefresh="onRefresh"
		 :refresher-enabled="false" :refresher-triggered="triggered">


			<view class="content">
				<!--精品  -->
				<view class="selected_box" v-if="index == 0">
					<Selected :goodsList="goodsList"></Selected>
				</view>

				<!-- 手机 -->
				<view v-if="index != 0" class="phone_box">
					<CategoryPage :goodsList="goodsList"></CategoryPage>
				</view>

			</view>

		</scroll-view>

		<view class="eject" v-if="show">
			<image src="@/static/images/home/jifen.png" mode=""></image>
		</view>
		<!-- <NoLogin></NoLogin> -->
		<goTop @click.native="goTop"></goTop>
		<view class="eject1" v-if="show1">
			<view class="eject_in">
				<image src="@/static/images/home/plateform/qidai.png" mode=""></image>
				<image @click="cancle" src="@/static/images/home/plateform/ok.png" mode=""></image>
			</view>
		</view>

	</view>
</template>

<script>
	//精品
	import Selected from './selected.vue'
	//手机
	import CategoryPage from '@/pages/home/category_page.vue'
	//no_login
	import NoLogin from '@/components/no-login.vue'
	//goTop
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
				goodsList: [],
				triggered: false, //下拉刷新是否被触发
				_freshing: false, // 是否正在刷新
				show: false,
				show1: true,
				active: 0,
				current: 0,
				index: 0,
				tabs: [{
						type_name: '精选'
					},
					{
						type_name: '手机'
					},
					{
						type_name: '酒类'
					},
					{
						type_name: '家居'
					},
					{
						type_name: '食品'
					},
					{
						type_name: '服装'
					},
					{
						type_name: '营养保健'
					},
					{
						type_name: '家用电器'
					},
				],
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		onShow() {
			this.show1 = true
		},
		onLoad() {

		},
		methods: {
			//去更多分类
			goCategorys() {
				uni.navigateTo({
					url: '/pages/home/cetegorys/index'
				})
			},
			//改变tab
			changeTab(index) {
				this.index = index
			},
			setShow() {
				this.show = true
			},
			cancle() {
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			//scroll view函数
			upper(e) {
				console.log(e)
			},
			lower(e) {
				console.log(e)
			},
			// 自定义下拉刷新被触发
			async onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.triggered) this.triggered = true; //界面下拉触发，triggered可能不是true，要设为true  
				const isRefresh = true
				//await this.getGoodsList()
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
			},
			//被复位
			onRestore() {
				this.triggered = false; // 需要重置
			},
			onPulling() {
				this.triggered = true; // 需要重置
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop

			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/home/index.scss';
	@import '@/assets/css/self_support/index.scss'

</style>
