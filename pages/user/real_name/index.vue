<template>
	<view class="real_name">
		<HomeNavbar title="实名认证"></HomeNavbar>
		<scroll-view :scroll-y="true" class="scroll-y">
			<view class="content">
				<view class="top">
					<view class="top_in_1">
						<view class="row_3">
							<view class="left">真实姓名</view>
							<view ckass="right">
								<input :value="real_name" @input="changInput($event,1)" placeholder="请输入真实姓名" />
							</view>
						</view>
						<view class="row_3">
							<view class="left">身份证号</view>
							<view ckass="right">
								<input :value="id_card" @input="changInput($event,2)" placeholder="请输入身份证号" />
							</view>
						</view>
						<!-- <view class="row_3">
							<view class="bangding" @click="send">发送</view>
							<view class="left">绑定手机号</view>
							<view ckass="right">
								<input @input="changInput1" placeholder="请输入手机号" />
							</view>
						</view>
						<view class="row_3">
							<view class="bangding" @click="queren">确认绑定</view>
							<view ckass="right">
								<input @input="changCode" style="margin-left: 20rpx;" placeholder="请输入验证码" />
							</view>
						</view> -->
					</view>
					<view class="title_1">上传身份证照片</view>
					<view class="images">
						<view class="left" @click="chooseImg(1)">
							<image v-if="!img1" src='@/static/images/user/real_name/zheng.png'></image>
							<image v-else :src="img1"></image>
							<view class="pai">拍摄正面</view>
						</view>
						<view @click="chooseImg(2)" class="right">

							<image v-if="!img2" src='@/static/images/user/real_name/fan.png'></image>
							<image v-else :src="img2"></image>
							<view class="pai">拍摄反面</view>
						</view>
					</view>

					<!-- 					<view class="code">
						<view class="row_3">
							<view ckass="right" style="padding-left: 20rpx;">
								<input placeholder="手机号" />
							</view>
						</view>
						<view class="phone_code">
							<view class="left">
								<input />
							</view>
							<view class="right">
								发送验证码
							</view>
						</view>
					</view> -->
				</view>
				<view class="bottom">
					<view class="title_1" style="padding-bottom: 0;">
						银行卡登记
					</view>
					<view class="top_in_1" style="border:none">
						<view class="row_3">
							<view class="left">开户行</view>
							<view ckass="right">
								<input :value="bank_address" @input="changInput($event,3)" placeholder="xx 银行xx 市分行xx 支行" />
							</view>
						</view>
						<view class="row_3">
							<view class="left">银行卡号</view>
							<view ckass="right">
								<input :value="bank_no" @input="changInput($event,4)" placeholder="请输入银行卡号" />
							</view>
						</view>
					</view>
				</view>

				<view class="content_bottom" @click="shiming">
					{{user.real_name ? '修改' : '提交'}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	/*实名认证*/
	import HomeNavbar from '@/components/home/home_navbar.vue'
	export default {
		components: {
			HomeNavbar,
		},
		data() {
			return {
				img1: '',
				img2: '',
				real_name: '',
				id_card: '',
				image1_url: '',
				image2_url: '',
				bank_no: '', //银行卡号
				bank_name: '',
				phone: '',
				code: '',
				user: {},
				bank_address:'' //开户行
			}
		},
		onLoad() {
			const user = uni.getStorageSync('user')
			console.log(user)
			this.user = user
			//检测它是否实名
			if (user.real_name) {
				console.log(user)
				const {
					real_name,
					id_card,
					image1_url,
					image2_url,
					bank_no,
					bank_name,
					bank_address
				} = user
				console.log(user)
				this.real_name = real_name
				this.id_card = id_card
				this.img1 = image1_url
				this.img2 = image1_url
				this.bank_no = bank_no
				this.bank_name = bank_name
				this.bank_address = bank_address
			}
		},
		methods: {
			//绑定手机号
			changInput1(e) {
				this.phone = e.detail.value
			},
			changInput(e, i) {
				const val = e.detail.value
				switch (i) {
					case 1: //姓名
						this.real_name = val
						break;
					case 2: //身份
						this.id_card = val
						break;
					case 3: //卡号
						this.bank_address = val
						break;
					case 4: //开户行
						this.bank_no = val
						break;
				}
			},
			//发送验证码
			async send() {
				const phone = this.phone
				if (!phone) {
					return uni.showToast({
						title: '手机号不能为空',
						icon: 'none'
					});
				}
				const res = await this.$http({
					url: '/sms/send',
					method: 'POST',
					data: {
						mobile: phone
					},
				})

				const data = res[1].data
				if (data.code == 200) {
					uni.showToast({
						title: '发送成功,请注意查收'
					})
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					})
				}
			},
			//绑定手机号
			async queren() {
				const code = this.code
				const phone = this.phone
				const res = await this.$http({
					url: '/user/bindPhone',
					data: {
						code,
						phone
					}
				})
				const data = res[1].data
				if (data.code == 200) {
					uni.showToast({
						title: '绑定成功'
					})
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					})
				}
			},
			changCode(e) {
				this.code = e.detail.value
				console.log(this.code)
			},
			//提交
			async shiming() {
				const user = this.user
				const {
					real_name,
					id_card,
					image1_url,
					image2_url,
					bank_no,
					bank_name,
					bank_address 
				} = this
				const res = await this.$http({
					url: '/user/bindCard',
					method: 'POST',
					data: {
						real_name,
						id_card,
						image1_url: this.img1,
						image2_url: this.img2,
						//bank_name:'123',
						bank_no,  
						bank_address
					}
				})
				const data = res[1].data
				if (data.code == 200) {
					if (user.real_name) {
						uni.showToast({
							title: '修改成功'
						})
					} else {
						uni.showToast({
							title: '认证成功'
						})
					}
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/user/index'
						})
					}, 500)
				} else {
					if (user.real_name) {
						uni.showToast({
							title: '修改失败',
							icon: 'none'
						})
						return
					}
					uni.showToast({
						title: '认证失败',
						icon: 'none'
					})
				}
			},
			//上传图片
			chooseImg(i) {
				let _this = this
				let iiiii = i
				uni.chooseImage({
					count: 1, //默认9
					sourceType: ['camera', 'album'], //从相机、相册选择
					success: (res) => {
						var tempFilePaths = res.tempFilePaths;
						if (tempFilePaths.length > 1) {
							return uni.showToast({
								title: '超过上传图片的最大数量',
								icon: 'none'
							})
						}

						uni.uploadFile({
							url: "http://gflxds.com/api/upload/upload",
							filePath: tempFilePaths[0],
							name: "img", // 一定要与后台@RequestParam("file") MultipartFile变量名一致
							success(res) {
								const data = JSON.parse(res.data)
								if (iiiii == 1) {
									_this.img1 = data.data
								} else if (iiiii == 2) {
									_this.img2 = data.data
								}
								uni.showToast({
									title: '上传成功',
								})
							},
							fail() {
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								})
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bangding {
		position: absolute;
		height: 100%;
		width: 150rpx;
		font-size: 24rpx;
		background: #FD381E;
		right: 0;
		display: flex;
		align-items: center;
		color: #fff;
		justify-content: center;
		z-index: 10;
	}

	.scroll-y {
		height: calc(100vh - 88rpx);
		background: #F9F9F9;
	}

	.content {
		margin: 0 auto;
		width: 690rpx;
		margin-top: 26rpx;

		.top {
			padding: 0 26rpx;
			//height: 924rpx;
			//height: 632rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.images {
				display: flex;
				justify-content: space-between;
				//border-bottom: 2rpx solid #E6E6E6;
				padding-bottom: 26rpx;

				.left,
				.right {
					image {
						width: 300rpx;
						height: 200rpx;
						display: block;
						border-radius: 20rpx 20rpx 0 0;
					}

					.pai {
						width: 100%;
						height: 60rpx;
						border-radius: 0 0 20rpx 20rpx;
						background-color: #FD381E;
						text-align: center;
						line-height: 60rpx;
						color: #fff;
					}
				}
			}

			.code {
				padding-top: 34rpx;

				.phone_code {
					margin-top: 22rpx;
					height: 88rpx;
					display: flex;
					justify-content: space-between;

					.left {
						width: 368rpx;
						background: #F7F7F7;
						display: flex;
						align-items: center;

						input {
							margin-left: 20rpx;
						}
					}

					.right {
						width: 230rpx;
						background-color: #FD381E;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 32rpx;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 49px;
					}
				}
			}
		}

		.bottom {
			padding: 0 26rpx;
			margin-top: 8rpx;
			height: 328rpx;
			background-color: #fff;
		}
	}

	.title_1 {
		font-size: 32rpx;
		font-weight: 500;
		color: #000000;
		padding: 26rpx 0;
	}


	.top_in_1 {
		padding: 44rpx 0 26rpx 0;
		border-bottom: 2rpx solid #E6E6E6;

		.row_3 {
			background-color: #F7F7F7;
			display: flex;
			align-items: center;
			height: 88rpx;
			position: relative;

			&:nth-of-type(2) {
				margin-top: 4rpx;
			}

			&:nth-of-type(3) {
				margin-top: 4rpx;
			}

			&:nth-of-type(4) {
				margin-top: 4rpx;
			}

			.left {
				font-size: 32rpx;
				font-weight: 500;
				color: #222222;
				margin-right: 64rpx;
				margin-left: 28rpx;
			}

			.right {
				flex: 1;

				input {
					width: 100%;
				}
			}
		}
	}



	.content_bottom {
		width: 100%;
		height: 90rpx;
		border-radius: 32rpx;
		background: #FD381E;
		text-align: center;
		line-height: 90rpx;
		color: #fff;
		font-size: 36rpx;
		margin-top: 32rpx;
	}
</style>
