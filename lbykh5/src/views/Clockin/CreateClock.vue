<template>
<div class="createclock">
  <div class="createclock_wrap">
    <div class="edit_page_title">
      <p v-if="type == 'new'">创建打卡</p>
      <p v-if="type == 'edit'">编辑打卡</p>
      <p>打卡不仅能活跃老用户，还能推广机构哦</p>
    </div>
    <!-- 主题start -->
    <van-field v-model="clock_theme" rows="1" autosize type="textarea" clickable @blur="iptBlur" maxlength="30" placeholder="请输打卡主题（5-30个字）" />
    <!-- 主题end -->
    <van-divider />

    <!-- 选择班级 start -->
    <div class="field_title">
      <p>适用班级</p>
      <p>每个班级同时只能发布一个打卡活动</p>
    </div>
    <van-field readonly clickable :value="selectedClass" right-icon="arrow" placeholder="请选择" :disabled="type == 'edit' || classList ==[]"  @click="pickClass" />
    <van-popup v-model="showClassPicker" :safe-area-inset-bottom='true' round :style="{height:'50%'}" position="bottom">
      
        <div class="clock_pop_nav">
          <p class="cancel_btn" @click="showClassPicker = false">取消</p>
          <p class="pop_title">选择班级</p>
          <p class="select_btn" @click="onClassConfirm()">确认</p>
        </div>
        <div class="clock_pop_content_wrap"  v-if="storeClass.count != 0">
          <div ref="class_list_wrap">
            <ul class="clock_select_list" ref="class_list">
              <li class="clock_select_list_item" @click="clock_select_class($event,index)" v-for="(item,index) in classList" :key="index" >
                  <div class="font_16px font_weight_400">
                    <p>{{item.className}}</p>
                    <p class="font_12px color_gray margin_top_8"><span class="color_gray_light">科目：</span><span>{{item.categoryName}}</span><span class="color_gray_light margin_left_12">班级模式：</span><span>{{item.teachMethod}}</span></p>
                  </div>
                  <div class="arrow_selected" v-show="classList[index].hasSelect">
                    <img src="../../images/CreateClock/selected.png" alt="">
                  </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="noclassdata" v-if="storeClass.count === 0">
          <div flex="dir:top cross:center" style="margin:100px auto">
            <img style="width:150px;height:150px;display:block" src="../../assets/images/nodata2x.png" alt="">
            <p class="font_14px color_gray_light">当前无可选班级</p>
          </div>
        </div>
    </van-popup>
    <van-divider />
    <!-- 选择班级 end -->
    <!-- 打卡结束时间 start -->
    <div class="field_title">
      <p>打卡结束时间</p>
    </div>
    <van-field readonly clickable :value="currentDate" right-icon="arrow" placeholder="请选择结束日期" @click="showDatePicker = true" />
    <van-popup v-model="showDatePicker" round position="bottom">
      <van-datetime-picker type="date" :min-date="minDate" title="请选择结束日期" :max-date="maxDate" @confirm="onDateConfirm" @cancel="showDatePicker = false" />
    </van-popup>
    <van-divider />
    <!-- 打卡结束时间 end -->


    <!-- 打卡介绍 start -->
    <div class="field_title">
      <p>打卡介绍</p>
    </div>
    <van-field v-model="clock_content" class="clock_more_field" rows="1" autosize type="textarea" maxlength="500" placeholder="请填写打卡介绍（500字以内）" show-word-limit />
    <van-divider />
    <!-- 打卡介绍 end -->
    
    <!-- <p>{{status}}</p> -->
    <!-- <p>{{token}}</p> -->
    <div style="height:30px"></div>
    <div class="create_colock_btn" v-if="type == 'new' || status == 'Finished'" @click="toClock(selectedClassId,clock_theme,selectedDate,clock_content)">
      <p>立即发布</p>
    </div>

    <div flex="main:justify cross:center" style="text-align:center" v-if="type == 'edit' && status == 'Beginning'">
      <p class="font_16px color_gray_light" style="width:35%;border:1px solid #b0b3ba;padding:14px 0;border-radius:28px" @click="finishClock()">结束打卡</p>
      <p class="font_16px color_white" style="width:60%;padding:14px 0;border-radius:28px;background:#2ac688" @click="toClock(selectedClassId,clock_theme,selectedDate,clock_content)">立即发布</p>
    </div>

  </div>

  <!-- <van-loading color="#60C38C" /> -->
    <van-overlay :show="hasDone" >
        <div class="wrapper">
            <van-loading size="48px" type="spinner" color="#b0b3ba" v-show="hasDone" vertical></van-loading>
        </div>
    </van-overlay>
    
  
