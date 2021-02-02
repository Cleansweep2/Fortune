<template>
	<view class="category">
		<HomeNavbar :title="category"></HomeNavbar>
		<view class="content">
			<view class="tabs1">
				<view class="tab1" :style="{color:active == index?'#F43A3A':'#333'}" @click="handleClick(index)" :key="index" v-for="(item,index) in tabs1">
					<view :class="{bottom_line:active == index}"></view>
					<view class="jiantou" v-if="index == 3">
						<view :class="{top:true,show:show}" @click.stop="handleTopClick"></view>
						<view :class="{bottom:true,show:!show}" @click.stop="handleBottomClick"></view>
					</view>
					{{item.name}}
				</view>
			</view>
			<view class="food_hot">
				<UniHot></UniHot>
			</view>
		</view>
	</view>
</template>

<script>
	import UniHot from '@/components/uni-hot.vue'
	import HomeNavbar from '@/components/home/home_navbar.vue'
	export default {
		components: {
			UniHot,
			HomeNavbar
		},
		onLoad(options) {
			const {
				category
			} = options
			this.category = category
		},
		data() {
			return {
				active: 0,
				category: '',
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
			}
		},
		methods: {
			handleClick(index) {
				this.active = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #dcdcdc;
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
</style>
