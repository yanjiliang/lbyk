<template>
<div class="quick_to_colock">
  <div class="quick_clock_wrap">
    <div class="edit_page_title">
      <p>快速打卡</p>
      <p>做一个打卡小能手，加油哦~</p>
    </div>

    <!-- 打卡内容 start -->
    <van-field v-model="clock_content" rows="4" autosize type="textarea" maxlength="1000" placeholder="说说今天的感想和收获吧..." class="clock_more_field" />
    <!-- 打卡内容 end -->
    <van-divider />

     

    <div class="file_upload_wrap">
      <van-uploader v-model="videoList " @delete="afterDelete" v-if="typeOfFile != 'image' && isUpload==false" upload-text="视频+" accept="video/*" :after-read="afterVideoRead" multiple :max-count='1' />
      <van-uploader v-if="typeOfFile != 'video' || typeOfFile == 'image'" @delete="afterImageDelete" v-model="imageList" :after-read="afterImageRead" accept="image/*" upload-text="图片+" multiple :max-count='9' />
    </div>
    <div class="colock_video_box" v-if="isUpload" style="border-radius:15px;z-index:999;position:relative">
      <H5Video :fileVideoSrc='fileVideoSrc' :videoCover="coverSrc"/>
      <p @click="afterVideoDelete" style="position:absolute;top:-6px;right:-6px;width:18px;height:18px" ><img style="width:18px;height:18px;display:block" src="../../images/CreateClock/delete.png" alt=""></p>
    </div>

    <div class="margin_top_16" @click="toSelectClass()">
      <div class="pick_clock_class">
        <van-field readonly clickable right-icon="arrow" placeholder="请选择打卡班级" v-if="hasSelected == false"  />

        <div flex="main:left cross:center" v-if="hasSelected == true">
            <div class="avator avator_48">
                <img v-if="selectedClass[0].studentAvatar" :src="selectedClass[0].studentAvatar" alt="">
                <p v-if="!selectedClass[0].studentAvatar">{{selectedClass[0].studentName.slice(-1,-3)}}</p>
            </div>
            <div>
                <p class="font_17px font_weight_700">{{selectedClass[0].studentName}}</p>
                <p class="font_14px color_gray_light margin_top_4">{{selectedClass[0].className}}</p>
            </div>
        </div>
      </div>
    </div>


    <van-divider style="margin: 10px 0" />

    <van-popup v-model="showClassPicker" :safe-area-inset-bottom='true' round :style="{height:'50%'}" position="bottom">
      <div class="clock_pop_nav">
        <p class="cancel_btn" @click="showClassPicker = false">取消</p>
        <p class="pop_title">选择打卡班级</p>
        <p class="select_btn" @click="onClassConfirm()">确认</p>
      </div>
      <div class="clock_pop_content_wrap" v-if="userClassList.length != 0">

        <div ref="class_list_wrap">
          <ul class="clock_select_list" ref="class_list">
            <li class="clock_select_list_item"  @click="quick_clock_select_class($event,index)" v-for="(item,index) in userClassList" :key="index">
              <div flex="main:left cross:center">
                  <div class="avator avator_48">
                      <img  v-if="item.studentAvatar" :src="item.studentAvatar" alt="">
                      <p v-if="!item.studentAvatar">{{item.studentName.slice(-1,-3)}}</p>
                  </div>
                  <div>
                      <p class="font_17px font_weight_700">{{item.studentName}}</p>
                      <p class="font_14px color_gray_light margin_top_4">{{item.className}}</p>
                  </div>
              </div>
              <div class="arrow_selected">
                <img src="../../images/CreateClock/selected.png" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="noclassdata" v-if="userClassList.length == 0">
        <div flex="dir:top cross:center" style="margin:60px auto;width:150px">
          <img style="width:150px;height:150px;display:block" src="../../assets/images/nodata2x.png" alt="">
          <p class="font_12px color_C6C6C6">暂无可发布打卡活动的班级</p>
        </div>
      </div>
    </van-popup>
    
    <div id="showCover"></div>
    

  </div>
  <div style="height:30px"></div>
  <div class="quick_clock_btn_wrap" >
    <!-- ,selectedClass[0].classId,selectedClass[0].studentId -->
    <div class="quick_colock_btn" @click="quickToClock(imgfile,videofile,videoCover)">
      <p>立即发布</p>
    </div>
  </div>

  <van-loading size="48px" color="green" v-show="hasDone" vertical type="spinner"></van-loading>
</div>
</template>

