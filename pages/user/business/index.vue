<template>
	<view class="withdrawal">
		<HomeNavbar title="商家申请"></HomeNavbar>
		<view class="content">
			<view class="content_top">
				<view class="row">
					<view class="left">店铺名称</view>
					<view ckass="right">
						<input @input="changInput($event,1)" placeholder="请输入店铺简称" />
					</view>
				</view>
				<view class="row">
					<view class="left">联系方式</view>
					<view ckass="right">
						<input @input="changInput($event,2)" placeholder="请输入联系电话" />
					</view>
				</view>
				<view class="row">
					<view class="left">联系人</view>
					<view ckass="right">
						<input @input="changInput($event,3)" placeholder="请输入联系人名称" />
					</view>
				</view>
				<view class="row">
					<view class="left">店铺类别</view>
					<view ckass="right">
						<view class="place">
							<picker @change="bindPickerChange" :value="index" :range="list">
								<view :style="{color:color,'font-size': '32rpx'}"> {{store_type || '请选择店铺类型'}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="left">商家地址</view>
					<view ckass="right">
						<input @input="changInput($event,5)" placeholder="x省 x市 x区 x街 x号" />
					</view>
				</view>
				<!-- <view class="row">
					<view class="left">商家区域</view>
					<view ckass="right">
						<input @input="changInput($event,6)" placeholder="请输入 1个人 2企业" />
					</view>
				</view> -->
			</view>

			<view class="content_middle">
				<view class="title">商家logo</view>
				<view class="icon" @click="chooseImg(1)">
					<image v-if="!img1" src="@/static/images/user/business/bgc1.png"></image>
					<image v-else :src="img1"></image>
				</view>
			</view>

			<view class="content_middle">
				<view class="title">营业执照</view>
				<view class="icon" @click="chooseImg(2)">
					<image v-if="!img" src="@/static/images/user/business/bgc1.png"></image>
					<image v-else :src="img"></image>
				</view>
			</view>

			<view @click="shenqing" class="content_bottom">
				提交
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
				index: 0,
				storeType: [],
				list: [],
				store_type: '',
				img1: '',
				img: '',
				store_area: '',
				store_type_id: '', //店铺类别	整数	是	1	
				store_logo_url: '', //商家logo	字符串	是		
				person_or_company: '', //商家身份	整数	是	1	1-个人，2-企业
				store_name: '', //店铺名称	字符串	是		
				store_address: '', //	店铺地址	字符串	是		
				store_user_name: '', //	联系人	字符串	是		
				store_user_phone: '', //	联系电话	字符串	是		
				business_license_no: '', //营业执照号	字符串	是		
				image1_url: '', //	营业执照照片	字符串	是		
				lat: '', //纬度	字符串	是		
				lng: '' //经度	字符串	是
			}
		},
		onLoad() {
			this.getStoreType()
		},
		methods: {
			//选择类型
			bindPickerChange(e) {
				const index = e.detail.value
				this.store_type = this.list[index]
				this.store_type_id = this.storeType[index].id
				console.log(this.store_type_id)
			},
			async getStoreType() {
				const res = await this.$http({
					url: '/store/typeList',
				})
				const data = res[1].data
				this.storeType = data.data
				console.log(data.data)
				const list = []
				data.data.forEach((v) => {
					list.push(v.type_name)
				})
				this.list = list
			},
			changInput(e, i) {
				const val = e.detail.value
				switch (i) {
					case 1:
						this.store_name = val
						break;
					case 2:
						this.store_user_phone = val
						break;
					case 3:
						this.store_user_name = val
						break;
					case 4:
						this.store_type_id = val
						console.log(this.store_type_id)
						break;
					case 5:
						this.store_address = val
						break;
					case 6:
						this.store_area = val
						break;
					case 7:
						this.business_license_no = val
						break;
				}
			},
			//申请成为商家
			async shenqing() {
				const {
					img,
					img1,
					store_area,
					store_type_id, //店铺类别	整数	是	1
					store_logo_url, //商家logo	字符串	是		
					person_or_company, //商家身份	整数	是	1	1-个人，2-企业
					store_name, //店铺名称	字符串	是		
					store_address, //	店铺地址	字符串	是		
					store_user_name, //	联系人	字符串	是		
					store_user_phone, //	联系电话	字符串	是		
					business_license_no, //营业执照号	字符串	是		
					image1_url, //	营业执照照片	字符串	是		
					lat, //纬度	字符串	是		
					lng, //经度	字符串	是
				} = this
				if (!store_name) {
					uni.showToast({
						title: '店铺名称不能为空',
						icon: 'none'
					})
				} else if (!store_user_phone) {
					uni.showToast({
						title: '联系方式不能为空',
						icon: 'none'
					})
				} else if (!store_user_name) {
					uni.showToast({
						title: '联系人不能为空',
						icon: 'none'
					})
				} else if (!store_type_id) {
					uni.showToast({
						title: '请选择店铺类别',
						icon: 'none'
					})
				} else if (!store_address) {
					uni.showToast({
						title: '商家地址不能为空',
						icon: 'none'
					})
				} else if (!img1) {
					uni.showToast({
						title: '请上传商家logo',
						icon: 'none'
					})
				} else if (!img) {
					uni.showToast({
						title: '请上传营业执照',
						icon: 'none'
					})
				}
				uni.getLocation({
					type: 'wgs84',
					geocode: true, //设置该参数为true可直接获取经纬度及城市信息
					success: async (res) => {
						let lat = res.latitude
						let lng = res.longitude
						console.log(res)
						const res1 = await this.$http({
							url: '/store/apply',
							methods: 'POST',
							data: {
								store_area: '1', // 商家区域	整数	是	1	1-个人，2-企业
								store_type_id, //店铺类别	整数	是	1
								store_logo_url: img1, //商家logo	字符串	是		
								store_name, //店铺名称	字符串	是		
								store_address, //	店铺地址	字符串	是		
								store_user_name, //	联系人	字符串	是		
								store_user_phone, //	联系电话	字符串	是		
								business_license_no: '123456789', //营业执照号	字符串	是		
								image1_url: img, //	营业执照照片	字符串	是		
								lat, //纬度	字符串	是		
								lng, //经度	字符串	是
							}
						})
						const data = res1[1].data
						if (data.code == 200) {
							uni.showToast({
								title: '申请成功'
							})
							//重新获取登录信息
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/user/index'
								})
							}, 500)
						} else {
							uni.showToast({
								title: data.message,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.showToast({
							title: '获取地址失败，将导致部分功能不可用',
							icon: 'none'
						});
					}
				});
			},
			//上传图片
			chooseImg(i) {
				let _this = this
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
								if (i == 1) {
									_this.img1 = data.data
								} else {
									_this.img = data.data
								}
								uni.showToast({
									title: '上传成功'
								})
							}
						});
					}
				});
			}
		},
		computed: {
			color() {
				return this.store_type ? '#000' : '#808080'
			}
		}
	}
</script>

<style lang="scss" scoped>
	input {
		width: 100%;
	}

	.content {
		background-color: #DCDCDC;
		padding: 34rpx 30rpx 0 30rpx;

		.content_top {
			width: 690rpx;
			padding: 36rpx 26rpx 43rpx 26rpx;
			//height: 460rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.row {
				margin-top: 8rpx;
				width: 100%;
				height: 88rpx;
				background-color: #F7F7F7;
				align-items: center;
				display: flex;
				padding: 0 28rpx;

				.left {
					font-size: 32rpx;
					color: #222222;
					margin-right: 64rpx;
				}

				input {
					font-size: 32rpx;
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

		.content_middle {
			margin-top: 28rpx;

			.title {
				padding-bottom: 28rpx;
				padding-left: 56rpx;
				color: #222222;
				font-size: 32rpx;
			}

			image {
				height: 285rpx;
				width: 100%;
			}
		}
	}
</style>
