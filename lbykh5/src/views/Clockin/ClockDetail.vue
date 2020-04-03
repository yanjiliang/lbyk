<template>
<div class="clock_detail">
    <div class="clock_detail_navinfo_box">
        <div>
            <div flex="main:left cross:center" @click="toStore">
              <p><img class="img_14" style="margin-top:-3px" src="../../images/CreateClock/clock_store.png" alt=""></p>
              <p class="font_14px color_yellow_light margin_left_6">{{clockDetailInfo.storeName}}</p>
              <p><img class="img_10 margin_left_6" style="margin-top:-1px" src="../../images/CreateClock/arrow_right.png" alt=""></p>
            </div>
          <div flex="main:justify cross:center" class="margin_top_30">
            <div flex="main:left cross:center">
              <p v-if="clockDetailInfo.clockStatus == 'Beginning'" flex="main:left cross:center" class="margin_top_12">
                <img class="img_14" style="margin-top:-2px" src="../../images/CreateClock/timeing.png" alt="">
                <span class="color_yellow_light font_16px margin_left_6">进行中的打卡</span>
              </p>
              <p v-if="clockDetailInfo.clockStatus == 'Finished'"  flex="main:left cross:center" class="margin_top_12">
                <img class="img_14" style="margin-top:-2px" src="../../images/CreateClock/time_end.png" alt="">
                <span class="color_gray_lighter font_16px margin_left_6">打卡已结束</span>
              </p>
            </div>
            <!-- <p v-if="clockDetailInfo.isManager == true && clockDetailInfo.clockStatus == 'Beginning'" @click="toClockEdit()"><img class="img_16" src="../../images/CreateClock/edit.png" alt=""></p> -->
            <p v-if="clockDetailInfo.isManager == true " @click="toClockEdit()"><img class="img_16" src="../../images/CreateClock/edit.png" alt=""></p>
          </div>
          <p class="font_24px color_white font_weight_bold margin_top_8" style="">{{clockDetailInfo.title}}</p>
        </div>
        <!-- 打卡的数据详情 -->
        <div flex="main:justify cross:center" class="txt_center margin_top_16" style="padding:0 8px">
          <div>
            <p class="color_yellow_light font_20px font_weight_700">{{clockDetailInfo.attendNum}}</p>
            <p class="color_yellow_light font_14px">参与人数</p>
          </div>
          <div>
            <p class="color_yellow_light font_20px font_weight_700">{{clockDetailInfo.totalNum}}</p>
            <p class="color_yellow_light font_14px">累计打卡</p>
          </div>
          <div>
            <p class="color_yellow_light font_20px font_weight_700">{{clockDetailInfo.todayNum}}</p>
            <p class="color_yellow_light font_14px">今日打卡</p>
          </div>
        </div>
        <!-- 打卡的数据详情 -->
    </div>

    
    <!-- 打卡介绍 -->
    <div class="clock_introduce">
        <!-- <p>{{clockId}}</p> -->
        <p class="expansion">{{introduce}}<span v-show="showMore" @click="showAll()">...<span class="color_green">查看更多</span></span></p>
    </div>
    <div flex="main:center cross:center">
      <div flex="main:center dir:top cross:center" class="toClockin" v-if="clockDetailInfo.clockStatus == 'Beginning' && clockDetailInfo.showClock == true" @click="quickToClock">
          <img class="img_16" src="../../images/CreateClock/clockin.png" alt="">
          <p class="color_yellow_light font_weight_700">立即打卡</p>
      </div>
    </div>
    <div class="clockDataInfo" style="padding:0 16px;box-sizing:border-box;overflow:hidden">
      <div flex="main:left  cross:top">
        <div class="clock_tab" :class="{'clock_tab_active':RecodTags}" @click="changeTags()">
        <p @click="freshPage(true)">打卡记录</p>
        <div class="active_bar"></div>
        </div>
        <div class="clock_tab margin_left_12" :class="{'clock_tab_active':!RecodTags}" @click="changeTags()">
        <p @click="freshPage(true)">排行榜</p>
        <div class="active_bar"></div>
        </div>
      </div>
      <!-- <p>{{clockDetailInfo.isManager}}</p> -->
      <!-- 打卡介绍 -->
      <div class="clock_detail_list" v-show="RecodTags">
        <ClockList :clockId='clockId' ref="ClockList" :cuid='cuid' :storeId='storeId' :pageType='pageType' :isManager="clockDetailInfo.isManager" :token ='token' @freshPage='freshPage'/>
      </div>
      <!-- 排行榜 -->
      <div v-show="!RecodTags">
        <RankList :PraiseRank='PraiseRank' :cuid='cuid' :storeId='storeId' ref="RankList" :ClockRank='ClockRank' />
      </div>
    </div>

    
