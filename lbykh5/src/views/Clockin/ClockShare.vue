<template>
    <div class="ClockShare">
        
        <div v-if="!errResult">
            <div class="clock_list_wrap">
                <div class="clock_list_item">
                    <!-- 打卡头部用户信息开始 -->
                    <div flex="main:justify cross:center">
                        <!-- 用户信息开始 -->
                        <div flex="main:left cross:center">
                            <div class="avator avator_48">
                                <img  v-if="ClockResult.studentAvatar" :src="ClockResult.studentAvatar" alt="">
                                <p v-if="!ClockResult.studentAvatar">{{ClockResult.studentName.substring(ClockResult.studentName.length-2,ClockResult.studentName.length)}}</p>
                            </div>
                            <div>
                                <p class="font_17px font_weight_700">{{ClockResult.studentName}}</p>
                                <p class="font_14px color_gray_light margin_top_4">2020/3/25</p>
                            </div>
                        </div>
                        <!-- 用户信息结束 -->
                    </div>
                    <!-- 打卡头部用户信息结束 -->
                    <div>
                        <p class="color_green margin_top_12" @click="toThemedetail(index)">
                            <span class="clockin_title_ellipsis" style="line-height:36px;border-radius:18px;"><span class="color_gray font_16px">第{{ClockResult.clockCount}}次打卡</span><span class="font_16px"> # {{ClockResult.title}}</span></span>
                        </p>
                    </div>
                    <div class="clock_item_content">
                            <p class="font_18px" style="white-space: pre-line;">{{ClockResult.impression}}</p>
                    </div>
                    <div class="clock_item_images" v-if="ClockResult.picUrls">
                        <!-- <p>这里是照片区域</p> -->
                        <ul>
                            <li v-for="(item1, index1) in ClockResult.picUrls" :key="index1"  @click="preClick(index1,index)"><img :src="item1" alt=""></li>
                        </ul>
                    </div>
                    <!-- 图片预览 -->
                    <van-image-preview v-model="pre_show" :images="preImage" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                        <template v-slot:index>
                            
                        </template>
                    </van-image-preview>
                    <!-- 图片预览 -->
                    <div class="clock_item_video" v-if="ClockResult.videoUrl">
                        <H5Video :fileVideoSrc='ClockResult.videoUrl' :videoCover='ClockResult.coverPicUrl' :videoId='ClockResult.videoId'/>
                    </div>
                </div>

            </div>
            <!-- <p>{{ClockResult}}</p> -->
            <!-- 机构信息 -->
            <div>
                <div>
                    <div flex="main:justify cross:center">
                        <div flex="main:left cross:center">
                            <img class="img_48" style="margin-right:12px;border-radius:5px;flex-shrink:0" :src="ClockResult.storeAddrInfoDto.logo" alt="">
                            <div>
                                <p class="font_17px color_black font_weight_700 line_1">{{ClockResult.storeAddrInfoDto.storeName}}</p>
                                <p class="font_14px color_gray margin_top_4 line_1">{{ClockResult.storeAddrInfoDto.categoryList.join('/')}}</p>
                            </div>
                        </div>
                        <div @click="toStore()" style="line-height:30px;padding:0 12px; margin-left:8px; background:#2ac688; color:#fff;border-radius:15px;flex-shrink:0">进店逛逛</div>
                    </div>
                    <div flex="main:justify cross:center">
                        <div flex="dir:top main:left">
                            <p flex="main:left cross:top" class="margin_top_16">
                                <img class="img_14" style="margin-top:2px" src="../../images/CreateClock/location.png" alt="">
                                <span class="font_14px margin_left_6 color_gray">{{ClockResult.storeAddrInfoDto.addrInfo}}-{{ClockResult.storeAddrInfoDto.buildingName}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 机构信息 -->
        </div>
        
        <div v-if="errResult">
            <div flex="dir:top cross:center" style="margin:66px 0">
                <img style="width:150px;height:150px;display:block" src="../../assets/images/nodata2x.png" alt="">
                <p class="color_gray font_14px">{{errMsg}}</p>
            </div>
        </div>
    </div>
</template>
<script  src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import '../../css/Clock/clocklist.css'
import H5Video from '../../components/H5Video'
const axios = require('axios')
export default {
    name:'ClockShare',
    components:{
        H5Video
    },
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            fileVideoSrc:'',
            pre_index:0,
            pre_show:false,
            preImage:[],
            ClockResult:'',
            errResult:false,
            errMsg:''
        }
    },
    mounted(){
        this.getClockResult()
        
    },
    methods:{
        preClick(index){
            this.pre_show=true;
            this.pre_index=index;

            let item = this.ClockResult.picUrls;
            let len = this.ClockResult.picUrls.length;
            this.preImage = [];
            for(let i=0;i<len;i++){
                //
                this.preImage.push(item[i])
            }
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "false"}')
        },
        onClose(){
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "true"}')
        },
        onChange(index) {
            this.pre_index = index;
        },
        getClockResult(){
            // /class-clock-student/detailedClock
            let url = this.ip+'class-clock-student/detailedClock';
            let param = new URLSearchParams()
            param.append("cuid", this.$route.query.cuid)
            param.append("storeId", this.$route.query.storeId)
            // param.append("clockId", this.$route.query.clockId)
            param.append("classId", this.$route.query.classId)
            param.append("studentId", this.$route.query.studentId)
            param.append("clockStudentId", this.$route.query.clockStudentId)
            // param.append("courseId", 10)
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'success'){
                    let ClockResult = res.data.data
                    this.ClockResult = ClockResult
                    let logo = ClockResult.storeAddrInfoDto.logo
                    let impression = ClockResult.impression.substring(0,30)
                    let title = ClockResult.title
                }else{
                    this.errResult = true
                    this.errMsg = res.data.msg
                }

                setTimeout(()=>{
                    this.getWechatShare(title,logo,impression)
                },800)
            }).catch((err)=>{
                console.log(err)
            })
        },
        toStore(){
            //去机构
            let storeId = this.ClockResult.storeAddrInfoDto.storeId
            let url = this.Url +'/OrgIndexShare?storeId=' +storeId
            let alink = document.createElement("a")
            alink.href = url
            setTimeout(()=>{alink.click()},200)

        },
        toCourse(){
            //去该课程
            let courseId = this.ClockResult.clockCourseDto.courseId
            let url = this.Url +'/ClassDetailShare?courseId='+courseId
            let alink = document.createElement("a")
            alink.href = url
            setTimeout(()=>{alink.click()},200)
        },
        getWechatShare(title,logo,impression){
                setTimeout(()=>{
                    let location = window.location.href
                    
                    let url = this.ip +'weChat/share-public-parameter'
                    let param = new URLSearchParams()
                    param.append("url", location)
                    axios.post(url,param).then((res)=>{
                        let wechatSharedata = res.data.data
                        wx.config({
                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: wechatSharedata.appId, // 必填，公众号的唯一标识
                            timestamp: wechatSharedata.timestamp, // 必填，生成签名的时间戳
                            nonceStr: wechatSharedata.nonceStr, // 必填，生成签名的随机串
                            signature: wechatSharedata.signature,// 必填，签名，见附录1
                            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            // jsApiList: ['updateAppMessageShareData','updateTimelineShareData']
                            
                        });
                        
                        // window.share_config = {
                        //     'share': {
                        //         'imgUrl': logo, // 这里是需要展示的图标
                        //         'desc': impression, // 这是分享展示的摘要
                        //         'title': title, // 这是分享展示卡片的标题
                        //         'link': window.location.href, // 这里是分享的网址
                        //         'success': function(rr) {
                        //             //console.log('成功' + JSON.stringify(rr))
                        //         },
                        //         'cancel': function(tt) {
                        //             //console.log('失败' + JSON.stringify(tt));
                        //         }
                        //     }
                        // };
                        wx.ready(function() {
                            wx.onMenuShareAppMessage(
                                {
                                    'imgUrl': logo, // 这里是需要展示的图标
                                    'desc': impression, // 这是分享展示的摘要
                                    'title': title, // 这是分享展示卡片的标题
                                    'link': window.location.href, // 这里是分享的网址
                                }
                            ); // 微信好友
                            wx.onMenuShareTimeline(
                                {
                                    'imgUrl': logo, // 这里是需要展示的图标
                                    'desc': impression, // 这是分享展示的摘要
                                    'title': title, // 这是分享展示卡片的标题
                                    'link': window.location.href, // 这里是分享的网址
                                }
                            ); // 微信朋友圈
                        });
                    
                    })
                },100)
            
            
            

        }
    }
}
</script>
<style lang="stylus" scoped>
.ClockShare
    background #Ffff
    box-sizing border-box
    padding 0px 16px 60px 16px
    .clock_list_wrap{
        margin-bottom 20px
    }
</style>

