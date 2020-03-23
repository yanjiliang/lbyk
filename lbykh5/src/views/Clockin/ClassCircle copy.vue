<template>
    <div class="ClassCircle">
        <div class="class_info_wrap">
            <div class="class_circle_clock" flex="main:justify cross:center">
                <div>
                    <p flex="main:left cross:center"><img class="img_10" src="../../images/CreateClock/time.png" alt=""><span class="color_green">进行中的打卡</span></p>
                    <p class="font_20px color_green font_weight_700 line_1 margin_top_8">发达斯卡斯柯达撒大声地{{ClassCircleHead.title}}</p>
                    <p class="font_14px color_gray margin_top_8">我已打卡<span> {{ studentClockNum }} </span>次</p>
                </div>
                <div flex="main:center cross:center" style="width:72px;height:72px;border-radius:50%;background:rgba(42,198,136,.2);flex-shrink: 0; margin-left:12px" @click="toClock()">
                    <div flex="main:center cross:center" style="width:64px;height:64px;border-radius:50%;background:rgba(42,198,136)">
                        <p><a class="font_12px color_white" :href="aa">进入主题</a></p>
                    </div>
                </div>
            </div>
        </div>

        <p>{{ClassCircleHead}}</p>
        <ClockList />
        <!-- 打卡用户列表 -->
        <div v-if="ClockRecod.length != 0">
            <div class="clock_list_wrap">
                <div class="clock_list_item" v-for="(item, index) in ClockRecod" :key="index" @click="getRecodIndex(index)">
                    <!-- 打卡头部用户信息开始 -->
                    <div flex="main:justify cross:center">
                        <!-- 用户信息开始 -->
                        <div flex="main:left cross:center" @click="toClockPersonal(index)">
                            <div class="avatar avator_48">
                                <img  v-if="item.studentAvatar" :src="item.studentAvatar" alt="">
                                <p v-if="!item.studentAvatar">{{item.studentName.slice(0,2)}}</p>
                            </div>
                            <div>
                                <p class="font_16px font_weight_700">{{item.studentName}}</p>
                                <p class="font_14px color_gray_light margin_top_4">{{item.clockDate.slice(0,16)}}</p>
                            </div>
                        </div>
                        <!-- 用户信息结束 -->
                        <!-- 操作区开始 -->
                        <div class="ellipsis">
                            <img src="../../images/CreateClock/ellipsis.png">
                        </div>
                        <!-- 操作区结束 -->
                    </div>
                    <!-- 打卡头部用户信息结束 -->
                    <div class="clock_item_content">
                            <p>wdwew的凯撒将很快sad那是的卡仕达时间到了我渴望奇货可居签完了情为何物情节而另外可千万 而且为客户无情刻进去闻鸡起舞二级维护就我去问问丘吉尔立刻前往吉尔两千万{{item.impression}}</p>
                    </div>
                    <div class="clock_item_images" v-if="item.picUrls">
                        <!-- <p>这里是照片区域</p> -->
                        <ul flex="main:justify cross:center">
                            <li v-for="(item, index) in item.picUrls" :key="index"><img :src="item.url" alt="" @click="preClick(index)"></li>
                        </ul>
                        <p class="clock_img_count" v-if="item.picUrls.length >3">+{{item.picUrls.length-3}}</p>
                    </div>
                    <!-- 图片预览 -->
                    <van-image-preview v-model="pre_show" :images="preImage" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                        <template v-slot:index>
                            
                        </template>
                    </van-image-preview>
                    <!-- 图片预览 -->
                    <div class="clock_item_video" v-if="item.videoUrl">
                        <H5Video :fileVideoSrc='item.videoUrl'/>
                    </div>
                    <div>
                        <p class="color_green margin_top_12">
                            <span class="clockin_title_ellipsis"># {{item.title}}</span>
                        </p>
                    </div>
                    <div class="margin_top_16 color_gray_light font_14px">
                        <div flex="main:justify cross:center">
                            <div flex="main:left cross:center" class="clock_fun_icon" v-if="item.isPraise == false" @click="toClockPraise(item.clockStudentId,index)">
                                <img src="../../images/CreateClock/zan.png" alt="">
                                <p>{{item.praiseCustomerNum}}人觉得很赞</p>
                            </div>
                            <div flex="main:left cross:center" class="clock_fun_icon" v-if="item.isPraise == true">
                                <img src="../../images/CreateClock/zaned.png" alt="">
                                <p>{{item.praiseCustomerNum}}人觉得很赞</p>
                            </div>
                            <div class="clock_fun_icon" flex="main:left cross:center" @click="getWechatShare(index)">
                                <img src="../../images/CreateClock/share.png" alt="">
                                <p>分享</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- 打卡用户列表 -->

        <div style="margin-top:8px;background:#FFFFFF;box-sizing:border-box;padding-top:20px" v-if="ClockRecod.length == 0">
            <div flex="dir:top cross:center">
                <img style="width:180px;height:180px;display:block" src="../../assets/images/nodata2x.png" alt="">
                <p class="font_14px color_gray_light">暂无打卡数据</p>
            </div>
        </div>

        
        
    </div>
