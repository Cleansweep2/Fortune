<template>
	<view class="map_address">
		<HomeNavbar title="位置" />
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
		<view class="info-wrapper">
			<view class="selectType">
				<view @click="goTo('car')" class="type" :class="active === 'car' ? 'active' : ''">驾车</view>
				<view @click="goTo('walk')" class="type" :class="active === 'walk' ? 'active' : ''">步行</view>
				<view @click="goTo('ride')" class="type" :class="active === 'ride' ? 'active' : ''">骑行</view>
			</view>
			<view class="navigatePic" @click="handleNavigate">导航</view>
			<view class="info">
				<text>{{duration | formatTime}}</text>
				<text>{{distance | filterDistance}}公里</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import HomeNavbar from '@/components/home/home_navbar.vue'
	import amapFile from '@/lib/amp-appx.js'
	export default {
		components: {
			HomeNavbar
		},
		data() {
			return {
				title: 'map',
				store_name: '',
				store_address: '', //商家自填位置
				latitude: 28.193688, // 目的地的位置  
				longitude: 113.010925, // 目的地的位置
				key: '1327429bbdc12a73a335b2ad588a8bbd', // 高德导航的key
				distance: 0,
				duration: 0,
				maxDuration: false,
				curentLatitude: '',
				curentLongitude: '',
				active: 'car',
				polyline: null,
				markers: [{
					latitude: 28.193688,
					longitude: 113.010925,
					iconPath: '/static/images/home/plateform/dingwei.png',
					title: 'xxx',
					label: {
						content: 'xxx',
						color: '#F76350',
						bgColor: '#fff',
						padding: 5,
						borderRadius: 4
					},
					callout: {
						content: 'xxx',
						color: '#F76350',
						fontSize: 12
					}
				}]
			}
		},
		onLoad(options) {
			const {
				address,
				store_name,
				lat,
				lng
			} = options
			this.store_name = store_name
			this.latitude = lat
			this.longitude = lng
			this.store_address = address
			this.markers[0].latitude = lat;
			this.markers[0].longitude = lng;
			this.markers[0].label.content = store_name
			// 获取当前用户的位置
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					// 这里给你的位置赋值
					this.currentLatitude = res.latitude;
					this.currentLongitude = res.longitude;
				},
				fail: function() {
					console.log('fail')
				},
				complete: () => {
					// 默认调用开车方式
					this.goTo('car')
				}
			})
		},
		methods: {
			handleNavigate() {
				let latitude = parseFloat(this.latitude)
				let longitude = parseFloat(this.longitude)
				uni.openLocation({
					latitude,
					longitude,
					name: this.store_name,
					address: this.store_address,
					success: function() {
						console.log('success');
					},
					fail: function(err) {
						console.log(err)
					}
				});
			},
			drawPolyline(self, color) {
				return {
					origin: this.longitude + ',' + this.latitude,
					destination: this.currentLongitude + ',' + this.currentLatitude,
					success(data) {
						var points = [];
						if (data.paths && data.paths[0] && data.paths[0].steps) {
							var steps = data.paths[0].steps;
							for (var i = 0; i < steps.length; i++) {
								var poLen = steps[i].polyline.split(';');
								for (var j = 0; j < poLen.length; j++) {
									points.push({
										longitude: parseFloat(poLen[j].split(',')[0]),
										latitude: parseFloat(poLen[j].split(',')[1])
									})
								}
							}
						}
						self.distance = data.paths[0].distance;
						if (data.paths[0].distance / 1000 > 50) {
							self.maxDuration = true;
						} else {
							self.maxDuration = false;
						}
						self.duration = parseInt(data.paths[0].duration / 60),
							self.polyline = [{
								points: points,
								color: color,
								width: 6,
								arrowLine: true
							}]

					},
					fail(e) {
						console.log(e)
					},
					complete() {
						console.log('complate')
					}
				}
			},
			getPolyline(_type) {
				var amap = new amapFile.AMapWX({
					key: this.key
				});
				var self = this;
				switch (_type) {
					case 'car':
						amap.getDrivingRoute(this.drawPolyline(this, "#0091ff"));
						break;
					case 'walk':
						if (this.maxDuration) {
							return false;
						}
						amap.getWalkingRoute(this.drawPolyline(this, "#1afa29"));
						break;
					case 'ride':
						if (this.maxDuration) {
							return false;
						}
						amap.getRidingRoute(this.drawPolyline(this, "#1296db"));
						break;
					default:
						return false;
				}
			},  
			goTo(_type) {
				this.getPolyline(_type);
				this.active = _type;
			}
		}, 
		filters: {
			filterDistance(val) {   
				return (val / 1000).toFixed(2)
			},
			formatTime(val) {
				let time = (val / 60).toFixed(2)
				if(time <= 1){
					time = (time * 60).toFixed(2) + '分钟'
				}else{
					time = time + '小时'
				}
				return time
			}
		}
	}
</script>

<style>
	.map_address {
		height: 100vh;
		background-color: #f9f9f9;
	}

	/* 	 .map-wrapper {
	        position: absolute;
	        top: 0;
	        left: 0;
	        right: 0;
	        bottom: 150upx;
	        width: 100%;
	    }
	    .map-wrapper map {
	        width: 100%;
	        height: 100%;
	    } */
	.info-wrapper {
		background: #fff;
		height: 150upx;
		display: flex;
		flex-direction: column;
	}

	.selectType {
		position: relative;
		display: flex;
	}

	.selectType view {
		flex: 1;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
	}

	.type {
		border-bottom: 1px solid #ccc;
	}

	.type:last-child {
		border-right: none;
	}

	.type.active {
		color: #10D5AF;
		border-color: #10D5AF;
	}

	.navigatePic {
		position: absolute;
		right: 50rpx;
		background: #10D4AF;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		bottom: 50rpx;
		text-align: center;
		line-height: 120rpx;
		color: #fff;
		font-weight: bold;
	}

	.info {
		display: flex;
		flex-direction: row;
		line-height: 80upx;
		font-size: 32upx;
		font-weight: bold;
		padding: 20upx;
	}

	.info text {
		margin-right: 40upx;
	}
</style>
