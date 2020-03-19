<template>
    <div class="clocklist">
        <van-tabs v-model="active" sticky swipeable lazy-render :border='false'>
            <van-tab title="打卡记录">
                <div class="clock_list_wrap" v-if="ClockRecod.length != 0">
                    <div class="clock_list_item" v-for="(item, index) in ClockRecod" :key="index" @click="getRecodIndex(index)">
                        <div class="clock_item_userinfo" @click="toClockPersonal(index)">
                            <!-- 打卡头部用户信息 -->
                            <div class="clock_item_avatar">
                                <img v-if="item.studentAvatar" :src="item.studentAvatar" alt="">
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
                        <div class="clock_item_video" v-if="item.videoUrl" style="border:1px solid black;border-radius:15px;overflow:hidden!important;z-index:29;position:relative">
                            <H5Video :fileVideoSrc='item.videoUrl'/>
                        </div>

                        <div class="clock_item_class_info">
                            <p>来自<span>{{item.className}}</span></p>
                        </div>
                        <div class="clock_item_func">
                            <div class="clock_item_zan_user">
                                <div class="clock_item_info_list" >
                                    <ul>
                                        <li v-for="(item2, index) in item.praiseCustomerDtos" :key="index">
                                            <img style="border:0" v-if="item2.avatar" :src="item2.avatar" alt="">
                                            <p class="font_10px" style="border:0.8px solid #60C38C;background:rgba(96,195,140,.3);line-height:28px;text-align:center;color:#ffffff;border-radius:50%;width:28px;height:28px" v-if="!item2.avatar">{{item2.name.slice(0,1)}}</p>
                                        </li>
                                    </ul>
                                </div>
                                <p>{{item.praiseCustomerNum}} 人觉得很赞</p>
                            </div>
                            <div class="clock_btn">
                                <div class="clock_btn01 btn_clock">
                                    <img src="../images/CreateClock/share.png" alt="">
                                    <p>分享</p>
                                </div>
                                <div class="btn_clock" v-if="item.isPraise == false" @click="toClockPraise(item.clockStudentId,index)">
                                    <img src="../images/CreateClock/zan.png" alt="">
                                    <p>点赞</p>
                                </div>
                                <div class="btn_clock_zaned" v-if="item.isPraise == true">
                                    <img src="../images/CreateClock/zaned.png" alt="">
                                    <p>已赞</p>
                                </div>
                            </div>
                        </div>
                        <van-divider />
                    </div>

                    <van-divider />
                </div>
                <div class="nodata" style="margin-bottom:55px;margin-top:20px" v-if="ClockRecod.length == 0">
                    <div flex="dir:top cross:center">
                        <img style="width:150px;height:150px;display:block" src="../assets/images/nodata2x.png" alt="">
                        <p style="color:#9B9B9B">暂无相关数据</p>
                    </div>
                </div>
            </van-tab>
            <van-tab title="排行榜">
                <div class="rankList_wrap">
                    <van-tabs v-model="activeOrder" sticky swipeable lazy-render :border='false'>
                        <van-tab title="打卡榜" class="rank_list_clock">
                            <div class="rank_clock_list rank_list_comen" v-if="ClockRank.data.length != 0">
                                <ul>
                                    <li v-for="(clock, index) in ClockRank.data" :key="index">
                                        <div class="rank_item">
                                            <div class="rank_item_avatar">
                                                <div class="avatar_pic">
                                                    <p class="rank_num">
                                                        <img v-if="index == 0" src="../images/CreateClock/first.png" alt="">
                                                        <img v-if="index == 1" src="../images/CreateClock/second.png" alt="">
                                                        <img v-if="index == 2" src="../images/CreateClock/third.png" alt="">
                                                        <span v-if="index > 2">{{index+1}}</span>
                                                    </p>
                                                    <img v-if="clock.studentAvatar" :src="clock.studentAvatar" alt="">
                                                    <p class="img_48_round font_12px color_FFFFFF" style="border:0.8px solid #60C38C;background:rgba(96,195,140,.3);line-height:48px;text-align:center" v-if="!clock.studentAvatar">{{clock.studentName.slice(0,2)}}</p>
                                                </div>
                                                <div class="rank_item_userinfo">
                                                    <p>{{clock.studentName}}</p>
                                                    <p>{{clock.className}}</p>
                                                </div>
                                            </div>
                                            <div class="rank_item_data">{{clock.clockOrPraiseCount}}次</div>
                                        </div>
                                    </li>
                                    
                                    
                                </ul>
                            </div>
                            <div class="nodata" style="margin-bottom:55px" v-if="ClockRank.data.length == 0">
                                <div flex="dir:top cross:center">
                                    <img style="width:150px;height:150px;display:block" src="../assets/images/nodata2x.png" alt="">
                                    <p style="color:#9B9B9B">暂无相关数据</p>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab title="点赞榜" class="rank_list_zan">
                            <div class="rank_zan_list rank_list_comen" v-if="PraiseRank.data.length != 0">
                                <ul>
                                    <li v-for="(zan, index) in PraiseRank.data" :key="index">
                                        <div class="rank_item">
                                            <div class="rank_item_avatar">
                                                <div class="avatar_pic">
                                                    <p class="rank_num">
                                                        
                                                        <img v-if="index == 0" src="../images/CreateClock/first.png" alt="">
                                                        <img v-if="index == 1" src="../images/CreateClock/second.png" alt="">
                                                        <img v-if="index == 2" src="../images/CreateClock/third.png" alt="">
                                                        <span v-if="index > 2">{{index+1}}</span>
                                                    </p>
                                                    <img v-if="zan.studentAvatar" :src="zan.studentAvatar" alt="">
                                                    <p class="img_48_round font_12px color_FFFFFF" style="border:0.8px solid #60C38C;background:rgba(96,195,140,.3);line-height:48px;text-align:center" v-if="!zan.studentAvatar">{{zan.studentName.slice(0,2)}}</p>
                                                </div>
                                                <div class="rank_item_userinfo">
                                                    <p>{{zan.studentName}}</p>
                                                    <p>{{zan.className}}</p>
                                                </div>
                                            </div>
                                            <div class="rank_item_data">{{zan.clockOrPraiseCount}}次</div>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div class="nodata" style="margin-bottom:55px" v-if="PraiseRank.data.length == 0">
                                <div flex="dir:top cross:center">
                                    <img style="width:150px;height:150px;display:block" src="../assets/images/nodata2x.png" alt="">
                                    <p style="color:#9B9B9B">暂无相关数据</p>
                                </div>
                            </div>
                        </van-tab>
                        <van-tab disabled></van-tab>
                        <van-tab disabled></van-tab>
                    </van-tabs>
                </div>
                
            </van-tab>
            <van-tab disabled></van-tab>
            <van-tab disabled></van-tab>
        </van-tabs>

        
    </div>
