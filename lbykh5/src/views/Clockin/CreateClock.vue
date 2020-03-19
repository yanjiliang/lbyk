<template>
<div class="createclock">
  <div class="createclock_wrap">
    <div class="create_clock_title">
      <p>创建/编辑打卡</p>
      <p>打卡不仅能活跃老用户，还能推广课程哦</p>
    </div>
    <!-- 主题start -->
    <van-field v-model="clock_theme" rows="1" autosize type="textarea" maxlength="30" placeholder="请输打卡主题（5-30个字）" />
    <!-- 主题end -->
    <van-divider />

    <!-- 选择班级 start -->
    <div class="create_clock_second_title">
      <p>适用班级</p>
      <p>每个班级同时只能发布一个打卡活动</p>
    </div>
    <van-field readonly clickable :value="selectedClass" placeholder="请选择" @click="showClassPicker = true" />
    <van-popup v-model="showClassPicker" :safe-area-inset-bottom='true' round :style="{height:'50%'}" position="bottom">
      
        <div class="create_clock_pop_nav">
          <p class="cancel_btn" @click="showClassPicker = false">取消</p>
          <p class="pop_title">选择班级</p>
          <p class="select_btn" @click="onClassConfirm()">确认</p>
        </div>
        <div class="create_clock_select_class_wrap"  v-if="storeClass.count != 0">

          <div class="create_clock_select_class_content" ref="class_list_wrap">
            <ul class="create_clock_select_class_list" ref="class_list">
              <li @click="clock_select_class($event,index)" v-for="(item,index) in classList" :key="index" >
                <div class="create_clock_select_class_item">
                  <div class="top">
                    <p>{{item.className}}</p>
                  </div>
                  <div class="down">
                    <div class="down_left">
                      <p>{{item.categoryName}}</p>
                      <p ref="class_type" class="class_type">{{item.teachMethod}}</p>
                    </div>
                    <div class="down_right" v-show="classList[index].hasSelect">
                      <img src="../../images/CreateClock/selected.png" alt="">
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="noclassdata" v-if="storeClass.count === 0">
          <div flex="dir:top cross:center" style="margin:60px auto">
            <img style="width:150px;height:150px;display:block" src="../../assets/images/nodata2x.png" alt="">
            <p class="font_12px color_C6C6C6">暂无可发布打卡活动的班级</p>
          </div>
        </div>
      

      
    </van-popup>
    <van-divider />
    <!-- 选择班级 end -->
    <!-- 打卡结束时间 start -->
    <div class="create_clock_second_title">
      <p>打卡结束时间</p>
    </div>
    <van-field readonly clickable :value="currentDate" placeholder="请选择结束日期" @click="showDatePicker = true" />
    <van-popup v-model="showDatePicker" round position="bottom">
      <van-datetime-picker type="date" :min-date="minDate" :max-date="maxDate" @confirm="onDateConfirm" @cancel="showDatePicker = false" />
    </van-popup>
    <van-divider />
    <!-- 打卡结束时间 end -->

    <!-- 推广课程 start -->
    <div class="create_clock_second_title">
      <p>推广课程(可选)</p>
      <p>只能选择一个，学员分享的打卡页面可同步展示招生课程</p>
    </div>
    <van-field readonly clickable :value="selectCourse" placeholder="选择课程" @click="select_Course" />
    <van-popup v-model="showCoursePicker" round position="bottom">
      <van-picker show-toolbar :columns="storeCourseTile" @cancel="showCoursePicker = false" @confirm="onCourseConfirm" />
    </van-popup>
    <van-divider />
    <!-- 推广课程 end -->

    <!-- 打卡介绍 start -->
    <div class="create_clock_second_title">
      <p>打卡介绍</p>
    </div>
    <van-field v-model="clock_content" rows="1" autosize type="textarea" maxlength="500" placeholder="请填写打卡介绍（500字以内）" show-word-limit />
    <van-divider />
    <!-- 打卡介绍 end -->
    <!-- <p>{{storeClass}}</p> -->
    <div style="height:60px"></div>
    <div class="create_colock_btn" @click="toClock(selectedClassId,clock_theme,selectedDate,selectedCourseId[0],clock_content)">
      <p>立即发布</p>
    </div>

  </div>
