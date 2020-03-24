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
                                <img src="@/images/GoodClass/orgindex/phone2x.png" alt="">
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 精品好课 -->
            <div class="classlistbox">
                
                <div class="title">
                    <p>精品好课</p>
                    <a href="" v-if="openStatus == true && effective == true" @click.prevent="ClickTo('KSFB')">发布课程</a>
                </div>
                <!-- <p>{{orgindexData.qualityCourseList}}</p> -->                                                                                                         
                <!-- 没有课程时的展示，通过数据的有无来控制显示隐藏 -->
                <div class="noclass" v-if="orgindexData.qualityCourseList.length == 0">
                    <div class="noclass_icon">
                        <img src="../../images/GoodClass/orgindex/通用-线2@2x.png" alt="icon图片">
                    </div>
                    <div class="noclass_info">
                        <p>暂未发布课程</p>
                        <p>马上发布，拥抱周边3公里优质生源</p>
                    </div>
                </div>
                
                <div class="list" v-for="(item,index) in orgindexData.qualityCourseList" :key="index" @click="oi_skipe_page(index)">
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
            </div>

            <!-- <p>{{aa}}</p> -->
            
            <!-- 师资力量 -->
            <div class="box">
                <div class="classteacher">
                <div class="title">
                    <p>师资力量</p>
                    <a href="" class="a_showall" v-if="orgindexData.teacherInfoDtoList.length <= 3 ? false : true">查看全部({{orgindexData.teacherInfoDtoList.length}})</a>
                    <a href="" class="a_edit" v-if="orgindexData.teacherInfoDtoList" @click.prevent="ClickTo('SKLSBJ')">编辑/添加</a>
                </div>

                <div class="noclass" v-if="orgindexData.teacherInfoDtoList.length == 0">
                    <div class="noclass_icon">
                        <img src="@/images/GoodClass/orgindex/通用-线2@2x.png" alt="icon图片">
                    </div>
                    <div class="noclass_info">
                        <p>未设置师资力量</p>
                        <p>师资力量展示是机构品牌构建的重要部分</p>
                    </div>
                </div>

                <div class="teacherlist" v-if="orgindexData.teacherInfoDtoList.length != 0">
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
                <div class="bandstory">
                    <div class="bandtitle">
                        <p>品牌故事</p>
                        <a @click.prevent="ClickTo('BJJS')">编辑</a>
                    </div>
                    
                    <div class="noclass" v-if="!orgindexData.introduce">
                        <div class="noclass_icon">
                            <img src="@/images/GoodClass/orgindex/通用-线2@2x.png" alt="icon图片">
                        </div>
                        <div class="noclass_info">
                            <p>未填写机构介绍</p>
                            <p>完善机构介绍更吸引用户哦</p>
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

<script>
// 高德地图
import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key:'84c53b5ca56eaf061dd6cee8a2b9eb51',
  plugin:['AMap.Autocomplete','AMap.PlaceSearch','AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
})

let amapManager = new VueAMap.AMapManager();

const axios = require('axios')

