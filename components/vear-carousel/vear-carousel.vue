<template>
	<div class="swiper_box">
		<swiper :interval="3000" :indicator-dots="true" class="image-container" previous-margin="45rpx" next-margin="45rpx" circular autoplay
		 @change="swiperChange">
			<swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'" v-for="(item, index) in imgList"
			 :key="item.id">
				<image @click="clickImg(item)" :class="currentIndex == index ? 'item-img' : 'item-img-side'" :src="item.img"
				 lazy-load :style="dontFirstAnimation ? 'animation: none;' : ''" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</div>
</template>
<script>
	export default {
		props: {
			imgList: {
				type: Array,
				default () {
					return []
				}
			},
			urlKey: {
				type: String,
				default () {
					return ''
				}
			},
		},
		data() {
			return {
				currentIndex: 0,
				dontFirstAnimation: true
			}
		},
		methods: {
			swiperChange(e) {
				this.dontFirstAnimation = false
				this.currentIndex = e.detail.current
			},
			clickImg(item) {
				this.$emit('selected', item, this.currentIndex)
			}
		}
	}
</script>
<style scoped lang="scss">
	.image-container {
		width: 750rpx;
		height: 350rpx;
		position: relative;
	}

	.slids {
		.slid {
			position: absolute;
			width: 24rpx;
			height: 5rpx;
			background-color: #FF7957;
			bottom: -5rpx;
		}
	}

	.item-img {
		width: 680rpx;
		height: 350rpx;
		border-radius: 14rpx;
		/* animation: to-big .3s; */
	}

	.swiper-item {
		width: 680rpx;
		height: 350rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item-img-side {
		width: 630rpx;
		height: 350rpx;
		border-radius: 14rpx;
		/* 	animation: to-mini .3s; */
	}

	.swiper-item-side {
		width: 630rpx;
		height: 330rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	image {
		height: 100%;
		width: 100%;
		border-radius: 20rpx;
	}

	@keyframes to-mini {
		from {
			height: 300rpx;
		}

		to {
			height: 260rpx;
		}
	}

	@keyframes to-big {
		from {
			height: 260rpx;
		}

		to {
			height: 300rpx;
		}
	}
</style>