<script>
import 'flex.css'
import '../../../public/resetVant.css'
import '../../css/Clock/clockPublic.css'
import H5Video from '../../components/H5Video'
const axios = require('axios')
import {Toast} from 'vant'
export default {
  name: 'QuickToClock',
  data() {
    return {
      ip:this.$ip.getIp(),
      Url:this.$Url.geturl(),
      device:this.$device.getDevice(),
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
      userClass:'',
      clockId:this.$route.query.clockId,
      imgfile:[],
      coverFile:'',
      clockTheme:'',
      videoCover:'',
      coverSrc:'',
      hasDone:false,
      token:''
    }
  },
  components: {
    H5Video
  },
  mounted(){
    this.linkIos()
    
    // this.clockTheme = unescape(this.$route.query.clockTheme)
  },
  beforeMount(){
      window.McDispatcher = this.McDispatcher
      window.getParams = this.getParams
  },
  methods: {
    afterDelete(){
      this.isUpload = false
    },
    afterVideoDelete(){
      this.isUpload = false
      this.typeOfFile = ''
      // setTimeout(()=>{
      //   document.getElementsByClassName('van-icon-clear')[0].onclick()
      // },100)
    },
    afterImageDelete(){
      this.isUpload = false
      let img = document.getElementsByClassName('van-uploader__preview')
      if(img.length == 1){
        this.typeOfFile = ''
      }
    },
    translateBase64ImgToFile(base64,filename,contentType){
        var arr = base64.split(',')  //去掉base64格式图片的头部
        var bstr = atob(arr[1])   //atob()方法将数据解码
        var leng = bstr.length
        var u8arr = new Uint8Array(leng)
        while(leng--){
            u8arr[leng] =  bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
        }
        return new File([u8arr],filename,{type:contentType}) 
    },
    afterVideoRead(file) {
      
      this.fileVideoSrc = file.content
      this.videofile = file.file
      this.isUpload = true
      this.typeOfFile = 'video'
      
      setTimeout(()=>{
        let video = document.getElementsByTagName('video')[0]
        let videoWidth = video.videoWidth
        let videoHeight = video.videoHeight
        
        var ctx = document.createElement('canvas')
        ctx.width = videoWidth
        ctx.height = videoHeight
        ctx.getContext('2d').drawImage(video, 0, 0, ctx.width, ctx.height)

        let src = ctx.toDataURL("image/png");
        let img = document.createElement('img')
        img.src = src
        document.getElementById('showCover').appendChild(img)
        this.coverSrc = src
        console.log(src)
        this.videoCover = this.translateBase64ImgToFile(src,"videoCover.png","image/png")
        console.log(this.videoCover)
      },1000)
    },
    afterImageRead(file) {
       // postData是一个数组
      this.typeOfFile = 'image'
      // this.imageList.push(file.file)

      console.log(file)
      let filetype = Object.prototype.toString.call(file)
      console.log(filetype)
      if(filetype == '[object Object]'){
        this.imgfile.push(file.file)
        console.log(this.imgfile)
        console.log(this.imgfile[1])
      }
      
      if(filetype == '[object Array]'){
        let len = file.length
        console.log(len)
        for(let i = 0;i<len;i++){
          console.log(file[i].file)
          this.imgfile.push(file[i].file)
        }
        console.log(this.imgfile)
      }
    },
    toSelectClass() {
      this.showClassPicker = true
    },
    quick_clock_select_class(e, index) {
      //控制班级选择
      this.$nextTick(() => {
        if (this.userClassList[index].hasSelect) {
          document.getElementsByClassName('clock_select_list_item')[index].classList.remove('clock_select_list_item_active')
          this.userClassList[index].hasSelect = false
        } else {
          document.getElementsByClassName('clock_select_list_item')[index].classList.add('clock_select_list_item_active')

          for (let i = 0; i < this.userClassList.length; i++) {
            if (this.userClassList[i].hasSelect == true) {
              document.getElementsByClassName('clock_select_list_item')[i].classList.remove('clock_select_list_item_active')
              this.userClassList[i].hasSelect = false
            }
          }
          this.userClassList[index].hasSelect = true

        }
      })
      console.log(this.selectedClass)
    },
    onClassConfirm() {
      if(this.userClassList.length == 0){
        this.showClassPicker = false
      }
      this.showClassPicker = false
      
      // this.hasSelected = true
      if(this.selectedClass.length == 0){
        this.showClassPicker = false
      }
      if(this.userClassList.length != 0){
        this.hasSelected = true
        for (let i = 0; i < this.userClassList.length; i++) {
          if (this.userClassList[i].hasSelect == true) {
            this.selectedClass.splice(0)
            this.selectedClass.push(this.userClassList[i])
          }
        }
      }

    },
    quickToClock(picFile,videoFile,videoCover){
      
      if(this.clock_content.length !=0){
        //选择了班级
        if(this.selectedClass.length != 0){
          //
            this.hasDone = true
            let self = this
            let url = this.ip+'class-clock-student/rapidClock';
            let paramimg = new FormData()
            paramimg.append("cuid", self.$route.query.cuid)
            paramimg.append("storeId", self.$route.query.storeId)
            paramimg.append("clockId", self.$route.query.clockId)
            // picFile.forEach(item =>{
            //   paramimg.append("picFile1",item)
            // })
            if (picFile.length == 1) {paramimg.append("picFile1", picFile[0])}
            if (picFile.length == 2) {paramimg.append("picFile1", picFile[0]);paramimg.append("picFile2", picFile[1])}
            if (picFile.length == 3) {paramimg.append("picFile1", picFile[0]);paramimg.append("picFile2", picFile[1]);paramimg.append("picFile3", picFile[2]);}
            if (picFile.length == 4) {paramimg.append("picFile1", picFile[0]);paramimg.append("picFile2", picFile[1]);paramimg.append("picFile3", picFile[2]);paramimg.append("picFile4", picFile[3]);}
            if (picFile.length == 5) {paramimg.append("picFile1", picFile[0]);paramimg.append("picFile2", picFile[1]);paramimg.append("picFile3", picFile[2]);paramimg.append("picFile4", picFile[3]);paramimg.append("picFile5", picFile[4]);}
            if (picFile.length == 6) {paramimg.append("picFile1", picFile[0]);paramimg.append("picFile2", picFile[1]);paramimg.append("picFile3", picFile[2]);paramimg.append("picFile4", picFile[3]);paramimg.append("picFile5", picFile[4]);paramimg.append("picFile6", picFile[5]);}
            if (picFile.length == 7) {paramimg.append("picFile1", picFile[0]);paramimg.append("picFile2", picFile[1]);paramimg.append("picFile3", picFile[2]);paramimg.append("picFile4", picFile[3]);paramimg.append("picFile5", picFile[4]);paramimg.append("picFile6", picFile[5]);paramimg.append("picFile7", picFile[6]);}
            if (picFile.length == 8) {paramimg.append("picFile1", picFile[0]);paramimg.append("picFile2", picFile[1]);paramimg.append("picFile3", picFile[2]);paramimg.append("picFile4", picFile[3]);paramimg.append("picFile5", picFile[4]);paramimg.append("picFile6", picFile[5]);paramimg.append("picFile7", picFile[6]);paramimg.append("picFile8", picFile[7]);}
            if (picFile.length == 9) {paramimg.append("picFile1", picFile[0]);paramimg.append("picFile2", picFile[1]);paramimg.append("picFile3", picFile[2]);paramimg.append("picFile4", picFile[3]);paramimg.append("picFile5", picFile[4]);paramimg.append("picFile6", picFile[5]);paramimg.append("picFile7", picFile[6]);paramimg.append("picFile8", picFile[7]);paramimg.append("picFile9", picFile[8]);}
            paramimg.append("classId", self.selectedClass[0].classId)
            paramimg.append("studentId", self.selectedClass[0].studentId)
            paramimg.append("impression", self.clock_content)

            let paramvideo = new FormData()
            paramvideo.append("cuid", self.$route.query.cuid)
            paramvideo.append("storeId", self.$route.query.storeId)
            paramvideo.append("clockId", self.$route.query.clockId)
            paramvideo.append("userToken", this.token)
            // paramvideo.append("cuid", 'eYhjQznFDdvZiHz4oXt')
            // paramvideo.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
            // paramvideo.append("clockId", 'CLOCK_zL8VrS2qFhgNs8rm6dc')
            paramvideo.append("classId", self.selectedClass[0].classId)
            paramvideo.append("studentId", self.selectedClass[0].studentId)
            paramvideo.append("impression", self.clock_content)
            paramvideo.append("videoFile", videoFile)
            paramvideo.append("coverFile", videoCover)
            paramvideo.append("userToken", this.token)

            let params = new FormData()
            params.append("cuid", self.$route.query.cuid)
            params.append("storeId", self.$route.query.storeId)
            params.append("clockId", self.$route.query.clockId)
            params.append("classId", self.selectedClass[0].classId)
            params.append("studentId", self.selectedClass[0].studentId)
            params.append("impression", self.clock_content)
            params.append("userToken", this.token)

            let config = {
                headers: { //添加请求头
                    'Content-Type': 'multipart/form-data'
                }
            }

            
            if(self.typeOfFile == 'image'){
              
              axios.post(url,paramimg,config).then((res)=>{
                // Toast(res.data.result)
                if(res.data.result == 'success'){
                  self.hasDone = false
                  // this.$router.push({path:'/ClockShare',query:{'clockId':this.$route.query.clockId,'studentId':this.$route.query.studentId,'classId':this.$route.query.classId,'clockStudentId':res.data.data}})
                  let url = self.Url + '/Clockinfo?clockId='+self.$route.query.clockId+'&studentId='+self.selectedClass[0].studentId+'&classId='+self.selectedClass[0].classId+'&clockStudentId='+res.data.data+'&cuid='+self.$route.query.cuid+'&storeId='+self.$route.query.storeId;
                  // document.createElement("a").href = url
                  let alink = document.createElement("a")
                  alink.href = url
                  Toast.success('打卡成功')
                  setTimeout(()=>{alink.click()},200)
                }else{
                  Toast(res.data.msg)
                }
                
              }).catch((err)=>{
                console.log(err)
              })
            }else if(self.typeOfFile == 'video'){
              axios.post(url,paramvideo,config).then((res)=>{
                // Toast(res.data.result)
                if(res.data.result == 'success'){
                  self.hasDone = false
                  setTimeout(()=>{
                    // this.$router.push({path:'/ClockShare',query:{'clockId':this.$route.query.clockId,'studentId':this.$route.query.studentId,'classId':this.$route.query.classId,'clockStudentId':res.data.data}})
                    let url = self.Url + '/Clockinfo?clockId='+self.$route.query.clockId+'&studentId='+self.selectedClass[0].studentId+'&classId='+self.selectedClass[0].classId+'&clockStudentId='+res.data.data+'&cuid='+self.$route.query.cuid+'&storeId='+self.$route.query.storeId;
                    let alink = document.createElement("a")
                    alink.href = url
                    Toast.success('打卡成功')
                    setTimeout(()=>{alink.click()},200)
                    
                    // window.location.href = url
                  },200)
                }else{
                  Toast(res.data.msg)
                }
                
              }).catch((err)=>{
                console.log(err)
              })
            }else{
              //
              
              axios.post(url,params,config).then((res)=>{
                // Toast(res.data.result)
                if(res.data.result == 'success'){
                  self.hasDone = false
                  setTimeout(()=>{
                    // this.$router.push({path:'/ClockShare',query:{'clockId':this.$route.query.clockId,'studentId':this.$route.query.studentId,'classId':this.$route.query.classId,'clockStudentId':res.data.data}})
                    let url = self.Url + '/Clockinfo?clockId='+self.$route.query.clockId+'&studentId='+self.selectedClass[0].studentId+'&classId='+self.selectedClass[0].classId+'&clockStudentId='+res.data.data+'&cuid='+self.$route.query.cuid+'&storeId='+self.$route.query.storeId;
                    let alink = document.createElement("a")
                    alink.href = url
                    Toast.success('打卡成功')
                    setTimeout(()=>{alink.click()},200)
                    
                    // window.location.href = url
                  },200)
                }else{
                  Toast(res.data.msg)
                }
                
              }).catch((err)=>{
                console.log(err)
              })
            }
        }else{
          //感想为空
          
          Toast('请选择打卡的班级')
        }
      }else{
        //没选择班级
        Toast('请填入打卡感想')
      }
      
    },
    getUserClass(){
      // /class-clock/getClockClass
      let url = this.ip+'class-clock/getClockClass';
      let param = new URLSearchParams()
      param.append("cuid", this.$route.query.cuid)
      param.append("storeId", this.$route.query.storeId)
      param.append("clockId", this.$route.query.clockId)
      param.append("userToken", this.token)
      param.append("pageNo", 1)
      param.append("pageSize", 10)
      axios.post(url,param).then((res)=>{
        let userClass = res.data.data
        this.userClassList = userClass
        
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
        this.getUserClass()
    },
    getParams(msg){
        this.token = msg.token
        if(!msg.token){
          window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        }
        this.getUserClass()
    },
    linkIos (){
            //给iOS APP传参
        window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
    },
  }
}
</script>

<style lang="stylus" scoped>

.quick_to_colock
    max-width 540px
    margin 0 auto
    .quick_clock_wrap
        padding 26px 24px

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
    .quick_clock_btn_wrap
        // position fixed
        // bottom 35px
        margin-bottom 35px
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
