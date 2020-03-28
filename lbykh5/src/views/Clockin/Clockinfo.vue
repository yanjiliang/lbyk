<template>
    <div class="Clockinfo">
        <div class="clock_list_wrap">
                <div class="clock_list_item">
                    <!-- 打卡头部用户信息开始 -->
                    <div flex="main:justify cross:center">
                        <!-- 用户信息开始 -->
                        <div flex="main:left cross:center">
                            <div class="avator avator_48">
                                <img  v-if="ClockResult.studentAvatar" :src="ClockResult.studentAvatar" alt="">
                                <p v-if="!ClockResult.studentAvatar">{{ClockResult.studentName.slice(-1,-3)}}</p>
                            </div>
                            <div>
                                <p class="font_17px font_weight_700">{{ClockResult.studentName}}</p>
                                <p class="font_14px color_gray_light margin_top_4">{{ClockResult.clockDate.substring(0,10)}}</p>
                            </div>
                        </div>
                        <!-- 用户信息结束 -->
                        <!-- 操作区开始 -->
                        <div class="ellipsis" @click="toMoreHandle()">
                            <img src="../../images/CreateClock/ellipsis.png">
                        </div>
                        <!-- 操作区结束 -->
                    </div>
                    <!-- 打卡头部用户信息结束 -->
                    <div class="clock_item_content">
                            <p class="font_18px">{{ClockResult.impression}}</p>
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
                        <H5Video :fileVideoSrc='ClockResult.videoUrl'/>
                    </div>
                    <div>
                        <p class="color_green margin_top_12" @click="toThemedetail(index)">
                            <span class="clockin_title_ellipsis"># {{ClockResult.title}}</span>
                        </p>
                    </div>
                    <div class="margin_top_16 color_gray_light font_14px">
                        <div flex="main:justify cross:center">
                            <div flex="main:left cross:center" class="clock_fun_icon" v-if="ClockResult.isPraise == false" @click="toClockPraise(ClockResult.clockStudentId,index)">
                                <img src="../../images/CreateClock/zan.png" alt="">
                                <p>{{ClockResult.praiseCount}}人觉得很赞</p>
                            </div>
                            <div flex="main:left cross:center" class="clock_fun_icon" v-if="ClockResult.isPraise == true">
                                <img src="../../images/CreateClock/zaned.png" alt="">
                                <p>{{ClockResult.praiseCount}}人觉得很赞</p>
                            </div>
                            <div class="clock_fun_icon" flex="main:left cross:center" @click="getWechatShare()">
                                <img src="../../images/CreateClock/share.png" alt="">
                                <p>分享</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <van-action-sheet v-model="MoreControl" :actions="actions" @select="moreHandle" cancel-text="取消" @cancel="onCancel" />
    </div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import '../../css/Clock/clocklist.css'
import H5Video from '../../components/H5Video'
import {Toast,Dialog} from 'vant'
const axios = require('axios')
export default {
    name:'ClockSuccess',
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
            MoreControl:false,
            actions:[{name:'设置优质打卡'},{name:'删除'}],
        }
    },
    mounted(){
        this.getClockResult()
        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK","url":"'+this.Url+'/ClockDetail"}')
    },
    methods:{
        preClick(index){
            

            this.preImage = this.ClockResult.picUrls
            this.pre_show=true;
            this.pre_index=index;
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
            param.append("clockId", this.$route.query.clockId)
            param.append("classId", this.$route.query.classId)
            param.append("studentId", this.$route.query.studentId)
            param.append("clockStudentId", this.$route.query.clockStudentId)
            // param.append("courseId", 10)
            axios.post(url,param).then((res)=>{
                let ClockResult = res.data.data
                this.ClockResult = ClockResult
            }).catch((err)=>{
                console.log(err)
            })
        },
        getWechatShare(){//微信分享
            
            let cuid = this.$route.query.cuid
            let storeId = this.$route.query.storeId
            let classId = this.$route.query.classId
            let studentId = this.$route.query.studentId
            let clockStudentId = this.$route.query.clockStudentId
            let impression = this.ClockResult.impression
            let title = this.ClockResult.title
            let str = impression.substring(0,35)
            let content = str.replace(/[\r\n]/g, "")
            let url = this.Url + '/ClockShare?cuid='+cuid+'&storeId='+storeId+'&classId='+classId+'&studentId='+studentId+'&clockStudentId='+clockStudentId
            let logo = this.ClockResult.storeAddrInfoDto.logo
            
            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"WXSHARE","url":"'+url+'","content":"'+content+'","logo":"'+logo+'","title":"'+title+'","type":"clock","typeId":"'+this.$route.query.clockId+'"}')
            
        },
        toMoreHandle(){
            this.MoreControl = true
        },
        moreHandle(item){
            
            if(item.name == '删除') {
                //删除快速打卡操作
                Dialog.confirm({
                    message: '确定删除该打卡吗？',
                    confirmButtonColor:'#60C38C'
                }).then(() => {
                // on confirm
                    let url = this.ip +'/class-clock-student/removeRapidClock'
                    let clockStudentId  = this.ClockResult.clockStudentId
                    let param = new URLSearchParams()
                    param.append("cuid", this.$route.query.cuid)
                    param.append("userToken", this.token)
                    param.append("storeId", this.ClockResult.storeId)
                    param.append("clockStudentId", clockStudentId)
                    axios.post(url,param).then((res)=>{
                        // if(res.data.result == 'success') window.location.reload()
                        if(res.data.result == 'success') this.getClockRecod()
                        
                        else Toast(res.data.msg)
                    })
                    this.MoreControl = false
                }).catch(() => {
                    // on cancel
                    this.MoreControl = false
                    return
                });
                
            }
            if(item.name == '设置优质打卡') {
                // 设置为优质打卡的操作
                let url = this.ip +'/class-clock-student/setHighQuality'
                let clockStudentId  = this.ClockResult.clockStudentId
                let param = new URLSearchParams()
                param.append("cuid", this.$route.query.cuid)
                param.append("userToken", this.token)
                param.append("storeId", this.ClockResult.storeId)
                param.append("clockStudentId", clockStudentId)
                axios.post(url,param).then((res)=>{
                    this.MoreControl = false
                    
                    if(res.data.result == 'success') {
                        Toast.success('设置成功')
                    }else{
                        Toast(res.data.msg)
                    }
                })
            }
        },
    }
}
</script>
<style lang="stylus" scoped>
.Clockinfo
    background #fff
    box-sizing border-box
    padding 0 16px
    
</style>

