<template>
    <div class="ClockRecod">
        <div class="class_info_wrap">
            <p style="text-align:center;margin-bottom:12px">{{className}}</p>

            <div class="class_student_info_list">
                <ul>
                    <li class="class_student_item" flex="main:left dir:top">
                        <div flex="main:left cross:center">
                            <img v-if="personalInfo.data.studentAvatar" class="img_48_round" style="margin-right:14px" :src="personalInfo.data.studentAvatar" alt="">
                            <p class="img_48_round font_12px color_FFFFFF" style="border:0.8px solid #FFFFFF;background:rgba(255,255,255,.3);line-height:48px;text-align:center;margin-right:8px" v-if="!personalInfo.data.studentAvatar">{{personalInfo.data.studentName.slice(0,2)}}</p>
                            <p class="font_18px color_FFFFFF font_weight_bold">{{personalInfo.data.studentName}}</p>
                        </div>
                        <div flex="main:justify cross:center" style="text-align:center">
                            <div style="min-width:30%">
                                <p class="font_18px color_FFFFFF">{{personalInfo.data.clockCount}}</p>
                                <p class="font_12px color_F6F6F6">累计打卡</p>
                            </div>
                            <div style="min-width:30%">
                                <p class="font_18px color_FFFFFF">{{personalInfo.data.praiseTotalNum}}</p>
                                <p class="font_12px color_F6F6F6">累计获赞</p>
                            </div>
                            <div style="min-width:30%">
                                <p class="font_18px color_FFFFFF">{{personalInfo.data.attendTitleNum}}</p>
                                <p class="font_12px color_F6F6F6">参与主题</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        
        <!-- 打卡用户列表 -->
        <div>
            <div class="clock_list_wrap">
                <div class="clock_list_item" v-for="(item, index) in personalInfo.data.clockRecordDtos.data" :key="index" @click="getRecodIndex(index)">
                    <!-- 打卡头部用户信息开始 -->
                    <div flex="main:justify cross:center">
                        <!-- 用户信息开始 -->
                        <p class="font_14px color_gray_light margin_top_4">{{item.clockDate.slice(0,16)}}</p>
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

        <!-- 打卡用户列表 -->
        <div style="margin-top:8px;background:#FFFFFF">
            <div class="clock_list_wrap">
                <div class="clock_list_item" v-for="(item, index) in personalInfo.data.clockRecordDtos.data" :key="index" @click="getRecodIndex(index)">
                    <div class="clock_item_userinfo">
                        <!-- 打卡头部用户信息 -->
                        
                        <img class="img_16" style="margin-right:8px" src="../../images/CreateClock/time2.png" alt="">
                        <p class="font_16px color_9B9B9B">{{item.clockDate}}</p>
                        <!-- 打卡头部用户信息 -->
                    </div>
                    <div class="clock_item_content">
                        <p>{{item.impression}}</p>
                    </div>
                    <div class="clock_item_images" v-if="item.picUrls">
                        <!-- <p>这里是照片区域</p> -->
                        <ul flex="main:left cross:center">
                            <li v-for="(item1, index) in item.picUrls" :key="index"><img :src="item1.url" style="width: 2.773333rem;height: 2.773333rem;" alt="" @click="preClick(index)"></li>
                        </ul>
                        <p class="clock_img_count" v-if="item.picUrls.length >3">+ {{item.picUrls.length-3}}</p>
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
                    <div class="clock_item_class_info">
                        <p>来自<span>2020届舞蹈基础B班</span></p>
                    </div>
                    <div class="clock_item_func">
                        <div class="clock_item_zan_user">
                            <div class="clock_item_info_list">
                                <ul>
                                    <li v-for="(item2, index) in item.praiseCustomerDtos" :key="index"><img :src="item2.avatar" alt=""></li>
                                </ul>
                            </div>
                            <p>{{item.praiseCustomerNum}} 人觉得很赞</p>
                        </div>
                        <div class="clock_btn">
                            <div class="clock_btn01 btn_clock">
                                <img src="../../images/CreateClock/share.png" alt="">
                                <p>分享</p>
                            </div>
                            <div class="btn_clock" v-if="item.isPraise == false" @click="toClockPraise(item.clockStudentId)">
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
    </div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import '../../css/Clock/clocklist.css'
import {Toast} from 'vant'
const axios = require('axios')
import H5Video from '../../components/H5Video'
export default {
    name:'ClockRecod',
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
            pre_index:0,
            pre_show:false,
            cuid:'',
            storeId:'',
            clockId:'',
            personalInfo:'',
            className:this.$route.query.className
        }
    },
    components:{
        H5Video
    },
    mounted(){
        this.getPersonalInfo()
    },
    methods:{
        getRecodIndex(index){
            // this.selectRecod = index
            let clockRecod = this.personalInfo.data.clockRecordDtos.data
            let item = clockRecod[index].picUrls;
            let len = clockRecod[index].picUrls.length;
            this.preImage = [];
            for(let i=0;i<len;i++){
                //
                this.preImage.push(item[i].url)
            }
        },
        preClick(index){
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
        getPersonalInfo(){
            //获取打卡个人主页
            // /class-clock-student/clockRecord
            // /class-clock-student/clockPersonalPage
            let url = this.ip+'class-clock-student/clockPersonalPage';
            let param = new URLSearchParams()
            param.append("cuid", 'eYhjQznFDdvZiHz4oXt')
            param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
            param.append("pageNo", 1)
            param.append("pageSize", 100)
            param.append("studentId", this.$route.query.studentId)
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'noLogin'){
                    if(this.device == 'android'){
                        window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else if(this.device == 'ios'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                }
                let personalInfo = res.data
                this.personalInfo = personalInfo
                this.personalRecod = personalInfo.data.clockRecordDtos
                
                
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.ClockRecod
    background #fff
    padding 16px
    .class_info_wrap
        background #FFFFFF
        box-sizing border-box
        padding 12px 16px 28px 16px
        .class_student_info_list
            .class_student_item
                background #60C38C
                box-sizing border-box
                box-shadow 0 10px 20px rgba(96,195,140,0.3)
                padding 12px
                border-radius 15px
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