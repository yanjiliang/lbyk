<template>
    <div class="ClockList">
        <!-- 打卡用户列表 -->
        <!-- <p>{{typeof(isManager)}}</p> -->
        <div v-if="ClockRecod.length != 0">
            <div class="clock_list_wrap">
                <div class="clock_list_item" v-for="(item, index) in ClockRecod" :key="item.clockStudentId">
                    <!-- 打卡头部用户信息开始 -->
                    <div flex="main:justify cross:center">
                        <!-- 用户信息开始 -->
                        <div flex="main:left cross:center" v-if="pageType != 'ClockRecod'" @click="toClockPersonal(index)">
                            <div class="avator avator_48">
                                <img  v-if="item.studentAvatar" :src="item.studentAvatar" alt="">
                                <p v-if="!item.studentAvatar">{{item.studentName.substring(item.studentName.length-2,item.studentName.length)}}</p>
                                
                            </div>
                            <div>
                                <p class="font_17px font_weight_700">{{item.studentName}}</p>
                                <p class="font_14px color_gray_light margin_top_4">{{item.clockDate.slice(0,16)}}</p>
                            </div>
                        </div>
                        <div flex="main:left cross:center" v-if="pageType == 'ClockRecod'">
                            <div class="avator avator_48">
                                <img  v-if="item.studentAvatar" :src="item.studentAvatar" alt="">
                                <p v-if="!item.studentAvatar">{{item.studentName.substring(item.studentName.length-2,item.studentName.length)}}</p>
                                
                            </div>
                            <div>
                                <p class="font_17px font_weight_700">{{item.studentName}}</p>
                                <p class="font_14px color_gray_light margin_top_4">{{item.clockDate.slice(0,16)}}</p>
                            </div>
                        </div>
                        <!-- 用户信息结束 -->
                        <!-- 操作区开始 -->
                        <div class="ellipsis" v-if="isManager == true || isManager == 'true' || item.isShowDel" @click="toMoreHandle(index)">
                            <img src="../../images/CreateClock/ellipsis.png">
                        </div>
                        <!-- 操作区结束 -->
                    </div>
                    <!-- 打卡头部用户信息结束 -->
                    <div class="clock_item_content">
                            <p style="white-space: pre-line;"  @click="ToclockSuccess(index)">{{item.impression}}</p>
                    </div>
                    <div class="clock_item_images" v-if="item.picUrls">
                        <!-- <p>这里是照片区域</p> -->
                        
                        <ul flex="main:left cross:center" v-if="item.picUrls.length ==1">
                            <li @click="preClick(0,index)"><img :src="item.picUrls[0]" alt=""></li>
                        </ul>
                        <ul flex="main:left cross:center" v-if="item.picUrls.length ==2" >
                            <li @click="preClick(0,index)"><img :src="item.picUrls[0]" alt=""></li>
                            <li @click="preClick(1,index)"><img :src="item.picUrls[1]" alt=""></li>
                            
                        </ul>
                        <ul flex="main:left cross:center"  v-if="item.picUrls.length >=3">
                            <li @click="preClick(0,index)"><img :src="item.picUrls[0]" alt=""></li>
                            <li @click="preClick(1,index)"><img :src="item.picUrls[1]" alt=""></li>
                            <li @click="preClick(2,index)"><img :src="item.picUrls[2]" alt=""></li>
                        </ul>
                        <p class="clock_img_count" v-if="item.picUrls.length >3">+{{item.picUrls.length-3}}</p>
                    </div>
                    <!-- 图片预览 -->
                    <van-image-preview v-model="pre_show" :images="preImage" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                        <template v-slot:index>
                            
                        </template>
                    </van-image-preview>
                    <!-- 图片预览 -->

                    <!-- 视频区域 -->
                    <div class="clock_item_video" v-if="item.videoUrl" style="margin:12px 0">
                        <H5Video ref="h5video" :fileVideoSrc='item.videoUrl' :playCount='item.playCount' :videoCover="item.coverPicUrl" :videoRemarks="item.videoRemarks" :videoId="item.videoId"/>
                    </div>
                    <!-- 视频区域 -->
                    <div>
                        <p  v-if="pageType == 'ClassCircle' || pageType == 'ClockRecod'" class="color_green margin_top_12" @click="toThemedetail(index)">
                            <span class="clockin_title_ellipsis"># {{item.title}}</span>
                        </p>
                        <p v-if="pageType == 'ClockDetail' || pageType == 'ClockRecod'" class="font_14px color_gray_light margin_top_12">来自<span class="color_green "> {{item.className}}</span></p>
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
            <!-- <p>{{ClockRecod}}</p> -->
        </div>
        <!-- 打卡用户列表 -->
        

        <div style="margin-top:8px;background:#FFFFFF;box-sizing:border-box;padding-top:20px" v-if="ClockRecod.length == 0 && isLoadDom == true">
            <div flex="dir:top cross:center">
                <img style="width:180px;height:180px;display:block" src="../../assets/images/nodata2x.png" alt="">
                <p class="font_14px color_gray_light">暂无打卡记录</p>
            </div>
        </div>

        <van-action-sheet v-model="MoreControl" :actions="actions" @select="moreHandle" cancel-text="取消" @cancel="onCancel" />

    </div>
