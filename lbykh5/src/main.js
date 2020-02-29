import Vue from 'vue'

import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import Ip from '../src/js/ip/ip.js';
import Url from '../src/js/ip/getdata.js'
import device from '../src/js/ip/device'


//vantUI
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(Lazyload)
import { Swipe, SwipeItem, Image } from 'vant'
Vue.use(Swipe).use(SwipeItem).use(Image)

import 'lib-flexible'


import VueAMap from 'vue-amap'
Vue.use(VueAMap);

//瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

import axios from 'axios'
Vue.prototype.$axios = axios

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
 
Vue.use(VideoPlayer)

Vue.use(require('vue-wechat-title'));
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.prototype.$ip = Ip;
Vue.prototype.$Url = Url
Vue.prototype.$device = device

import { store } from '../store/index'

import App from './App'
import router from './router'

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')