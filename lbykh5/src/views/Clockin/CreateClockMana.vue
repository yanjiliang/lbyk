<template>
<div class="create_clock_mana">
  <div class="clock_mana_wrap">
    <!-- 打卡统计数据  start -->
    <div class="clock_mana_info">
      <div flex="main:justify cross:center">
        <div class="data_statistic_item">
          <p class="font_18px font_weight_700">{{clockManaInfo.beginningCount}}</p>
          <p class="font_14px font_weight_400 margin_top_4">进行中</p>
        </div>
        <div class="data_statistic_item">
          <p class="font_18px font_weight_700">{{clockManaInfo.finishedCount}}</p>
          <p class="font_14px font_weight_400 margin_top_4">已结束</p>
        </div>
        <div class="data_statistic_item">
          <p class="font_18px font_weight_700">{{clockManaInfo.totalCount}}</p>
          <p class="font_14px font_weight_400 margin_top_4">累计打卡</p>
        </div>
        <div class="create_clock_mana_btn color_green" flex="main:center dir:top cross:center" @click="createClock">
          <img src="../../images/CreateClock/create_mana_btn.png" alt="">
          <p>创建打卡</p>
          </div>
      </div>
      <!-- <div class="create_clock_mana_btn" @click="createClock">
        <p><img src="../../images/CreateClock/create_mana_btn.png" alt=""></p>
        <p>创建打卡</p>
      </div> -->
    </div>
    <!-- 打卡统计数据  end -->
    
    <div class="no_clock_recod" v-if="clockList.count == 0">
      <img src="../../images/CreateClock/no_clock_recod.png" alt="">
      <p>暂无打卡记录</p>
    </div>

    <!-- 打卡活动列表  start -->
    <van-list v-model="loading" :finished="finished" :offset='10' @load="lazyLoading">
        <div class="clock_mana_list" v-if="clockList.count != 0">
          <div class="clock_mana_list_item" v-for="(item, index) in clockList.data" :key="index" @click="goToClockDetail(index)">
            <div flex="main:justify cross:center">
              <div>
                <p class="font_16px font_weight_700 color_black">{{item.title}}</p>
                <p class="font_14px color_gray margin_top_8">{{item.startDate.slice(0,10)}}~{{item.endDate.slice(0,10)}}</p>
              </div>
              <div>
                <p class="btn_ing" v-if="item.status == '进行中'">进行中</p>
                <p class="btn_end" v-if="item.status == '已结束'">已结束</p>
              </div>
            </div>
            <van-divider />
            <div flex="main:justify cross:center" class="color_gray font_12px">
                <p><span class="color_gray_light">参与人数：</span><span>{{item.attendNum}}</span></p>
                <p><span class="color_gray_light">累计打卡次数：</span><span>{{item.totalNum}}</span></p>
            </div>
          </div>
        </div>
    </van-list>
    <!-- 打卡活动列表  end -->
    <!-- <p>{{clockManaInfo}}</p> -->
    
    
  </div>
</div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import { Toast } from 'vant'
const axios = require('axios')
export default {
  name: 'CreateClockMana',
  data(){
    return{
      ip:this.$ip.getIp(),
      Url:this.$Url.geturl(),
      device:this.$device.getDevice(),
      clockManaInfo:'',
      clockList:{},
      page:1,
      loading:false,
      finished:false,
      cuid:this.$route.query.cuid,
      storeId:this.$route.query.storeId,
      token:''
    }
  },
  mounted(){
    this.getClockManaInfo(1)
  },
  beforeMount(){
    window.McDispatcher = this.McDispatcher
    window.getParams = this.getParams
  },
  methods:{
    // /clock/clockManagePage
    lazyLoading(){
      let page = this.page +1;
      if(this.finished){
        return this.loading = false
      }else{
        this.getClockManaInfo(page)
      }
    },
    
    createClock(){
      // this.$router.push({path:'/CreateClock'})
      if (this.device === 'android') {
                    //安卓每个页面方法名不一样
          window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/CreateClock?cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId+'&type=new"}');
      }
      if (this.device === 'ios') { 
          //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
  　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/CreateClock?cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId+'&type=new"}')
      }
    },
    goToClockDetail(index){
      let clockId = this.clockList.data[index].clockId
      // this.$router.push({path:'/ClockDetail',query:{clockId:clockId}})
      if (this.device === 'android') {
                    //安卓每个页面方法名不一样
          window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/ClockDetail?clockId='+clockId+'&cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId+'"}');
      }
      if (this.device === 'ios') { 
          //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
  　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme":"H5PAGE","isBlackItem":"false","url": "'+this.Url+'/ClockDetail?clockId='+clockId+'&cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId+'"}')
      }
    },
    getClockManaInfo(page){
      let url = this.ip+'clock/clockManagePage';
      //http://192.168.3.22:8091/course/pageLsit?pageNo=1&pageSize=100&cuid=grRF653ZPCGg2RCHNRl&storeId=STORE_7j2L9E9Znrx1pi3zE1r
      let param = new URLSearchParams()
      param.append("cuid", this.$route.query.cuid)
      param.append("storeId", this.$route.query.storeId)
      param.append("pageNo", page)
      param.append("pageSize", 50)
      param.append("userToken", this.token)
      axios.post(url,param).then((res)=>{
        let clockManaInfo = res.data.data
        this.clockManaInfo = clockManaInfo
        if(res.data.result == 'noLogin'){
            if(this.device == 'android'){
                window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            }else if(this.device == 'ios'){
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            }
            
        }
        if(page == 1){
          this.clockList = clockManaInfo.clockList
        }else{
          if(clockManaInfo.clockList.count == 0){
            this.finished = true
            this.clockList.push()
          }else{
            this.finished = true
            this.clockList.push(clockManaInfo.clockList)
            // setTimeout(()=>{this.finished = true},1000)
          }
        }
        
      }).catch((err)=>{
        console.log(err)
      })
    },
    McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
        this.token = qury.data.token
        if(!qury.data.token){
          window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        }
        
    },
    getParams(msg){
        this.token = msg.token
        if(!msg.token){
          window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        }
        
    },
    linkIos (){
            //给iOS APP传参
        window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
    },
    
  }
}
</script>
<style lang="stylus" scoped>
.create_clock_mana
    max-width 540px
    margin 0 auto
    
    .clock_mana_wrap
        padding 30px 16px 35px 16px
        background #FAF8F8
        // height 100vh

        box-sizing border-box
        .clock_mana_info
            padding 16px
            background #2ac688 url(../../images/CreateClock/box_bg.png) no-repeat 0 0
            background-size 100%
            border-radius 5px
            text-align  center
            color #ffffff
            // margin-top 26px
            .create_clock_mana_btn
                width 66px
                height 66px
                text-align center
                box-sizing border-box
                font-weight 700
                background rgba(255,255,255,0.8)
                border-radius 33px
                img 
                  width 16px
                  height 16px
                  line-height 16px
        .no_clock_recod
            width 130px
            margin 3.2rem auto
            text-align center
            img
                width 130px
                height 130px
            p
                color #C6C6C6
                font-size 14px
                font-weight 400
                line-height 20px
        .clock_mana_list_item
          border-radius 5px
          background #ffffff
          padding 16px
          margin-top 16px

</style>
