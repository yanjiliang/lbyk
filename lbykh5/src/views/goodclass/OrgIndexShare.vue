<template v-slot:loading>
    <div class="orgindex">
        <div class="container">
            <div class="mapbox">
                <div class="map-mask"></div>
                <el-amap
                    class="map"
                    :dragEnable='dragEnable' 
                    :zoomEnable='zoomEnable' 
                    :touchZoom='touchZoom' 
                    :zoom='zoom' 
                    :center='center' 
                    :amap-manager='amapManager' 
                    :events="mapEvents"
                    >
                    <el-amap-marker 
                        :offset='offset'
                        :icon='icon'
                        animation='AMAP_ANIMATION_DROP'
                    ></el-amap-marker>
                </el-amap>
        
                <div class="topbox">
                    <div class="category">
                        <p>{{orgindexData.categoryList.join(' · ')}}</p>
                    </div>
                    <div class="orgheadbox">
                        <div class="orgheadtop">
                            <div class="logo"><img :src=" orgindexData.logo " :onerror="defaultImg"></div>
                            <div class="title">{{ orgindexData.storeName }}</div>
                        </div>


                        <!-- 滑动图 -->
                        <div class="orgpicbox" ref="orgpicbox">
                            <div id="slider" class="piclist" ref="piclist">
                                <img v-for="(src,index) in imglist" :src="src" :key="index" @click="preClick(index)">
                            </div>
                        </div>

                        <van-image-preview v-model="pre_show" :images="imglist" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                            <template v-slot:index></template>
                        </van-image-preview>
                    </div>
                    <div class="orglocationbox">
                        <div class="orglocationleft">
                            <div>
                                <p class="icon"><img src="@/images/GoodClass/orgindex/locaicon2x.png" alt=""></p>
                                <p class="locainfo">{{ orgindexData.area }}</p>
                                <p class="distance"><span>{{ orgindexData.distance }}</span></p>
                            </div>
                            <div>
                                <p>{{ orgindexData.buildingName }}{{ orgindexData.detailedAddr }}</p>
                            </div>
                        </div>
                        <div class="orglocationright">
                            <div class="icon" @click="ClickTo('LXJG')">
                                <a :href="'tel:'+orgindexData.servicePhone">
                                    <img src="@/images/GoodClass/orgindex/phone2x.png" alt="">
                                </a>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 精品好课 -->
            <div class="classlistbox">
                
                <div class="title">
                    <p>精品好课</p>
                    <!-- <p>{{org_index_userInfo}}</p> -->
                </div>
                <!-- <p>{{orgindexData.qualityCourseList}}</p> -->                                                                                                         
                <!-- 没有课程时的展示，通过数据的有无来控制显示隐藏 -->
                <div class="noclass" v-if="orgindexData.qualityCourseList.length == 0">
                    
                    <div class="noclass_icon">
                        <img src="../../images/GoodClass/orgindex/通用-线2@2x.png" alt="icon图片">
                    </div>
                    <div class="noclass_info">
                        <p style="font-size:0.373333rem;
                            font-weight:400;
                            line-height:0.53333rem;
                            color:#E4EEEE;
                            opacity:1;"
                            >暂未发布课程</p>
                    </div>
                </div>
               
                <a :href="Url+'/ClassDetailShare?courseId='+orgindexData.qualityCourseList[index].courseId"  v-for="(item,index) in orgindexData.qualityCourseList" :key="index" >
                    <div class="list">
                        <div class="left">
                            <img :src="item.mainPic" :onerror="defaultImg" >
                        </div>
                        <div class="right">
                            <div class="title2">
                                <p>{{ item.courseTitle }}</p>
                            </div>
                            <div class="tags">
                                <span>{{item.categoryName}}</span>
                                <span>{{age[index]}}</span>
                                <span>{{item.classHourNum}}节课</span>
                            </div>
                            <div class="price">
                                <span><i>￥</i>{{item.sellingPrice}}</span><span>￥{{item.tagPrice}}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            
            
            <!-- 师资力量 -->
            <div class="box" v-if="orgindexData.teacherInfoDtoList.length != 0">
                <div class="classteacher">
                <div class="title">
                    <p>师资力量</p>
                    <a href="" class="a_showall" v-if="orgindexData.teacherInfoDtoList.length <= 3 ? false : true">查看全部({{orgindexData.teacherInfoDtoList.length}})</a>
                    
                </div>

                <div class="noclass" v-if="orgindexData.teacherInfoDtoList.length == 0">
                    
                    <div class="noclass_icon">
                        <img src="@/images/GoodClass/orgindex/通用-线2@2x.png" alt="icon图片">
                    </div>
                    <div class="noclass_info">
                        <p style="font-size:0.373333rem;
                            font-weight:400;
                            line-height:0.53333rem;
                            color:#E4EEEE;
                            opacity:1;"
                            >未设置师资力量</p>
                    </div>
                </div>
                <div class="teacherlist">
                    <ul>
                        <li v-for="(item1,index) in orgindexData.teacherInfoDtoList" :key="index">
                            <div class="teacherpic">
                                <img class="pic" id="avatar" :src="item1.avatar" v-if="item1.avatar" />
                                <p v-if="!item1.avatar">{{item1.name.substring(item1.name.length-2)}}</p>
                            </div>
                            <div class="teacherinfo">
                                <div class="teachername">
                                    <span>{{item1.name}}</span><span>{{item1.teachAge}}教龄</span>
                                </div>
                                <div class="motto">{{item1.teachingSlogan}}</div>
                                <div class="teachertag" ref="tagsbox" id="tagsbox">
                                    <div class="tag" ref="tags" id="tags">

                                        <span v-for="(item2,index) in item1.labelList" :key="index">{{item2}}</span>
                                        
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
                </div>
            </div>
            
            <!-- 品牌故事 -->
            <div class="box">
                <div class="bandstory" v-if="orgindexData.introduce">
                    <div class="bandtitle">
                        <p>品牌故事</p>
                        
                    </div>
                    <div class="noclass" v-if="!orgindexData.introduce">
                        
                        <div class="noclass_icon">
                            <img src="@/images/GoodClass/orgindex/通用-线2@2x.png" alt="icon图片">
                        </div>
                        <div class="noclass_info">
                            <p style="font-size:0.373333rem;
                            font-weight:400;
                            line-height:0.53333rem;
                            color:#E4EEEE;
                            opacity:1;"
                            >未填写机构介绍</p>
                        </div>
                    </div>
                    <div class="bandinfo" v-if="orgindexData.introduce">
                        <p id="orgindex_bandinfo" ref="bandinfo">{{orgindexData.introduce}}</p>
                        <!-- <p>{{orgindex_data.introduce}}</p> -->
                        <p @click="clickTofold()" v-if="showFold"><span>查看全部</span><i><img src="../../assets/images/返回5@2x.png" alt=""></i></p>
                    </div>
                </div>
            </div>
        </div>
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
import { AMapManager } from 'vue-amap'
let amapManager = new VueAMap.AMapManager();