</template>
<script src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import '../../css/Clock/clocklist.css'
import H5Video from '../../components/H5Video'
import ClockList from '../Clockin/ClockList'
const axios = require('axios')
import {Toast} from 'vant'
// import BScroll from 'better-scroll'
export default {
    name:'ClassCircle',
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            ClockList:[],
            ZanList:[],
            preImage:[],
            studenList:[],
            pre_index:0,
            pre_show:false,
            classId:this.$route.query.classId,
            ClassCircleHead:'',
            studentClockNum:'',
            ClockRecod:'',
            clockId:"",
            studentId:'',
            selectRecod:'',
            aa:''
        }
    },
    components:{
        H5Video,
        ClockList
    },
    mounted(){
        // this.Bscroll()
        this.getClassCircleHead()
        setTimeout(()=>{
            this.getClockRecod(this.clockId)
        },300)
    },
    methods:{
        getRecodIndex(index){
            this.selectRecod = index
            let item = this.ClockRecod[index].picUrls;
            let len = this.ClockRecod[index].picUrls.length;
            this.preImage = [];
            for(let i=0;i<len;i++){
                //
                this.preImage.push(item[i].url)
            }
        },
        getindex(index){
            
            this.studentClockNum = this.studenList[index].beginningClockCount
        },
        preClick(index){
            this.pre_show=true;
            this.pre_index=index;
            // Toast(this.selectRecod)
            
            // this.preImage = this.ClockRecod[0].picUrls
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "false"}')
        },
        onClose(){
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "true"}')
        },
        onChange(index) {
            this.pre_index = index;
        },
        getClassCircleHead(){
            // /class-clock/getClassCircleHead
            let url = this.ip+'class-clock/getClassCircleHead';
            let param = new URLSearchParams()
            param.append("cuid", this.$route.query.cuid)
            param.append("classId", this.$route.query.classId)
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
        toClock(){
            let clockTheme = this.ClassCircleHead.title
            let url = this.Url+'/QuickToClock?studentId='+this.studentId+'&classId='+this.$route.query.classId+'&clockId='+this.clockId+'&clockTheme='+clockTheme+'&cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId;
            this.aa = url
        },
        getClockRecod(clockId){
            ///class-clock-student/clockRecord
            let url = this.ip+'class-clock-student/clockRecord';
            let param = new URLSearchParams()
            param.append("classId", this.$route.query.classId)
            param.append("pageNo", 1)
            param.append("pageSize", 10)
            axios.post(url,param).then((res)=>{
                let ClockRecod = res.data.data
                this.ClockRecod = ClockRecod.data
                
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
        toClockPersonal(index){
            
            // let cuid = 
            // let storeId = 
            // let className = this.ClockRecod[index].className
            const studentId = this.ClockRecod[index].studentId
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'"}');
            }
            if (this.device === 'ios') { 
                
                //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
        　　　　//window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'&className='+className+'"}')
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'"}')
            }
        },
        toClockPraise(clockStudentId,index){
            let url = this.ip+'clock-student-praise/clockPraise';
            let param = new URLSearchParams()
            param.append("cuid", this.$route.query.cuid)
            param.append("storeId", this.$route.query.storeId)
            param.append("clockStudentId", clockStudentId)
            axios.post(url,param).then((res)=>{
                // Toast(res.data.result)
                if(res.data.result == 'success'){
                    this.ClockRecod[index].isPraise = !this.ClockRecod[index].isPraise
                    this.ClockRecod[index].praiseCustomerNum +=1
                    //praiseCustomerDtos
                    this.ClockRecod[index].praiseCustomerDtos.push(res.data.data)
                }
            
            }).catch((err)=>{
                console.log(err)
            })
        },
        getWechatShare(index){//微信分享
            // let avatar = this.ClockRecod[index]
            
            let cuid = this.$route.query.cuid
            
            let storeId = this.ClockRecod[index].storeId
            
            let classId = this.ClockRecod[index].classId
            
            let studentId = this.ClockRecod[index].studentId
            
            let clockStudentId = this.ClockRecod[index].clockStudentId
            //Toast(clockStudentId)
            let impression = this.ClockRecod[index].impression
            
            let str = impression.substring(0,35)
            let content = str.replace(/[\r\n]/g, "")
            
            let url = this.Url + '/ClockShare?cuid='+cuid+'&storeId='+storeId+'&classId='+classId+'&studentId='+studentId+'&clockStudentId='+clockStudentId
            
            // if(this.ClockRecod[index].studentAvatar){let logo = this.ClockRecod[index].studentAvatar}else{let logo = this.ClockRecod[index].logo}
            let logo =''
            this.ClockRecod[index].studentAvatar == '' ? logo = this.ClockRecod[index].logo : logo = this.ClockRecod[index].studentAvatar
            
            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"WXSHARE","url":"'+url+'","content":"'+content+'","logo":"'+logo+'"}')
            
        }
        
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