<template>
	<view class="register">
		<HomeNavbar title="找回密码"></HomeNavbar>
		<!-- <view class="login_box">
			<view class="box_in">
				<view class="box_in_login">
					<view class="username">
						<image src="@/static/images/login/user.png"></image>
						<input @input="changInput($event,1)" class="uni-input" focus placeholder="请输入用户名" />
					</view>
					<view class="phone">
						<image src="@/static/images/login/user.png"></image>
						<input @input="changInput($event,2)" class="uni-input" focus placeholder="手机号" />
					</view>
					<view class="code">
						<input @input="changInput($event,3)" class="uni-input" focus placeholder="请输入验证码" />
						<view class="btn" @click="send">发送短息</view>
					</view>
					<view class="password">
						<image src="@/static/images/login/pwd.png"></image>
						<input type="password" @input="changInput($event,4)" class="uni-input" focus placeholder="密码" />
					</view>
					<view class="res_btn" @click="find">找回密码</view>
				</view>
			</view>
		</view> -->
		<!-- 图片 -->
		<image ref="img" src="@/static/images/user/exclusive/bgc.png"></image>
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
				username: '',
				phone: '',
				code: '',
				password: ''
			}
		},
		onLoad() {
			uni.showModal({
				content: '请拨打客服电话',
				success(res) {
					if (res.confirm) {
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
						uni.switchTab({
							url: '/pages/home/index'
						})
					} else {
						uni.switchTab({
							url: '/pages/home/index'
						})
					}
				}
			})
		},
		methods: {
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
			},
			changInput(e, i) {
				const val = e.detail.value
				switch (i) {
					case 1:
						this.username = val
						console.log(1)
						break
					case 2:
						this.phone = val
						break
					case 3:
						this.code = val
						break
					case 4:
						this.password = val
						break
				}
			},
			async find() {
				const {
					username,
					phone,
					code,
					password
				} = this
				console.log(phone)
				const res = await this.$http({
					url: '/auth/forgetPassword',
					methods: 'post',
					data: {
						username,
						phone,
						code,
						password
					}
				})

				const data = res[1].data
				if (data.code == 200) {
					uni.showToast({
						title: '修改密码成功',
					})
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/find_pwd/index.scss';

	image {
		height: calc(100vh - 90rpx);
		width: 100vw;
	}
</style>