</template>

<script>
import H5Video from '../../components/H5Video'
import {Toast,Dialog} from 'vant'
import '../../css/Clock/clocklist.css'
import '../../css/Clock/clockPublic.css'
const axios = require('axios')
// import BScroll from 'better-scroll'
export default {
    name:'ClockList',
    props:{
        clockId:{
            type:String,
        },
        cuid:{
            type:String,
        },
        storeId:{
            type:String,
        },
        classId:{
            type:String,
        },
        studentId:{
            type:String,
        },
        isManager:{
            type:Boolean
        },
        pageType:{
            type:String
        },
        token:{
            type:String
        },
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
            actions:[{name:'设为优质打卡'},{name:'删除'}],
            morehandleindex:Number
        }
    },
    components:{
        H5Video
    },
    mounted(){
        // this.getClockRecod()
        this.isLoadDom = true
        window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"FRESH"}')
    },
    watch(){

    },
    methods:{
        reLoad(){
            // this.$forceUpdate()
            Toast('更新了')
        },
        getClockRecod(){
            let url = this.ip+'class-clock-student/clockRecord';
            let param = new URLSearchParams()
            
            if(this.pageType == 'ClassCircle'){
                if(this.cuid) param.append("cuid", this.cuid)
                if(this.classId) param.append("classId", this.classId)
            }

            if(this.pageType == 'ClockDetail'){
                if(this.cuid) param.append("cuid", this.cuid)
                if(this.clockId) param.append("clockId",this.clockId)
            }

            if(this.pageType == 'ClockRecod'){
                if(this.cuid) param.append("cuid", this.cuid)
                if(this.studentId) param.append("studentId",this.studentId)
            }
            // param.append("storeId", this.storeId)
            
            param.append("textLength", 100)
            param.append("pageNo", 1)
            param.append("pageSize", 100)
            axios.post(url,param).then((res)=>{
                let ClockRecod = res.data.data
                this.ClockRecod = ClockRecod.data
                
                // this.$forceUpdate()
                
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
        pauseVideo(){
            // this.$refs.h5video[index].onPlayerPause()
            let videos = this.$refs.h5video
            for(let i =0;i<videos.length;i++){
                this.$refs.h5video[i].onPlayerPause()
            }
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
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'&storeId='+this.storeId+'&cuid='+this.cuid+'&isManager='+this.isManager+'"}');
                let len = this.$refs.h5video.length
                for(let i=0;i<len;i++){
                    this.$refs.h5video[i].onPlayerPause()
                }
            }
            if (this.device === 'ios') { 
                
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'&storeId='+this.storeId+'&cuid='+this.cuid+'&isManager='+this.isManager+'"}')
                let len = this.$refs.h5video.length
                for(let i=0;i<len;i++){
                    this.$refs.h5video[i].onPlayerPause()
                }
            }
        },
        toClockPraise(clockStudentId,index){
            let url = this.ip+'clock-student-praise/clockPraise';
            let param = new URLSearchParams()
            param.append("cuid", this.$route.query.cuid)
            param.append("storeId", this.$route.query.storeId)
            param.append("clockStudentId", clockStudentId)
            param.append("userToken", this.token)
            axios.post(url,param).then((res)=>{
                // Toast(res.data.result)
                if(res.data.result == 'success'){
                    this.ClockRecod[index].isPraise = !this.ClockRecod[index].isPraise
                    this.ClockRecod[index].praiseCustomerNum = Number(this.ClockRecod[index].praiseCustomerNum) + 1
                    //praiseCustomerDtos
                    this.ClockRecod[index].praiseCustomerDtos.push(res.data.data)
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"FRESH"}')
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
            if(this.device == 'android'){
                window.android.SkipPage('{"linkType":"app","scheme":"WXSHARE","url":"'+url+'","content":"'+content+'","logo":"'+logo+'","title":"'+title+'","type":"clock","typeId":"'+clockStudentId+'"}')
            }
            if(this.device == 'ios'){
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"WXSHARE","url":"'+url+'","content":"'+content+'","logo":"'+logo+'","title":"'+title+'","type":"clock","typeId":"'+clockStudentId+'"}')
            }
            
            let len = this.$refs.h5video.length
            for(let i=0;i<len;i++){
                this.$refs.h5video[i].onPlayerPause()
            }
        },
        toMoreHandle(index){
            
            this.morehandleindex = index
            
            if(this.pageType == 'ClockRecod'){
                if(this.isManager == 'true'){
                
                    if(this.ClockRecod[index].highQuality == true){
                // Toast('已经是优质打卡了')
                        this.actions = [{name:'取消优质打卡'},{name:'删除'}]
                    }else{
                        this.actions = [{name:'设为优质打卡'},{name:'删除'}]
                    }
                    this.MoreControl = true
                }else{
                    // Toast('我b是管理员')
                    if(this.ClockRecod[index].isShowDel == true){
                        this.actions=[{name:'删除'}]
                        this.MoreControl = true
                    }else{
                        
                        this.MoreControl = false
                    }
                }
            }else{
                if(this.isManager == true){
                // Toast('我是管理员')
                    if(this.ClockRecod[index].highQuality){
                // Toast('已经是优质打卡了')
                        this.actions = [{name:'取消优质打卡'},{name:'删除'}]
                    }else{
                        this.actions = [{name:'设为优质打卡'},{name:'删除'}]
                    }
                    this.MoreControl = true
                }else{
                    if(this.ClockRecod[index].isShowDel){
                        this.actions=[{name:'删除'}]
                        this.MoreControl = true
                    }else{
                        this.MoreControl = false
                    }
                }
            }
            
            
            
        },
        moreHandle(item,index){
            
            if(item.name == '删除') {
                //删除快速打卡操作
                Dialog.confirm({
                    message: '确定删除该打卡吗？',
                    confirmButtonColor:'#60C38C'
                }).then(() => {
                // on confirm
                    let url = this.ip +'/class-clock-student/removeRapidClock'
                    let clockStudentId  = this.ClockRecod[this.morehandleindex].clockStudentId
                    let param = new URLSearchParams()
                    param.append("cuid", this.$route.query.cuid)
                    param.append("userToken", this.token)
                    param.append("storeId", this.ClockRecod[index].storeId)
                    param.append("clockStudentId", clockStudentId)
                    axios.post(url,param).then((res)=>{
                        // if(res.data.result == 'success') window.location.reload()
                        if(res.data.result == 'success') {
                            this.getClockRecod()
                            this.$emit('freshPage',true)
                        }else{
                            Toast(res.data.msg)
                        }
                        
                        // else Toast(res.data.msg)
                    })
                    this.MoreControl = false
                }).catch(() => {
                    // on cancel
                    this.MoreControl = false
                    return
                });
                
            }
            if(item.name == '设为优质打卡') {
                // 设置为优质打卡的操作
                let url = this.ip +'/class-clock-student/setHighQuality'
                let clockStudentId  = this.ClockRecod[this.morehandleindex].clockStudentId
                let param = new URLSearchParams()
                param.append("cuid", this.$route.query.cuid)
                param.append("userToken", this.token)
                param.append("storeId", this.ClockRecod[index].storeId)
                param.append("clockStudentId", clockStudentId)
                param.append("isHighQuality", true)
                axios.post(url,param).then((res)=>{
                    this.MoreControl = false
                    
                    if(res.data.result == 'success') {
                        Toast.success('设置成功')
                        setTimeout(()=>{
                            this.getClockRecod()
                            this.$emit('freshPage',true)
                        },800)
                    }else{
                        Toast(res.data.msg)
                    }
                })
            }
            if(item.name == '取消优质打卡') {
                // 设置为优质打卡的操作
                let url = this.ip +'/class-clock-student/setHighQuality'
                let clockStudentId  = this.ClockRecod[this.morehandleindex].clockStudentId
                let param = new URLSearchParams()
                param.append("cuid", this.$route.query.cuid)
                param.append("userToken", this.token)
                param.append("storeId", this.ClockRecod[index].storeId)
                param.append("clockStudentId", clockStudentId)
                 
                param.append("isHighQuality", false)
                axios.post(url,param).then((res)=>{
                    this.MoreControl = false
                    
                    if(res.data.result == 'success') {
                        Toast.success('设置成功')
                        setTimeout(()=>{ 
                            this.getClockRecod()
                            this.$emit('freshPage',true)
                        },800)
                    }else{
                        Toast(res.data.msg)
                    }
                })
            }
        },
        ToclockSuccess(index){
            //
            
            let storeId = this.ClockRecod[index].storeId
            
            let classId = this.ClockRecod[index].classId
            
            let studentId = this.ClockRecod[index].studentId
            let clockId = this.ClockRecod[index].clockId
            let clockStudentId = this.ClockRecod[index].clockStudentId
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/Clockinfo?clockId='+this.clockId+'&studentId='+studentId+'&classId='+classId+'&clockStudentId='+clockStudentId+'&cuid='+this.cuid+'&storeId='+storeId+'&isManager='+this.isManager+'"}');
                let len = this.$refs.h5video.length
                for(let i=0;i<len;i++){
                    this.$refs.h5video[i].onPlayerPause()
                }
            }
            if (this.device === 'ios') { 
                //self.Url + '/ClockSuccess?clockId='+self.$route.query.clockId+'&studentId='+studentId+'&classId='+classId+'&clockStudentId='+res.data.data+'&cuid='+self.$route.query.cuid+'&storeId='+self.$route.query.storeId;
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/Clockinfo?clockId='+clockId+'&studentId='+studentId+'&classId='+classId+'&clockStudentId='+clockStudentId+'&cuid='+this.cuid+'&storeId='+storeId+'&isManager='+this.isManager+'"}')
                let len = this.$refs.h5video.length
                for(let i=0;i<len;i++){
                    this.$refs.h5video[i].onPlayerPause()
                }
            }
        },
        toThemedetail(index){
            //
            
            let storeId = this.ClockRecod[index].storeId
            let clockId = this.ClockRecod[index].clockId
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","scheme":"H5PAGE","url": "'+this.Url+'/ClockDetail?clockId='+this.clockId+'&cuid='+this.cuid+'&storeId='+storeId+'"}');
                let len = this.$refs.h5video.length
                for(let i=0;i<len;i++){
                    this.$refs.h5video[i].onPlayerPause()
                }
            }
            if (this.device === 'ios') { 
                //self.Url + '/ClockSuccess?clockId='+self.$route.query.clockId+'&studentId='+studentId+'&classId='+classId+'&clockStudentId='+res.data.data+'&cuid='+self.$route.query.cuid+'&storeId='+self.$route.query.storeId;
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme":"H5PAGE","isBlackItem":"false","url": "'+this.Url+'/ClockDetail?clockId='+clockId+'&cuid='+this.cuid+'&storeId='+storeId+'"}')
                // this.$refs.h5video[index].onPlayerPause()
                let len = this.$refs.h5video.length
                for(let i=0;i<len;i++){
                    this.$refs.h5video[i].onPlayerPause()
                }
            }
        }
        
    }
}
</script>
<style lang="stylus" scoped>

</style>