<template>
    <div class="ClassCircle">
        <div class="class_info_wrap">
            <p style="text-align:center;margin-bottom:12px">{{ClassCircleHead.className}}</p>

            <div class="class_student_info_list" ref="studentListBox">
                <van-swipe class="my-swipe" :show-indicators='false' :change="getindex">
                    <van-swipe-item class="class_student_item"  v-for="(item, index) in studenList" :key="index">
                        <div flex="main:left cross:center">
                            <div style="margin-right:14px;text-align:center;">
                                <img  class="img_48_round" v-if="item.studentAvatar"  :src="item.studentAvatar" alt="">
                                <p class="img_48_round font_12px color_FFFFFF" style="border:0.8px solid #FFFFFF;background:rgba(255,255,255,.3);line-height:48px" v-if="!item.studentAvatar">{{item.studentName.slice(0,2)}}</p>
                            </div>
                            <p class="font_18px color_FFFFFF font_weight_bold">{{item.studentName}}</p>
                        </div>
                        <div flex="main:justify cross:center" style="text-align:center;background:rgba(255,255,255,.1);heigth:63px;border-radius:10px;padding:10px 0;margin-top:12px">
                            <div style="min-width:30%">
                                <p class="font_18px color_FFFFFF">{{item.clockCount}}</p>
                                <p class="font_12px color_F6F6F6">累计打卡</p>
                            </div>
                            <div style="min-width:30%">
                                <p class="font_18px color_FFFFFF">{{item.praiseTotalNum}}</p>
                                <p class="font_12px color_F6F6F6">累计获赞</p>
                            </div>
                            <div style="min-width:30%">
                                <p class="font_18px color_FFFFFF">{{item.attendTitleNum}}</p>
                                <p class="font_12px color_F6F6F6">参与主题</p>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>

            
            <!-- <p>{{ClassCircleHead}}</p> -->

            <div class="class_circle_clock" flex="main:justify cross:center">
                <div class="class_circle_clock_tag" flex="main:justiry cross:center">
                    <img class="img_10" src="../../images/CreateClock/time.png" alt="">
                    <p class="font_10px color_FFFFFF">进行中</p>
                </div>
                <div style="box-sizing:border-box;padding-top:12px">
                    <p class="font_16px color_353239" style="margin-bottom:5px">{{ClassCircleHead.title}}</p>
                    <p class="font_14px color_9B9B9B">我已打卡<span class="color_FF444B"> {{ studentClockNum }} </span>次</p>
                </div>
                <div flex="main:center cross:center" style="width:77px;height:77px;border-radius:50%;background:rgba(96,195,140,.1)" @click="toClock()">
                    <div flex="main:center cross:center" style="width:69px;height:69px;border-radius:50%;background:rgba(96,195,140,.4)">
                        <div flex="main:center cross:center" style="width:61px;height:61px;border-radius:50%;background:rgba(96,195,140,1)">
                            <p><a class="font_12px color_FFFFFF" :href="aa">去打卡</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- 打卡用户列表 -->
        <div style="margin-top:8px;background:#FFFFFF" v-if="ClockRecod.length != 0">
            <div class="clock_list_wrap">
                <div class="clock_list_item" v-for="(item, index) in ClockRecod" :key="index" @click="getRecodIndex(index)">
                    <div class="clock_item_userinfo" @click="toClockPersonal(index)">
                        <!-- 打卡头部用户信息 -->
                        <div class="clock_item_avatar">
                            <img  v-if="item.studentAvatar" :src="item.studentAvatar" alt="">
                            <p class="img_48_round font_12px color_FFFFFF" style="border:0.8px solid #60C38C;background:rgba(96,195,140,.3);line-height:48px;text-align:center" v-if="!item.studentAvatar">{{item.studentName.slice(0,2)}}</p>
                        </div>
                        <div class="clock_item_user_info">
                            <p class="user_name">{{item.studentName}}</p>
                            <div class="clock_info">
                                <p>已打卡 {{item.clockCount}} 次</p>
                                <p>{{item.clockDate}}</p>
                            </div>
                        </div>
                        <!-- 打卡头部用户信息 -->
                    </div>
                    <div class="clock_item_content">
                        <p>{{item.impression}}</p>
                    </div>
                    <div class="clock_item_images" v-if="item.picUrls">
                        <!-- <p>这里是照片区域</p> -->
                        <ul flex="main:left cross:center">
                            <li v-for="(item, index) in item.picUrls" :key="index">
                                <img :src="item.url" style="width: 2.773333rem;height: 2.773333rem;" alt="" @click="preClick(index)"></li>
                        </ul>
                        <p class="clock_img_count" v-if="item.picUrls.length >3">+ {{item.picUrls.length-3}}</p>
                    </div>
                    <!-- 图片预览 -->
                    <van-image-preview v-model="pre_show" :images="preImage" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                        <template v-slot:index>
                            
                        </template>
                    </van-image-preview>
                    <!-- 图片预览 -->
                    <div class="clock_item_video" v-if="item.videoUrl" style="border:1px solid black;border-radius:15px;overflow:hidden!important;z-index:29;position:relative">
                        <H5Video :fileVideoSrc='item.videoUrl'/>
                    </div>
                    <div class="clock_item_class_info">
                        <p>来自<span>{{item.className}}</span></p>
                    </div>
                    <div class="clock_item_func">
                        <div class="clock_item_zan_user">
                            <div class="clock_item_info_list">
                                <ul>
                                    <li v-for="(item2, index) in item.praiseCustomerDtos" :key="index">
                                        <img v-if="item2.avatar" :src="item2.avatar" alt="">
                                        <p class="font_10px0" style="border:0.8px solid #60C38C;background:rgba(96,195,140,.3);line-height:28px;text-align:center;color:#ffffff;border-radius:50%;width:28px;height:28px" v-if="!item2.avatar">{{item2.name.slice(0,1)}}</p>
                                    </li>
                                </ul>
                            </div>
                            <p>{{item.praiseCustomerNum}} 人觉得很赞</p>
                        </div>
                        <div class="clock_btn">
                            <div class="clock_btn01 btn_clock">
                                <img src="../../images/CreateClock/share.png" alt="">
                                <p>分享</p>
                            </div>
                            <div class="btn_clock" v-if="item.isPraise == false" @click="toClockPraise(item.clockStudentId,index)">
                                <img src="../../images/CreateClock/zan.png" alt="">
                                <p>点赞</p>
                            </div>
                            <div class="btn_clock_zaned" v-if="item.isPraise == true">
                                <img src="../../images/CreateClock/zaned.png" alt="">
                                <p>已赞</p>
                            </div>
                        </div>
                    </div>
                    <van-divider />
                </div>

            </div>
        </div>
        <!-- 打卡用户列表 -->

        <div style="margin-top:8px;background:#FFFFFF;box-sizing:border-box;padding-top:20px" v-if="ClockRecod.length == 0">
            <div flex="dir:top cross:center">
                <img style="width:180px;height:180px;display:block" src="../../assets/images/nodata2x.png" alt="">
                <p class="font_12px color_9B9B9B">暂无打卡数据</p>
            </div>
        </div>
        
    </div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import '../../css/Clock/clocklist.css'
