<template>
    <div id="Posters">
        <!-- 海报 -->
        <swiper :options="swiperOption">
            <swiper-slide>
                <div class="swiper-slide-content">
                    <div class="bill_pic"><img src="img/haibao.png" /></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                        <img src="img/cz.jpg"  class="avator_48">
                        <div>
                            <p><span class="blod">陈忠陈忠陈忠</span></p>
                            <p class="color_gray font_12">邀您加入蜡笔优课</p>
                        </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code">
                        <img src="img/code.png" >
                        </div>
                        <!-- 邀请人二维码结束 -->
                    </div>
                    <!-- 邀请信息结束 -->
                </div>
                <!-- 海报名称开始 -->
                <div class="bill_name font_16">蜡笔优课平台介绍</div>
                <!-- 海报名称结束 -->
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide-content">
                    <div class="bill_pic"><img src="img/haibao2.jpg" /></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                        <img src="img/cz.jpg"  class="avator_48">
                        <div>
                            <p><span class="blod">陈旭</span></p>
                            <p class="color_gray font_12">邀您加入蜡笔优课</p>
                        </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code">
                        <img src="img/code.png" >
                        </div>
                        <!-- 邀请人二维码结束 -->
                    </div>
                    <!-- 邀请信息结束 -->
                </div>
                <!-- 海报名称开始 -->
                <div class="bill_name font_16">蜡笔优课教务服务介绍</div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide-content">
                    <div class="bill_pic"><img src="img/haibao3.jpg" /></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                        <img src="img/cz.jpg"  class="avator_48">
                        <div>
                            <p><span class="blod">胡祝丰</span></p>
                            <p class="color_gray font_12">邀您加入蜡笔优课</p>
                        </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code">
                        <img src="img/code.png" >
                        </div>
                        <!-- 邀请人二维码结束 -->
                    </div>
                    <!-- 邀请信息结束 -->
                </div>
                <!-- 海报名称开始 -->
                <div class="bill_name font_16">蜡笔优课营销服务介绍</div>
                <!-- 海报名称结束 -->
            </swiper-slide>
            
        </swiper>
        <!-- 操作区 -->
        <div class="bill_btn">
            <a class="agent_btn btn_blue_border"><span class="iconfont">&#xe75f;</span>分享</a>
            <button class="agent_btn btn_blue" id="save_bill"><span class="iconfont">&#xe74d;</span>保存</button>
        </div>
    </div>
</template>
<script>
    import 'flex.css'
    import '../../css/agent/iconfont.css'
    import '../../css/agent/agent.css'
    import { swiper,swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    // var mySwiper = new Swiper(".swiper-container", {
    //     slidesPerView: "auto",
    //     centeredSlides: !0,
    //     watchSlidesProgress: !0,
    //     onProgress: function(a) {
    //         var b, c, d
    //         for (b = 0; b < a.slides.length; b++) c = a.slides[b]
    //         d = c.progress
    //         scale = 1 - Math.min(Math.abs(.2 * d), 1)
    //         es = c.style
    //         es.opacity = 1 - Math.min(Math.abs(d / 2), 1)
    //         es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)"
    //     },
    //     onSetTransition: function(a, b) {
    //         for (var c = 0; c < a.slides.length; c++) es = a.slides[c].style
    //         es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
    //     },
    // });
    // var mySwiper = new Swiper('.swiper-container',{
    //     effect : 'coverflow',
    //     slidesPerView: 3,
    //     centeredSlides: true,
    //     coverflowEffect: {
    //         rotate: 30,
    //         stretch: 10,
    //         depth: 60,
    //         modifier: 2,
    //         slideShadows : true
    //     },
    // })
    export default {
        name:'Posters',
        data(){
            return{
                swiperOption:{
                    effect : 'coverflow',
                    slidesPerView: 3,
                    centeredSlides: true,
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 10,
                        depth: 60,
                        modifier: 2,
                        slideShadows : true
                    },
                }
            }
        },
        components:{
            swiper,
            swiperSlide
        },
        mounted(){
            // var index = this.GetQueryValue('slide') || 0;
            // mySwiper.slideTo(index, 1000, false);//切换到第一个slide，速度为1秒
        },
        methods:{
            // GetQueryValue(queryName){
            //     var query = decodeURI(window.location.search.substring(1));
            //     var vars = query.split("&");
            //     for (var i = 0; i < vars.length; i++) {
            //         var pair = vars[i].split("=");
            //         if (pair[0] == queryName) { return pair[1]; }
            //     }
            //     return null;
            // }
        }
    }
</script>