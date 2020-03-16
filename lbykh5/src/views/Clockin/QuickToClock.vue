<template>
<div class="quick_to_colock">
  <div class="quick_clock_wrap">
    <div class="quick_clock_title">
      <p>快速打卡</p>
      <p>这一周很难忘</p>
    </div>

    <!-- 打卡内容 start -->
    <van-field v-model="clock_content" rows="4" autosize type="textarea" maxlength="1000" placeholder="说说今天的感想和收获吧..." />
    <!-- 打卡内容 end -->
    <van-divider />

     

    <div class="file_upload_wrap">
      <van-uploader v-model="videoList" v-if="!isUpload && typeOfFile != 'image'" upload-text="视频+" accept="video/*" :after-read="afterVideoRead" multiple :max-count='1' />
      <van-uploader v-if="typeOfFile != 'video' || typeOfFile == 'image'" v-model="imageList" :after-read="afterImageRead" accept="image/*" upload-text="图片+" multiple :max-count='9' />
    </div>
    <div class="colock_video_box" v-if="isUpload">
      <H5Video :fileVideoSrc='fileVideoSrc' />
    </div>

    <div class="poick_clock_class_wrap" @click="toSelectClass()">
      <div class="pick_clock_class">
        <div class="pick_left" v-if="hasSelected == false">
          <p><img src="../../images/CreateClock/clock_mana_people.png" alt=""></p>
          <p>请选择打卡班级</p>
        </div>
        <div class="selected_pick_left" v-if="hasSelected == true">
          <img :src="selectedClass[0].studentAvatar" alt="">
          <div class="select_info">
            <p>{{selectedClass[0].className}}</p>
            <p>{{selectedClass[0].studentName}}</p>
          </div>
        </div>
        <div class="pick_right">
          <img src="../../images/GoodClass/reback2x.png" alt="">
        </div>
      </div>
    </div>


    <van-divider style="margin: 10px 0" />

    <van-popup v-model="showClassPicker" :safe-area-inset-bottom='true' round :style="{height:'50%'}" position="bottom">
      <div class="quick_clock_pop_nav">
        <p class="cancel_btn" @click="showClassPicker = false">取消</p>
        <p class="pop_title">选择打卡班级</p>
        <p class="select_btn" @click="onClassConfirm()">确认</p>
      </div>
      <div class="quick_clock_select_class_wrap">

        <div class="quick_clock_select_class_content" ref="class_list_wrap">
          <ul class="quick_clock_select_class_list" ref="class_list">
            <li @click="quick_clock_select_class($event,index)" v-for="(item,index) in userClassList" :key="index">
              <div class="quick_clock_select_class_item">
                <div class="user_avtar">
                  <img :src="item.studentAvatar" alt="">
                </div>

                <div class="class_info">
                  <p class="class_title">{{item.className}}</p>
                  <div class="down_info">
                    <p class="user_name">{{item.studentName}}</p>
                    <img v-show="item.hasSelect" src="../../images/CreateClock/selected.png" alt="">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
    <!-- <p>{{userClassList}}</p>
    <p>{{fileList}}</p>
    <p>{{clockId}}</p>
    <p>{{studentId}}</p>
    <p>{{classId}}</p>
    <p>{{imgfile}}</p>
    <p>{{clock_content}}</p> -->

  </div>
  <div style="height:90px"></div>
  <div class="quick_clock_btn_wrap" @click="quickToClock(imgfile,clock_content,videofile)">
    <div class="quick_colock_btn">
      <p>立即发布</p>
    </div>
  </div>
</div>
</template>

