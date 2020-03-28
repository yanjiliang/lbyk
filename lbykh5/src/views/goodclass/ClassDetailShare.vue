<template>
    <div class="classdetail">
        

        <div class="detailinfobox">
            <!-- 轮播图 -->
        <van-swipe :autoplay="4000" class="swipebox" :show-indicators='false'>
            <van-swipe-item class="swipeitem" v-for="(item, index) in imagelist" :key="index">
                <img v-lazy="item" @click="preClick(index)"/>
            </van-swipe-item>
        </van-swipe>

        <van-image-preview v-model="pre_show" :images="imagelist" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
            <template v-slot:index></template>
        </van-image-preview>
            <div class="detailinfobox_wrap">
                <div class="infotitle">
                    <div class="classname">
                        <p>教学科目</p>
                        <p>{{course_detail_data.categoryName}}</p>
                    </div>
                    <div class="sort">
                        <img src="../../images/GoodClass/SORT@2x.png" alt="">
                    </div>
                    <div class="locationinfo">
                        <div class="location">
                            <p><img src="../../images/GoodClass/locayellow.png" alt=""></p>
                            <p>{{course_detail_data.area}}</p>
                        </div>
                        <p v-show="course_detail_data.distance">{{course_detail_data.distance}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="classinfo">
            <p class="classtitle">{{course_detail_data.courseTitle}}</p>
            <div class="classpricebox">
                <span class="price"><i>￥</i>{{course_detail_data.sellingPrice}}</span><span class="oriprice"><i>￥</i>{{course_detail_data.tagPrice}}</span>
            </div>
            <div class="tags">
                <div class="tagbox">
                    <div class="tagpic">
                        <img src="../../images/GoodClass/kssl.png" alt="">
                    </div>
                    <div class="taginfo">
                        <p>{{course_detail_data.classHourNum}}{{classHourUnit}}</p>
                        <p>课时数量</p>
                    </div>
                </div>
                <div class="tagbox">
                    <div class="tagpic">
                        <img src="../../images/GoodClass/kjsc.png" alt="">
                    </div>
                    <div class="taginfo">
                        <p>{{course_detail_data.classTimeNum}}{{classTimeUnit}}</p>
                        <p>课节时长</p>
                    </div>
                </div>
                <div class="tagbox">
                    <div class="tagpic">
                        <img src="../../images/GoodClass/syrq.png" alt="">
                    </div>
                    <div class="taginfo">
                        <p>{{age}}</p>
                        <p>适用人群</p>
                    </div>
                </div>
            </div>

            
            

            <!-- 视课 -->
            <div class="class_pre_video" v-if="course_detail_data.videoUrl.length != 0">
                <div class="title">
                    <div class="class_video">
                        <p class="class_video_img"><img src="../../images/GoodClass/video-class.png" alt=""></p>
                        <p>好课程 一“视”便知</p>
                    </div>
                </div>
                
                <div v-if="course_detail_data.videoUrl">
                    <H5Video :fileVideoSrc="course_detail_data.videoUrl" :playCount='course_detail_data.playCount' :videoCover="course_detail_data.videoCoverUrl" :videoRemarks="course_detail_data.videoRemarks" :videoId="course_detail_data.videoId" />
                </div>
            </div>
            
            <!-- 授课老师 -->
            <div class="classteacher" v-if="course_detail_data.teacherInfoDtoList.length != 0">
                <div class="title">
                    <p>授课老师</p>
                </div>
                <div class="noclass" v-if="course_detail_data.teacherInfoDtoList.length == 0">
                    <div class="noclass_icon">
                        <img src="../../images/GoodClass/orgindex/通用-线2@2x.png" alt="icon图片">
                    </div>
                    <div class="noclass_info">
                        <p>未设置师资力量</p>
                    </div>
                </div>
                <div class="teacherlist">
                    <ul>
                        <li v-for="(item,index) in course_detail_data.teacherInfoDtoList" :key="index">
                            <div class="teacherpic">
                                <img class="pic" id="avatar" :src="item.avatar" v-if="item.avatar" />
                                <p v-if="!item.avatar">{{item.name.substring(item.name.length-2)}}</p>
                            </div>
                            <div class="teacherinfo">
                                <div class="teachername">
                                    <span>{{item.name}}</span><span>{{item.teachAge}}教龄</span>
                                </div>
                                <div class="motto">{{item.teachingSlogan}}</div>
                                
                                <div class="teachertag" ref="tagsbox" id="tagsbox">
                                    <div class="tag" ref="tags" id="tags">

                                        <span v-for="(item2,index) in item.labelList" :key="index">{{item2}}</span>

                                    </div>
                                </div>
                            </div>
                        </li>

                        
                    </ul>
                </div>
            </div>

            <!-- 机构信息 -->
            <div class="orginfobox">
                <div class="title">
                    <p>机构信息</p>
                    <a :href="Url+'/OrgindexShare?storeId='+cd_storeid">进店逛逛</a>
                </div>
                <div class="orginfo">
                    <div class="orgtitle">
                        <div class="orgpic">
                            <img :src="course_detail_data.storeAddrInfoDto.logo" alt="">
                        </div>
                        <div class="info">
                            <p>{{course_detail_data.storeAddrInfoDto.storeName}}</p>
                            <p>{{course_detail_data.storeAddrInfoDto.categoryList.join('/')}}</p>
                        </div>
                    </div>

                    <div class="orglocatin">
                        <div class="locainfo">
                            <div>
                                <p>{{course_detail_data.area}}</p>
                                <p>{{course_detail_data.storeAddrInfoDto.buildingName}}{{course_detail_data.storeAddrInfoDto.detailedAddr}}</p>
                            </div>
                            <div> 
                                <a v-clipboard:copy="course_detail_data.storeAddrInfoDto.buildingName+course_detail_data.storeAddrInfoDto.detailedAddr" v-clipboard:success="onCopy" v-clipboard:error="onError">复制地址</a> 
                            </div> 
                        </div> 
                        <!-- <p>{{center}}</p> -->
                        <div class="map">
                            <div class="map-mask"></div>
                            <el-amap
                            :events="mapEvents"
                            :dragEnable='dragEnable' 
                            :zoomEnable='zoomEnable' 
                            :zoom='zoom'
                            :center='center'
                            :amap-manager='amapManager' 
                            >
                                <el-amap-marker
                                    :icon='icon'
                                ></el-amap-marker>
                            </el-amap>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 课程介绍 -->
            <div class="bandstory" v-if="course_detail_data.introduce.length != 0">
                <div class="bandtitle">
                    <p>课程介绍</p>
                </div>
                <div class="bandinfo">
                    <p class="fold" ref="bandinfo" id="info" v-html="introduce"></p>
                    <!-- <p>{{orgindex_data.introduce}}</p> -->
                    <!-- <p @click="clickTofold()" v-if="infoHeight/23 >= 7 ? true : false"><span v-if="showFold">查看全部</span><i v-if="showFold"><img src="../../assets/images/返回5@2x.png" alt=""></i></p> -->
                </div>
            </div>
        </div>

        
        <!-- 预约须知 start -->
        <Orderinfo/>
        <!-- 预约须知 end-->
        <div style="height:85px"></div>
        
        <div class="orderbtn">
                <p @click="showPopup">立即预约</p>
                
        </div>

        <van-popup 
            class="pup"
            v-model="ordershow"
            closeable
            round
            position='bottom'
            :style="{height:'65%'}"
            lock-scroll:true
            close-on-click-overlay:false
            >
                
                <div class="pupbox">
                    <div class="title">
                        <p>预约课程</p>
                        <p>请填写预约信息，我们将尽快联系您</p>
                    </div>
                    <div class="studentname">
                        <p>学员姓名</p>
                        <input type="text" name="username" @blur="reSize()" id="username" placeholder="请输入学员姓名">
                    </div>
                    <div class="phonenumber">
                        <p>联系电话</p>
                        <input type="tel" pattern="[0-9]*" maxlength="11" name="username" @blur="reSize()" id="phone" placeholder="请输入手机号码">
                    </div>
                    <div class="verticode">
                        <p>验证码</p>
                        <input type="tel" pattern="[0-9]*" maxlength="4" name="username" @blur="reSize()" id="code" placeholder="请输入验证码">
                        <span v-show="sendCode" class="codetext" @click="getCode()">获取验证码</span>
                        <span v-show="!sendCode" class="codetext"><span>{{code_time}}S</span></span>
                    </div>
                    <div style="display:flex;align-items: center">
                        <p style="height:14px;line-height:14px"><img style="width:14px;height:14px" src="../../images/GoodClass/保护@2x.png" alt=""></p>
                        <p style="color:#4DC9BD;font-size:14px;line-height:20px;height:20px">无强行推销，不泄露用户信息，请放心填写</p>
                    </div>
                    <div class="yesbtn">
                        <p @click="toOrder(courseId)">确认预约</p>
                    </div>
                </div>
        </van-popup>
    </div>
    
</template>


<script src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>

<script>
// 高德地图
import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key:'84c53b5ca56eaf061dd6cee8a2b9eb51',
  plugin:['AMap.Autocomplete','AMap.PlaceSearch','AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],

})
// import { AMapManager } from 'vue-amap'
let amapManager = new VueAMap.AMapManager();
const axios = require('axios')
import { Toast } from 'vant';

