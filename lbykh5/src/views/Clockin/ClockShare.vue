<template>
    <div class="ClockShare">
        <div class="clock_share_top">
            <img style="width:100%" src="../../images/CreateClock/clock_share_topbg.png" alt="">
        </div>
        
        <div class="share_content_wrap">
            <div class="clock_share_content">
                <p style="position:absolute;top:0;right:0;z-index:1001;width:53px;height:51px"><img style="width:53px;height:51px" src="../../images/CreateClock/clock_share_tag.png" alt=""></p>
                <p class="clock_share_avatar" flex="main:center cross:center"><img class="img_60_round" src="http://pic1.zhimg.com/50/v2-e7d9a07b0c98851d443c60a81e90b6aa_hd.jpg" alt=""></p>
                <div flex="dir:top main:center cross:center">
                    <p class="font_18px font_weight_bold color_353239">{{ClockResult.studentName}}</p>
                    <p class="font_14px color_9B9B9B" style="margin:8px 0 4px 0">主题打卡 第<span class="color_FF9F1B"> {{ClockResult.clockCount}} </span>次</p>
                    <p class="font_18px color_353239 font_weight_400">“{{ClockResult.title}}”</p>
                </div>
                <div class="clock_content">
                    <p class="font_16px color_9B9B9B">{{ClockResult.impression}}</p>

                </div>
                
                <div class="clock_item_images" v-show="true">
                    <!-- <p>这里是照片区域</p> -->
                    <ul flex="main:left cross:center">
                        <!-- <li v-for="(item, index) in preImage" :key="index"><img :src="item" alt="" @click="preClick(index)"></li> -->
                        <li v-for="(item1, index) in item.picUrls" :key="index"><img :src="item1.url" style="width: 2.773333rem;height: 2.773333rem;" alt="" @click="preClick(index)"></li>
                        <!-- <li @click="preClick(0)"><img style="width: 1.866666rem;height: 1.866666rem;" :src="preImage[0]" alt=""></li>
                        <li @click="preClick(1)"><img style="width: 1.866666rem;height: 1.866666rem;" :src="preImage[1]" alt=""></li>
                        <li @click="preClick(2)"><img style="width: 1.866666rem;height: 1.866666rem;" :src="preImage[2]" alt=""></li>
                        <li @click="preClick(3)"><img style="width: 1.866666rem;height: 1.866666rem;" :src="preImage[3]" alt=""></li> -->
                    </ul>
                    <p class="clock_img_count" v-if="item.picUrls.length > 3">+{{preImage.length-3}}</p>
                </div>
                <!-- 图片预览 -->
                <van-image-preview v-model="pre_show" :images="item.picUrls" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                    <template v-slot:index></template>
                </van-image-preview>
                <!-- 图片预览 -->
                <div class="clock_item_video" v-show="false">
                    <!-- 这里是视频区域 -->
                    <H5Video :fileVideoSrc='fileVideoSrc'/>
                </div>

                <div class="clock_item_class_info" v-if="false">
                    <p>来自<span>2020届舞蹈基础B班</span></p>
                </div>
                <div class="clock_item_func" v-if="false">
                    <div class="clock_item_zan_user">
                        <div class="clock_item_info_list">
                            <ul>
                                <li><img src="http://img1.imgtn.bdimg.com/it/u=3011024659,3918111814&fm=26&gp=0.jpg" alt=""></li>
                                <li><img src="http://img5.imgtn.bdimg.com/it/u=1013062358,2295738855&fm=26&gp=0.jpg" alt=""></li>
                                <li><img src="http://img2.imgtn.bdimg.com/it/u=1602610465,750348961&fm=26&gp=0.jpg" alt=""></li>
                                <li><img src="http://img4.imgtn.bdimg.com/it/u=335183132,539509064&fm=26&gp=0.jpg" alt=""></li>
                                <li><img src="http://img2.imgtn.bdimg.com/it/u=1473741299,1011020019&fm=26&gp=0.jpg" alt=""></li>
                            </ul>
                        </div>
                        <p>1.2w人觉得很赞</p>
                    </div>
                    <div class="clock_btn">
                        <div class="clock_btn01 btn_clock">
                            <img src="../../images/CreateClock/share.png" alt="">
                            <p>分享</p>
                        </div>
                        <div class="btn_clock">
                            <img src="../../images/CreateClock/zan.png" alt="">
                            <p>点赞</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p>{{ClockResult}}</p>
        <!-- 机构信息 -->
        <div style="margin:16px 0;position:relative;z-index:999;padding:0 16px;box-sizing:border-box" >
            <div style="background:#FFFFFF;box-sizing:border-box;padding:16px 16px 12px 16px;border-radius:15px">
                <div flex="main:left cross:center">
                    <img class="img_48" style="margin-right:8px;border-radius:15px" src="http://pic3.zhimg.com/50/v2-e744631376f29fe10858c1750f169db7_hd.jpg" alt="">
                    <div>
                        <p class="font_16px color_181818">机构的名字</p>
                        <p class="font_13px color_C6C6C6">机构的科目</p>
                    </div>
                </div>
                <van-divider />
                <div flex="main:justify cross:center">
                    <div flex="dir:top main:left">
                        <p flex="main:left cross:center" style="margin-bottom:4px">
                            <img class="img_16" src="../../images/CreateClock/location.png" alt="">
                            <span class="font_14px color_181818">机构所在市区</span>
                        </p>
                        <p class="font_12px color_C6C6C6">机构的建筑物地址</p>
                    </div>
                    <div class="btn_60C38C" flex="main:justify cross:center" style="box-sizing:border-box;padding:6px 8px">
                        <p style="margin-right:4px">进店逛逛</p>
                        <img class="img_14" src="../../images/CreateClock/next.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- 机构信息 -->
        
        <!-- 分享的课程 -->
        <div class="share_course">
            <p class="font_14px color_9B9B9B" style="margin-bottom:8px">赶快报名，跟我一起学习成长吧！</p>
            <div flex="main:left cross:center">
                <div style="margin-right:12px"><img class="img_48" style="border-radius:10px" src="http://pic1.zhimg.com/50/v2-b7bd451b0bda3c36fa8a7f07d9ac4ffe_hd.jpg" alt=""></div>
                <div style="width:100%">
                    <p class="font_16px color_181818" style="margin-bottom:6px">推广课程的标题</p>
                    <div flex="main:justify cross:center">
                        <p class="font_14px color_FF444B">￥79/3节课</p>
                        <div class="btn_60C38C" flex="main:justify cross:center" style="box-sizing:border-box;padding:6px 8px">
                            <p style="margin-right:4px">立即报名</p>
                            <img class="img_14" src="../../images/CreateClock/next.png" alt="">
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- 分享的课程 -->

        <!-- 分享按钮 -->
        <div class="clock_share_btn" v-show="false">
            <div style="background:#D2B9A8;height:56px;border-radius:30px;">
                <div flex="main:center cross:center" style="background:#FAEADE;height:50px;border-radius:30px;">
                    <p class="font_16px color_60C38C">分享</p>
                </div>
            </div>
        </div>
        <!-- 分享按钮 -->

        <div class="clock_share_bottom">
            <img style="width:100%" src="../../images/CreateClock/clock_share_bottombg.png" alt="">
        </div>
        
    </div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
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
            preImage:[
                'http://img3.imgtn.bdimg.com/it/u=2792090559,2900667538&fm=26&gp=0.jpg',
                'http://img1.imgtn.bdimg.com/it/u=1728307612,3498260071&fm=26&gp=0.jpg',
                'http://img4.imgtn.bdimg.com/it/u=4042650250,4000697206&fm=26&gp=0.jpg',
                'https://drscdn.500px.org/photo/1012172270/q%3D80_m%3D2000/v2?sig=2942fdc49d6607fe66ffe11adf35d02b0dd1e2df11be3474cf617d925b09dcea',
                'https://drscdn.500px.org/photo/1012172160/q%3D80_m%3D1500/v2?sig=914c45ce0790b4849834e2d1ab9b465957575b95e8c6c17b55ad4d72eab9d3f0'
            ],
            ClockResult:'',
        }
    },
    mounted(){
        this.getClockResult()
    },
    methods:{
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
        getClockResult(){
            // /class-clock-student/detailedClock
            let url = this.ip+'class-clock-student/detailedClock';
            let param = new URLSearchParams()
            param.append("cuid", 'eYhjQznFDdvZiHz4oXt ')
            param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
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
        }
    }
}
</script>
<style lang="stylus" scoped>
.ClockShare
    background #F6F6F6
    box-sizing border-box
    
    .clock_share_bottom
        background #F6F6F6
        transform translateY(-50%)
        height 190px

    .clock_share_btn
        position fixed
        bottom 35px
        z-index 1000
        width 10rem
        box-sizing border-box
        padding 0 16px

    .share_course
        margin 16px 0
        width 10rem
        position relative
        z-index 999
        padding 0 16px
        box-sizing border-box
        background #FFFFFF
        box-sizing border-box
        padding 12px 16px 35px 16px
        border-radius 15px 15px 0 0
        position fixed
        bottom -15px

    .share_content_wrap
        position relative
        z-index 999
        box-sizing border-box
        padding 0 16px
        margin-top 33px
        .clock_share_content
            padding 41px 16px 24px 16px
            box-sizing border-box
            position relative
            border-radius 15px
            background #FFFFFF
            .clock_content
                margin 16px 0
            .clock_share_avatar
                background rgba(255,255,255,1)
                border-radius 50%
                width 66px
                height 66px
                position absolute
                top -33px
                left 50%
                transform translateX(-50%)
</style>

