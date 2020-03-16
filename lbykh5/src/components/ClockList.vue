<template>
    <div class="clocklist">
        <van-tabs v-model="active" sticky swipeable lazy-render :border='false'>
            <van-tab title="打卡记录">
                <div class="clock_list_wrap">
                    <div class="clock_list_item" v-for="(item, index) in ClockRecod" :key="index">
                        <div class="clock_item_userinfo">
                            <!-- 打卡头部用户信息 -->
                            <div class="clock_item_avatar">
                                <img :src="item.studentAvatar" alt="">
                            </div>
                            <div class="clock_item_user_info">
                                <p class="user_name">{{item.studentName}}</p>
                                <div class="clock_info">
                                    <p>已打卡 {{item.clockCount}} 次</p>
                                    <p>{{item.clockDate}}</p>
                                </div>
                            </div>
                            <!-- 打卡头部用户信息 -->
                        </div>
                        <div class="clock_item_content">
                            <p>{{item.impression}}</p>
                        </div>
                        <div class="clock_item_images" v-if="item.picUrls">
                            <!-- <p>这里是照片区域</p> -->
                            <ul>
                                <li v-for="(item1, index) in item.picUrls" :key="index"><img :src="item1.url" style="width: 2.773333rem;height: 2.773333rem;" alt="" @click="preClick(index)"></li>
                            </ul>
                            <p class="clock_img_count" v-if="item.picUrls.length >3">+ {{item.picUrls.length-3}}</p>
                        </div>
                        <!-- 图片预览 -->
                        <van-image-preview v-model="pre_show" :images="item.picUrls" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                            <template v-slot:index>
                                
                            </template>
                        </van-image-preview>
                        <!-- 图片预览 -->
                        <div class="clock_item_video" v-if="item.videoUrl">
                            <H5Video :fileVideoSrc='item.videoUrl'/>
                        </div>
                        <div class="clock_item_class_info">
                            <p>来自<span>{{item.className}}</span></p>
                        </div>
                        <div class="clock_item_func">
                            <div class="clock_item_zan_user">
                                <div class="clock_item_info_list">
                                    <ul>
                                        <li v-for="(item2, index) in item.praiseCustomerDtos" :key="index"><img :src="item2.avatar" alt=""></li>
                                    </ul>
                                </div>
                                <p>{{item.praiseCustomerNum}} 人觉得很赞</p>
                            </div>
                            <div class="clock_btn">
                                <div class="clock_btn01 btn_clock">
                                    <img src="../images/CreateClock/share.png" alt="">
                                    <p>分享</p>
                                </div>
                                <div class="btn_clock" v-if="item.isPraise == false">
                                    <img src="../images/CreateClock/zan.png" alt="">
                                    <p>点赞</p>
                                </div>
                                <div class="btn_clock" v-if="item.isPraise == true">
                                    <img src="../images/CreateClock/zaned.png" alt="">
                                    <p>已赞</p>
                                </div>
                            </div>
                        </div>
                        <van-divider />
                    </div>

                    <van-divider />
                </div>
            </van-tab>
            <van-tab title="排行榜">
                <div class="rankList_wrap">
                    <van-tabs v-model="activeOrder" sticky swipeable lazy-render :border='false'>
                        <van-tab title="打卡榜" class="rank_list_clock" @click="getRankList(requestData.clockId,'clock')">
                            <div class="rank_clock_list rank_list_comen">
                                <ul>
                                    <li v-for="(clock, index) in ClockList" :key="index">
                                        <div class="rank_item">
                                            <div class="rank_item_avatar">
                                                <div class="avatar_pic">
                                                    <p class="rank_num">
                                                        <img v-if="index == 0" src="../images/CreateClock/first.png" alt="">
                                                        <img v-if="index == 1" src="../images/CreateClock/second.png" alt="">
                                                        <img v-if="index == 2" src="../images/CreateClock/third.png" alt="">
                                                        <span v-if="index > 2">{{index+1}}</span>
                                                    </p>
                                                    <img :src="clock.img" alt="">
                                                </div>
                                                <div class="rank_item_userinfo">
                                                    <p>{{clock.name}}</p>
                                                    <p>{{clock.class}}</p>
                                                </div>
                                            </div>
                                            <div class="rank_item_data">{{clock.num}}次</div>
                                        </div>
                                    </li>
                                    
                                    
                                </ul>
                            </div>
                        </van-tab>
                        <van-tab title="点赞榜" class="rank_list_zan" @click="getRankList(requestData.clockId,'praise')">
                            <div class="rank_zan_list rank_list_comen">
                                <ul>
                                    <li v-for="(zan, index) in ZanList" :key="index">
                                        <div class="rank_item">
                                            <div class="rank_item_avatar">
                                                <div class="avatar_pic">
                                                    <p class="rank_num">
                                                        
                                                        <img v-if="index == 0" src="../images/CreateClock/first.png" alt="">
                                                        <img v-if="index == 1" src="../images/CreateClock/second.png" alt="">
                                                        <img v-if="index == 2" src="../images/CreateClock/third.png" alt="">
                                                        <span v-if="index > 2">{{index+1}}</span>
                                                    </p>
                                                    <img :src="zan.img" alt="">
                                                </div>
                                                <div class="rank_item_userinfo">
                                                    <p>{{zan.name}}</p>
                                                    <p>{{zan.class}}</p>
                                                </div>
                                            </div>
                                            <div class="rank_item_data">{{zan.num}}次</div>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </van-tab>
                        <van-tab disabled></van-tab>
                        <van-tab disabled></van-tab>
                    </van-tabs>
                </div>
            </van-tab>
            <van-tab disabled></van-tab>
            <van-tab disabled></van-tab>
        </van-tabs>

        <p>{{ClockRank}}</p>
    </div>