import BScroll from 'better-scroll'
import Orderinfo from '../../components/OrderInfo'
import H5Video from '../../components/H5Video'
export default {
    name:'classdetail',
    components:{
        Orderinfo,
        H5Video
    },
    data (){
        return {
                ip:this.$ip.getIp(),
                Url:this.$Url.geturl(),
                device:this.$device.getDevice(),
                defaultImg:'this.src='+ require('../../assets/images/err.png'),
                icon:require('../../images/GoodClass/mapicon.png'),
                imagelist: [],
                ordershow:false,
                sendCode:true,
                code_time:'',
                showFold:true,//
                center:[],//经纬度
                course_detail_data:Object,//存储课程数据
                zoom:18,
                classdetail_userInfo:'',//拿到参数
                cd_courseid:this.$route.params.courseId,//课程ID
                classdetail_timer:null,
                h5orapp:'h5',//环境判断
                cd_vercode:'',//验证码
                // cd_studentName:'',//人名
                cd_phone:'',//电话
                cd_cuid:'',//cuid
                resStatus:'',
                resMsg:'',
                cd_storeid:'',
                urls:[],
                amapManager,
                mapEvents:{
                    init(o){
                        o.setMapStyle('amap://styles/3b109f482a6a20c90af28596a8015fe5')
                    }
                },
                dragEnable:false,
                zoomEnable:false,
                touchZoom:false,
                age:'',
                classHourUnit:'',
                classTimeUnit:'',
                spans:Object,
                wechatSharedata:'',
                infoHeight:'',
                pre_index:0,
                pre_show:false,
                introduce:''
            }
    },
    methods: {
        onCopy(){
            this.$message.success("内容已复制到剪切板！")
        },
        onError(){
            this.$message.error("抱歉，复制失败！")
        },
        preClick(index){
                this.pre_show=true;
                this.pre_index=index;
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "false"}')
            },
            onClose(){
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "true"}')
            },
            onChange(index) {
                this.pre_index = index;
            },
        cacuLines(){
            const textHeight = document.getElementById('info').clientHeight
            this.infoHeight = textHeight
        },
        swipSpan (){
            
            const tags = this.$refs.tags
            for(var i =0;i<this.spans.length;i++){
                let width = this.spans[i].labelList.length * 66  
                // document.getElementById('tags')[i].style.width= width + 'px'
                tags[i].style.width = width + 'px'
            }
            this.$nextTick(()=>{
                var tagsbox = document.getElementById('tagsbox')
                this.scroll = new  BScroll(tagsbox,{
                    startX:0,
                    click:true,
                    scrollX:true,
                    scrollY:false,
                    eventPassthrough:'vertical',
                })
            })
            for(var j =0;j<this.spans.length;j++){
                const aa = tagsbox[j]
                this.scroll = new  BScroll(aa,{
                    startX:0,
                    click:true,
                    scrollX:true,
                    scrollY:false,
                    eventPassthrough:'vertical',
                })
            }
            
        },
        showPopup : function (){
            //控制弹出页面的显示隐藏
            this.ordershow = true
        },
        getCode : function (){
            //获取验证码
            let phone = document.getElementById('phone').value
            if(phone == "" || phone.length <11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
                Toast('请输入正确的手机号码')
            }else{
                const time_count = 60
                if(!this.classdetail_timer){
                    this.code_time = time_count;
                    this.sendCode = false;
                    this.classdetail_timer = setInterval(() => {
                        if(this.code_time > 0 && this.code_time <= time_count){
                            this.code_time--;
                        }else{
                            this.sendCode = true;
                            clearInterval(this.classdetail_timer);
                            this.classdetail_timer = null
                        }
                    }, 1000);
                }
                this.phone = document.getElementById('phone').value
                let url = this.ip + 'smsVerCode/sendCode?phone=' + this.phone;
                axios.post(url).then((res)=>{
                    this.vercode = res.data
                }).catch((err)=>{
                    console.log(err)
                })
            }
            
            

        },
        toOrder(courseId){
            let phone = document.getElementById('phone').value
            let name = document.getElementById('username').value
            let code = document.getElementById('code').value
            
            if(phone == "" || phone.length <11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
                Toast('请输入正确的手机号码')
            }else if(name == ""){
                Toast('姓名不能为空，请填入正确的姓名！')
                
            }else {
                if(name.length <2){
                    Toast('名字不能小于两个字')
                }else if(name.length >8){
                    Toast('名字不能大于8个字')
                }else{
                    var nameReg = /^[\u4e00-\u9fa5a-zA-Z]{2,8}$/;
                    if (!nameReg.test(name)) {
                        Toast('姓名格式不对哦，请填入真实姓名！')
                        
                    }else if(code == ""){
                        Toast('验证码不能为空！')
                        
                    }else if(code.length <3){
                        Toast('验证码不正确！')
                        
                    }else{
                        let studentName = document.getElementById('username').value
                        let url = this.ip + 'course-appointment/add-h5?courseId=' + courseId + '&studentName=' + studentName + '&phone=' + phone + '&code='+code;
                        axios.post(url).then((res)=>{
                            //响应码success/error
                            this.resStatus = res.data
                            this.resMsg = res.data.msg
                            
                            
                            
                            if(res.data.result == 'success'){
                                this.$router.push({path:'/AppointmentSuccess'})
                            }else if(res.data.result == 'noLogin'){ 
                                if(this.device == 'android'){
                                    window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                                }else if(this.device == 'ios'){
                                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                                }
                            }else if(res.data.result == 'error'){
                                if(res.data.msg === '课程已下架'){
                                    this.$router.push({ name:'AppointmentFail',params:{ resmsg: this.resMsg }})
                                }else{
                                    Toast(res.data.msg)
                                }
                            }else{
                                Toast("预约失败，请稍后再试！")
                            }
                        })
                    }
                }
                
            }
            //进行预约结果页面展示
            
        },
        getCourseData(){
            let url = window.location
            let qurys = url.search.substring(1)
            let qurylist = qurys.split("&")
            for(var i =0; i< qurylist.length;i++){
                this.urls.push(qurylist[i].split("=")[1])
            }
            this.courseId = this.urls[0]
            var url1 = this.ip + 'course/details?courseId=' +this.urls[0]+'&clientType=h5' ;
            axios.post(url1).then((res)=>{
                // Dialog({ message: res.data.result });
                
                if(res.data.result == 'error'){
                    //课程下架
                    if(this.h5orapp != 'h5'){
                        this.$router.push({path:'/ClassSoldOut'})
                    }else{
                        this.$router.push({path:'/ClassSoldOutApp'})
                    }
                    
                }
                this.course_detail_data = res.data.data
                this.imagelist = this.course_detail_data.picList
                let loca = this.course_detail_data.storeAddrInfoDto
                this.center = [loca.longitude,loca.latitude]
                this.cd_storeid = this.course_detail_data.storeAddrInfoDto.storeId
                this.spans = this.course_detail_data.teacherInfoDtoList

                
                this.getWechatShare()
            

                this.course_detail_data.classHourUnit == 'section' ? this.classHourUnit = '节' : this.classHourUnit = '次'
                    //this.classTimeUnit= this.course_detail_data.classTimeUnit
                    if(this.course_detail_data.classTimeUnit == 'minute'){
                        this.classTimeUnit = '分钟'
                    }else if(this.course_detail_data.classTimeUnit == 'hour'){
                        this.classTimeUnit = '小时'
                    }else if(this.course_detail_data.classTimeUnit == 'day'){
                        this.classTimeUnit = '天'
                    }
                    // this.cd_courseid = this.classdetail_userInfo.data.courseId
                if(this.course_detail_data.minAge == 0 && this.course_detail_data.maxAge == 60){
                    this.age = '不限年龄'
                }else if(this.course_detail_data.minAge == 0 && this.course_detail_data.maxAge != 60){
                    this.age = this.course_detail_data.maxAge +'岁以下'
                }else if(this.course_detail_data.minAge != 0 && this.course_detail_data.maxAge != 60){
                    this.age = this.course_detail_data.minAge + '-' +this.course_detail_data.maxAge +'岁'
                }else if(this.course_detail_data.minAge != 0 && this.course_detail_data.maxAge == 60){
                    this.age = this.course_detail_data.minAge  +'岁以上'
                }

                // 处理富文本
                    
                try {
                    if (typeof JSON.parse(this.course_detail_data.introduce) == "object") {
                        // Toast('JSON')
                        let introduce = JSON.parse(this.course_detail_data.introduce)
                        var richText =''
                        for(let i =0;i<introduce.length;i++){
                            //
                            if(introduce[i].richContentType ==  2){
                                richText += '<p>'
                                richText += introduce[i].textContent
                                richText += '</p>'
                            }else if(introduce[i].richContentType ==  1){
                                richText += "<img "
                                richText += "src='" 
                                richText += introduce[i].remoteImageUrlString
                                richText += "'/>" 
                            }
                        }
                        this.introduce = richText
                    }
                } catch(e) {
                    // Toast('字符春')
                    this.introduce = this.course_detail_data.introduce
                }

            })
        },
        
        isApp(){
                //this.h5orapp = navigator.userAgent.toLowerCase()
                let ua = navigator.userAgent.toLowerCase()
                if(ua.indexOf('iphone') != -1 || ua.indexOf('android') != -1){
                    this.h5orapp = 'app'
                }else{
                    this.h5orapp = 'h5'
                }
            },
        linkIos : function (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
        
        ClickTo : function (qury,addrInfo){
            
            if (this.device === 'android') {
                
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'","content":"'+addrInfo+'"}');
                
            }
            if (this.device === 'ios') { 
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'","content":"'+addrInfo+'"}')
            }
        
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写
        },
        cd_skipe_orgindex (qury){
                //跳转机构主页
                
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    
                    window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","storeId":"'+this.cd_storeid+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}');
                }
                if (this.device === 'ios') { 
                    
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","jump":"true","storeId":"'+this.cd_storeid+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}')
                }
            },
        cd_skipe_teacher (){
                //跳转教师
                
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/teacher","scheme":"SKLS","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}');
                }
                if (this.device === 'ios') { 
                    
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/teacher","jump":"true","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}')
                }
            },
        pre_edit_page(){
            
            if (this.device === 'android') {
                //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "app","scheme":"KCBJ","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}');
            }
            if (this.device === 'ios') { 
                
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","jump":"true","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}')
            }
        },
        sold_out_page(){
            
            if (this.device === 'android') {
                //安卓每个页面方法名不一样
                window.android.SkipPage('{"linkType": "app","scheme":"XJKC","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}');
            }
            if (this.device === 'ios') { 
                
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"XJKC","jump":"true","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}')
            }
        },
        verifyName(){
            let name = document.getElementById('username').value
            if(name == ""){
                Toast('姓名不能为空，请填入正确的姓名！')
                
            }else {
                if(name.length <2){
                    Toast('名字不能小于两个字')
                }else if(name.length >8){
                    Toast('名字不能大于8个字')
                }else{
                    var nameReg = /^[\u4E00-\u9FA5]{2,5}$/;
                    if (!nameReg.test(name)) {
                        Toast('姓名格式不对哦，请填入真实姓名！')
                        
                    }
                }
                
            }
            return false
        },
        verifyPhone(){
            let phone = document.getElementById('phone').value
            if(phone == "" || phone.length <11 || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
                Toast('请输入正确的手机号码')
            }
        },
        verifyCode(){
            let code = document.getElementById('code').value
            if(code == ""){
                Toast('验证码不能为空！')
                
            }else if(code.length <4){
                Toast('验证码不正确！')
                
            }
        },
        
        reSize(){
            setTimeout(function() {
                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100);
        },
        getWechatShare(){
                setTimeout(()=>{
                    const location = window.location.href
                    console.log(location)
                    const bandinfo  = this.course_detail_data.introduce.substring(0,30)
                    const introduce = bandinfo.replace(/[\r\n]/g, "")
                    console.log(introduce)
                    let url = this.ip +'weChat/share-public-parameter'
                    let param = new URLSearchParams()
                    param.append("url", location)
                    axios.post(url,param).then((res)=>{
                        this.wechatSharedata = res.data.data
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: this.wechatSharedata.appId, // 必填，公众号的唯一标识
                            timestamp: this.wechatSharedata.timestamp, // 必填，生成签名的时间戳
                            nonceStr: this.wechatSharedata.nonceStr, // 必填，生成签名的随机串
                            signature: this.wechatSharedata.signature,// 必填，签名，见附录1
                            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            
                        });
                        
                        

                        window.share_config = {
                            'share': {
                                'imgUrl': this.course_detail_data.storeAddrInfoDto.logo, // 这里是需要展示的图标
                                'desc': introduce, // 这是分享展示的摘要
                                'title': this.course_detail_data.courseTitle, // 这是分享展示卡片的标题
                                'link': window.location.href, // 这里是分享的网址
                                'success': function(rr) {
                                    //console.log('成功' + JSON.stringify(rr))
                                },
                                'cancel': function(tt) {
                                    //console.log('失败' + JSON.stringify(tt));
                                }
                            }
                        };
                        wx.ready(function() {
                            wx.onMenuShareAppMessage(share_config.share); // 微信好友
                            wx.onMenuShareTimeline(share_config.share); // 微信朋友圈
                        });
                    
                    })
                },100)
            
            
            

        }
        
    },
    mounted(){
        // this.linkIos()
        setTimeout(()=>{
            this.swipSpan()
            
        },100)
        var height = setInterval(()=>{
            if(this.infoHeight){
                clearInterval(height)
            }else{
                this.cacuLines()
            }
        },100)
        
        
    },
    beforeMount(){
        this.getCourseData()
        
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams 
        // this.getCourseId()
        
        this.isApp()

    }
}


</script>

<style scoped>
@import url(../../../public/reset.css);
@import url(../../css/goodclass/classdetail.css);
</style>>
    
