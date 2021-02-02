<template>
	<view class="login">
		<view class="avatar">
			<icon @click="back" class="iconfont icon-huise"></icon>
			<image src="@/static/images/login/bgc.png" mode=""></image>
		</view>
		<view class="login_box">
			<view class="box_in">
				<view class="box_in_login">
					<view class="username">
						<image src="@/static/images/login/user.png"></image>
						<input @input="setUsername" class="uni-input" focus placeholder="用户" />
					</view>
					<view class="password">
						<image src="@/static/images/login/pwd.png"></image>
						<input @input="setPassword" class="uni-input" type="password" focus placeholder="密码" />
					</view>
					<view class="no_pwd" @click="findPwd">
						<text>忘记密码?</text>
					</view>
					<view class="login_btn" @click="login">立即登录</view>
					<view v-model="password" class="res" @click="res">注册</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onLoad() {

		},
		mounted() {

		},
		//安卓可以转化为 backbutton事件
		onBackPress(options){
			//返回到首页
				uni.switchTab({
					url:'/pages/home/index'
				})
				return true
		},
		
		methods: {     
			async login() {
				const {  
					username,
					password
				} = this
				if (!username) {
					return uni.showToast({
						title: '用户名不能为空',
						icon: 'none'
					});
				} else if (!password) {
					return uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					});
				}
				const res = await this.$http({
					url: '/auth/login',
					data: {
						username,
						password
					}
				})
				const data = res[1].data
				if (data.code == 200) {
					const authorization = data.data.authorization
					//登录信息
					uni.setStorageSync('login_info', data.data)
					//token
					uni.setStorageSync('authorization', authorization)
					uni.setStorageSync('login_start_time',Date.now())
					// 保存密码
					uni.setStorageSync('info',{username,password})
					uni.showToast({
						title:'登录成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/home/index'
						})
					},500)
				}else{
					uni.showToast({
						title: data.message,
						icon: 'none'
					})
				}
			},
			setUsername(e) {
				this.username = e.detail.value.trim()
			},
			setPassword(e) {
				this.password = e.detail.value.trim()
			},
			back() {
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			findPwd() {
				uni.navigateTo({
					url: '/pages/find_pwd/index'
				})
			},
			res() {
				uni.navigateTo({
					url: '/pages/register/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '@/assets/css/login/index.scss'
</style>
