<template>
    <div id="Posters" style="background:#f6f6f6;padding:16px">
        <!-- 海报 -->
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
                <div class="swiper-slide-content" ref="slide">
                    <div class="bill_pic"><img src="../../images/agent/haibao.png" /></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                        <img src="http://img2.imgtn.bdimg.com/it/u=2849782395,3149637093&fm=11&gp=0.jpg"  class="avator_48">
                        <div>
                            <p><span class="blod">陈忠陈忠陈忠</span></p>
                            <p class="color_gray font_12">邀您加入蜡笔优课</p>
                        </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code"></div>
                        <!-- 邀请人二维码结束 -->
                    </div>
                    <!-- 邀请信息结束 -->
                </div>
                <!-- 海报名称开始 -->
                <div class="bill_name font_16">蜡笔优课平台介绍</div>
                <!-- 海报名称结束 -->
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide-content" ref="slide">
                    <div class="bill_pic"><img src="../../images/agent/haibao2.jpg" /></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                        <img src="http://img2.imgtn.bdimg.com/it/u=2849782395,3149637093&fm=11&gp=0.jpg"  class="avator_48">
                        <div>
                            <p><span class="blod">陈旭</span></p>
                            <p class="color_gray font_12">邀您加入蜡笔优课</p>
                        </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code">
                            <img :src="qrsrc" alt="">                                                
                        </div>
                        <!-- 邀请人二维码结束 -->
                    </div>
                    <!-- 邀请信息结束 -->
                </div>
                <!-- 海报名称开始 -->
                <div class="bill_name font_16">蜡笔优课教务服务介绍</div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide-content" ref="slide">
                    <div class="bill_pic"><img src="../../images/agent/haibao3.jpg" /></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                        <img src="http://img2.imgtn.bdimg.com/it/u=2849782395,3149637093&fm=11&gp=0.jpg"  class="avator_48">
                        <div>
                            <p><span class="blod">胡祝丰</span></p>
                            <p class="color_gray font_12">邀您加入蜡笔优课</p>
                        </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code" ref="qrcode"></div>
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
            <button class="agent_btn btn_blue" id="save_bill" @click="savePoster"><span class="iconfont">&#xe74d;</span>保存</button>
        </div>
        
        
    </div>
</template>
<script>
    import 'flex.css'
    import '../../css/agent/iconfont.css'
    import '../../css/agent/agent.css'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import  QRCode from 'qrcodejs2'
    import { Toast } from 'vant'
    import html2canvas from 'html2canvas'
    export default {
        name:'Posters',
        data(){
            return{
                activeIndex:Number,
                currentIndex:'',
                qrsrc:'',
                swiperOption:{
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 10,
                        depth: 100,
                        modifier: 1,
                        slideShadows : false
                    },
                    on:{
                        slideChange: function(){
                            // Toast('当前海报下标为'+this.activeIndex);
                            
                        },
                    },
                },
                posterImg:''
            }
        },
        components:{
            Swiper,
            SwiperSlide
        },
        mounted(){
            this.qrcode()
            this.swiper.slideTo(2, 1000, false)
            // var index = this.GetQueryValue('slide') || 0;
            // mySwiper.slideTo(index, 1000, false);//切换到第一个slide，速度为1秒
        },
        computed:{
            swiper(){
                return this.$refs.mySwiper.$swiper
            }
        },
        methods:{
            qrcode(){
                // let canvas = this.$refs.qrcode
                let canvas = document.getElementsByClassName('bill_code')
                console.log(canvas)
                for(let i=0;i<canvas.length;i++){
                    new QRCode(canvas[i],{
                    text:'https://m.baidu.com/',
                    width:48,
                    height:48,
                    colorDark:'#000',
                    colorLight:'#f6f6f6'
                })
                }
            },
            savePoster(){
                //把海报生成图片，并保存下来
                let index = this.$refs.mySwiper.$swiper.activeIndex
                let poster = document.getElementsByClassName('swiper-slide-content')[index]
                setTimeout(()=>{
                    html2canvas(poster,{
                        useCORS:true,
                        allowTaint:true
                    }).then(canvas => {
                        
                        let src = canvas.toDataURL("image/jpg");
                        var dBtn = document.createElement('a');
                        dBtn.download = '下载海报';
                        dBtn.href = src;
                        document.body.appendChild(dBtn)
                        dBtn.click()
                        dBtn.remove()
                    });
                },500)
                
            }
        }
    }
</script>