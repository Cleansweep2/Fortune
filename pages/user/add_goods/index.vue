<template>
	<view class="withdrawal">
		<HomeNavbar title="添加商品"></HomeNavbar>
		<view class="content">

			<view class="content_top">
				<view class="row">
					<view class="left">商品类别</view>
					<view ckass="right">
						<view class="place">
							<picker @change="bindPickerChange" :value="index" :range="list">
								<view :style="{color:type_name == '' ? '#808080' : '#000'}"> {{type_name || '请选择商品类型'}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="left">商品名称</view>
					<view ckass="right">
						<input @input="changeInput($event,2)" placeholder="请输入商品名称" />
					</view>
				</view>
				<view class="row">
					<view class="left">商品售价</view>
					<view ckass="right">
						<input @input="changeInput($event,3)" placeholder="请输入销售价格" />
					</view>
				</view>
				<view class="row">
					<view class="left">剩余数量</view>
					<view ckass="right">
						<input @input="changeInput($event,5)" placeholder="请输入商品数量" />
					</view>
				</view>
			</view>

			<view class="content_middle">
				<view class="title">商品图片</view>
				<view class="icon" @click="chooseImg">
					<image v-if="!img" src="@/static/images/user/business/bgc1.png"></image>
					<image v-else :src="img"></image>
				</view>
			</view>

			<view @click="add" class="content_bottom">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import HomeNavbar from '@/components/home/home_navbar.vue'
	import LdSelect from '@/components/ld-select/eval5.min.js'
	export default {
		components: {
			HomeNavbar,
			LdSelect
		},
		data() {
			return {
				index: 0,
				type_name: '',
				img: '',
				goods_cat_id: '', //	商品类别	整数	
				goods_name: '', //	商品名称	字符串		
				out_price: '', //	销售价格	字符串		
				goods_image_url: '', //	图片地址	字符串	
				goods_count: '', //剩余数量
				goodsType: [],
				list: []
			}
		},
		onLoad() {
			this.getGoodsType()
		},
		methods: {
			bindPickerChange(e) {
				const index = e.detail.value
				this.index = index
				this.type_name = this.list[index]
				this.goods_cat_id = this.goodsType[index].id
				console.log(this.goodsType[index].id)
			},
			selectChange(i) {
				console.log(i)
			},
			async getGoodsType() {
				const res = await this.$http({
					url: '/store/goodsType',
				})
				console.log(res)
				const data = res[1].data
				if (data.code == 200) {
					this.goodsType = data.data
					const list = []
					data.data.forEach((v) => {
						list.push(v.type_name)
					})
					this.list = list
				}
			},
			changeInput(e, i) {
				const val = e.detail.value
				switch (i) {
					case 1:
						this.goods_cat_id = val
						break
					case 2:
						this.goods_name = val
						break
					case 3:
						this.out_price = val
						break
					case 4:
						this.in_price = val
						break
					case 5:
						this.goods_count = val
						break
				}
			},
			async add() {
				const {
					img,
					goods_cat_id, //	商品类别	整数	
					goods_name, //	商品名称	字符串		
					out_price, //	销售价格	字符串		
					in_price, //商品进价
					goods_count //剩余
				} = this
				const res = await this.$http({
					method: 'post',
					url: '/store/addGoods',
					data: {
						goods_cat_id, //	商品类别	整数	
						goods_name, //	商品名称	字符串		
						out_price, //	销售价格	字符串		
						goods_count,
						goods_image_url: img || 'http://goufule.ecoci.cn/uploads/20201209/abae725fccdd32ea3b791f9721daf449.jpg' //	图片地址	字符串	
					}  
				})
				const data = res[1].data
				if (data.code == 200) {
					uni.showToast({
						title: '添加成功'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/user/goods_admin/index'
						})
					}, 500)
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					})
				}
			},

			chooseImg() {
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
								_this.img = data.data
							}
						});
					}
				});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.input {
		border: none !important;
	}

	.content {
		height: calc(100vh - 96rpx);
		background-color: #DCDCDC;
		padding: 34rpx 30rpx 0 30rpx;

		.content_top {
			width: 690rpx;
			padding: 36rpx 26rpx 43rpx 26rpx;
			// height: 460rpx;
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
