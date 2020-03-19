<template>
<div class="create_clock_mana">
  <div class="clock_mana_wrap">
    <!-- 打卡统计数据  start -->
    <div class="clock_mana_info">
      <div class="clock_mana_data_statistic">
        <div class="data_statistic_item">
          <p>{{clockManaInfo.beginningCount}}</p>
          <p>进行中</p>
        </div>
        <div style="color:#FFF">|</div>
        <div class="data_statistic_item">
          <p>{{clockManaInfo.finishedCount}}</p>
          <p>已结束</p>
        </div>
        <div style="color:#FFF">|</div>
        <div class="data_statistic_item">
          <p>{{clockManaInfo.totalCount}}</p>
          <p>累计打卡</p>
        </div>
      </div>
      <div class="create_clock_mana_btn" @click="createClock">
        <p><img src="../../images/CreateClock/create_mana_btn.png" alt=""></p>
        <p>创建打卡</p>
      </div>
    </div>
    <!-- 打卡统计数据  end -->

    <div class="no_clock_recod" v-if="clockList.count == 0">
      <img src="../../images/CreateClock/no_clock_recod.png" alt="">
      <p>暂无打卡记录</p>
    </div>

    <!-- 打卡活动列表  start -->
    <van-list v-model="loading" :finished="finished" :offset='10' finished-text="没有更多了" @load="lazyLoading">
        <div class="clock_mana_list" v-if="clockList.count != 0">
          <div class="clock_mana_list_item" v-for="(item, index) in clockList.data" :key="index" @click="goToClockDetail(index)">
            <div class="clock_list_item_top">
              <div class="clock_list_item_top_left">
                <p style="margin-bottom:8px">{{item.title}}</p>
                <p>{{item.startDate.slice(0,10)}}——{{item.endDate.slice(0,10)}}</p>
              </div>
              <div class="clock_list_item_top_right">
                <p>{{item.status}}</p>
              </div>
            </div>
            <van-divider />
            <div class="clock_list_item_bottom">
              <div class="clock_list_bottom_item">
                <p><img src="../../images/CreateClock/clock_mana_people.png" alt=""></p>
                <p>参与人数：{{item.attendNum}}</p>
              </div>
              <div class="clock_list_bottom_item">
                <p><img src="../../images/CreateClock/clock_mana_num.png" alt=""></p>
                <p>累计打卡次数：{{item.totalNum}}</p>
              </div>
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
      finished:false
    }
  },
  mounted(){
    this.getClockManaInfo(1)
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
          window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/CreateClock?cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId+'"}');
      }
      if (this.device === 'ios') { 
          //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
  　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/CreateClock?cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId+'"}')
      }
    },
    goToClockDetail(index){
      let clockId = this.clockList.data[index].clockId
      // this.$router.push({path:'/ClockDetail',query:{clockId:clockId}})
      if (this.device === 'android') {
                    //安卓每个页面方法名不一样
          window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/ClockDetail"}');
      }
      if (this.device === 'ios') { 
          //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
  　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/ClockDetail?clockId='+clockId+'&cuid='+this.$route.query.cuid+'&storeId='+this.$route.query.storeId+'"}')
      }
    },
    getClockManaInfo(page){
      
      let url = this.ip+'clock/clockManagePage';
      //http://192.168.3.22:8091/course/pageLsit?pageNo=1&pageSize=100&cuid=grRF653ZPCGg2RCHNRl&storeId=STORE_7j2L9E9Znrx1pi3zE1r
      let param = new URLSearchParams()
      param.append("cuid", this.$route.query.cuid)
      param.append("storeId", this.$route.query.storeId)
      param.append("pageNo", page)
      param.append("pageSize", 10)
      axios.post(url,param).then((res)=>{
        let clockManaInfo = res.data.data
        this.clockManaInfo = clockManaInfo
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
    

  }
}
</script>
<style lang="stylus" scoped>
.create_clock_mana
    max-width 540px
    margin 0 auto
    
    .clock_mana_wrap
        padding 26px 16px 35px 16px
        background #FAF8F8
        height 100vh

        box-sizing border-box
        .clock_mana_info
            height 95px
            box-sizing border-box
            background url('../../images/CreateClock/clock_mana_bg.png') no-repeat
            background-size 100% 100%
            box-shadow 0px 3px 20px rgba(240,24,0,0.2)
            border-radius 17px
            padding 0 8px
            display flex
            align-items center
            justify-content space-between
            // margin-top 26px
            .clock_mana_data_statistic
                display flex
                align-items center
                text-align center
                background rgba(255,255,255,0.1)

                width 6.16rem
                height 63px
                border-radius 10px
                .data_statistic_item
                    width 33%
                    box-sizing border-box
                    p
                        color #ffffff
                        &:nth-child(1)
                            font-size 18px
                            font-weight 400
                            line-height 22px
                        &:nth-child(2)
                            font-size 12px
                            font-weight 400
                            line-height 17px
                            color #F6F6F6
            .create_clock_mana_btn
                height 32px
                display flex
                align-items center
                box-sizing border-box
                border 1px solid #ffffff
                display -webkit-box
                background #FFF
                border-radius 18px
                padding 6px
                p

                    img
                        width 14px
                        height 14px
                        vertical-align middle
                    &:nth-child(1)
                        margin-right 3px
                    &:nth-child(2)
                        font-size 14px
                        line-height 20px
                        color #FF444B
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
        .clock_mana_list
            // height 110px
            box-sizing border-box
            margin-top 33px
            .clock_mana_list_item
                box-sizing border-box
                padding 12px 16px
                background #FCFCFC
                border-radius 15px
                margin-bottom 16px
                .clock_list_item_top
                    display flex
                    align-items center
                    justify-content space-between
                    .clock_list_item_top_left
                        p
                            &:nth-child(1)
                                font-size 16px
                                font-weight bold
                                line-height 22px
                                color #181818
                                white-space nowrap
                                overflow hidden
                                width 15em
                                text-overflow ellipsis
                            &:nth-child(2)
                                font-size 14px
                                font-weight 400
                                line-height 20px
                                color #9B9B9B
                    .clock_list_item_top_right
                        p
                            &:nth-child(1)
                                color #FF444B
                                border-radius 18px
                                box-sizing border-box
                                border 1px solid #FF444B
                                padding 4px 12px
                            &:nth-child(2)
                                color #C6C6C6
                                border-radius 18px
                                box-sizing border-box
                                border 1px solid #C6C6C6
                                padding 4px 12px
                .clock_list_item_bottom
                    display flex
                    align-items center
                    .clock_list_bottom_item
                        display flex
                        align-items center
                        width 50%
                        text-align left

                        p

                            img
                                width 14px
                                height 14px
                                vertical-align text-top
                            &:nth-child(2)
                                font-size 14px
                                font-weight 400
                                line-height 20px
                                color #9B9B9B
                                margin-left 4px

</style>
