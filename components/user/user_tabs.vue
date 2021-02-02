<template>
	<view class="user_tabs content_top">
		<view class="user_tabs_in">
			<view @click="handleClick(index)" :style="{color:current == index?'#F43A3A':'#333333'}" class="tab" v-for="(item,index) in tabs">
				{{item.name}}
				<view class="bottom_line" v-show="current == index"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				current:0
			}
		},
		props:{
			tabs:{
				type:Array,
				default(){
					return []
				}
			}
		},  
		created(){
			uni.$on('changeTab',(index)=>{
				this.handleClick(index)
			})
		},
		methods:{
			handleClick(index){
				this.current = index
				uni.$emit('tabChange',index)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