const axios = require('axios')

import BScroll from 'better-scroll'
import { Toast } from 'vant';
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);

export default {
    name:'orgindex',
    data (){
        return {
            ip: this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            defaultImg: 'this.src="' + require('../../assets/images/default.png') + '"',
            icon:require('../../images/GoodClass/mapicon.png'),
            orgindexData: {},
            zoom:18,
            amapManager,
            center:[113.922241,22.517374],
            mapEvents:{
                init(o){
                    o.setMapStyle('amap://styles/3b109f482a6a20c90af28596a8015fe5')
                }
            },
            dragEnable:false,
            zoomEnable:false,
            touchZoom:false,
            imglist:[],
            showFold:false,
            org_index_userInfo:'',//缓存ios传来的数据
            org_index_phone:'',//机构服务电话
            org_index_course:'',
            lng:'',
            lat:'',
            androidparams:'',
            offset:[0,-100],
            h5orapp:'h5',
            urls:[],
            age:[],
            spans:[],
            wechatSharedata:'',
            bb:'',
            pre_index:0,
            pre_show:false
        }
    },
    beforeMount() {
        this.getH5Data()
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams
        
        // this.getData('','','STORE_KViD2PJ948G2eV0Agt2')
        
    },
    mounted (){
        setTimeout(()=>{
            this.swipSpan()
        },100)
        this.linkIos()
        this.initBandinfo()
        
    },
    methods:{
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
        swipSpan (){
            // const tags = document.getElementById('tags')
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
        Bscroll (){
            let width = this.imglist.length * 135   
            this.$nextTick(()=>{
                this.$refs.piclist.style.width = width +'px'
                if(!this.scroll){
                    this.scroll = new  BScroll(this.$refs.orgpicbox,{
                        startX:0,
                        click:true,
                        scrollX:true,
                        scrollY:false,
                        eventPassthrough:'vertical',
                    })
                }else {
                    this.scroll.refresh()
                }
                
            })
        },
            //  以上是 banner图滑动
            //  下面是请求数据
        getH5Data (){

            let url = window.location
            let qurys = url.search.substring(1)
            let qurylist = qurys.split("&")
            for(var i =0; i< qurylist.length;i++){
                this.urls.push(qurylist[i].split("=")[1])
            }
            this.courseId = this.urls[0]
            
            let url1 = this.ip + 'store/homepage?storeId=' + this.urls[0] ;
            axios.post(url1).then((res) =>{
                this.orgindexData = res.data.data
                this.spans = this.orgindexData.teacherInfoDtoList
                this.org_index_phone = this.orgindexData.servicePhone
                this.org_index_course = this.orgindexData.qualityCourseList
                this.imglist = this.orgindexData.picList.reverse()
                this.center = [this.orgindexData.longitude,this.orgindexData.latitude]
                this.Bscroll()

                
                this.getWechatShare()
                // this.aa = this.imglist.length
                for(let i = 0; i< this.orgindexData.qualityCourseList.length;i++){
                    if(this.orgindexData.qualityCourseList[i].minAge == 0 && this.orgindexData.qualityCourseList[i].maxAge == 60){
                        this.age[i] = '不限年龄'
                    }else if(this.orgindexData.qualityCourseList[i].minAge == 0 && this.orgindexData.qualityCourseList[i].maxAge != 60){
                        this.age[i] = this.orgindexData.qualityCourseList[i].maxAge +'岁以下'
                    }else if(this.orgindexData.qualityCourseList[i].minAge != 0 && this.orgindexData.qualityCourseList[i].maxAge != 60){
                        this.age[i] = this.orgindexData.qualityCourseList[i].minAge + '-' +this.orgindexData.qualityCourseList[i].maxAge +'岁'
                    }else if(this.orgindexData.qualityCourseList[i].minAge != 0 && this.orgindexData.qualityCourseList[i].maxAge == 60){
                        this.age[i] = this.orgindexData.qualityCourseList[i].minAge  +'岁以上'
                    }
                }
            }).catch(()=>{
                
            })
        },
        
        getData (lnt,lat,storeId){
            let url = this.ip + 'store/homepage?longitude=' + lnt + '&latitude=' + lat + '&storeId=' + storeId ;
            axios.post(url).then((res) =>{
                this.orgindexData = res.data.data
                if(res.data.result == 'error'){
                    Toast({duration:0,message:res.data.msg})
                }
                this.spans = this.orgindexData.teacherInfoDtoList
                this.org_index_phone = this.orgindexData.servicePhone
                this.org_index_course = this.orgindexData.qualityCourseList
                this.imglist = this.orgindexData.picList
                
                this.Bscroll()
                // this.aa = this.imglist.length
                
            }).catch(()=>{
                
            })
        },
        clickTofold(){
            this.$refs.bandinfo.classList.remove('fold')
            this.showFold = false
            console.log(this.$refs.bandinfo)

        },
        initBandinfo(){
            // console.log(this.$refs.bandinfo.offsetHeight)
            console.log(this.zoom)
            this.$nextTick(()=>{
                console.log(document.getElementById('orgindex_bandinfo'))
            })
            
        },
        McDispatcher : function (qury){
            this.org_index_userInfo = qury
            this.lat = qury.data.latitude
            this.lng =qury.data.longitude
            this.getData(qury.data.longitude,qury.data.latitude,qury.data.storeId)
        },
        linkIos : function (){
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        ClickTo : function (qury){//联系机构
          
            if (this.device === 'android') {
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.msg_storeid+'","classId":"'+this.msg_classid+'","Phonenumber":"'+this.org_index_phone+'","studentId":"'+this.msg_studentid+'"}');
            }
            if (this.device === 'ios') { 
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.msg_storeid+'","classId":"'+this.msg_classid+'","Phonenumber":"'+this.org_index_phone+'","studentId":"'+this.msg_studentid+'"}')
            }
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写 
        },
        
        getParams(msg){
            //拿到安卓拿来的数据
            // {"latitude":"22.536510","longitude":"113.906108","storeId":"STORE_KViD2PJ948G2eV0Agt2"}
            this.androidparams = msg
            this.lat = msg.latitude
            this.lng = msg.longitude
            this.getData(msg.longitude,msg.latitude,msg.storeId)
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
        getWechatShare(){
                setTimeout(()=>{
                    const location = window.location.href
                    console.log(location)
                    
                    const introduce = '位于'+this.orgindexData.area+'，主营教学科目为'+this.orgindexData.categoryList.join(' · ')+',点击了解更多'
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
                                'imgUrl': this.orgindexData.logo, // 这里是需要展示的图标
                                'desc': introduce, // 这是分享展示的摘要
                                'title': this.orgindexData.storeName, // 这是分享展示卡片的标题
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
    

    
}
</script>
<style scoped>
    @import url(../../../public/reset.css);
    @import url(../../css/goodclass/OrgIndex.css);
</style>