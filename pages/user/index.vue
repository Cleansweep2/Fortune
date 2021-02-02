<template>
	<view class="user">
		<view class="user_box">
			<view class="user_info_box">
				<view class="user_bgc">
					<image src="../../static/images/user/bgc1.png"></image>
				</view>
				<view class="user_info">  
					<!-- 未登录 -->
					<view v-if="show" class="avatar top">
						<image src="../../static/images/user/user.png" mode=""></image>
					</view>
					<!-- 登录 -->
					<view v-if="!show" class="avatar top">
						<image :src="user.head_img || '../../static/images/user/user.png'" mode=""></image>
					</view>
					<!-- 未登录 -->
					<view class="bottom" v-if="show">
						<view class="login_res"><text @click="toLogin">登录</text>/<text @click="toRes">注册</text></viwe>
						</view>
					</view>
					<!-- 登录 -->
					<view class="bottom" v-else>  
						<view class="nick_name">{{user.real_name || '未实名'}}</view>  
						<view class="member_box">
							<view class="member" v-if="ispersonal">vip个人会员</view>
							<view class="member" v-else>vip商家会员</view>
						</view>
						<view class="member_num">乐购号:<text>{{user.username}}</text></view>
					</view>
				</view>
			</view>

			<!-- <view class="shangjia_xioafeizhe">
				<image src="../../static/images/user/shangjia.png" v-if="ispersonal" @click="toShenqing"></image>
				<image src="../../static/images/user/xiaofeizhe.png" @click="changshenfen" v-else></image>
			</view> -->

			<view class="img_box">
				<image src="@/static/images/user/radius.png" mode=""></image>
			</view>

			<!-- 用户 -->
			<view class="row" v-if="ispersonal">
				<view class="row_in">
					<view class="row_item" @click="toJiaoyi">
						<image src="@/static/images/user/jiaoyichenggong.png"></image>
						<view>交易中心</view>
					</view>
					<view class="row_item" @click="toTongji">
						<image src="@/static/images/user/tongji.png"></image>
						<view>个人明细</view>
					</view>
					<view class="row_item" @click="toLegou">
						<image src="@/static/images/user/legou.png"></image>
						<view>乐购中心</view>
					</view>
				</view>
			</view>

			<!-- 商家 -->
			<view class="row" v-if="!ispersonal">
				<view class="row_in">
					<view class="row_item" @click="toChongzhi">
						<image src="@/static/images/user/jiaoyichenggong.png"></image>
						<view>余额充值</view>
					</view>
					<view class="row_item" @click="toBaodan">
						<image src="@/static/images/user/baodan.png"></image>
						<view>购物详情</view>
					</view>
					<view class="row_item" @click="toShimingShop">
						<image src="@/static/images/user/renzheng.png"></image>
						<view>实名认证</view>
					</view>
				</view>
			</view>

			<!-- 用户专属  未登录-->
			<view class="money_box" v-if="ispersonal && show">
				<view class="money">
					<image src="../../static/images/user/bgc2.png"></image>
					<view class="money_info">
						<view class="top">
							<view class="left">
								<view class="left_1">购物积分</view>
								<view class="left_2">0</view>
								<view class="left_3">
									<view class="tixian" @click="toTixian">提现</view>
									<!-- <view class="mingxi" @click="toMingxi">明细</view> -->
								</view>
							</view>
							<view class="right">
								<image src="../../static/images/user/qian.png"></image>
							</view>
						</view>
						<view class="bottom">
							<view class="left">
								<view>余额 (元)</view>
								<view>0</view>
							</view>
							<view class="right">
								<view>累计收益</view>
								<view>0</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 用户专属 登录-->
			<view class="money_box" v-if="ispersonal && !show">
				<view class="money">
					<image src="../../static/images/user/bgc2.png"></image>
					<view class="money_info">
						<view class="top">
							<view class="left">
								<view class="left_1">余额 (元)</view>
								<view class="left_2">{{user.user_money || 0.00}}</view>
								<view class="left_3">
									<view class="tixian" @click="toTixian">提现</view>
									<view class="mingxi" @click="toMingxi">明细</view>
								</view>
							</view>
							<view class="right">
								<image src="../../static/images/user/qian.png"></image>
							</view>
						</view>
						<view class="bottom">
							<view class="left">
								<view>待分润积分</view>
								<view>{{user.left_income | left_income}}</view>
							</view>
							<view class="right">
								<view>累计收益</view>
								<view>{{user.total_income}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="ispersonal" class="gwjf">
				<view class="left">购物积分</view>
				<view class="right">{{user.integral}}</view>
			</view>

			<view class="service" :class="{isShow:!ispersonal}">
				<!-- <view v-if="!ispersonal" class="service_item" @click="toChongzhi">
					<image src="@/static/images/user/qian1.png"></image>
					<text>余额充值</text>
				</view> -->
				<view v-if="!ispersonal" class="service_item" @click="goodsAdmin">
					<image src="@/static/images/user/bao.png"></image>
					<text>商品管理</text>
				</view>
				<view v-if="ispersonal" class="service_item" @click="toShenqing">
					<image src="@/static/images/user/chengwei.png"></image>
					<text>成为商家</text>
				</view>
				<view class="service_item" @click="toZhuanshu">
					<image src="@/static/images/user/kefu.png"></image>
					<text>专属客服</text>
				</view>
				<view class="service_item" @click="toEdit">
					<image src="@/static/images/user/edit.png"></image>
					<text>我的设置</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MingPop from '@/components/ming-pop/ming-pop.vue'
	export default {
		components: {
			MingPop
		},
		data() {
			return {
				//登录前和登录后显示
				show: true,
				//判断是不是个人
				ispersonal: true,
				user: {},
				isTogg: false
			}
		},
		onLoad() {

		},
		async onShow() {
			//判断登录是否失效
			const login_start_time = uni.getStorageSync('login_start_time')
			const time = Date.now() - login_start_time
			
			if (time >= 7200000 && login_start_time) {
				uni.removeStorageSync('authorization')
				uni.removeStorageSync('user')
				uni.removeStorageSync('login_info')
				uni.removeStorageSync('login_start_time')
				uni.showToast({
					title: '请重新登录',
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}, 1000)
				return
			}
			const login_info = uni.getStorageSync('login_info')
			
			if (!login_info) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}, 1000)
				return
			}
			
			//判断为商家还是 个人
			if (login_info.identify == "person") {
				this.ispersonal = true
			} else if (login_info.identify == 'store') {
				this.ispersonal = false
			}
			
			//判断是否登录
			const authorization = uni.getStorageSync('authorization')
			if (authorization) {
				await this.getUserDetail()
			} else if (!authorization) {
				this.show = true
				this.user = {}
			}
		},
		methods: {
			changshenfen() {
				this.ispersonal = !this.ispersonal
			},
			//获取会员详情
			async getUserDetail() {
				const res = await this.$http({
					url: '/user/detail'
				},true)  
				const data = res[1].data
				const user = data.data
				this.user = user
				this.show = false
				uni.setStorageSync('user', user)
				if (user.identify == 'store') {
					this.ispersonal = false
				} else if (user.identify == "person") {
					this.ispersonal = true 
				}
			},
			/*共有*/
			//去专属
			toZhuanshu() {
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
			//去设置
			toEdit() {
				uni.navigateTo({
					url: '/pages/user/edit/index'
				})
			},
			//去交易中心
			toJiaoyi() {
				uni.navigateTo({
					url: '/pages/user/transaction/index'
				})
			},

			/*商家独有*/
			//去充值中心
			//商家实名认证
			toShimingShop(){
				uni.navigateTo({
					url: '/pages/user/real_name_shop/index'
				})
			},
			//去商品管理
			goodsAdmin() {
				uni.navigateTo({
					url: '/pages/user/goods_admin/index'
				})
			},
			toChongzhi() {
				const user = this.user
				if(!user.real_name){
					uni.showToast({
						title:'请先实名认证',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/user/business/index'
						})
					},1000)
					return
				}
				uni.navigateTo({
					url: '/pages/user/recharge/index'
				})
			},
			//会员报单
			toBaodan() {
				const user = this.user
				if(!user.real_name){
					uni.showToast({
						title:'请先实名认证',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/user/business/index'
						})
					},1000)
					return
				}
				uni.navigateTo({
					url: '/pages/user/declaration/index'
				})
			},
			toJiaoyiShop() {
				uni.navigateTo({
					url: '/pages/user/transaction_shop/index'
				})
			},

			//去实名
			toShiming() {
				uni.navigateTo({
					url: '/pages/user/real_name/index'
				})
			},
			/*用户独有*/
			//去明细
			toMingxi() {
				uni.navigateTo({
					url: '/pages/user/transaction/index'
				})
			},
			//去乐购中心
			toLegou() {
				uni.navigateTo({
					url: '/pages/user/tesco/index'
				})
			},
			//去商家申请
			toShenqing() {
				// const login_info = uni.getStorageSync('login_info')
				// if (login_info.identify == 'store') {
				// 	this.isTogg = true
				// 	this.ispersonal = false
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pages/user/business/index'
				// 	})
				// }
				uni.navigateTo({
					url: '/pages/user/business/index'
				})
			},
			//提现
			toTixian() {
				const user = this.user
				if(user.real_name){
					uni.navigateTo({
						url: '/pages/user/withdrawal/index'
					})
				}else{
					uni.showToast({
						title:'请先完成实名认证',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/user/real_name/index'
						})
					},1000)
				}
			},
			//统计
			toTongji() {
				uni.navigateTo({
					url: '/pages/user/statistics/index'
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			toRes() {
				uni.navigateTo({
					url: '/pages/register/index'
				})
		},
		filters:{
			left_income(val){
				if(val <= 0){
					return 0
				}else if(val > 0){
					return val
				}
			}
		}
	},
}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/user/index.scss';

	.gwjf {
		background-color: #fff;
		padding: 35rpx 70rpx;
		color: #666;
		display: flex;
		justify-content: space-between;
		margin-top: 15rpx;

		.left {
			font-size: 30rpx;
		}

		.right {
			font-size: 28rpx;
			color: #FF0000;
		}
	}

	.user_box {
		position: relative;
	}
</style>
