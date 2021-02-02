<template>
	<view class="declaration">
		<HomeNavbar title="会员报单"></HomeNavbar>
		<scroll-view @scrolltolower="lower" :scroll-y="true" class="scroll-y">
			<view class="content">
				<view class="user_tabs content_top">
					<view class="user_tabs_in">
						<view @click="handleClick(index)" :style="{color:current == index?'#F43A3A':'#333333'}" class="tab" v-for="(item,index) in tabs">
							{{item.name}}
							<view class="bottom_line" v-show="current == index"></view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<UserDetaild :List="List" v-show="current == 0"></UserDetaild>
				</view>
			</view>
			<view class="add" v-show="current == 1">
				<view class="card">
					<view class="list">
						<view class="list_item">
							<view class="item_in">
								<text>乐购会员号:</text> <input @blur="blur" :value="username" @input="changInput($event,1)" type="text" />
								<view class="real_name">{{real_name}}</view>
							</view>
						</view>
						<view class="list_item">
							<view class="item_in">
								<text>商品名称:</text> <input :value="goods_name" @input="changInput($event,2)" type="text" />
							</view>
						</view>
						<view class="list_item">
							<view class="item_in">
								<text>购买时间:</text> <view class="time" type="text" >{{time}}</view>
							</view>
						</view>
						<view class="list_item">
							<view class="item_in">
								<text>商品金额:</text> <input :value="declaration_money" @input="changInput($event,5)" type="text" />
							</view>
						</view>
					</view>
				</view>
				<view class="bbb">
					<view class="content_middle">
						<view class="title">发票上传</view>
						<view class="icon" @click="chooseImg">
							<image v-if="!img1" src="@/static/images/user/business/bgc1.png"></image>
							<image v-else :src="img1"></image>
						</view>
					</view>

					<view class="content_bottom" @click="baodan">
						提交
					</view>
				</view>
			</view>
			<view class="eject" v-if="show" @click.self="cancle">
				<image src='@/static/images/user/baodan_sucess.png'></image>
			</view>
			<view class="none" v-if="show1">
				已到达底部
			</view>
		</scroll-view>
		<w-picker
		    :visible.sync="visible2"
		    mode="date" 
		    startYear="2017" 
		    endYear="2029"
		    value="2020-03-07"
		    :current="true"
		    fields="day"
		    @confirm="onConfirm($event,'date1')"
		    @cancel="onCancel"
		    :disabled-after="true"
		    ref="picker" 
		></w-picker>
	</view>
</template>

