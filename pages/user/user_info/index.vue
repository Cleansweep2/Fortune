<template>
	<view class="user_info">
		<HomeNavbar title="资料中心"></HomeNavbar>
		<view class="row1">
			<image v-if="user.head_img && !head_img" @click="chooseImg" :src="user.head_img"></image>
			<image v-if="!user.head_img && !head_img" @click="chooseImg" src="@/static/images/user/user.png"></image>
			<image v-if="head_img" @click="chooseImg"></image>
			<view v-if="!nick_name" @click="setShow(1)" class="nickname">{{user.nick_name || user.username}}</view>
			<view v-if="nick_name" @click="setShow(1)" class="nickname">{{nick_name}}</view>
			<view class="iconfont icon-bianji" @click="setShow(1)"></view>
		</view>

		<view class="row2">
			<view class="top">个人信息</view>
			<view class="bottom">完善个人信息有利于提高信用分</view>
		</view>

		<view class="row3 row_top_1">
			<view class="row_in">
				<view class="left">性别 <text style="padding-left: 40rpx;">{{user.sex | sex1}}</text></view>
				<view class="right">
					<view class="place" @click="setShow(2)">请选择你的性别 {{sex | sex1}}</view>
					<view class="iconfont icon-qianjin"></view>
				</view>
			</view>
		</view>

		<!-- 	<view class="row3">
			<view class="row_in">
				<view class="left">年龄 {{user.age}}</view>
				<view class="right">
					<view class="place" @click="setShow(3)">
						<picker  @change="bindPickerChange" :range="array">
							<view>请选择你的年龄 {{age}}</view>
						</picker>
					</view>
					<view class="iconfont icon-qianjin"></view>
				</view>
			</view>
		</view> -->

		<view class="row3">
			<view class="row_in">
				<view class="left">手机号</view>
				<input v-show="!phone" :value="user.phone" @input="setPhone" />
				<input v-show="phone" :value="phone" @input="setPhone" />
			</view>
		</view>

		<view class="content_bottom" @click="editInfo">
			提交
		</view>

		<MingPop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="90">
			<input @input="setNickname" class="inp" type="text" placeholder="输入昵称" />
		</MingPop>
		<MingPop ref="pop1" direction="center" :is_close="true" :is_mask="true" :width="90">
			<view style="display:flex">
				<view @click="setSex(index)" v-for="(item,index) in sexL" :key="index">
					<radio :value="item.value" :checked="current == index" /> {{item.name}}
				</view>
			</view>
		</MingPop>
		<!-- <MingPop ref="pop2" direction="center" :is_close="true" :is_mask="true" :width="60">
			
		</MingPop> -->
	</view>
</template>

<script>
	import HomeNavbar from '@/components/home/home_navbar.vue'
	import MingPop from '@/components/ming-pop/ming-pop.vue'
	export default {
		components: {
			HomeNavbar,
			MingPop
		},
		data() {
			return {
				user: {},
				age: '',
				sex: '',
				nick_name: '',
				phone: '',
				head_img: '',
				current: 0,
				sexL: [{
						value: 1,
						name: '男'
					},
					{
						value: 2,
						name: '女'
					},
					{
						value: 0,
						name: '保密'
					}
				]
			}
		},
		onShow() {
			const user = uni.getStorageSync('user')
			if (user) {
				this.user = user
			}
		},
		methods: {
			//获取会员详情
			async getUserDetail() {
				const res = await this.$http({
					url: '/user/detail'
				})
				const data = res[1].data
				const user = data.data
				this.user = user
				getApp().globalData.user = user
				uni.setStorageSync('user', user)
			},

			chooseImg() {
				const _this = this
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
								_this.head_img = data.data
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
			},
			setNickname(e) {
				this.nick_name = e.detail.value
			},
			//修改资料
			async editInfo() {
				const user = this.user
				const sex = this.sex || this.sexL[this.current].value
				const nick_name = this.nick_name || user.username
				const phone = this.phone || user.phone
				const head_img = this.head_img || user.head_img
				console.log(user)
				const res = await this.$http({
					url: '/user/update',
					methods: 'POST',
					data: {
						sex,
						nickname: nick_name,
						phone,
						head_img
					}
				})
				if (res[1].data.code == 200) {
					uni.showToast({
						title: '资料修稿成功',
					})
					this.getUserDetail()
				} else {
					uni.showToast({
						title: '修改失败',
						icon: 'none'
					})
				}
			},
			//手机号
			setPhone(e) {
				this.phone = e.detail.value.trim()
			},
			//性别
			setSex(index) {
				this.current = index
			},
			//头像
			changHead() {

			},
			//年龄
			bindPickerChange(val) {
				this.age = val.detail.value + 1
			},
			setShow(i) {
				if (i == 1) {
					this.$refs.pop.show();
				} else if (i == 2) {
					this.$refs.pop1.show()
				} else if (i == 3) {
					this.$refs.pop2.show()
				}
			},
		},
		computed: {
			array() {
				const array = []
				for (let i = 1; i <= 100; i++) {
					array.push(i)
				}
				return array
			}
		},
		filters: {
			sex1(val) {
				switch (val) {
					case 1:
						return '男'
						break
					case 2:
						return '女'
						break
					case 0:
						return '保密'
						break
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.inp {
		// font-size: 26rpx;
	}

	page {
		background-color: #F9F9F9;
	}

	.row1 {
		padding: 63rpx 53rpx 76rpx 53rpx;
		display: flex;
		align-items: center;

		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}

		.nickname {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			padding-left: 38rpx;
		}

		.iconfont {
			color: #999999;
			font-size: 22rpx;
			padding-left: 22rpx;
			padding-top: 6rpx;
		}
	}

	.row2 {
		padding: 0 40rpx;

		.top {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}

		.bottom {
			padding-top: 16rpx;
			font-size: 20rpx;
			font-weight: 400;
			color: #999999;
		}
	}

	.row_top_1 {
		padding-top: 26rpx;
	}

	.row3 {
		.row_in {
			height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 40rpx;
			border-bottom: 1rpx solid #e1e1e1;

			.left {
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}

			.right {
				font-size: 20rpx;
				font-weight: 400;
				color: #999999;
				display: flex;
				align-items: center;

				.iconfont {
					font-size: 20rpx;
					color: #999;
					padding-left: 32rpx;
				}
			}
		}
	}

	input {
		flex: 1;
		padding-left: 40rpx;
		color: #666;
	}

	.content_bottom {
		position: absolute;
		width: 636rpx;
		left: 50%;
		transform: translate(-50%);
		bottom: 30rpx;
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