</template>
<script>
import H5Video from '../components/H5Video'
const axios = require('axios')
export default {
    name:'clocklist',
    data(){
        return{
            active: 0,
            activeOrder:0,
            fileVideoSrc:'https://vdept.bdstatic.com/77696852377266345341337669366b6b/7062674832625375/9aac19ae0281f09130144bb37e732d6282613949c34bdb4998d63e97f0b75a70dd6477a6df20576c5b37e3f4e6b38df7.mp4?auth_key=1583998702-0-0-9fadfaac7bcd7a1e8b61cb42773079b0',
            ClockList:[
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'宇文化及',
                    class:'历史A班',
                    num:'13'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'诸葛亮',
                    class:'历史A班',
                    num:'11'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'司马懿',
                    class:'历史A班',
                    num:'8'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'曹操',
                    class:'历史A班',
                    num:'5'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'曹操',
                    class:'历史A班',
                    num:'5'
                },
                {
                    img:'http://img2.imgtn.bdimg.com/it/u=335857360,1626370546&fm=26&gp=0.jpg',
                    name:'曹操',
                    class:'历史A班',
                    num:'5'
                },
            ],
            ZanList:[
                {
                    img:'http://img4.imgtn.bdimg.com/it/u=3215380059,2729465507&fm=26&gp=0.jpg',
                    name:'唐僧',
                    class:'历史B班',
                    num:'66'
                },
                {
                    img:'http://img4.imgtn.bdimg.com/it/u=3215380059,2729465507&fm=26&gp=0.jpg',
                    name:'孙悟空',
                    class:'历史B班',
                    num:'60'
                },
                {
                    img:'http://img4.imgtn.bdimg.com/it/u=3215380059,2729465507&fm=26&gp=0.jpg',
                    name:'沙僧',
                    class:'历史B班',
                    num:'53'
                },
                {
                    img:'http://img4.imgtn.bdimg.com/it/u=3215380059,2729465507&fm=26&gp=0.jpg',
                    name:'吴京',
                    class:'历史B班',
                    num:'48'
                },
            ],
            preImage:[
                'http://img3.imgtn.bdimg.com/it/u=2792090559,2900667538&fm=26&gp=0.jpg',
                'http://img1.imgtn.bdimg.com/it/u=1728307612,3498260071&fm=26&gp=0.jpg',
                'http://img4.imgtn.bdimg.com/it/u=4042650250,4000697206&fm=26&gp=0.jpg'
            ],
            firstSrc:'../images/CreateClock/first.png',
            secondSrc:'../images/CreateClock/first.png',
            thirdSrc:'../images/CreateClock/first.png',
            pre_index:0,
            pre_show:false,
            ClockRank:''
        }
    },
    components:{
        H5Video
    },
    props:{
        ClockRecod:{
            type:Array,
            required:true
        },
        requestData:{
            type:Array,
            required:true
        }
    },
    methods:{
        preClick(index){
            this.pre_show=true;
            this.pre_index=index;
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "false"}')
        },
        onClose(){
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "true"}')
        },
        onChange(index) {
            this.pre_index = index;
        },
        getRankList(clockId,type){
            // /class-clock-student/rankingList
            let url = 'http://192.168.3.22:8091/class-clock-student/rankingList';
            let param = new URLSearchParams()
            param.append("cuid", 'eYhjQznFDdvZiHz4oXt ')
            param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
            param.append("clockId", clockId)
            param.append("type", type)
            param.append("pageNo", 1)
            param.append("pageSize", 20)
            axios.post(url,param).then((res)=>{
                let ClockRank = res.data.data
                this.ClockRank = ClockRank
            
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
@import url(../../public/resetVant.css);
@import url(../css/Clock/clocklist.css);

</style>