<script>
import '../../../public/resetVant.css'
import H5Video from '../../components/H5Video'
const axios = require('axios')
import {
  Toast
} from 'vant'
export default {
  name: 'QuickToClock',
  data() {
    return {
      fileList: [],
      imageList: [],
      videoList: [],
      clock_content: '',
      fileVideoSrc: '',
      isUpload: false,
      typeOfFile: '',
      showClassPicker: false,
      userClassList: [
      ],
      selectedClass: [],
      hasSelectIndex: '',
      hasSelected: false,
      studentId:this.$route.query.studentId,
      classId:this.$route.query.classId,
      userClass:'',
      clockId:this.$route.query.clockId,
      imgfile:[],
      coverFile:''

    }
  },
  components: {
    H5Video
  },
  mounted(){
    this.getUserClass()
  },
  methods: {
    afterVideoRead(file) {
      console.log(file)
      
      this.fileVideoSrc = file.content
      this.videofile = file.file
      this.isUpload = true
      this.typeOfFile = 'video'
    },
    afterImageRead(file) {
       // postData是一个数组
      this.imgfile.push(file.file)
      console.log(this.imgfile)
      this.typeOfFile = 'image'
    },
    toSelectClass() {
      this.showClassPicker = true
    },
    quick_clock_select_class(e, index) {
      //控制班级选择
      this.$nextTick(() => {
        if (this.userClassList[index].hasSelect) {
          document.getElementsByClassName('quick_clock_select_class_item')[index].classList.remove('quick_clock_isSelected')
          this.userClassList[index].hasSelect = false
        } else {
          document.getElementsByClassName('quick_clock_select_class_item')[index].classList.add('quick_clock_isSelected')

          for (let i = 0; i < this.userClassList.length; i++) {
            if (this.userClassList[i].hasSelect == true) {
              document.getElementsByClassName('quick_clock_select_class_item')[i].classList.remove('quick_clock_isSelected')
              this.userClassList[i].hasSelect = false
            }
          }
          this.userClassList[index].hasSelect = true

        }
      })
      console.log(this.selectedClass)
    },
    onClassConfirm() {
      for (let i = 0; i < this.userClassList.length; i++) {
        if (this.userClassList[i].hasSelect == true) {
          this.selectedClass.splice(0)
          this.selectedClass.push(this.userClassList[i])
        }
      }
      console.log(this.selectedClass)
      this.showClassPicker = false
      this.hasSelected = true

    },
    quickToClock(picFile,impression,videoFile){
      
      let self = this
      let url = 'http://192.168.3.22:8091/class-clock-student/rapidClock';
      let paramimg = new FormData()
      paramimg.append("cuid", 'eYhjQznFDdvZiHz4oXt')
      paramimg.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
      paramimg.append("clockId", self.$route.query.clockId)
      paramimg.append("picFile1", picFile[0])
      paramimg.append("picFile2", picFile[1])
      paramimg.append("picFile3", picFile[2])
      paramimg.append("picFile4", picFile[3])
      paramimg.append("picFile5", picFile[4])
      paramimg.append("picFile6", picFile[5])
      paramimg.append("picFile7", picFile[6])
      paramimg.append("picFile8", picFile[7])
      paramimg.append("picFile9", picFile[8])
      paramimg.append("classId", self.$route.query.classId)
      paramimg.append("studentId", self.$route.query.studentId)
      paramimg.append("impression", impression)

      let paramvideo = new FormData()
      paramvideo.append("cuid", 'eYhjQznFDdvZiHz4oXt')
      paramvideo.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
      paramvideo.append("clockId", self.$route.query.clockId)
      paramvideo.append("classId", self.$route.query.classId)
      paramvideo.append("studentId", self.$route.query.studentId)
      paramvideo.append("impression", impression)
      paramvideo.append("videoFile", videoFile)
      let config = {
          headers: { //添加请求头
              'Content-Type': 'multipart/form-data'
          }
      }
      if(self.typeOfFile == 'image'){
        axios.post(url,paramimg,config).then((res)=>{
          // Toast(res.data.result)
          if(res.data.result == 'success'){
            this.$router.push({path:'/ClockShare',query:{'clockId':this.$route.query.clockId,'studentId':this.$route.query.studentId,'classId':this.$route.query.classId,'clockStudentId':res.data.data}})
          }else{
            Toast(res.data.msg)
          }
          
        }).catch((err)=>{
          console.log(err)
        })
      }
      if(self.typeOfFile == 'video'){
        axios.post(url,paramvideo,config).then((res)=>{
          // Toast(res.data.result)
          if(res.data.result == 'success'){
            this.$router.push({path:'/ClockShare',query:{'clockId':this.$route.query.clockId,'studentId':this.$route.query.studentId,'classId':this.$route.query.classId,'clockStudentId':res.data.data}})
          }else{
            Toast(res.data.msg)
          }
          
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    getUserClass(){
      // /class-clock/getClockClass
      let url = 'http://192.168.3.22:8091/class-clock/getClockClass';
      let param = new URLSearchParams()
      param.append("cuid", 'eYhjQznFDdvZiHz4oXt')
      param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
      param.append("clockId", this.$route.query.clockId)
      param.append("pageNo", 1)
      param.append("pageSize", 10)
      axios.post(url,param).then((res)=>{
        let userClass = res.data.data
        this.userClassList = userClass
        
      }).catch((err)=>{
        console.log(err)
      })

    }
  }
}
</script>

<style lang="stylus" scoped>

.quick_to_colock
    max-width 540px
    margin 0 auto
    input,textarea
        font-size 18px!important
        font-weight 400!important
    .quick_clock_wrap
        padding 26px 24px

        .quick_clock_title
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
        .colock_video_box
            width 100%
            height 200px

        .file_upload_wrap
            margin-top 30px
        .poick_clock_class_wrap
            margin-top 35px
            .pick_clock_class
                display flex
                align-items center
                justify-content space-between
                .selected_pick_left
                    display flex
                    align-items center
                    img
                        width 48px
                        height 48px
                        border-radius 50%
                        display block
                        margin-right 12px
                    .select_info
                        p
                            &:nth-child(1)
                                color #181818
                                width auto
                                font-size 16px
                                font-weight 400
                                line-height 22px
                                box-sizing border-box
                                margin-bottom 8px
                            &:nth-child(2)
                                color #9B9B9B
                                font-size 12px
                                font-weight 400
                                line-height 17px
                .pick_left
                    display flex
                    align-items center
                    p
                        &:nth-child(1)
                            margin-right 8px
                            img
                                display block
                                width 18px
                                height 18px
                        &:nth-child(2)
                            font-size 18px
                            font-weight 400
                            line-height 25px
                            color #C6C6C6
                .pick_right
                    img
                        width 14px
                        height 14px
                        display block
        .van-popup
                .quick_clock_pop_nav
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
                .quick_clock_select_class_wrap
                    margin-top 10px
                    padding 20px 16px
                    box-sizing border-box

                    .quick_clock_select_class_content
                        .quick_clock_select_class_list
                            box-sizing border-box
                            padding 20px 0
                            li
                                margin-bottom 16px
                            .quick_clock_select_class_item
                                box-sizing border-box
                                border 1px solid #E8E8E8
                                display flex
                                align-items center
                                height 80px
                                padding 17px 16px 15px 16px
                                border-radius 15px
                                .user_avtar
                                    margin-right 12px
                                    img
                                        width 48px
                                        height 48px
                                        border-radius 50%
                                        display block
                                .class_info
                                    width  100%
                                    .class_title
                                        color #181818
                                        width auto
                                        font-size 16px
                                        font-weight 400
                                        line-height 22px
                                        box-sizing border-box
                                        margin-bottom 10px
                                    .down_info
                                        // width 6.8rem
                                        display flex
                                        align-items center
                                        justify-content space-between
                                        height 18px
                                        box-sizing border-box
                                        .user_name
                                            color #9B9B9B
                                            font-size 12px
                                            font-weight 400
                                            line-height 17px
                                        img
                                            width 18px
                                            height 18px
                                            display block
                            .quick_clock_isSelected
                                border 1px solid #FF444B
                                background #FCF0F1
    .quick_clock_btn_wrap
        position fixed
        bottom 35px
        box-sizing border-box
        width 10rem
        padding 0 16px
        .quick_colock_btn
                height 56px
                background #60C38C
                box-shadow 0px 4px 6px rgba(96,195,140,.3)
                border-radius 28px
                text-align center
                line-height 56px
                p
                    font-size 16px
                    font-weight 400
                    color #FFF


</style>
