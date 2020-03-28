<template>
    <div class="ClassCircle">
        <div class="class_info_wrap">
            <div class="class_circle_clock" flex="main:justify cross:center">
                <div>
                    <p flex="main:left cross:center"><img class="img_10" src="../../images/CreateClock/time.png" alt=""><span class="color_green">进行中的打卡</span></p>
                    <p class="font_20px color_green font_weight_700 line_1 margin_top_8">{{ClassCircleHead.title}}</p>
                    <p class="font_14px color_gray margin_top_8">{{ClassCircleHead.studentCount}}名学员共打卡<span> {{ ClassCircleHead.clockCount }} </span>次</p>
                </div>
                <div flex="main:center cross:center" style="width:72px;height:72px;border-radius:50%;background:rgba(42,198,136,.2);flex-shrink: 0; margin-left:12px" @click="toClockTheme()">
                    <div flex="main:center cross:center" style="width:64px;height:64px;border-radius:50%;background:rgba(42,198,136)">
                        <p class="font_12px color_white">进入主题</p>
                    </div>
                </div>
            </div>
        </div>
        
        <ClockList  :cuid='cuid' :storeId='storeId' :clockId='ClassCircleHead.clockId' :classId='classId' :pageType='pageType' :isManager='ClassCircleHead.isManager' :token ='token'/>
        <!-- :clockId='ClassCircleHead.clockId' -->
    </div>
</template>
<script src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import '../../css/Clock/clocklist.css'
import ClockList from '../Clockin/ClockList'
const axios = require('axios')
import {Toast} from 'vant'
// import BScroll from 'better-scroll'
export default {
    name:'ClassCircle',
    data(){
        return{
            pageType:'ClassCircle',
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            pre_index:0,
            pre_show:false,
            classId:this.$route.query.classId,
            cuid:this.$route.query.cuid,
            storeId:this.$route.query.storeId,
            ClassCircleHead:'',
            studentClockNum:'',
            ClockRecod:'',
            clockId:'',
            studentId:'',
            skipUrl:'',
            token:''
        }
    },
    components:{
        ClockList
    },
    mounted(){
        
        this.linkIos()
    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams
    },
    methods:{
        getClassCircleHead(){
            // /class-clock/getClassCircleHead
            let url = this.ip+'class-clock/getClassCircleHead';
            let param = new URLSearchParams()
            param.append("cuid", this.$route.query.cuid)
            param.append("classId", this.$route.query.classId)
            param.append("storeId", this.$route.query.storeId)
            param.append("pageNo", 1)
            param.append("pageSize", 10)
            axios.post(url,param).then((res)=>{
                let ClassCircleHead = res.data.data
                this.ClassCircleHead = ClassCircleHead
                this.studenList = ClassCircleHead.clockStudentInfo.data
                this.ClassCircleIfo = res.data
                this.studentClockNum = this.studenList[0].beginningClockCount
                this.clockId = ClassCircleHead.clockId
                this.studentId = this.studenList[0].studentId
                if(res.data.result == 'noLogin'){
                    if(this.device == 'android'){
                        window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else if(this.device == 'ios'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                }
                
                
            }).catch((err)=>{
                console.log(err)
            })
        },
        toClockTheme(){
            let skipUrl = this.Url + '/ClockDetail?cuid='+this.cuid+'&storeId='+this.storeId+'&clockId='+this.ClassCircleHead.clockId
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","url": "'+skipUrl+'"}');
            }
            if (this.device === 'ios') { 
                
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme":"H5PAGE","url": "'+skipUrl+'"}')
            }
            
        },
        McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
            this.token = qury.data.token
            
            if(!qury.data.token){
            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            }
            this.getClassCircleHead()
            
        },
        getParams(msg){
            this.token = msg.token
            
            if(!msg.token){
            window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            }
            this.getClassCircleHead()
            
        },
        linkIos (){
                //给iOS APP传参
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        
    }
}
</script>
<style lang="stylus" scoped>
.ClassCircle
    background #fff
    padding 16px
    .class_info_wrap
        .class_circle_clock
            box-sizing border-box
            padding 16px
            background #EAFFF6 url(../../images/CreateClock/box_bg.png) no-repeat 0 0
            background-size 100%
            border-radius 5px
            
</style>