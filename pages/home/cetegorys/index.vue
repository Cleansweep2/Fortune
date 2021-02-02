<template>
	<view class="categorys">
		<HomeNavbar :title="title"></HomeNavbar>
		<view class="content">
			<view class="left">
				<scroll-view :scroll-y="true">
					<view :class="{category_item:true,active:current == index}" v-for="(item,index) in tabs" @click="handleActive(index)">
						<view class="right_line" v-show="current == index"></view>
						{{item.name}}
					</view>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view class="scroll" :scroll-y="true">
					<view class="goodss">
						<view class="goods" @click="toCategory(item.id,item.name || item.type_name)" v-for="(item,index) in categoryList" :key="item.imgUrl">
							<image :src="item.pic"></image>
							<view>{{item.name || item.type_name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
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
				type:'',
				current: 0,
				title: '商品分类',
				tabs: [{
					name: '热门分类'
				}],
				categoryList: [],
				goodsList: []
			}
		},
		onLoad(options) {
			const {type} = options
			this.type = type
			console.log(type)
			if(type == 1){
				this.getTabs()
			}else if(type == 2){
				this.getTabs1()
			}
		},
		methods: {
			//获取店铺分类
			async getTabs1(){
				const res = await this.$http({
					url: '/store/typeList',
				})
				this.categoryList = res[1].data.data
				console.log(this.categoryList)
			},
			//获取分类
			async getTabs() {
				const current = this.current
				const res = await this.$http({
					url: '/dtk/category',
					data: {
						pid: this.current
					}
				})
				if (current == 0) {
					this.tabs = [...this.tabs, ...res[1].data.data]
					this.categoryList = res[1].data.data
				} else {
					this.categoryList = res[1].data.data
				}
				console.log(this.categoryList)
			},
			handleActive(index) {
				this.current = index
				this.getTabs()
			},
			toCategory(pid, name) {
				if(this.type == 1){
					const current = this.current
					uni.navigateTo({
						url: `/pages/home/category/index?pid=${pid}&index=${current}&name=${name}`
					})
				}else{
					uni.navigateTo({
						url: `/pages/home/category_store/index?id=${pid}&store_name=${name}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {}

	.content {
		display: flex;
		height: 100%;
		padding-top: 10rpx;
		height: calc(100vh - 88rpx);
		background-color: #DCDCDC;

		.right {
			width: 520rpx;
			height: 1110rpx;
			border-radius: 20rpx;
			margin-right: 21rpx;
			padding-left: 14rpx;
			background-color: #fff;

			.scroll {
				.goodss {
					display: flex;
					flex-wrap: wrap;
				}

				.goods {
					margin-top: 46rpx;
					width: 33.3%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					image {
						width: 90rpx;
						height: 90rpx;
					}
				}
			}
		}

		.left {
			flex: 1;
			height: 1110rpx;

			scroll-view {
				height: 100%;
			}

			.category_item {
				position: relative;
				width: 195rpx;
				height: 98rpx;
				border-radius: 0rpx 20rpx 20rpx 0rpx;
				margin-bottom: 4rpx;
				background-color: #fff;
				text-align: center;
				line-height: 98rpx;
				font-size: 30rpx;
				color: #333;

				.right_line {
					position: absolute;
					height: 100%;
					border-left: 10rpx solid #FF0000;
				}
			}

			.active {
				background-color: #DCDCDC;
				color: #FF0000;
			}
		}
	}
</style>
