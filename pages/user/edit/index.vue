<template>
	<view class="edit">
		<HomeNavbar title="设置"></HomeNavbar>
		<view class="content">
			<view class="card">
				<view class="list">
					<view class="list_item">
						<view class="item_in" @click="toInfo">
							<image src="@/static/images/user/edit/huancun.png"></image>
							<view @click="clearStorage" class="right">清空缓存 <text style="padding-left: 40rpx;color: red;">{{storageSize}}</text></view>
						</view>
					</view>
					<view class="list_item">
						<view class="item_in" @click="isUpdate">
							<image src="@/static/images/user/edit/edit.png"></image>
							<view class="right">版本更新</view>
						</view>
					</view>
					<view class="list_item">
						<view class="item_in" @click="toKefu">
							<image src="@/static/images/user/edit/kefu.png"></image>
							<view class="right">专属客服</view>
						</view>
					</view>
				</view>
			</view>
			<view class="logout" @click="logout">
				账号退出
			</view>
			<view class="copyright">
				<view>
					Copyright@2019-2021
				</view>
				<view>
					购富乐版权所有
				</view>
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
				storageSize: 0,
				url: ''
			}
		},
		methods: {
			getStorageSize: function() {
				let that = this;
				uni.getStorageInfo({
					success(res) {
						let size = res.currentSize;
						if (size < 1024) {
							that.storageSize = size + ' B';
						} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
							that.storageSize = Math.floor(size / 1024 * 100) / 100 + ' KB';
						} else if (size / 1024 / 1024 >= 1) {
							that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + ' M';
						}
					}
				})
			},
			onLoad() {
				this.getStorageSize()
			},
			clearStorage: function() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定清除缓存吗?',
					confirmText: '立即清除',
					success(res) {
						if (res.confirm) {
							// uni.clearStorageSync();
							//重新获取并显示清除后的缓存大小
							that.storageSize = 0
							uni.showToast({
								title: '清除成功'
							})
						}
					}
				})
			},
			logout() {
				const authorization = uni.getStorageSync('authorization')
				const user = uni.getStorageSync('info')
				if (!authorization) {
					return uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
				}
				uni.showModal({
					content: '确定要退出吗?',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('authorization')
							uni.removeStorageSync('user')
							uni.removeStorageSync('info')
							uni.removeStorageSync('login_info')
							/*删除登录时间*/
							uni.removeStorageSync(`${user.username}sign_time`)
							uni.switchTab({
								url: '/pages/home/index'
							})
						} else {
							uni.showToast({
								title: '已取消退出',
								icon: 'none',
							})
						}
					}
				})
			},
			toKefu() {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '400-855-2778',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
				// uni.navigateTo({
				// 	url: '/pages/user/exclusive/index'
				// })
			},
			/*判断是否有最新版本*/
			isUpdate() {
				const data = {
					code: 200,
					isnew: 1
				}
				if (data.isnew == 1) {
					uni.showToast({
						title: '当前已经是最新版本',
						icon:'none'
					})
				} else if (data.isnew == 0) {
					this.upgrade()
				}
			},
			/*更新*/
			upgrade() {
				var downloadTask = uni.downloadFile({
					url: this.url, //下载地址
					success: (downloadResult) => {
						if (downloadResult.statusCode === 200) {
							//本地更新
							plus.runtime.install(downloadResult.tempFilePath, {
								force: false
							}, function() {
								uni.showToast({
									title: '安装升级包成功,重新启动..',
								})
								setTimeout(() => {
									plus.runtime.restart();
								}, 500)
							}, (e) => {
								uni.showToast({
									title: '安装升级包失败',
									icon: 'none'
								})
							});
						} else {
							uni.showToast({
								title: '升级包下载失败',
								icon: 'none'
							})
						}
					}
				});
				uni.showLoading({
					mask: true,
					title: "请稍等正在下载中..."
				});
				downloadTask.onProgressUpdate((e) => {
					that.progress = e.progress;
					if (e.progress >= 100) {
						console.log("下载完毕")
						uni.hideLoading();
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {}

	.copyright {
		margin-top: 28rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		line-height: 30rpx;
		text-align: center;
	}

	.content {
		padding-top: 22rpx;
		height: calc(100vh - 88rpx);
		background: #DCDCDC;

		.card {
			background-color: #fff;
			border-radius: 20rpx;
			margin: 0 auto;
			height: 362rpx;
			width: 702rpx;

			.list {
				display: flex;
				flex-direction: column;
				height: 100%;

				.list_item {
					flex: 1;
					padding-left: 28rpx;
					padding-right: 42rpx;

					.item_in {
						height: 100%;
						border-bottom: 2rpx solid #9a9a9a;
						display: flex;
						align-items: center;

						image {
							width: 30rpx;
							height: 30rpx;
						}

						.right {
							padding-left: 42rpx;
							color: #333333;
							font-size: 30rpx;
						}
					}

					&:nth-of-type(3) {
						.item_in {
							border: none;
						}
					}
				}
			}
		}
	}

	.logout {
		height: 112rpx;
		border-radius: 20rpx;
		background-color: #fff;
		text-align: center;
		line-height: 112rpx;
		width: 702rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
	}
</style>
