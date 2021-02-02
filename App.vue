<script>
	export default {
		globalData: {
			user: {},
			isshow: 0,
			show2: false
		},
		onLaunch: function() {
			setTimeout(() => {
				plus.navigator.closeSplashscreen();
			}, 3000);
		},
		onShow: function() {

		},
		onHide: function() {

		},
	}
</script>

<style lang="scss">
	.none {
		text-align: center;
		width: 100%;
		padding: 10rpx;
		font-size: 23rpx;
		font-weight: 400;
		color: #999999;
	}
	/*user tabs*/
	.user_tabs{
		background-color: #fff;
		.user_tabs_in{
			height: 88rpx;
			padding: 0 92rpx;
			display: flex;
			justify-content: space-between;
			.tab{
				width: 186rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
	       font-size: 30rpx;
				.bottom_line{
					position: absolute;
					width: 100%;
					left: 0;
					bottom:-8rpx;
					border-bottom:8rpx solid #FF0000;
				}
			}
		}
	}
</style>