import BScroll from 'better-scroll'
import {Toast,Notify} from 'vant'

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
            res_result:'',
            org_storeId:'',
            openStatus:Boolean,
            effective:Boolean,
            age:[],
            spans:Object,
            pre_index:0,
            pre_show:false,
            aa:''
        }
    },
    beforeMount() {
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams
        window.getShareParams = this.getShareParams
    },
    mounted (){
        setTimeout(()=>{
            this.swipSpan()
        },100)
        this.linkIos()
        
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
                console.log(this.$refs.piclist.style.width)
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
        getData (lnt,lat,cuid,storeId){
            
            let url = this.ip + 'store/homepage';
            let param = new URLSearchParams()
            param.append("longitude", lnt)
            param.append("latitude", lat)
            param.append("cuid", cuid)
            param.append("storeId", storeId)
            axios.post(url,param).then((res) =>{
                
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
                    if(this.device == 'android'){
                        window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else if(this.device == 'ios'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                }else if(res.data.result == 'success'){
                    this.orgindexData = res.data.data
                    this.org_index_phone = this.orgindexData.servicePhone
                    this.org_index_course = this.orgindexData.qualityCourseList
                    this.imglist = this.orgindexData.picList.reverse()
                    this.center = [this.orgindexData.longitude,this.orgindexData.latitude]
                    this.spans = this.orgindexData.teacherInfoDtoList 
                    this.Bscroll()
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
                }

                
            }).catch(()=>{
                
            })
        },
        clickTofold(){
            this.$refs.bandinfo.classList.remove('fold')
            this.showFold = false
            console.log(this.$refs.bandinfo)

        },
        
        McDispatcher : function (qury){
            if(qury.type == 'share'){
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "SHARE","title":"'+this.orgindexData.storeName+'","content":"位于'+this.orgindexData.area+'，主营教学科目为'+this.orgindexData.categoryList.join(' · ')+',点击了解更多","logo":"'+this.orgindexData.logo+'"}')
            }
            this.org_index_userInfo = qury
            this.lat = qury.data.latitude
            this.lng = qury.data.longitude
            this.org_storeId = qury.data.storeId
            this.token = qury.data.token
            this.cuid = qury.data.cuid
            this.getData(qury.data.longitude,qury.data.latitude,qury.data.cuid,qury.data.storeId)
            this.getFuctionInfo(qury.data.cuid,qury.data.storeId,qury.data.token)
        },
        linkIos : function (){
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        ClickTo : function (qury){//联系机构
            
            if (this.device == 'android') {
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.org_storeId+'","Phonenumber":"'+this.org_index_phone+'"}');
            }
            if (this.device == 'ios') { 
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.org_storeId+'","Phonenumber":"'+this.org_index_phone+'"}')
            }
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写 
        },
        oi_skipe_page (index){
                //跳转页面
                
                if (this.device == 'android') {
                    window.android.SkipPage('{"linkType": "app","url": "'+this.Url+'/ClassDetailOrg","title":"课程详情","scheme":"ZSKCXQ","courseId":"'+this.orgindexData.qualityCourseList[index].courseId+'","storeId":"'+this.org_storeId+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}');
                    
                }
                if (this.device == 'ios') { 
                    //jump  取值为true为跳新页面打开，false为当前页面打开
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","url": "'+this.Url+'/ClassDetailOrg","title":"课程详情","scheme":"KCXQ","courseId":"'+this.orgindexData.qualityCourseList[index].courseId+'","storeId":"'+this.org_storeId+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}')
                }
            },
        getParams(msg){
            //拿到安卓拿来的数据
           

            this.androidparams = msg
            this.lat = msg.latitude
            this.lng = msg.longitude
            this.token = msg.token
            this.cuid = msg.cuid
            this.org_storeId = msg.storeId
            this.getData(msg.longitude,msg.latitude,msg.cuid,msg.storeId)
            this.getFuctionInfo(msg.cuid,msg.storeId,msg.token)
        },
        getShareParams(msg){
            if(msg.type == 'share'){
                window.android.SkipPage('{"linkType":"app","scheme": "SHARE","type":"ORGIN","title":"'+this.orgindexData.storeName+'","content":"位于'+this.orgindexData.area+'，主营教学科目为'+this.orgindexData.categoryList.join(' · ')+',点击了解更多","logo":"'+this.orgindexData.logo+'","storeId":"'+this.org_storeId+'"}')
            }
        },
        getFuctionInfo(cuid,storeId,token){

        
            let url = this.ip + 'storeFunctional/checkOpening';
            //?cuid=' + cuid1+'&storeId='+storeId+'&functional=RecruitStudents'
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("storeId", storeId)
            param.append("functional", "MarketingService")
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'noLogin'){
                    if(this.device == 'android'){
                        window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else if(this.device == 'ios'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                }
                let qury = res.data
                this.openStatus = qury.data.openStatus //功能是否开启
                this.effective = qury.data.effective //功能是否有效
            }).catch(()=>{

            })
        },
       

    },
    

    
}
</script>
<style scoped>
    @import url(../../../public/reset.css);
    @import url(../../css/goodclass/OrgIndex.css);
</style>