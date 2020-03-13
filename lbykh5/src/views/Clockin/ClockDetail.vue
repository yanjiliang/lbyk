<template>
<div class="clock_detail">
    <div class="clock_detail_navinfo_box">
        <div style="padding:0 16px;margin-bottom:12px">
          <div flex="main:justify cross:center">
            <div flex="main:left cross:center" style="margin-bottom:4px">
              <p><img class="img_16" style="margin-right:4px" src="../../images/CreateClock/clock_store.png" alt=""></p>
              <p class="font_14px color_F6F6F6">{{clockDetailInfo.storeName}}</p>
            </div>
            <p><img class="img_20" src="../../images/CreateClock/edit.png" alt=""></p>
          </div>
          <p class="font_20px color_FFFFFF font_weight_bold">{{clockDetailInfo.title}}</p>
        </div>

        <!-- 打卡的数据详情 -->
        <div flex="main:justify cross:center" style="text-align:center;margin-bottom:19px">
          <div style="min-width:30%">
            <p class="color_FFFFFF font_20px" style="margin-bottom:4px">{{clockDetailInfo.attendNum}}</p>
            <p class="color_F6F6F6 font_12px">参与人数</p>
          </div>
          <div style="min-width:30%">
            <p class="color_FFFFFF font_20px" style="margin-bottom:4px">{{clockDetailInfo.totalNum}}</p>
            <p class="color_F6F6F6 font_12px">累计打卡</p>
          </div>
          <div style="min-width:30%">
            <p class="color_FFFFFF font_20px" style="margin-bottom:4px">{{clockDetailInfo.todayNum}}</p>
            <p class="color_F6F6F6 font_12px">今日打卡</p>
          </div>
        </div>
        <!-- 打卡的数据详情 -->
        <!-- 推广课程 -->
        <div class="clock_detail_course color_F4DCBC"  style="padding:16px;box-sizing:border-box">
            <div class="font_16px" style="margin-bottom:4px">{{clockDetailInfo.courseTitle}}</div>
            <div flex="main:left cross:center" class="font_12px">
              <p class="font_12px"><span style="font-size:10px">￥</span>{{clockDetailInfo.sellingPrice}}</p>
              <img class="img_14" v-if="clockDetailInfo.coureStaus == 'overRecruitStudents'" style="margin:0 2px 0 4px" src="../../images/CreateClock/warning.png" alt="">
              <img class="img_14" v-if="clockDetailInfo.coureStaus == 'haveRecruitStudents'" style="margin:0 2px 0 4px" src="../../images/CreateClock/enrolling02.png" alt="">
              <img class="img_14" v-if="clockDetailInfo.coureStaus == 'lowerShelf'" style="margin:0 2px 0 4px" src="../../images/CreateClock/offshelf.png" alt="">
              <p v-if="clockDetailInfo.coureStaus == 'overRecruitStudents'">招生服务已过期，课程推广将失效</p>
              <p v-if="clockDetailInfo.coureStaus == 'lowerShelf'">该课程已下架，请及时更换</p>
              <p v-if="clockDetailInfo.coureStaus == 'haveRecruitStudents'">课程招生中</p>
            </div>
            <p class="course_tag font_10px color_3E3E3E font_weight_bold">推广课程</p>
        </div>
        <!-- 推广课程 -->
    </div>

    
    <!-- 打卡介绍 -->
    <div class="clock_introduce">
        <p class="font_16px color_181818" style="margin-bottom:12px">打卡介绍</p>
        <!-- <p>{{clockId}}</p> -->
        <p class="font_16px color_353239">{{clockDetailInfo.introduce}}</p>
        <div flex="main:center cross:center" style="margin: 16px 0" v-if="clockDetailInfo.clockStatus == 'Beginning'" @click="quickToClock">
            <div flex="main:center cross:center" style="width:104px;height:104px;border-radius:50%;background:rgba(96,195,140,.1)">
                <div flex="main:center cross:center" style="width:94px;height:94px;border-radius:50%;background:rgba(96,195,140,.4)">
                    <div flex="main:center cross:center" style="width:86px;height:86px;border-radius:50%;background:rgba(96,195,140,1)">
                        <p class="font_16px color_FFFFFF">立即打卡</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div v-if="clockDetailInfo.clockStatus == 'Beginning'" flex="main:center cross:center" style="margin: 16px 0">
            <div flex="dir:top main:center cross:center" style="width:86px;height:86px;border-radius:50%;background:#EBFFF4;border:1px dashed #60C38C">
                <p><img class="img_28" src="../../images/CreateClock/enrolling.png" alt=""></p>
                <p class="font_16px color_60C38C">进行中</p>
            </div>
        </div> -->

        <div v-if="clockDetailInfo.clockStatus == 'Finished'" flex="main:center cross:center" style="margin: 16px 0" >
            <div flex="dir:top main:center cross:center" style="width:86px;height:86px;border-radius:50%;background:#F6F6F6;border:1px dashed #9B9B9B">
                <p><img class="img_28" src="../../images/CreateClock/hasend.png" alt=""></p>
                <p class="font_16px color_C6C6C6">已结束</p>
            </div>
        </div>
        <p class="font_14px color_9B9B9B" style="text-align:center">{{clockDetailInfo.startDate.slice(0,10)}} —— {{clockDetailInfo.endDate.slice(0,10)}}</p>
    </div>
    <!-- 打卡介绍 -->
    <div class="clock_detail_list">
      <ClockList />
    </div>

    <p>{{clockDetailInfo}}</p>
    <p>{{clockId}}</p>
</div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import ClockList from '../../components/ClockList'
const axios = require('axios')
export default {
  name: 'clockdetail',
  data(){
    return{
      clockId:this.$route.query.clockId,
      clockDetailInfo:''
    }
  },
  components: {
    ClockList
  },
  mounted(){
    this.getClockDetailInfo()
  },
  methods:{
    getClockDetailInfo(){
      let url = 'http://192.168.3.22:8091/clock/clockDetails';
      let param = new URLSearchParams()
      param.append("cuid", 'grRF653ZPCGg2RCHNRl')
      param.append("storeId", 'STORE_7j2L9E9Znrx1pi3zE1r')
      param.append("clockId", this.$route.query.clockId)
      axios.post(url,param).then((res)=>{
        let clockDetailInfo = res.data.data
        this.clockDetailInfo = clockDetailInfo
        
      }).catch((err)=>{
        console.log(err)
      })
    },
    quickToClock(){
      this.$router.push({path:'/QuickToClock'})
    }
  }
}
</script>
<style lang="stylus" scoped>
.clock_detail
    background #FAF8F8
    max-width 540px
    margin 0 auto
    .clock_detail_navinfo_box
        padding 115px 16px 0 16px
        width 10rem
        height 330px
        background #60C38C
        box-sizing border-box
        .clock_detail_course
            background-image  url('../../images/CreateClock/clock_detail_coursebg.png')
            background-size 100% 100%
            height 69px
            width 100%
            position relative
            .course_tag
                text-align center
                padding 1px 2px 4px 5px
                box-sizing border-box
                position absolute
                top -0.08rem 
                right 0.373333rem
                width 47.21px;
                height 18.98px
                background-image url('../../images/CreateClock/clock_detail_tag.png')
                background-size 100% 100%

    .clock_detail_list
        box-sizing border-box
    
    .clock_introduce
        box-sizing border-box
        border-radius 20px 20px 0 0 
        padding 28px 16px 20px 16px
        position relative
        top -20px
        background #FFFFFF
</style>
