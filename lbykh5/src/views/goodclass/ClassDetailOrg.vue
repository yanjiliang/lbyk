<template>
    <div class="classdetailOrg">
        
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
                        <p>{{course_detail_data.distance}}</p>
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

            <div class="class_status">
                <!-- 根据课程状态显示 -->
                <div class="noclass" v-show="changeWord">
                    <div class="noclass_icon">
                        <img src="../../images/GoodClass/hot2x.png" alt="icon图片">
                    </div>
                    <div class="noclass_info">
                        <p>火热招生中</p>
                        <p>精心编写的内容更加容易带来成交哦</p>
                    </div>
                </div>

                <div class="noclass" v-show="!changeWord">
                    <div class="noclass_icon">
                        <img src="../../images/GoodClass/offshelf2x.png" alt="icon图片">
                    </div>
                    <div class="noclass_info">
                        <p>课程已下架</p>
                        <p>下架后，用户将无法查看本课程信息</p>
                    </div>
                </div>
            </div>

            <!-- 课程介绍 -->
            <div class="bandstory">
                <div class="bandtitle">
                    <p>课程介绍</p>
                    <a href="" @click.prevent="pre_edit_page('KCJSBJ',cd_token)">编辑</a>
                </div>
                <div class="bandinfo">
                    <p  ref="bandinfo">{{course_detail_data.introduce}}</p>

                </div>
            </div>
            
            <!-- 授课老师 -->
            <div class="classteacher">
                
                <div class="title">
                    <p>授课老师</p>
                    <a href="" @click.prevent="pre_edit_page('BJLS',cd_token)">编辑/添加</a>
                </div>
                <div class="noclass" v-if="course_detail_data.teacherInfoDtoList.length == 0">
                    <div class="noclass_icon">
                        <img src="../../images/GoodClass/orgindex/通用-线2@2x.png" alt="icon图片">
                    </div>
                    <div class="noclass_info">
                        <p>未添加授课老师</p>
                        <p>授课老师展示是机构品牌构建的重要部分</p>
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
                    <a @click.prevent="cdo_skipe_orgindex('MDZY')">进店逛逛</a>
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
                                <!-- <p>{{course_detail_data.detailedAddr}}</p> -->
                                <p>{{course_detail_data.storeAddrInfoDto.buildingName}}-{{course_detail_data.storeAddrInfoDto.detailedAddr}}</p>
                            </div>
                            <div> 
                                <a @click.prevent="ClickTo('COPY',course_detail_data.storeAddrInfoDto.addrInfo)">复制地址</a> 
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

        <div style="height:95px"></div>
        <div class="orderbtn">
            <p @click="pre_edit_page('KCBJ',cd_token)">编辑</p>
            <p v-if="changeWord" @click="lowerShelf(cd_storeid,cd_courseid,cd_cuid,cd_token)">下架课程</p>
            <p v-if="!changeWord" @click="uperShelf(cd_storeid,cd_courseid,cd_cuid,cd_token)">开放招生</p>
        </div>

        
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

import { Toast, Dialog  } from 'vant';

import BScroll from 'better-scroll'