<script>
	/*商家会员报单*/
	import HomeNavbar from '@/components/home/home_navbar.vue'
	import UserDetaild from '@/components/user/user_detailed.vue'
	import MingPop from '@/components/ming-pop/ming-pop.vue'
	//日期选择
	import wPicker from "@/components/w-picker/w-picker.vue";  
	export default {
		components: {
			HomeNavbar,
			UserDetaild,  
			MingPop,
			wPicker,
		},
		data() {
			return {
				visible2:false,
				show1:false,
				List: [],
				img1: '',
				show: false,
				current: 0,
				tabs: [{
						name: '购物明细'
					},
					{
						name: '重复购物'
					}
				],
				pages: {
					page_size: 10,
					page: 1
				},
				username: '', //会员名
				goods_name: '', //商品名称
				declaration_money: '', //商品价格
				receipt: '' ,//发票图片
				time:'',
				num:'',
				real_name:'' //真实姓名
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			handleClick(index){
				this.current = index
				if(index == 0){
					this.pages.page = 1
					this.show1 = false
					this.List = []
					this.getList()
				}else if(index == 1){
					const date = new Date()
					this.time = this.ftime(date)
					uni.hideToast()  
				}
			},
			ftime(val) {
				val = val
				function add0(m) {
					return m < 10 ? '0' + m : m
				}
				var time = new Date(val);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + add0(m) + '-' + add0(d) 
				// return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
			},
			//失去焦点后
			async blur(){
				this.real_name = ''
				let username = this.username
				if(!username.trim()) return 
				const res = await this.$http({
					url:'/declaration/checkUser',
					method:'post',
					data:{
						username
					}
				})
				const data = res[1].data
				if(data.code == 200){
					if(!data.data){
						uni.showToast({
							title:'该报单用户暂无完成实名认证',
							icon:'none'
						})
						setTimeout(()=>{
							uni.hideToast()
							this.current = 0
						},1000)
						return
					}
					this.real_name = data.data
				}else{
					uni.showToast({
						title:data.message,
						icon:'none'
					})
				}
			},
			onConfirm(obj){
				obj = obj.obj
				this.time = `${obj.year}-${obj.month}-${obj.day}`
			},
			//到达底部
			lower(){
				this.pages.page += 1 
				this.getList()
			},
			changInput(e, i) {
				const val = e.detail.value
				switch (i) {
					case 1:
						if(val.length == 0){
							this.real_name = ''
						}
						this.username = val
						break;
					case 2:
						this.goods_name = val
						console.log(this.goods_name)
						break;
					case 3:
						break;
					case 4:
					 this.num = val
					 break
					case 5:
						this.declaration_money = val
						break
				}  
			},
			//获取报单列表
			async getList() { 
				if(this.show1) return 
				const res = await this.$http({
					url: '/declaration/lists',
					data: {
						page: this.pages.page,
						page_size: this.pages.page_size
					}
				})
				const data = res[1].data
				if (data.code == 200) {
					if (data.data.length == 0 && this.pages.page == 1) {
						uni.showToast({
							title: '暂无数据',
							icon: 'none'
						})
						this.show1 = true
					}else if(data.data.length == 0 && this.pages.page != 1){
						this.show1 = true
					}
					this.List = [...this.List,...data.data]
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					})
				}
			},
			//报单
			async baodan() {
				const res = await this.$http({
					url: '/declaration/create',
					method: 'post',
					data: {
						declaration_time:this.time,
						username: this.username,
						receipt: this.img1,
						goods_name: this.goods_name,
						declaration_money: this.declaration_money
					}
				})
				const data = res[1].data
				if (data.code == 200) {
					this.show = true
					this.username = '' //会员名
					this.goods_name= '' //商品名称
					this.declaration_money= '' //商品价格
					this.receipt= '' //发票图片
					this.time = '' //日期
					this.num = ''  //数量
					setTimeout(()=>{
						this.show = false
						this.handleClick(0)
					},1000)
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					})
				}
			},
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
								_this.img1 = data.data
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
			setShow() {

			},
			cancle() {
				this.show = false
			},
			setPopup() {
				this.$refs.pop.show()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-y {
		height: calc(100vh - 88rpx);
		background-color: #DCDCDC;
	}

	.content {
		background-color: #DCDCDC;
		padding-top: 6rpx;

		.bottom {
			background-color: #fff;
			margin-top: 12rpx;
		}
	}

	.card {
		background-color: #fff;
		border-radius: 20rpx;
		margin: 0 auto;
		// height: 572rpx;
		width: 702rpx;

		.list {
			height: 100%;
			display: flex;
			flex-direction: column;

			.list_item {
				padding: 0 22rpx;
				height: 114rpx;
				&:nth-of-type(1){
					height: 150rpx;
				}
				&:nth-last-of-type(1) {
					.item_in {
						border: none !important;
					}
				}

				.item_in {
					height: 100%;
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
					display: flex;
					align-items: center;
					border-bottom: 2rpx solid #9A9A9A;
					position: relative;
					input {
						padding-left: 10rpx;
					}
				}
			}
		}
	}

	.content_middle {
		margin-top: 28rpx;

		.title {
			padding-bottom: 28rpx;
			padding-left: 20rpx;
			color: #222222;
			font-size: 32rpx;
		}

		image {
			height: 285rpx;
			width: 100%;
		}
	}

	.content_bottom {
		width: 100%;
		height: 90rpx;
		border-radius: 32rpx;
		background-image: linear-gradient(#FF794F, #FF4740);
		text-align: center;
		line-height: 90rpx;
		color: #fff;
		font-size: 36rpx;
		margin-top: 32rpx;
	}

	.bbb {
		width: 628rpx;
		height: 233rpx;
		margin: 0 auto;
	}

	.eject {
		position: absolute;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .5);
		top: 0;
		left: 0;
		z-index: 99999999;

		image {
			width: 476rpx;
			height: 552rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.time{
		width: 60%;
		height: 80%;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		padding-left: 10rpx;
	}
	
	.real_name{
		position: absolute;
		bottom: 10rpx;
		left:50%;
		transform: translateX(-50%);
		color: red;
		font-size: 26rpx;
	}
</style>
