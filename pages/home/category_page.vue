<template>
	<view class="phone">
		<view class="home_comment">
			<view class="food_categorys">
				<view class="category" v-for="(item,index) in categoryList" @click="toCategory(item.id,item.name)">
					<image :src="item.pic" mode=""></image>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="tabs1">
				<view class="tab1" @click="handleClick(index)" :style="{color:active == index?'#F43A3A':'#333'}" :key="index" v-for="(item,index) in tabs1">
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
	</view>
</template>

<script>
	import UniHot from '@/components/uni-hot.vue'
	export default {
		components: {
			UniHot
		},
		props: {
			show1:{
				type:Boolean,
				default(){
					return false
				}
			},
			categoryList: {
				type: Array,
				default () {
					return []
				}
			},
			goodsList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				active: 0,
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
				show: true
			}
		},
		created() {
			uni.$on('reset', () => {  
				this.active = 0
				this.show = true
			})
		},
		methods: {
			toCategory(pid, name) {
				const current = this.current
				uni.navigateTo({
					url: `/pages/home/category/index?pid=${pid}&index=${current}&name=${name}`
				})
			},
			handleClick(index) {
				this.active = index
				uni.$emit('activeChange', {
					index,
					tabs1: this.tabs1,
				})
			},
			handleTopClick() {
				this.show = true
				uni.$emit('jiantou',this.show)
			},
			handleBottomClick() {
				this.show = false
				uni.$emit('jiantou',this.show)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.phone {
		margin-top: 12rpx;
	}

	.food_hot {
		background-color: #DCDCDC;
	}

	.food_categorys {
		padding-right: 45rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 0 5rpx;
		padding-bottom: 40rpx;
		border-radius: 0px 0px 20rpx 20rpx;

		.category {
			width: 25%;
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			flex-direction: column;

			.name {
				color: #151515;
				font-size: 24rpx;
				padding-top: 14rpx;
				text-align: center;
			}

			image {
				width: 90rpx;
				height: 90rpx;
			}
		}

	}

	.tabs1 {
		background-color: #DCDCDC;
		padding: 24rpx 61rpx 22rpx 61rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;

		.tab1 {
			text-align: center;
			color: #333;

			&:nth-of-type(4) {
				position: relative;
			}
		}
	}


	.jiantou {
		position: absolute;
		height: 30rpx;
		width: 30rpx;
		left: 52rpx;
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
			border-bottom-color: red;
		}

		.show2 {
			border-top-color: red;
		}
	}
</style>