</div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import {Toast,Notify, Dialog} from 'vant'
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
      minDate: new Date(),
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
      storeId:this.$route.query.storeId,
      type :this.$route.query.type,
      status:this.$route.query.status,
      token:'',
      hasDone:false,
      
    }
  },
  mounted() {
    
    
    if(this.$route.query.type == 'edit'){
      this.getClockInfo()
    }
    this.linkIos()
  },
  beforeMount(){
      window.McDispatcher = this.McDispatcher
      window.getParams = this.getParams
  },
  methods: {
    pickClass(){
      if(this.classList != [] && this.type == 'new'){
        this.showClassPicker = true
      }
    },
    iptBlur(){
      if(this.clock_theme.length < 5){
        // Toast('打卡主题最少5个字！')
        // Notify({ type: 'danger', message: '打卡主题最少5个字！' });
        Toast('打卡主题最少5个字！')
        this.showClassPicker= false
        this.showDatePicker= false
        this.showCoursePicker= false
      }
    },
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
          document.getElementsByClassName('clock_select_list_item')[index].classList.remove('clock_select_list_item_active')
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
          document.getElementsByClassName('clock_select_list_item')[index].classList.add('clock_select_list_item_active')
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
    getStoreClass(token){
      let url = this.ip+'class-clock/getUnClockClass';
      let param = new URLSearchParams()
      param.append("cuid", this.cuid)
      param.append("storeId", this.storeId)
      param.append("userToken", token)
      param.append("pageNo", 1)
      param.append("pageSize", 10)
      axios.post(url,param).then((res)=>{
        let storeClass = res.data.data
        this.storeClass = storeClass
        this.classList = storeClass.data
        for(let i=0;i<storeClass.length;i++){
          this.classList[i].hasSelect = false
        }
        if(storeClass.data == []){
          Toast('暂无可发布打卡的班级')
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
    toClock(classIds,title,endDate,introduce){
      if(title.length >=5){
        if(classIds.length != 0){
          if(endDate){
            if(introduce.length != 0){
              //
              if(this.$route.query.type == 'new'){
                let url = this.ip+'clock/addClock';
                let param = new URLSearchParams()
                param.append("cuid", this.cuid)
                param.append("storeId", this.storeId)
                param.append("userToken", this.token)
                param.append("classIds", classIds)
                param.append("title", title)
                param.append("endDate", endDate)
                param.append("introduce", introduce)
                this.hasDone = true
                axios.post(url,param).then((res)=>{
                  
                  if(res.data.result == 'noLogin'){
                      if(this.device == 'android'){
                          window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                      }else if(this.device == 'ios'){
                          window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                      }
                      
                  }
                  if(res.data.result == 'success'){
                    this.hasDone = false
                    
                    Toast.success('发布成功！')
                    setTimeout(()=>{
                      // this.$router.push({path:'/CreateClockMana',params:'121'})
                      if (this.device === 'android') {
                              //安卓每个页面方法名不一样
                          window.android.SkipPage('{"linkType": "h5","scheme":"H5PAGE","url": "'+this.Url+'/ClockDetail"}');
                      }
                      if (this.device === 'ios') { 
                          //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
                  　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme":"H5PAGE","isBlackItem":"false","url": "'+this.Url+'/ClockDetail?cuid='+this.cuid+'&storeId='+this.storeId+'&clockId='+res.data.data+'&classId='+classIds+'"}') 
                      }
                    },1200)
                  }else if(res.data.result == 'error'){
                    Toast(res.data.msg)
                  }
                  
                }).catch((err)=>{
                  console.log(err)
                })
              }

              if(this.$route.query.type == 'edit'){
                let url = this.ip+'clock/edit';
                let param = new URLSearchParams()
                param.append("cuid", this.cuid)
                param.append("storeId", this.storeId)
                param.append("classIds", classIds)
                param.append("title", title)
                param.append("endDate", endDate)
                param.append("introduce", introduce)
                param.append("clockId",this.clockInfo.clockId)
                param.append("userToken", this.token)
                this.hasDone = true
                axios.post(url,param).then((res)=>{
                  
                  if(res.data.result == 'noLogin'){
                        if(this.device == 'android'){
                            window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }else if(this.device == 'ios'){
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }
                        
                    }
                  if(res.data.result == 'success'){
                    
                    Toast.success('发布成功！')
                    this.hasDone = false
                    setTimeout(()=>{
                      // this.$router.push({path:'/CreateClockMana',params:'121'})
                      if (this.device === 'android') {
                              //安卓每个页面方法名不一样
                          window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/ClockDetail"}');
                      }
                      if (this.device === 'ios') { 
                          //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
                  　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK"}')
                      }
                    },1200)
                  }else if(res.data.result == 'error'){
                    this.hasDone = false
                    Toast(res.data.msg)
                  }
                  
                }).catch((err)=>{
                  console.log(err)
                })
              }
            }else{
              Toast({  message: '好的打卡介绍，更能调动客户积极性，快去填写吧！' });
            }
          }else{
            Toast('请选择结束日期！')
          }
        }else{
          Toast('请至少选择一个班级')
        }
      }else{
        Toast({ message: '打卡主题最少5个字！' });
      }
    },
    getClockInfo(){
      //http://192.168.3.22:8081/clock/clockInfo?cuid=grRF653ZPCGg2RCHNRl&storeId=STORE_7j2L9E9Znrx1pi3zE1r&clockId=CLOCK_U8wj1wBiMFSMdpswL7I
      let url = this.ip+'clock/clockInfo';
      let param = new URLSearchParams()
      param.append("cuid", this.$route.query.cuid)
      param.append("storeId", this.$route.query.storeId)
      param.append("clockId", this.$route.query.clockId)
      axios.post(url,param).then((res)=>{
        //
        if(res.data.result == 'success'){
          let clockInfo = res.data.data
          this.clockInfo = clockInfo
          this.clock_theme = clockInfo.title
          this.clock_content = clockInfo.introduce
          this.selectCourse = clockInfo.courseTitle
          // this.currentDate = clockInfo.endDate.slice(0,10)
          let data = clockInfo.endDate.slice(0,10)
          let handleDate = data.split('-')
          this.currentDate = handleDate[0] +'年'+handleDate[1]+'月'+handleDate[2]+'日'
          this.selectedDate = clockInfo.endDate
          this.selectedClass = clockInfo.clockClassList[0].className
          this.selectedClassId = clockInfo.clockClassList[0].classId
          this.selectedCourseId.push(clockInfo.courseId)
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    finishClock(){
      // /clock/finishClock
      Dialog.confirm({
        message:'确定结束吗？',
        confirmButtonColor:'#2ac688'
      }).then(()=>{
        let url = this.ip+'clock/finishClock';
        let param = new URLSearchParams()
        param.append("isHandFinish", true)
        param.append("cuid", this.$route.query.cuid)
        param.append("storeId", this.$route.query.storeId)
        param.append("clockId", this.$route.query.clockId)
        param.append("userToken", this.token)
        axios.post(url,param).then((res)=>{
          if(res.data.result == 'success'){
            //
            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK"}')
          }else{
            Toast(res.data.msg)
          }
        })
      }).catch(()=>{
        //
      })
    },
    McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
        this.token = qury.data.token
        this.getStoreClass(qury.data.token)
        if(!qury.data.token){
          window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        }
        this.getStoreCoureList()
    },
    getParams(msg){
        this.token = msg.token
        this.getStoreClass(msg.token)
        if(!msg.token){
          window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        }
        this.getStoreCoureList()
    },
    linkIos (){
            //给iOS APP传参
        window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
    },

  }
}
</script>
<style lang="stylus">
    .createclock
        max-width 540px
        margin 0 auto
        .createclock_wrap
            padding 0 24px 44px
            .van-cell
                padding 10px 0 !important
                &:not(:last-child)::after
                    display none
            .van-divider
                margin 0
            .van-picker__confirm
                color #FF444B!important
            .van-picker__cancel
                color #C6C6C6!important

</style>
