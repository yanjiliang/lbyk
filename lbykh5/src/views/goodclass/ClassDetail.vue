<template>
    <div class="classdetail">
        
       

        <div class="detailinfobox">
             <!-- 轮播图 -->
            <van-swipe :autoplay="4000" class="swipebox" :show-indicators='false' @change="indicateIndex" >
                <van-swipe-item class="swipeitem" v-for="(item, index) in imagelist" :key="index" >
                    <img v-lazy="item" @click="preClick(index)"/>
                </van-swipe-item>
            </van-swipe>

            <div class="indicater" >
                <span id="indicate" v-for="(item,index) in imagelist" ref="ind" :key="index"></span>
            </div>

            <van-image-preview v-model="pre_show" :images="imagelist" :show-index='true' @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                <template v-slot:pre_index></template>
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
                        <p>{{course_detail_data.distance}}</p>
                    
                    </div>
                </div>
            </div>
        </div>

        <!-- <p>{{imagelist}}</p> -->

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

            
            <!-- 课程介绍 -->
            <div class="bandstory" v-if="course_detail_data.introduce.length">
                <div class="bandtitle">
                    <p>课程介绍</p>
                </div>
                
                <div class="bandinfo">
                    <p class="fold" ref="bandinfo" id="info">{{course_detail_data.introduce}}</p>
                    <!-- <p>{{orgindex_data.introduce}}</p> -->
                    <p @click="clickTofold()" v-if="infoHeight/23 >= 7 ? true : false"><span v-if="showFold">查看全部</span><i v-if="showFold"><img src="../../assets/images/返回5@2x.png" alt=""></i></p>
                </div>
            </div>
            
            <!-- 授课老师 -->
            <div class="classteacher" v-if="course_detail_data.teacherInfoDtoList.length != 0">
                <div class="title">
                    <p>授课老师</p>
                    <a @click.prevent="cd_skipe_teacher()" v-if="course_detail_data.teacherInfoDtoList.length <=3 ? false : true ">查看全部({{course_detail_data.teacherInfoDtoList.length}})</a>
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
                    <a @click.prevent="cd_skipe_orgindex('JGZY')">进店逛逛</a>
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
                                <a @click.prevent="ClickTo('COPY',course_detail_data.storeAddrInfoDto.buildingName+course_detail_data.storeAddrInfoDto.detailedAddr)">复制地址</a> 
                            </div> 
                        </div> 
                        
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

        </div>
        <!-- 预约须知 start -->
        <Orderinfo/>
        <!-- 预约须知 end-->
        <div style="height:85px"></div>
        <div class="orderbtn">
                <p @click="showPopup(token)">立即预约</p>
        </div>

    <van-popup 
        class="pup"
        v-model="ordershow"
        closeable
        round
        position='bottom'
        overlay:false
        safe-area-inset-bottom:true
        >
            
            <div class="pupbox">
                <div class="title">
                    <p>预约课程</p>
                    <p>请填写预约信息，我们将尽快联系您</p>
                </div>
                <div class="studentname">
                    <p>学员姓名</p>
                    <input type="text" name="username" id="username" @blur="reCover()" placeholder="请输入学员姓名">
                </div>
                
                <div style="display:flex;align-items: center">
                    <p style="height:14px;line-height:14px"><img style="width:14px;height:14px" src="../../images/GoodClass/保护@2x.png" alt=""></p>
                    <p style="color:#4DC9BD;font-size:14px;line-height:20px;height:20px">无强行推销，不泄露用户信息，请放心填写</p>
                </div>
                <div class="yesbtn">
                    <p @click="toOrder(cd_cuid,cd_courseid,token)">确认预约</p>
                </div>
            </div>
    </van-popup>
    </div>
    
</template>

<script>
// 高德地图
import Vue from 'vue'
import VueAMap from 'vue-amap'
setTimeout(()=>{
    localStorage.clear()
    Vue.use(VueAMap)
},0)

VueAMap.initAMapApiLoader({
  key:'84c53b5ca56eaf061dd6cee8a2b9eb51',
  plugin:['AMap.Autocomplete','AMap.OverView','AMap.MapType'],
})
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager();
const axios = require('axios')
import {Toast,Notify } from 'vant';