</template>
<script>
import H5Video from '../components/H5Video'
import 'flex.css'
// import { Toast } from 'vant'
import '../css/Clock/clockPublic.css'
const axios = require('axios')
export default {
    name:'clocklist',
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            active: 0,
            activeOrder:0,
            fileVideoSrc:'https://vdept.bdstatic.com/77696852377266345341337669366b6b/7062674832625375/9aac19ae0281f09130144bb37e732d6282613949c34bdb4998d63e97f0b75a70dd6477a6df20576c5b37e3f4e6b38df7.mp4?auth_key=1583998702-0-0-9fadfaac7bcd7a1e8b61cb42773079b0',
            ClockList:[],
            ZanList:[],
            preImage:[],
            firstSrc:'../images/CreateClock/first.png',
            secondSrc:'../images/CreateClock/first.png',
            thirdSrc:'../images/CreateClock/first.png',
            pre_index:0,
            pre_show:false,
        }
    },
    components:{
        H5Video
    },
    props:{
        ClockRecod:{
            type:Array,
            required:true
        },
        PraiseRank:{
            type:Array,
            required:true
        },
        ClockRank:{
            type:Array,
            required:true
        }
    },
    methods:{
        getRecodIndex(index){
            // this.selectRecod = index
            let item = this.ClockRecod[index].picUrls;
            let len = this.ClockRecod[index].picUrls.length;
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
        // /clock-student-praise/clockPraise
        toClockPraise(clockStudentId,index){
            let url = this.ip+'clock-student-praise/clockPraise';
            let param = new URLSearchParams()
            param.append("cuid", 'eYhjQznFDdvZiHz4oXt')
            param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
            param.append("clockStudentId", clockStudentId)
            axios.post(url,param).then((res)=>{
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
                // Toast(index)
                //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
        　　　　//window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'&className='+className+'"}')
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/ClockRecod?studentId='+studentId+'"}')
            }
        }
        
    }
}
</script>
<style scoped>
@import url(../../public/resetVant.css);
@import url(../css/Clock/clocklist.css);

</style>