</div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import RankList from '../../components/RankList'
import ClockList from '../Clockin/ClockList'
import { Toast } from 'vant'
const axios = require('axios')
export default {
  name: 'clockdetail',
  data(){
    return{
      ip:this.$ip.getIp(),
      Url:this.$Url.geturl(),
      device:this.$device.getDevice(),
      pageType:'ClockDetail',
      clockId:this.$route.query.clockId,
      clockDetailInfo:'',
      ClockRecod:'',
      requestData:{
        'clockId':this.$route.query.clockId,
      },
      PraiseRank:'',
      ClockRank:'',
      cuid:this.$route.query.cuid,
      storeId:this.$route.query.storeId,
      quickUrl:"",
      RecodTags:true,
      startDate:'',
      endDate:'',
      token:'',
      showMore:false,
      introduce:'',
    }
  },
  components: {
    RankList,
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

    init(){
      let a=this.clockDetailInfo.introduce
      if(a.length > 70){
        this.introduce=a.substring(0,70)
        this.showMore=true
      }else{
        this.introduce=a
        this.showMore=false
      }
    },
    showAll(){
      this.showMore = false;
      this.introduce=this.clockDetailInfo.introduce
    },
    getClockDetailInfo(){
      let url = this.ip+'clock/clockDetails';
      let param = new URLSearchParams()
      param.append("cuid", this.$route.query.cuid)
      param.append("storeId", this.$route.query.storeId)
      param.append("clockId", this.$route.query.clockId)
      axios.post(url,param).then((res)=>{
        setTimeout(()=>{
          this.getRankClockList()
          this.getRankPraiseList()
          this.init()
        },200)
        
        if(res.data.rusult == 'error'){
          Toast({
            message:res.data.msg,
            duration:1000
          })
          window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK"}')
        }
        if(res.data.result == 'success'){
          let clockDetailInfo = res.data.data
          this.clockDetailInfo = clockDetailInfo
          
        }
       
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
    quickToClock(){
      
      let url = this.Url+'/QuickToClock?clockId='+this.clockId+'&cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId;
      // window.open(url,'_blank')
      
      if (this.device === 'android') {
          //安卓每个页面方法名不一样
          window.android.SkipPage('{"linkType": "h5","url": "'+url+'"}');
      }
      if (this.device === 'ios') { 
          
          // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+url+'"}');
          let aa = this.clockDetailInfo.title
          // const content = str.replace(/[\r\n]/g, "")
          let title = aa.replace(/[\r\n]/g, "")
          window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"CLOCK","clockId":"'+this.clockId+'","storeId":"'+this.$route.query.storeId+'","title":"'+title+'"}')
      }
    },
    
    getRankClockList(){
        // /class-clock-student/rankingList
        let url = this.ip+'class-clock-student/rankingList';
        let param = new URLSearchParams()
        param.append("cuid", this.$route.query.cuid)
        param.append("storeId", this.$route.query.storeId)
        param.append("clockId", this.$route.query.clockId)
        param.append("type", 'clock')
        param.append("pageNo", 1)
        param.append("pageSize", 20)
        axios.post(url,param).then((res)=>{
            let ClockRank = res.data.data
            this.ClockRank = ClockRank
        
        }).catch((err)=>{
            console.log(err)
        })
    },
    getRankPraiseList(){
        // /class-clock-student/rankingList
        let url = this.ip+'class-clock-student/rankingList';
        let param = new URLSearchParams()
        param.append("cuid", this.$route.query.cuid)
        param.append("storeId", this.$route.query.storeId)
        param.append("clockId", this.$route.query.clockId)
        param.append("type", 'praise')
        param.append("pageNo", 1)
        param.append("pageSize", 20)
        axios.post(url,param).then((res)=>{
            let ClockRank = res.data.data
            this.PraiseRank = ClockRank
        
        }).catch((err)=>{
            console.log(err)
        })
    },
    toClockEdit(){
      // /clock/edit  this.Url+'/CreateClock?cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId+'&type=new"
      let url = this.Url +'/CreateClock?cuid=' + this.$route.query.cuid + '&storeId=' +this.$route.query.storeId+'&clockId='+this.$route.query.clockId+'&type=edit&status='+this.clockDetailInfo.clockStatus
      // window.location.href = url
      if (this.device === 'android') {
          //安卓每个页面方法名不一样
          window.android.SkipPage('{"linkType": "h5","url": "'+url+'"}');
      }
      if (this.device === 'ios') { 
          
          window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+url+'"}');
      }
      
    },
    changeTags(){
      this.RecodTags = !this.RecodTags
    },
    McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
        
        this.token = qury.data.token
        if(!qury.data.token){
          window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        }
        this.getClockDetailInfo()
        this.$refs.ClockList.getClockRecod();
        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK","url":"'+this.Url+'/CreateClockMana"}')
        
    },
    getParams(msg){
        this.token = msg.token
        if(!msg.token){
          window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        }
        this.getClockDetailInfo()
        this.$refs.ClockList.getClockRecod();
        this.$forceUpdate()
        
    },
    linkIos (){
            //给iOS APP传参
        window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
    },
    freshPage(msg){
        if(msg){
          this.getClockDetailInfo()
          this.getRankPraiseList()
        }
    },
    toStore(){
      if (this.device === 'android') {
                    //安卓每个页面方法名不一样
          window.android.SkipPage('{"linkType": "app","scheme":"JGZY","url": "'+this.Url+'/orgindex","title":"机构主页","storeId":"'+this.$route.query.storeId+'"}');
      }
      if (this.device === 'ios') { 
  　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"JGZY","url": "'+this.Url+'/orgindex","title":"机构主页","jump":"true","storeId":"'+this.$route.query.storeId+'"}')
      }
    }
    
  }
}
</script>
<style lang="stylus" scoped>
.clock_detail
    background #FFFFFF
    max-width 540px
    margin 0 auto
    .clock_detail_navinfo_box
        padding 100px 32px 50px 32px
        background #2ac688
        box-sizing border-box
        position relative
        background #2ac688 url(../../images/CreateClock/box_bg.png) no-repeat 0 0
        background-size auto 100%
    
    .clock_introduce
        box-sizing border-box
        border-radius 16px 16px 0 0 
        padding 16px 16px 0 16px
        position relative
        top -15px
        background rgba(255,255,255,1)
</style>