</div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import {Toast} from 'vant'
import '../../../public/resetVant.css'
const axios = require('axios')
export default {
  name: 'createclock',
  data() {
    return {
      ip:this.$ip.getIp(),
      Url:this.$Url.geturl(),
      device:this.$device.getDevice(),
      clock_theme: '',
      clock_content:'',
      columns: [],
      value:'',
      showClassPicker: false,
      showDatePicker: false,
      showCoursePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: '',
      selectCourse: '',
      selectClass: '',
      classList: [],
      selectedClass: [],
      storCourse:'',
      storeCourseTile:[],
      storeClass:'',
      selectedClassId:[],
      selectedCourseId:[],
      selectedDate:'',
      cuid:this.$route.query.cuid,
      storeId:this.$route.query.storeId

    }
  },
  mounted() {
    this.getStoreCoureList()
    this.getStoreClass()
  },
  methods: {
    
    onClassConfirm() {
      console.log(this.selectedClass)
      this.showClassPicker = false
    },
    select_Course(){
        this.showCoursePicker = true
        this.selectedCourseId = []
    },

    onCourseConfirm(value) {
      this.selectCourse = value;
      this.showCoursePicker = false;
      for(let i=0;i<this.storCourse.length;i++){
        if(this.storCourse[i].courseTitle == value){
          this.selectedCourseId.push(this.storCourse[i].courseId)
        }
      }
      console.log(this.selectedCourseId)
    },
    onDateConfirm(value) {
      //格式化年月格式
      let year = value.getFullYear()
      let month = value.getMonth() + 1
      month < 10 ? month= '0'+month : month
      let day = value.getDate()
      day < 10 ? day= '0'+day : day
      this.selectedDate = year + '-' + month + '-' + day 
      this.currentDate = year + ' 年 ' + month + ' 月 ' + day + ' 日'
      this.showDatePicker = false;
    },
    clock_select_class(e, index) {
      //控制班级选择
      this.$nextTick(() => {
        if (this.classList[index].hasSelect) {
          document.getElementsByClassName('create_clock_select_class_item')[index].classList.remove('create_clock_isSelected')
          this.$refs.class_type[index].style.background = '#F6F6F6'
          // this.selectedClass.splice(index,1)
          for(let i = 0;i<this.selectedClass.length;i++){
            if(this.selectedClass[i] == this.classList[index].className){
              this.selectedClass.splice(i,1)
              this.selectedClassId.splice(i,1)
            }
          }
          console.log(this.selectedClassId)
          this.classList[index].hasSelect = false
        } else {
          document.getElementsByClassName('create_clock_select_class_item')[index].classList.add('create_clock_isSelected')
          this.$refs.class_type[index].style.background = '#FFFFFF'
          this.classList[index].hasSelect = true
          this.selectedClass.push(this.classList[index].className)
          this.selectedClassId.push(this.classList[index].classId)
          console.log(this.selectedClassId)
          return this.classList
        }
      })
    },
    getStoreCoureList(){
      let url = this.ip+'course/pageLsit';
      let param = new URLSearchParams()
      param.append("cuid", this.cuid)
      param.append("storeId", this.storeId)
      param.append("pageNo ", 1)
      param.append("pageSize ", 90)
      axios.post(url,param).then((res)=>{
        let storCourse = res.data.data
        this.storCourse = storCourse.data
        // this.storeCourseTile = 
        for(let i=0;i<storCourse.data.length;i++){
          this.storeCourseTile.push(storCourse.data[i].courseTitle)
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    getStoreClass(){
      let url = this.ip+'class-clock/getUnClockClass';
      let param = new URLSearchParams()
      param.append("cuid", this.cuid)
      param.append("storeId", this.storeId)
      param.append("pageNo", 1)
      param.append("pageSize", 10)
      axios.post(url,param).then((res)=>{
        let storeClass = res.data.data
        this.storeClass = storeClass
        this.classList = storeClass.data
        for(let i=0;i<storeClass.length;i++){
          this.classList[i].hasSelect = false
        }
        
        
      }).catch((err)=>{
        console.log(err)
      })
    },
    toClock(classIds,title,endDate,courseId,introduce){
      let url = this.ip+'clock/addClock';
      let param = new URLSearchParams()
      param.append("cuid", this.cuid)
      param.append("storeId", this.storeId)
      param.append("classIds", classIds)
      param.append("title", title)
      param.append("endDate", endDate)
      param.append("courseId", courseId)
      param.append("introduce", introduce)
      axios.post(url,param).then((res)=>{
        if(res.data.result == 'success'){
          Toast.success('发布成功！')
          setTimeout(()=>{
            // this.$router.push({path:'/CreateClockMana',params:'121'})
            if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/ClockDetail"}');
            }
            if (this.device === 'ios') { 
                //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/CreateClockMana?cuid='+this.cuid+'&storeId='+this.storeId+'"}')
            }
          },1200)
        }else if(res.data.result == 'error'){
          Toast(res.msg)
        }
        
      }).catch((err)=>{
        console.log(err)
      })
    }

  }
}
</script>
<style lang="stylus">
    .createclock
        max-width 540px
        margin 0 auto
        .createclock_wrap
            padding 0 24px
            .create_clock_title
                margin-bottom 10px
                margin-top 26px
                p
                    &:nth-child(1)
                        font-size 24px
                        font-weight bold
                        line-height 33px
                        color #353239
                    &:nth-child(2)
                        font-size 14px
                        font-weight 400
                        color #9B9B9B
            .van-cell
                padding 10px 0 !important
                &:not(:last-child)::after
                    display none
            .van-divider
                margin 0
            .create_clock_second_title
                margin-top 20px
                p
                    &:nth-child(1)
                        font-size 14px
                        font-weight 400
                        line-height 20px
                        color #353239
                    &:nth-child(2)
                        font-size 12px
                        line-height 17px
                        font-weight 400
                        color #C6C6C6
                        margin 5px 0
            .create_colock_btn
                height 56px
                background #FF444B
                box-shadow 0px 4px 6px rgba(255,68,75,0.2)
                border-radius 28px
                text-align center
                line-height 56px
                p
                    font-size 16px
                    font-weight 400
                    color #FFF
            .van-picker__confirm
                color #FF444B!important
            .van-picker__cancel
                color #C6C6C6!important

            .van-popup
                .create_clock_pop_nav
                        display flex
                        align-items center
                        justify-content space-between
                        font-size 14px
                        font-weight 400
                        line-height 20px
                        border-radius 20px 20px 0 0
                        background #FFFFFF
                        opacity 1
                        box-sizing border-box
                        padding 10px 16px
                        position fixed
                        width 10rem
                        // position fixed
                        .pop_title
                            color #353239
                            font-size 16px
                            line-height 22px
                            font-weight 500
                        .cancel_btn
                            color #C6C6C6
                        .select_btn
                            color #FF444B
                .create_clock_select_class_wrap
                    margin-top 10px
                    padding 20px 16px
                    box-sizing border-box

                    .create_clock_select_class_content
                        .create_clock_select_class_list
                            box-sizing border-box
                            padding 20px 0
                            li
                                margin-bottom 16px
                            .create_clock_select_class_item
                                box-sizing border-box
                                border 1px solid #E8E8E8
                                height 80px
                                padding 17px 16px 15px 16px
                                border-radius 15px
                                .top
                                    color #181818
                                    font-size 16px
                                    font-weight 500
                                    line-height 22px
                                    margin-bottom 8px
                                .down
                                    display flex
                                    align-items center
                                    justify-content space-between
                                    .down_left
                                        display flex
                                        align-items center
                                        p
                                            border-radius 10px
                                            background #FFFFFF
                                            box-sizing border-box
                                            padding 2px 6px
                                            &:nth-child(1)
                                                background #EAFEFC
                                                color #4DC9BD
                                                margin-right 12px
                                        .class_type
                                            color #9B9B9B
                                            background #F6F6F6
                                    .down_right
                                        img
                                            width 18px
                                            height 18px
                                            display block
                            .create_clock_isSelected
                                border 1px solid #FF444B
                                background #FCF0F1

</style>