import Orderinfo from '../../components/OrderInfo'
    export default {
        name: 'classdetailOrg',
        components:{
            Orderinfo
        },
        data() {
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
                
                classdetail_timer:null,
                h5orapp:'h5',//环境判断
                cd_vercode:'',//验证码
                // cd_studentName:'',//人名
                cd_phone:'',//电话
                cd_courseid:'',//课程ID
                cd_cuid:'',//cuid
                cd_storeid:'',
                cd_token:'',
                resStatus:'',
                resMsg:'',
                
                amapManager,
                mapEvents:{
                    init(o){
                        o.setMapStyle('amap://styles/3b109f482a6a20c90af28596a8015fe5')
                    }
                },
                dragEnable:false,
                zoomEnable:false,
                touchZoom:false,
                res_result:'',
                changeWord:Boolean,
                age:'',
                classHourUnit:'',
                classTimeUnit:'',
                spans:Object,
                pre_index:0,
                pre_show:false
            }
        },
        methods: {
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
            console.log(tagsbox)
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
            showPopup : function (){
                //控制弹出页面的显示隐藏
                this.ordershow = true
            },
            
            getCourseData(courseId,cuid,storeId,token){
                
                var url = this.ip + 'course/preview';
                let param = new URLSearchParams()
                param.append("courseId", courseId)
                param.append("cuid", cuid)
                param.append("storeId", storeId)
                param.append("userToken", token)
                axios.post(url,param).then((res)=>{
                    this.course_detail_data = res.data.data
                    this.imagelist = this.course_detail_data.picList
                    let loca = this.course_detail_data.storeAddrInfoDto
                    this.center = [loca.longitude,loca.latitude]
                    this.cd_storeid = this.course_detail_data.storeId
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

                    if(this.course_detail_data.status == 'uperShelf'){
                        this.changeWord = true
                    }else if(this.course_detail_data.status == 'lowerShelf'){
                        this.changeWord = false               
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
                    // const strr = JSON.stringify(str)
                    const content = str.replace(/[\r\n]/g, "")
                    // const bb = content.replace(" ","")
                    // Toast(content)
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
                    this.cd_cuid = msg.cuid
                    this.cd_token = msg.token
                    this.cd_storeid = msg.storeId
                    this.getCourseData(msg.courseId,msg.cuid,msg.storeId,msg.token)
                    
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
                this.cd_token = qury.data.token
                this.cd_storeid = qury.data.storeId
                this.getCourseData(qury.data.courseId,qury.data.cuid,qury.data.storeId,qury.data.token)
                    //解析传进来的json
                    //给本地变量赋值，并判断经纬度是否为空，为空显示
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
            pre_edit_page(qury,token){
              
            
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}');
                }
                if (this.device === 'ios') { 
                    if(token == ''){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else{
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","jump":"true","storeId":"'+this.cd_storeid+'","courseId":"'+this.cd_courseid+'"}')
                    }
            　　　　

                    
                }
            },
            
            cdo_skipe_orgindex (qury){
                //跳转机构主页
               
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/OrgIndexMana","title":"机构主页","storeId":"'+this.cd_storeid+'"}');
                }
                if (this.device === 'ios') { 
                    
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/OrgIndexMana","title":"机构主页","jump":"true","storeId":"'+this.cd_storeid+'"}')
                }
            },
            lowerShelf(storeId,courseId,cuid,token){
                let url = this.ip + 'course/lowerShelf';
                //?storeId=' +storeId+ '&courseId=' + courseId
                let param = new URLSearchParams()
                param.append("courseId", courseId)
                param.append("cuid", cuid)
                param.append("storeId", storeId)
                param.append("userToken", token)
                axios.post(url,param).then((res)=>{
                    let msg = res.data
                    this.res_result = msg.result
                    Dialog.confirm({
                        message: '是否确认下架?',
                        confirmButtonColor:"#ff444b",
                        cancelButtonColor:"#9b9b9b",
                        }).then(() => {
                        // on close
                        this.changeWord = false
                        this.$nextTick(()=>{
                            Toast.success('操作成功')
                            this.getCourseData(this.cd_courseid,this.cd_cuid,this.cd_storeid,this.token)
                            window.location.reload()
                            //window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"FRESH"}')
                        })
                        }).catch(() => {
                        // on cancel
                        });
                    
                    
                     
                })
            },
            uperShelf(storeId,courseId,cuid,token){
                let url = this.ip + 'course/upperShelf';
                //?storeId=' +storeId+ '&courseId=' + courseId
                let param = new URLSearchParams()
                param.append("courseId", courseId)
                param.append("cuid", cuid)
                param.append("storeId", storeId)
                param.append("userToken", token)
                axios.post(url,param).then((res)=>{
                    let msg = res.data
                    this.res_result = msg.result
                    Dialog.confirm({
                        message: '是否确认上架？',
                        confirmButtonColor:"#ff444b",
                        cancelButtonColor:"#9b9b9b",
                        }).then(() => {
                        // on close
                        
                        this.$nextTick(()=>{
                            Toast.success('操作成功')
                            this.changeWord = true
                            this.getCourseData(this.cd_courseid,this.cd_cuid,this.cd_storeid,this.token)
                            window.location.reload()
                            //window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"FRESH"}')
                        })
                        });
                    
                    
                })
            }
        },
        mounted(){
            setTimeout(()=>{
                this.swipSpan()
            },100)
            this.linkIos()
            
            
        },
        beforeMount(){
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams 
            window.getShareParams = this.getShareParams
            this.getCourseId()
            this.isApp()
        }
    }
</script>

<style scoped>
    @import url(../../../public/reset.css);
    @import url(../../css/goodclass/classdetailOrg.css);
    @import url(../../css/goodclass/classdetail.css);
</style>>