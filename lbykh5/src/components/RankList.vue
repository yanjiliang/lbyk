<template>
    <div class="RankList">
        <div class="rankList_wrap">
            <div class="margin_top_16 font_16px font_weight_400 color_black">打卡榜</div>
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
                                    <p class="img_48_round font_16px color_7F7F89" style="border:0.8px solid rgba(255,255,255,.5);background:#F4F4F4;line-height:48px;text-align:center" v-if="!clock.studentAvatar">{{clock.studentName.slice(0,2)}}</p>
                                </div>
                                <div class="rank_item_userinfo">
                                    <p>{{clock.studentName}}</p>
                                    <p>{{clock.className}}</p>
                                </div>
                            </div>
                            <div class="rank_item_data color_gray">共打卡{{clock.clockOrPraiseCount}}次</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="color_gray_light font_16px" style="margin:20px 0" v-if="ClockRank.data.length == 0">
                <p>还没有人发布打卡哦~</p>
            </div>

            <div class="font_16px font_weight_400 color_black margin_top_30">获赞榜</div>
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
                                    <p class="img_48_round font_16px color_7F7F89" style="border:0.8px solid rgba(255,255,255,.5);background:#F4F4F4;line-height:48px;text-align:center" v-if="!zan.studentAvatar">{{zan.studentName.slice(0,2)}}</p>
                                </div>
                                <div class="rank_item_userinfo">
                                    <p>{{zan.studentName}}</p>
                                    <p>{{zan.className}}</p>
                                </div>
                            </div>
                            <div class="rank_item_data color_gray">共获赞{{zan.clockOrPraiseCount}}次</div>
                        </div>
                    </li>
                    
                </ul>
            </div>
            <div class="color_gray_light font_16px" style="margin:20px 0" v-if="PraiseRank.data.length == 0">
                <p>还没有人获赞哦~</p>
            </div>
            <div style="width:10rem;height:45px"></div>
        </div>
    </div>
</template>
<script>

import 'flex.css'
// import { Toast } from 'vant'
import '../css/Clock/clockPublic.css'
import '../css/Clock/clocklist.css'
import '../../public/resetVant.css'
import { Toast } from 'vant'
const axios = require('axios')
export default {
    name:'RankList',
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            active: 0,
            activeOrder:0,
            fileVideoSrc:'',
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
        },
        getWechatShare(index){//微信分享
            // let avatar = this.ClockRecod[index]
            Toast('触发了分享的办法')
            let cuid = this.$route.query.cuid
            let storeId = this.ClockRecod[index].storeId
            let classId = this.ClockRecod[index].classId
            let studentId = this.ClockRecod[index].studentId
            let clockStudentId = this.ClockRecod[index].clockStudentId
            let impression = this.ClockRecod[index].impression
            let str = impression.substring(0,35)
            let content = str.replace(/[\r\n]/g, "")
            let url = this.Url + '/ClockShare?cuid='+cuid+'&storeId='+storeId+'&classId='+classId+'&studentId='+studentId+'&clockStudentId='+clockStudentId
            let logo =''
            this.ClockRecod[index].studentAvatar == '' ? logo = this.ClockRecod[index].logo : logo = this.ClockRecod[index].studentAvatar
            Toast('{"linkType":"app","scheme":"WXSHARE","url":"'+url+'","content":"'+content+'","logo":"'+logo+'"}')
            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"WXSHARE","url":"'+url+'","content":"'+content+'","logo":"'+logo+'"}')
            
        }
        
    }
}
</script>
