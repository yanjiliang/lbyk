<template>
    <div class="ClockList">
        <!-- 打卡用户列表 -->
        <div v-if="ClockRecod.length != 0">
            <div class="clock_list_wrap">
                <div class="clock_list_item" v-for="(item, index) in ClockRecod" :key="index">
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
                        <div class="ellipsis" @click="toMoreHandle(index)">
                            <img src="../../images/CreateClock/ellipsis.png">
                        </div>
                        <!-- 操作区结束 -->
                    </div>
                    <!-- 打卡头部用户信息结束 -->
                    <div class="clock_item_content" @click="ToclockSuccess(index)">
                            <p>{{item.impression}}</p>
                    </div>
                    <div class="clock_item_images" v-if="item.picUrls">
                        <!-- <p>这里是照片区域</p> -->
                        <ul flex="main:left cross:center" >
                            <li v-for="(item1, index1) in item.picUrls" :key="index1"  @click="preClick(index1,index)"><img :src="item1" alt=""></li>
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
                        <p class="color_green margin_top_12" @click="toThemedetail(index)">
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
        

        <div style="margin-top:8px;background:#FFFFFF;box-sizing:border-box;padding-top:20px" v-if="ClockRecod.length == 0 && isLoadDom">
            <div flex="dir:top cross:center">
                <img style="width:180px;height:180px;display:block" src="../../assets/images/nodata2x.png" alt="">
                <p class="font_14px color_gray_light">暂无打卡数据</p>
            </div>
        </div>

        <van-action-sheet v-model="MoreControl" :actions="actions" @select="moreHandle" cancel-text="取消" @cancel="onCancel" />

    </div>
</template>

<script>
import H5Video from '../../components/H5Video'
import {Toast} from 'vant'
const axios = require('axios')
// import BScroll from 'better-scroll'
export default {
    name:'ClockList',
    props:{
        clockId:{
            type:String,
            required:true
        },
        cuid:{
            type:String,
            required:true
        },
        storeId:{
            type:String,
            required:true
        },
        classId:{
            type:String,
            required:true
        },
        studentId:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            pre_index:0,
            pre_show:false,
            ClassCircleHead:'',
            studentClockNum:'',
            ClockRecod:'',
            MoreControl:false,
            selectRecod:'',
            aa:'',
            actions:[
                {name:'删除'},
                {name:'设置优质打卡'}
            ],
            morehandleindex:Number
        }
    },
    components:{
        H5Video
    },
    mounted(){
        this.isLoadDom = true
        setTimeout(()=>{
            this.getClockRecod()
        },100)
    },
    methods:{
        getClockRecod(){
            let url = this.ip+'class-clock-student/clockRecord';
            let param = new URLSearchParams()
            // param.append("cuid", this.cuid)
            // param.append("storeId", this.storeId)
            if(this.classId) param.append("classId", this.classId)
            if(this.clockId) param.append("clockId",this.clockId)
            if(this.storeId) param.append("storeId",this.storeId)
            if(this.studentId) param.append("studentId",this.studentId)
            param.append("pageNo", 1)
            param.append("pageSize", 100)
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
        
        getindex(index){
            
            this.studentClockNum = this.studenList[index].beginningClockCount
        },
        preClick(index,selectRecod){
            // Toast(selectRecod)
            
            this.preImage = this.ClockRecod[selectRecod].picUrls
            this.pre_show=true;
            this.pre_index=index;
            // Toast(this.selectRecod)
            
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "false"}')
        },
        onClose(){
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "true"}')
        },
        onChange(index) {
            this.pre_index = index;
        },
        toClockPersonal(index){
            
            const studentId = this.ClockRecod[index].studentId
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'&storeId='+this.storeId+'"}');
            }
            if (this.device === 'ios') { 
                
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'&storeId='+this.storeId+'"}')
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

            let title = this.ClockRecod[index].title
            
            let str = impression.substring(0,35)
            let content = str.replace(/[\r\n]/g, "")
            
            let url = this.Url + '/ClockShare?cuid='+cuid+'&storeId='+storeId+'&classId='+classId+'&studentId='+studentId+'&clockStudentId='+clockStudentId
            
            // if(this.ClockRecod[index].studentAvatar){let logo = this.ClockRecod[index].studentAvatar}else{let logo = this.ClockRecod[index].logo}
            let logo =''
            this.ClockRecod[index].studentAvatar == '' ? logo = this.ClockRecod[index].logo : logo = this.ClockRecod[index].studentAvatar
            
            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"WXSHARE","url":"'+url+'","content":"'+content+'","logo":"'+logo+'","title":"'+title+'"}')
            
        },
        toMoreHandle(index){
            this.morehandleindex = index
            this.MoreControl = true
        },
        moreHandle(item){
            
            if(item.name == '删除') {
                //删除快速打卡操作
                let url = this.ip +'/class-clock-student/removeRapidClock'
                let clockStudentId  = this.ClockRecod[this.morehandleindex].clockStudentId
                let param = new URLSearchParams()
                param.append("cuid", this.$route.query.cuid)
                param.append("clockStudentId", clockStudentId)
                axios.post(url,param).then((res)=>{
                    if(res.data.result == 'success') window.location.reload()
                    
                })
            }
            if(item.name == '设置优质打卡') {
                // 设置为优质打卡的操作
                let url = this.ip +'/class-clock-student/setHighQuality'
                let clockStudentId  = this.ClockRecod[this.morehandleindex].clockStudentId
                let param = new URLSearchParams()
                param.append("cuid", this.$route.query.cuid)
                param.append("clockStudentId", clockStudentId)
                axios.post(url,param).then((res)=>{
                    if(res.data.result == 'success') window.location.reload()
                })
            }
        },
        ToclockSuccess(index){
            //
            let storeId = this.ClockRecod[index].storeId
            
            let classId = this.ClockRecod[index].classId
            
            let studentId = this.ClockRecod[index].studentId
            
            let clockStudentId = this.ClockRecod[index].clockStudentId
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/Clockinfo?clockId='+this.clockId+'&studentId='+studentId+'&classId='+classId+'&clockStudentId='+clockStudentId+'&cuid='+this.cuid+'&storeId='+storeId+'"}');
            }
            if (this.device === 'ios') { 
                //self.Url + '/ClockSuccess?clockId='+self.$route.query.clockId+'&studentId='+studentId+'&classId='+classId+'&clockStudentId='+res.data.data+'&cuid='+self.$route.query.cuid+'&storeId='+self.$route.query.storeId;
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/Clockinfo?clockId='+this.clockId+'&studentId='+studentId+'&classId='+classId+'&clockStudentId='+clockStudentId+'&cuid='+this.cuid+'&storeId='+storeId+'"}')
            }
        },
        toThemedetail(index){
            //
            let storeId = this.ClockRecod[index].storeId
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/ClockDetail?clockId='+this.clockId+'&cuid='+this.cuid+'&storeId='+storeId+'"}');
            }
            if (this.device === 'ios') { 
                //self.Url + '/ClockSuccess?clockId='+self.$route.query.clockId+'&studentId='+studentId+'&classId='+classId+'&clockStudentId='+res.data.data+'&cuid='+self.$route.query.cuid+'&storeId='+self.$route.query.storeId;
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/ClockDetail?clockId='+this.clockId+'&cuid='+this.cuid+'&storeId='+storeId+'"}')
            }
        }
        
    }
}
</script>
<style lang="stylus" scoped>

</style>