<template>
    <div class="goodclass">
        
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" class="swipebox" :stop-propagation='false'>
            <van-swipe-item class="swipeitem" v-for="(item, index) in imagelist" :key="index" @click="clicktoActivity(index)">
                <img :src="item.pic" />
            </van-swipe-item>
        </van-swipe>

        

        <div class="gcList">
            <p class="gcListitle" v-if="res_data">精选好课</p>

            <div class="listbox">
                <div class="nodatapic" v-if="res_data.count == '0'">
                    <img src="../../assets/images/nodata2x.png" alt="">
                    <p>暂无数据</p>
                </div>
                
                <waterfall style="background-color:#fff" :col='col' :width="itemWidth" :gutterWidth="gutterWidth" :data="data" v-if="res_data" @loadmore="loadmore">
                     
                    <template>
                        <div class="item" v-for="(item,index) in data" :key="index" @click="gc_skipe_page(index)">
                            
                                <div class="listpic">
                                    <img :src="item.mainPic ? item.mainPic : ''" :onerror="defaultImg" />
                                </div>
                                <div class="tagbox">
                                    <span>{{ item.categoryName }}</span>
                                    <span>{{age[index]}}</span>
                                    <span>{{ item.classHourNum }}节课</span>
                                </div>
                                <div class="titl">
                                    <p>{{ item.courseTitle }}</p>
                                </div>
                                <div class="price">
                                    <span><i>￥</i>{{ item.sellingPrice }}</span>
                                    <span><i>￥</i>{{ item.tagPrice }}</span>
                                </div>
                                <van-divider class="divider" style="margin:0"></van-divider>
                                <div class="location">
                                    <div class="locapic">
                                        <img :src=" item.logo" />
                                    </div>
                                    <div class="locainfo">
                                        <span>{{ item.storeName }}</span>
                                        <span v-if="!item.distance">{{ item.addrInfo }}</span>
                                        <span v-if="item.distance">距你 <i>{{ item.distance }}</i></span>
                                    </div>
                                </div>
                            <!-- </a> -->
                        </div>
                    </template>
                </waterfall>

            </div>
        </div>
    </div>
</template>

