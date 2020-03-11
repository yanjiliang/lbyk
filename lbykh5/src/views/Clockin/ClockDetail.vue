<template>
<div class="clock_detail">
    <div class="clock_detail_navinfo_box">
        <div style="padding:0 16px;margin-bottom:12px">
          <div flex="main:justify cross:center">
            <div flex="main:left cross:center">
              <p><img class="img_16" style="margin-right:4px" src="../../images/CreateClock/clock_store.png" alt=""></p>
              <p class="font_14px color_F6F6F6">蜡笔优课旗舰店</p>
            </div>
            <p><img class="img_20" src="../../images/CreateClock/edit.png" alt=""></p>
          </div>
          <p class="font_20px color_FFFFFF font_weight_bold">这一周很难忘</p>
        </div>

        <!-- 打卡的数据详情 -->
        <div flex="main:justify cross:center" style="text-align:center;margin-bottom:19px">
          <div style="min-width:30%">
            <p class="color_FFFFFF font_20px" style="margin-bottom:4px">99999</p>
            <p class="color_F6F6F6 font_12px">参与人数</p>
          </div>
          <div style="min-width:30%">
            <p class="color_FFFFFF font_20px" style="margin-bottom:4px">999</p>
            <p class="color_F6F6F6 font_12px">累计打卡</p>
          </div>
          <div style="min-width:30%">
            <p class="color_FFFFFF font_20px" style="margin-bottom:4px">999</p>
            <p class="color_F6F6F6 font_12px">今日打卡</p>
          </div>
        </div>
        <!-- 打卡的数据详情 -->
        <!-- 推广课程 -->
        <div class="clock_detail_course color_F4DCBC"  style="padding:16px;box-sizing:border-box">
            <div class="font_16px" style="margin-bottom:4px">一对一钢琴教学，快速学会一首简单简单...</div>
            <div flex="main:left cross:center" class="font_12px">
              <p class="font_12px"><span style="font-size:10px">￥</span>99</p>
              <img class="img_14" style="margin:0 2px 0 4px" src="../../images/CreateClock/warning.png" alt="">
              <p>招生服务已过期，课程推广将失效</p>
            </div>
            <p class="course_tag font_10px color_3E3E3E font_weight_bold">推广课程</p>
        </div>
        <!-- 推广课程 -->
    </div>

    <!-- 打卡介绍 -->
    <div class="clock_introduce">
        <p class="font_16px color_181818" style="margin-bottom:12px">打卡介绍</p>
        <p class="font_16px color_353239">眼间一个紧张又快乐的学期又过去了，在学期结,时我总结了一下，在这一学期中我有进步的地方也不足之处。首先说说我进步的地方吧,就是我的成绩提高了不少，字也比以前写得端正漂亮了。</p>
        <div flex="main:center cross:center" style="margin: 16px 0">
            <div flex="main:center cross:center" style="width:104px;height:104px;border-radius:50%;background:rgba(96,195,140,.1)">
                <div flex="main:center cross:center" style="width:94px;height:94px;border-radius:50%;background:rgba(96,195,140,.4)">
                    <div flex="main:center cross:center" style="width:86px;height:86px;border-radius:50%;background:rgba(96,195,140,1)">
                        <p class="font_16px color_FFFFFF">立即打卡</p>
                    </div>
                </div>
            </div>
        </div>
        <p class="font_14px color_9B9B9B" style="text-align:center">2020年1月10日-2020年1月20日</p>
    </div>
    <!-- 打卡介绍 -->
    <div class="clock_detail_list">
      <ClockList />
    </div>
</div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import ClockList from '../../components/ClockList'
export default {
  name: 'clockdetail',
  components: {
    ClockList
  }
}
</script>
<style lang="stylus" scoped>
.clock_detail
    background #FAF8F8
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
