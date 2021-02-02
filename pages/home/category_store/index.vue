<template>
	<view>
		<HomeNavbar :title="store_name"></HomeNavbar>
		<scroll-view @scroll="scroll" :scroll-top="scrollTop" class="scroll-y" :scroll-y="true" @scrolltolower="lower">
			<HomeShop :show1="show1" :shop-list="shopList"></HomeShop>
		</scroll-view>
		<goTop @click.native="goTop"></goTop>
	</view>
</template>

<script>
	import HomeNavbar from '@/components/home/home_navbar.vue'
	import HomeShop from '@/components/home/home_shop.vue'
	import goTop from '@/components/go-top.vue'
	export default {
		components:{
			HomeNavbar,
			HomeShop,
			goTop
		},
		data() {
			return {
				scrollTop:0,
				old: {
					scrollTop: 0
				},
				store_name:'',
				id:'',
				pages:{
					page:0,
					page_size:10
				},
				shopList:[],
				show1:false
			}
		},
		onLoad(options){
			const {store_name,id} = options 
			this.store_name = store_name
			this.id = id
			this.getShopList()
		},
		methods: {
			scroll(e){
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			async getShopList() {
				if(this.show1) return
				const res = await this.$http({
					url: '/store/lists',
					data: {
						page: this.pages.page,
						page_size: this.pages.page_size,
						store_type_id: this.id ,
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
					}else if(data.data.length == 0&& this.pages.page != 1){
							this.show1 = true
					}
					this.shopList = [...this.shopList,...data.data]
				}
			},
			lower(){
				this.pages.page += 1
				this.getShopList()
			}
		}
	}
</script>

<style lang="scss" scoped>

.scroll-y{
	height: calc(100vh - 88rpx);
	background-color: #dcdcdc;
}
</style>