<script>
// import {Toast} from 'vant'
const axios = require('axios')


    export default {
        name: 'goodclass',
        data() {
            return {
                ip:this.$ip.getIp(),
                Url:this.$Url.geturl(),
                device:this.$device.getDevice(),
                defaultImg: 'this.src="' + require('../../assets/images/default.png') + '"',
                imagelist: {},
                data:[{}],
                col:2,
                lng:'',
                lat:'',
                userInfo:'',
                location:'',
                androidparams:'',
                res_data:'',
                index_cuid:'',
                indexdata:'',
                pageno:1,
                age:[],
                xhlresult:'',
                count:0,
            }
        },
        methods:{
            getGoodCourseData (lng,lat,cuid){
                        // 请求好课数据
                
                let url = this.ip + 'course/carefullyChosen';
                let param = new URLSearchParams()
                param.append("longitude", lng)
                param.append("latitude", lat)
                param.append("cuid", cuid)
                param.append("pageNo", '1')
                param.append("pageSize", '10')
                axios.post(url,param).then((res) =>{
                    
                    this.res_data = res.data.data
                    this.xhlresult = res.data.result
                    
                    const indexdata = res.data.data
                    this.data = indexdata.data
                    if(res.data.result == 'noLogin'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                    for(let i = 0; i< this.data.length;i++){
                        if(this.data[i].minAge == 0 && this.data[i].maxAge == 60){
                            this.age[i] = '不限年龄'
                        }else if(this.data[i].minAge == 0 && this.data[i].maxAge != 60){
                            this.age[i] = this.data[i].maxAge +'岁以下'
                        }else if(this.data[i].minAge != 0 && this.data[i].maxAge != 60){
                            this.age[i] = this.data[i].minAge + '-' +this.data[i].maxAge +'岁'
                        }else if(this.data[i].minAge != 0 && this.data[i].maxAge == 60){
                            this.age[i] = this.data[i].minAge  +'岁以上'
                        }
                    }
                    
                }).catch((err)=>{
                    console.log(err)
                })
                
            },
            loadmore(){
                // 懒加载
                let pageNo = this.pageno+1
                console.log(pageNo)
                let url = this.ip + 'course/carefullyChosen';
                let param = new URLSearchParams()
                param.append("longitude", this.lng)
                param.append("latitude", this.lat)
                param.append("cuid", this.index_cuid)
                param.append("pageNo", pageNo+'')
                param.append("pageSize", '10')
                axios.post(url,param).then((res) =>{
                    
                    let indexdata = res.data.data
                    console.log(indexdata.data)
                    // let page = indexdata.pageNo
                    if(res.data.result == 'noLogin'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                    if(indexdata.data.length == 0){
                        // this.data = indexdata.data
                        this.pageno = pageNo-1
                        console.log(this.pageno)
                        this.loadingmore = false
                    }else{
                        console.log('youshuju')
                        this.data = this.data.concat(indexdata.data)
                        for(let i = 0; i< this.data.length;i++){
                            if(this.data[i].minAge == 0 && this.data[i].maxAge == 60){
                                this.age[i] = '不限年龄'
                            }else if(this.data[i].minAge == 0 && this.data[i].maxAge != 60){
                                this.age[i] = this.data[i].maxAge +'岁以下'
                            }else if(this.data[i].minAge != 0 && this.data[i].maxAge != 60){
                                this.age[i] = this.data[i].minAge + '-' +this.data[i].maxAge +'岁'
                            }else if(this.data[i].minAge != 0 && this.data[i].maxAge == 60){
                                this.age[i] = this.data[i].minAge  +'岁以上'
                            }
                        }
                        this.pageno+=1
                        
                    }
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
                //  下面是请求数据
            getIndexBannerData (){
                        // 请求banner数据
                let url = this.ip +'banner/list?position=GoodCourse';
                axios.post(url).then((res) =>{
                    // let aa = res.data.data
                    this.imagelist = res.data.data
                    if(!this.imagelist){
                        this.getIndexBannerData()
                    }
                }).catch(()=>{
                    
                })

            },
            
            McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
            this.userInfo = qury
            // this.lat = Object.prototype.toString.call(this.userInfo)
            this.lat = this.userInfo.data.latitude
            this.lng = this.userInfo.data.longitude
            this.index_cuid = qury.data.cuid
            // this.location = '{"latitude": "'+this.lat+'","longitude": "'+this.lng+'"}'
            this.location = [this.lng,this.lat]
            this.pageno = 1
            if(this.lng == 0){
                this.getGoodCourseData('','',qury.data.cuid)
            }else{
                this.getGoodCourseData(this.lng,this.lat,qury.data.cuid)
            }
            this.getIndexBannerData()
            
                //解析传进来的json
                //给本地变量赋值，并判断经纬度是否为空，为空显示
            },
            
            linkIos : function (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
            gc_skipe_page :function (index){
                //跳转页面
                
                if (this.device === 'android') {
                    window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/classdetail","title":"课程详情","scheme":"JXHK","courseId":"'+this.data[index].courseId+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}');
                    
                }
                if (this.device === 'ios') { 
                    //jump  取值为true为跳新页面打开，false为当前页面打开
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","url": "'+this.Url+'/classdetail","title":"课程详情","scheme":"KCXQ","courseId":"'+this.data[index].courseId+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}')
                }
            },
            getParams(msg){
                this.androidparams = msg
                this.lat = msg.latitude
                this.lng = msg.longitude
                this.index_cuid = msg.cuid
                // this.location = '{"latitude": "'+this.lat+'","longitude": "'+this.lng+'"}'
                this.location = [msg.latitude,msg.longitude]
                this.pageno = 1
                if(this.lng == 0){
                    this.getGoodCourseData('','',msg.cuid)
                }else{
                    this.getGoodCourseData(this.lng,this.lat,msg.cuid)
                }
                this.getIndexBannerData()
            },
            gc_edit_page :function (qury){
                //跳转页面
                
                if (this.device === 'android') {
                    window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'"}');
                    
                }
                if (this.device === 'ios') { 
                    //jump  取值为true为跳新页面打开，false为当前页面打开
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'"}')
                }
            },
            clicktoActivity(index){
                // if(this.index_cuid){
                    
                        if(this.imagelist[index].jumpPage == 'StoreEntryPage'){
                            
                            if (this.device === 'android') {
                                window.android.SkipPage('{"scheme":"JoiningStoreApplicationPage","url": "'+this.Url+'/Addorganize"}');
                                
                            }
                            if (this.device === 'ios') { 
                                //jump  取值为true为跳新页面打开，false为当前页面打开
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"JGRZ","url": "'+this.Url+'/Addorganize","title":"机构入驻"}')
                            }
                        }
                    
                // }
            }
            
        },
        computed:{
	      itemWidth(){  
                return (340*0.5*(document.documentElement.clientWidth/375)) 
                // #rem布局 计算宽度 
	      },
	      gutterWidth(){
                return (16*0.5*(document.documentElement.clientWidth/375))	
                // #rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
	      }
        },
        mounted :function() {
            
            this.getIndexBannerData()
            setTimeout(()=>{
                if(this.xhlresult){
                    return false
                }else{
                    console.log(this.lng)
                    if(this.lng == ''){
                        this.getGoodCourseData('','',this.index_cuid)
                    }else{
                        if(!this.data){
                            this.getGoodCourseData(this.lng,this.lat,this.index_cuid)
                        }
                    }
                }
            },100)
            this.linkIos()
        },
        beforeMount(){
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams
            
            
            
        }
    }
</script>

<style scoped>
    @import url(../../../public/reset.css);
    @import url(../../css/goodclass/goodclass-index.css);
  
</style>