import BScroll from 'better-scroll'
// import {store} from '../../../store/index'
import Orderinfo from '../../components/OrderInfo'
export default {
    name:'classdetail',
    components:{
        Orderinfo
    },
    data (){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            defaultImg: 'this.src="' + require('../../assets/images/default.png') + '"',
            icon:require('../../images/GoodClass/mapicon.png'),
            imagelist: [],
            ordershow:false,
            sendCode:true,
            code_time:'',
            showFold:true,//
            // center:[113.922241,22.517374],//经纬度
            center:[],
            course_detail_data:Object,//存储课程数据
            zoom:18,
            classdetail_userInfo:'',//拿到参数
            cd_courseid:'',//课程ID
            classdetail_timer:null,
            h5orapp:'h5',//环境判断
            cd_vercode:'',//验证码
            // cd_studentName:'',//人名
            cd_phone:'',//电话
            cd_cuid:'',//cuid
            token:'',
            resStatus:'',
            resMsg:'',
            cd_storeid:'',
            amapManager,
            mapEvents:{
                init(o){
                    o.setMapStyle('amap://styles/3b109f482a6a20c90af28596a8015fe5')
                }
            },
            dragEnable:false,
            zoomEnable:false,
            touchZoom:false,
            userAgent:'',
            res_result:'',
            age:'',
            classHourUnit:'',
            classTimeUnit:'',
            bb:'',
            infoHeight:'',
            spans:Object,
            pre_index:0,
            pre_show:false
        }
    },
    
    methods:{
        
        indicateIndex(index){
            const that = this
            that.pre_index = index
            const span = that.$refs.ind
            
            for(let i=0;i<that.imagelist.length;i++){
                if(i == index){
                    span[i].classList.add("change")
                }else{
                    span[i].classList.remove("change")
                }
            }
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
        swipSpan(){
            const tags = this.$refs.tags
            
            for(var i =0;i<this.spans.length;i++){
                let width = this.spans[i].labelList.length * 66  
                console.log(width)
                // document.getElementById('tags')[i].style.width= width + 'px'
                tags[i].style.width = width + 'px'
            }
            this.$nextTick(()=>{
                var tagsbox = document.getElementById('tagsbox')
                console.log(tagsbox)
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
        cacuLines(){
            let textHeight = document.getElementById('info').clientHeight
            this.infoHeight = textHeight
        },
        
        showPopup : function (token){
            //控制弹出页面的显示隐藏
            if(token == ''){
                if(this.device == 'android'){
                    Toast('未登陆，请登录后再预约！')
                }
                if(this.device == 'ios'){
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
            }else{
                this.ordershow = true
            }
        },
        getCode : function (){
            //获取验证码
            this.sendCode = false
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
                if(res.data.result == 'noLogin'){
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
            }).catch((err)=>{
                console.log(err)
            })

        },
        toOrder(cuid,courseId,token){
            let name = document.getElementById('username').value
            if(name == ""){
                Toast('姓名不能为空，请填入正确的姓名！')
            }else if(name.length <2){
                    Toast('名字不能小于两个字')
                }else if(name.length >8){
                    Toast('名字不能大于8个字')
                }else{
                    var nameReg = /^[\u4E00-\u9FA5]{2,8}$/;
                    if (!nameReg.test(name)) {
                        Toast('姓名格式不对哦，请填入真实姓名！')
                    }else{
                        let url = this.ip + 'course-appointment/add-app';
                        //?cuid=' + cd_cuid + '&courseId=' + cd_courseid + '&studentName=' + name
                        let param = new URLSearchParams()
                        param.append("courseId", courseId)
                        param.append("studentName", name)
                        param.append("cuid", cuid)
                        param.append("userToken", token)
                        axios.post(url,param).then((res)=>{
                            //响应码success/error
                            this.resMsg = res.data.msg
                            if(res.data.result == 'noLogin'){
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }
                            if(res.data.result == 'success'){
                                this.$router.push({path:'/OrderSuccessApp'})
                            }else if(res.data.result == 'noLogin'){ 
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }else if(res.data.result == 'error'){
                                if(res.data.msg === '课程已下架'){
                                    this.$router.push({ name:'OrderFaileApp',params:{ resmsg: this.resMsg }})
                                }else{
                                    Toast(res.data.msg)
                                }
                            }else{
                                Toast("预约失败，请稍后再试！")
                            }
                        })
                    }
                }
                
            
            
            },
            //进行预约结果页面展示
            
        
        getCourseData(courseId,lnt,lat,cuid,token){
            // var url = this.ip + 'course/details?courseId=' +courseid+ '&longitude=' +lnt+ '&latitude=' +lat;
            let param = new URLSearchParams()
            param.append("courseId", courseId)
            param.append("longitude", lnt)
            param.append("latitude", lat)
            param.append("cuid", cuid)
            param.append("userToken", token)
            
            let url = this.ip + 'course/details';
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'noLogin'){
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                if(res.data.result == 'noPrivileges'){
                    Toast({
                        message: res.data.msg,
                        overlay : true,
                        forbidClick:true,
                        duration:0
                    })
                    setTimeout(()=>{
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK"}')
                    },1500)
                }else if(res.data.result == 'noLogin'){
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }else if(res.data.result == 'success'){
                    this.course_detail_data = res.data.data
                   this.res_result = res.data.result //课程已下架的返回结果为false
                   this.res_msg = res.data.msg
                   if(this.res_result == 'error'){
                        this.$router.push({ name:'ClassSoldOutApp',params:{ resmsg: this.res_msg }})
                    }
                   this.imagelist = this.course_detail_data.picList
                   let loca = this.course_detail_data.storeAddrInfoDto
                   this.center = [loca.longitude,loca.latitude]
                   this.cd_storeid = this.course_detail_data.storeAddrInfoDto.storeId
                   this.spans = this.course_detail_data.teacherInfoDtoList
                    
                    this.course_detail_data.classHourUnit == 'section' ? this.classHourUnit = '节' : this.classHourUnit = '次'
                    //this.classTimeUnit= this.course_detail_data.classTimeUnit
                    if(this.course_detail_data.classTimeUnit == 'minute'){
                        this.classTimeUnit = '分钟'
                    }else if(this.course_detail_data.classTimeUnit == 'hour'){
                        this.classTimeUnit = '小时'
                    }else if(this.course_detail_data.classTimeUnit == 'day'){
                        this.classTimeUnit = '天'
                    }

                    if(this.course_detail_data.minAge == 0 && this.course_detail_data.maxAge == 60){
                        this.age = '不限年龄'
                    }else if(this.course_detail_data.minAge == 0 && this.course_detail_data.maxAge != 60){
                        this.age = this.course_detail_data.maxAge +'岁以下'
                    }else if(this.course_detail_data.minAge != 0 && this.course_detail_data.maxAge != 60){
                        this.age = this.course_detail_data.minAge + '-' +this.course_detail_data.maxAge +'岁'
                    }else if(this.course_detail_data.minAge != 0 && this.course_detail_data.maxAge == 60){
                        this.age = this.course_detail_data.minAge  +'岁以上'
                    }
                }
            })
        },
        
        clickTofold(){
            this.$refs.bandinfo.classList.remove('fold')
            this.showFold = false

        },
        initBandinfo(){
            // console.log(this.$refs.bandinfo.offsetHeight)
            let height = this.$refs.bandinfo.offsetHeight
            console.log(height)
            if(height < 168){
                this.showFold = false
            }
        },
        getShareParams(msg){
            if(msg.type == 'share'){
                const str = this.course_detail_data.introduce.substring(0,35)
                const content = str.replace(/[\r\n]/g, "")
                const aa = '{"linkType": "app","scheme": "SHARE","type":"COURSE","title":"'+this.course_detail_data.courseTitle+'","content":"'+content+'","logo":"'+this.imagelist[0]+'","courseId":"'+this.cd_courseid+'"}'
                window.android.SkipPage(aa)
            }
        },
        getParams(msg){
                //拿到安卓拿来的数据
                this.androidparams = msg
                this.lat = msg.latitude
                this.lng = msg.longitude
                this.cd_courseid = msg.courseId
                this.token = msg.token
                this.cd_cuid = msg.cuid
                this.$nextTick(()=>{
                    this.getCourseData(msg.courseId,msg.longitude,msg.latitude,msg.cuid,msg.token)
                })
            },
        McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
            if(qury.type == 'share'){
                const str = this.course_detail_data.introduce.substring(0,35)
                const content = str.replace(/[\r\n]/g, "")
                const aa = '{"linkType": "app","scheme": "SHARE","title":"'+this.course_detail_data.courseTitle+'","content":"'+content+'","logo":"'+this.imagelist[0]+'"}'
                window.webkit.messageHandlers.skipPage.postMessage(aa)
            }
            this.classdetail_userInfo = qury
            // this.lat = Object.prototype.toString.call(this.userInfo)
            this.lat = qury.data.latitude
            this.lng = qury.data.longitude
            this.cd_cuid = qury.data.cuid
            this.cd_courseid = qury.data.courseId
            this.token = qury.data.token
            this.center = '['+this.lng+','+this.lat+']'
            this.$nextTick(()=>{
                this.getCourseData(qury.data.courseId,qury.data.longitude,qury.data.latitude,qury.data.cuid,qury.data.token)
                
            })
            //this.getCourseData(this.userInfo.data.courseId,this.userInfo.data.longitude,this.userInfo.data.latitude)
                //解析传进来的json
                //给本地变量赋值，并判断经纬度是否为空，为空显示
            },
        isApp(){
                //this.h5orapp = navigator.userAgent.toLowerCase()
                let ua = navigator.userAgent.toLowerCase()
                this.userAgent = ua
                if(ua.indexOf('iphone') != -1 || ua.indexOf('android') != -1){
                    this.h5orapp = 'app'
                }else{
                    this.h5orapp = 'h5'
                }
            },
        linkIos : function (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('')
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
                    window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/teacher","title":"授课老师","scheme":"SKLS","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}');
                }
                if (this.device === 'ios') { 
                    
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/teacher","title":"授课老师","jump":"true","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}')
                }
            },
            reCover(){
                window.scroll(0,0)
            }
        
        },  
    mounted(){
        // this.initBandinfo()
        setTimeout(()=>{
            this.swipSpan()
            
        },100)
        this.$nextTick(()=>{
            document.getElementById('indicate')[0].classList.add("change")
        })
        var height = setInterval(()=>{
            if(this.infoHeight){
                clearInterval(height)
            }else{
                this.cacuLines()
            }
        },100)
        this.linkIos()
        
    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams 
        window.getShareParams = this.getShareParams
        this.isApp()
        this.getCourseId()
    },
    
}
</script>

<style scoped>
@import url(../../../public/reset.css);
@import url(../../css/goodclass/classdetail.css);

</style>>
    
