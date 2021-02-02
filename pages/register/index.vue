<template>
	<view class="register">
		<HomeNavbar title="立即注册"></HomeNavbar>
		<view class="login_box">
			<view class="box_in">
				<view class="box_in_login">
					<view class="phone">
						<image src="@/static/images/login/user.png"></image>
						<input @input="setUsername" class="uni-input" focus placeholder="用户名" />
					</view>
					<!-- <view class="code">
						<input @input="setRepassword" class="uni-input" focus placeholder="请输入验证码"/>
						<view class="btn" @click="sendCode">发送短息</view>
					</view> -->
					<view class="password">
						<image src="@/static/images/login/pwd.png"></image>
						<input type="password" @input="setPassword" class="uni-input" focus placeholder="密码" />
					</view>
					<view class="password">
						<image src="@/static/images/login/pwd.png"></image>
						<input type="password" @input="setRepassword" class="uni-input" focus placeholder="再次输入密码" />
					</view>
					<view class="res_btn" @click="login">立即注册</view>
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
				username: '',
				password: '',
				repassword: '',
				mobile: ''
			}
		},
		methods: {
			setUsername(e) {
				this.username = e.detail.value.trim()
			},
			setRepassword(e) {
				this.repassword = e.detail.value.trim()
			},
			setPassword(e) {
				this.password = e.detail.value.trim()
			},
			//获取验证码
			async sendCode() {
				const mobile = this.username
				if (!mobile) {
					return uni.showToast({
						title: '用户名不能为空',
						icon: 'none'
					});
				}
				const res = await this.$http({
					url: '/sms/send',
					method: 'POST',
					data: {
						mobile
					}
				})
			},
			//登录
			async login() {
				const {
					username,
					password,
					repassword
				} = this
				if (!username) {
					return uni.showToast({
						title: '用户名不能为空',
						icon: 'none'
					});
				} else if (!repassword) {
					return uni.showToast({
						title: '验证码不能为空',
						icon: 'none'
					});
				} else if (!password) {
					return uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					});
				}
				if(repassword !== password){
					return uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					});
				}
				const res = await this.$http({
					url: '/auth/register',
					method: 'POST',
					data: {
						username,
						password,
						repassword
					},
				})
				const data = res[1].data
				if (data.code == 200) {
					uni.showToast({
						title: '注册成功'
					})
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pages/login/index'
						})
					},500)
				} else {
					uni.showToast({
						title: data.message,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/register/index.scss'
	
</style>
