import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/*全局 ajax请求*/
let count = 0
Vue.prototype.$http = (options,isshow = false) => {

	let header = {}

	const authorization = uni.getStorageSync('authorization')

	header['Authorization'] = `bearer ${authorization}`

	count++
	if(!isshow){
		uni.showLoading({
			title: '加载中',
			mask: true
		})
	}
	return uni.request({
		method: 'GET',
		...options,
		timeout: 5000,  
		//goufule.ecoci.cn   老的
		//ceshi.gflxds.com   新的  
		//gflxds.com 最新的
		//E:/前端/uniapp/财富乐/unpackage/debug/android_debug.apk
		url: `http://gflxds.com/api${options.url}`,
		header,
		timeout:20000
	}).then(res => {
		count--
		let data = res[1] && res[1].data
		if (!data) {
			data = {}
		}
		if (data.code == 401) {
			if (/thorized/.test(data.message)) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				})
			}
			uni.removeStorageSync('info')
			uni.removeStorageSync('authorization')
			uni.removeStorageSync('user')
			uni.removeStorageSync('login_info')
			uni.removeStorageSync('${user.username}sign_time')
		}
		if(count == 0){
			wx.hideLoading()
		}
		return res
	}, error => {
			
	})
}

App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()