import H5Video from '../../components/H5Video'
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
            ClockList:[
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'宇文化及',
                    class:'历史A班',
                    num:'13'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'诸葛亮',
                    class:'历史A班',
                    num:'11'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'司马懿',
                    class:'历史A班',
                    num:'8'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'曹操',
                    class:'历史A班',
                    num:'5'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'曹操',
                    class:'历史A班',
                    num:'5'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'曹操',
                    class:'历史A班',
                    num:'5'
                },
            ],
            ZanList:[
                {
                    img:'http://img4.imgtn.bdimg.com/it/u=3215380059,2729465507&fm=26&gp=0.jpg',
                    name:'唐僧',
                    class:'历史B班',
                    num:'66'
                },
                {
                    img:'http://img4.imgtn.bdimg.com/it/u=3215380059,2729465507&fm=26&gp=0.jpg',
                    name:'孙悟空',
                    class:'历史B班',
                    num:'60'
                },
                {
                    img:'http://img4.imgtn.bdimg.com/it/u=3215380059,2729465507&fm=26&gp=0.jpg',
                    name:'沙僧',
                    class:'历史B班',
                    num:'53'
                },
                {
                    img:'http://img4.imgtn.bdimg.com/it/u=3215380059,2729465507&fm=26&gp=0.jpg',
                    name:'吴京',
                    class:'历史B班',
                    num:'48'
                },
            ],
            preImage:[],
            studenList:[
                {
                    img:'http://img5.imgtn.bdimg.com/it/u=939331267,3271418350&fm=11&gp=0.jpg',
                    name:'张三',
                    totalclock:'6',
                    totalzan:'7',
                    clockTheme:'2'
                },
                {
                    img:'http://img5.imgtn.bdimg.com/it/u=3855228764,1994140555&fm=11&gp=0.jpg',
                    name:'李四',
                    totalclock:'6',
                    totalzan:'7',
                    clockTheme:'2'
                },
                {
                    img:'http://img1.imgtn.bdimg.com/it/u=86666183,840701312&fm=11&gp=0.jpg',
                    name:'王二',
                    totalclock:'6',
                    totalzan:'7',
                    clockTheme:'2'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=1473741299,1011020019&fm=26&gp=0.jpg',
                    name:'麻子',
                    totalclock:'6',
                    totalzan:'7',
                    clockTheme:'2'
                },
            ],
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
        H5Video
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
            param.append("cuid", 'eYhjQznFDdvZiHz4oXt ')
            param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
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
            //this.$router.push({path:'/QuickToClock',query:{clockId:this.clockId,studentId:this.studentId,classId:this.$route.query.classId}})
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/QuickToClock"}');
            }
            if (this.device === 'ios') { 
                //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
                // this.$router.push({path:'/QuickToClock',query:{clockId:this.clockId,studentId:this.studentId,classId:this.$route.query.classId,clockTheme:clockTheme}})
                let url = this.Url+'/QuickToClock?studentId='+this.studentId+'&classId='+this.$route.query.classId+'&clockId='+this.clockId+'&clockTheme='+clockTheme
                this.aa = url
        // 　　　　 window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+url+'"}')
            }
        },
        getClockRecod(clockId){
            let url = this.ip+'class-clock-student/clockRecord';
            let param = new URLSearchParams()
            param.append("cuid", 'eYhjQznFDdvZiHz4oXt ')
            param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
            param.append("clockId", clockId)
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
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/CreateClockMana"}');
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
            param.append("cuid", 'eYhjQznFDdvZiHz4oXt')
            param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
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
        
    }
}
</script>
<style lang="stylus" scoped>
.ClassCircle
    background #FAF8F8
    .class_info_wrap
        background #FFFFFF
        box-sizing border-box
        padding 12px 16px 28px 16px
        .class_student_info_list
            box-sizing border-box
            width 9.57rem
            padding-right 16px
            border-radius 15px
            position relative
            .class_student_item
                background #60C38C
                box-sizing border-box
                padding 12px
                border-radius 15px
                border-right 2px solid #FFFFFF
            
        .class_circle_clock
            margin-top 32px
            box-sizing border-box
            padding 18px 16px
            background #F0FDF4
            border-radius 15px
            position relative
            .class_circle_clock_tag
                
                height 18px 
                background #60C38C
                box-sizing border-box
                border-radius 15px 0 15px 0
                padding 4px 12px 
                position absolute
                top 0
                left 0
</style>