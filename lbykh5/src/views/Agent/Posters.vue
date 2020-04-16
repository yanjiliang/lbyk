<template>
    <div id="Posters" style="background:#f6f6f6;padding:16px;height:100vh" v-if="hasDone">
        <!-- 海报 -->
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
                <div class="swiper-slide-content slide" ref="slide">
                    <div class="bill_pic"><img :src="postlist[0]" /></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                        <img :src="userINfo.avatar"  class="avator_48">
                        <div>
                            <p><span class="blod">{{userINfo.name}}</span></p>
                            <p class="color_gray font_12">邀您加入蜡笔优课</p>
                        </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code" style="position:relative">
                            <p style="position:absolute;top:50%;left:50%;padding:2px;background-color:#fff;transform:translate(-6px,-6px);"><img style="width:8px;height:8px" src="../../images/agent/logo_24x24.png" alt=""></p>
                        </div>
                        <!-- 邀请人二维码结束 -->
                    </div>
                    <!-- 邀请信息结束 -->
                </div>
                <!-- 海报名称开始 -->
                <div class="bill_name font_16">蜡笔优课教务服务介绍</div>
                <!-- 海报名称结束 -->
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide-content slide" ref="slide">
                    <div class="bill_pic"><img :src="postlist[1]"/></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                        <img :src="userINfo.avatar"  class="avator_48">
                        <div>
                            <p><span class="blod">{{userINfo.name}}</span></p>
                            <p class="color_gray font_12">邀您加入蜡笔优课</p>
                        </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code" style="position:relative">
                            <p style="position:absolute;top:50%;left:50%;padding:2px;background-color:#fff;transform:translate(-6px,-6px);"><img style="width:8px;height:8px" src="../../images/agent/logo_24x24.png" alt=""></p>
                        </div>
                        <!-- 邀请人二维码结束 -->
                    </div>
                    <!-- 邀请信息结束 -->
                </div>
                <!-- 海报名称开始 -->
                <div class="bill_name font_16">蜡笔优课营销服务介绍</div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide-content slide" ref="slide">
                    <div class="bill_pic"><img :src="postlist[2]" /></div>
                    <!-- 邀请信息 -->
                    <div class="bill_code_wrap" flex="main:justify cross:center">
                        <!-- 邀请人信息 -->
                        <div flex="main:left cross:center">
                            <img :src="userINfo.avatar"  class="avator_48">
                            <div>
                                <p><span class="blod">{{userINfo.name}}</span></p>
                                <p class="color_gray font_12">邀您加入蜡笔优课</p>
                            </div>
                        </div>
                        <!-- 邀请人二维码 -->
                        <div class="bill_code" ref="qrcode" style="position:relative">
                            <p style="position:absolute;top:50%;left:50%;padding:2px;background-color:#fff;transform:translate(-6px,-6px);"><img style="width:8px;height:8px" src="../../images/agent/logo_24x24.png" alt=""></p>
                        </div>
                        <!-- 邀请人二维码结束 -->
                    </div>
                    <!-- 邀请信息结束 -->
                </div>
                <!-- 海报名称开始 -->
                <div class="bill_name font_16">蜡笔优课平台介绍</div>
                <!-- 海报名称结束 -->
            </swiper-slide>
            
        </swiper>

        <!-- 操作区 -->
        <div class="bill_btn"  flex="main:center cross:center">
            <a class="agent_btn btn_blue_border" @click="sharePoster"><span class="iconfont">&#xe75f;</span>分享</a>
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
    // import { Toast } from 'vant'
    // import html2canvas from 'html2canvas';
    import axios from 'axios'

    export default {
        name:'Posters',
        data(){
            return{
                ip: this.$ip.getIp(),
                Url: this.$Url.geturl(),
                device: this.$device.getDevice(),
                activeIndex:Number,
                currentIndex:'',
                hasDone:false,
                qrsrc:'',
                userINfo:'',
                postlist:[],
                inviteURL:'',
                isConduct:1,
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
                posterImg:'',
                imgfile:"",
            }
        },
        components:{
            Swiper,
            SwiperSlide
        },
        mounted(){
            
            setTimeout(()=>{
                let url = window.location.href
                let sindex = url.substring(url.length-1)
                console.log(Number(sindex))
                this.swiper.slideTo(Number(sindex), 1200, false)
            },300)
            this.linkIos()
            // var index = this.GetQueryValue('slide') || 0;
            // mySwiper.slideTo(index, 1000, false);//切换到第一个slide，速度为1秒
        },
        computed:{
            swiper(){
                return this.$refs.mySwiper.$swiper
            }
        },
        beforeMount(){
            //
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams
        },
        methods:{
            // translateBase64ImgToFile(base64,filename,contentType){
            //     var arr = base64.split(',')  //去掉base64格式图片的头部
            //     var bstr = atob(arr[1])   //atob()方法将数据解码
            //     var leng = bstr.length
            //     var u8arr = new Uint8Array(leng)
            //     while(leng--){
            //         u8arr[leng] =  bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
            //     }
            //     return new File([u8arr],filename,{type:contentType}) 
            // },
            // toimage(type){
            //     let index = this.$refs.mySwiper.$swiper.activeIndex
            //     if(type == 'save'){
            //         setTimeout(()=>{
            //             html2canvas(document.getElementsByClassName('slide')[index],{
            //                 useCORS:true,
            //                 allowTaint:true,
            //             }).then((canvas)=> {
            //                 let imgurl = canvas.toDataURL("image/jpg")
            //                 setTimeout(()=>{
            //                     window.android.SkipPage('{"linkType":"app","scheme":"SAVEBILL","imgfile":"'+imgurl+'"}')
            //                 },200)
            //             });
                        
            //         },100)
            //     }if(type == 'share'){
            //         html2canvas(document.getElementsByClassName('slide')[index],{useCORS: true,logging:true,allowTaint:true,}).then(function(canvas) {
            //             let imgurl = canvas.toDataURL("image/jpg")
            //             window.android.SkipPage('{"linkType":"app","scheme":"SHAREBILL","imgfile":"'+imgurl+'"}')
            //         });
            //     }
            // },
            Qrcode(inviteURL){
                // let canvas = this.$refs.qrcode
                let canvas = document.getElementsByClassName('bill_code')
                for(let i=0;i<canvas.length;i++){
                    new QRCode(canvas[i],{
                        text:inviteURL,
                        width:50,
                        height:50,
                        useCORS: true,
                        colorDark:'#000',
                        colorLight:'#f6f6f6'
                    })
                }
            },
            savePoster(){
                //把海报生成图片，并保存下来
                let index = this.$refs.mySwiper.$swiper.activeIndex
                let PosterUrl = this.postlist[index]
                let name = String
                this.userINfo.realName == '' ?  name = this.userINfo.name : name = this.userINfo.realName
                let avatar = this.userINfo.avatar
                let QRurl = this.inviteURL
                if(this.device == 'android'){
                    //
                    window.android.SkipPage('{"linkType":"app","scheme":"SAVEBILL","PosterUrl":"'+PosterUrl+'","name":"'+name+'","avatar":"'+avatar+'","QRurl":"'+QRurl+'"}')
                }
                if(this.device == 'ios'){
                    //
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"SAVEBILL","PosterUrl":"'+PosterUrl+'","name":"'+name+'","avatar":"'+avatar+'","QRurl":"'+QRurl+'"}')
                }
                
            },
            sharePoster(){
                //分享海报
                
                let index = this.$refs.mySwiper.$swiper.activeIndex
                let PosterUrl = this.postlist[index]
                let name = String
                this.userINfo.realName == '' ?  name = this.userINfo.name : name = this.userINfo.realName
                let avatar = this.userINfo.avatar
                let QRurl = this.inviteURL
                if(this.device == 'android'){
                    //
                    window.android.SkipPage('{"linkType":"app","scheme":"SHAREBILL","PosterUrl":"'+PosterUrl+'","name":"'+name+'","avatar":"'+avatar+'","QRurl":"'+QRurl+'"}')
                }
                if(this.device == 'ios'){
                    //
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"SHAREBILL","PosterUrl":"'+PosterUrl+'","name":"'+name+'","avatar":"'+avatar+'","QRurl":"'+QRurl+'"}')
                }
            },
            getPoster(cuid,token){
                //获取海报列表/poster/list
                let url = this.ip+'poster/list'
                let param = new URLSearchParams()
                param.append("cuid",cuid)
                param.append("userToken",token)
                axios.post(url,param).then((res)=>{
                    if(res.data.result == 'noLogin'){
                        if(this.device == 'android'){
                            window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }else if(this.device == 'ios'){
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }
                        
                    }
                    if(res.data.result == 'success'){

                        //
                        let postlist = res.data.data
                        this.postlist = postlist
                    }
                })
            },
            getUserInfo(cuid,token){
                //获取用户信息
                let url = this.ip+'customer/baseInfo'
                let param = new URLSearchParams()
                param.append("cuid",cuid)
                param.append("userToken",token)
                axios.post(url,param).then((res)=>{
                    if(res.data.result == 'noLogin'){
                        if(this.device == 'android'){
                            window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }else if(this.device == 'ios'){
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }
                        
                    }
                    if(res.data.result == 'success'){
                        //
                        let userINfo = res.data.data
                        this.userINfo = userINfo
                    }
                })
            },
            McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
                this.token = qury.data.token
                this.cuid = qury.data.cuid
                if(!qury.data.token){
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                this.inviteURL = this.Url+'/InvitePage?cuid='+qury.data.cuid
                if(this.isConduct == 1){
                    setTimeout(()=>{
                        this.Qrcode(this.inviteURL)
                    },200)
                    this.isConduct+=1
                }
                this.hasDone = true
                this.getPoster(qury.data.cuid,qury.data.token)
                this.getUserInfo(qury.data.cuid,qury.data.token)
                
            },
            getParams(msg){
                //android获取APP传过来的参数的方法
                this.token = msg.token
                this.cuid = msg.cuid
                if(!msg.token){
                    window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                this.inviteURL = this.Url+'/InvitePage?cuid='+msg.cuid
                if(this.isConduct == 1){
                    setTimeout(()=>{
                        this.Qrcode(this.inviteURL)
                    },200)
                    this.isConduct+=1
                }
                this.hasDone = true
                this.getPoster(msg.cuid,msg.token)
                this.getUserInfo(msg.cuid,msg.token)
                
            },
            linkIos (){
                    //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
        }
    }
</script>