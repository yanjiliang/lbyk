<template>
    <div class="clocklist">
        <van-tabs v-model="active" sticky swipeable lazy-render :border='false'>
            <van-tab title="打卡记录">
                <div class="clock_list_wrap">
                    <div class="clock_list_item">
                        <div class="clock_item_userinfo">
                            <!-- 打卡头部用户信息 -->
                            <div class="clock_item_avatar">
                                <img src="http://img5.imgtn.bdimg.com/it/u=263351484,3972010013&fm=26&gp=0.jpg" alt="">
                            </div>
                            <div class="clock_item_user_info">
                                <p class="user_name">诸葛大力</p>
                                <div class="clock_info">
                                    <p>已打卡9次</p>
                                    <p>2020/01/20 17:53</p>
                                </div>
                            </div>
                            <!-- 打卡头部用户信息 -->
                        </div>
                        <div class="clock_item_content">
                            <p>我们今晚邀请了112 位全卡的妈妈分享一下自己的变化。32位妈妈分享结束，自由讨论，宝妈们可以分享自己这一周的变化，思想或者行为上的变化哦。</p>
                        </div>
                        <div class="clock_item_images">
                            <!-- <p>这里是照片区域</p> -->
                            <ul>
                                <li v-for="(item, index) in preImage" :key="index"><img :src="item" style="width: 2.773333rem;height: 2.773333rem;" alt="" @click="preClick(index)"></li>
                            </ul>
                            <p class="clock_img_count">+6</p>
                        </div>
                        <!-- 图片预览 -->
                        <van-image-preview v-model="pre_show" :images="preImage" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                            <template v-slot:index>
                                
                            </template>
                        </van-image-preview>
                        <!-- 图片预览 -->
                        <div class="clock_item_video" v-show="false">
                            <H5Video :fileVideoSrc='fileVideoSrc'/>
                        </div>
                        <div class="clock_item_class_info">
                            <p>来自<span>2020届舞蹈基础B班</span></p>
                        </div>
                        <div class="clock_item_func">
                            <div class="clock_item_zan_user">
                                <div class="clock_item_info_list">
                                    <ul>
                                        <li><img src="http://img1.imgtn.bdimg.com/it/u=3011024659,3918111814&fm=26&gp=0.jpg" alt=""></li>
                                        <li><img src="http://img5.imgtn.bdimg.com/it/u=1013062358,2295738855&fm=26&gp=0.jpg" alt=""></li>
                                        <li><img src="http://img2.imgtn.bdimg.com/it/u=1602610465,750348961&fm=26&gp=0.jpg" alt=""></li>
                                        <li><img src="http://img4.imgtn.bdimg.com/it/u=335183132,539509064&fm=26&gp=0.jpg" alt=""></li>
                                        <li><img src="http://img2.imgtn.bdimg.com/it/u=1473741299,1011020019&fm=26&gp=0.jpg" alt=""></li>
                                    </ul>
                                </div>
                                <p>1.2w人觉得很赞</p>
                            </div>
                            <div class="clock_btn">
                                <div class="clock_btn01 btn_clock">
                                    <img src="../images/CreateClock/share.png" alt="">
                                    <p>分享</p>
                                </div>
                                <div class="btn_clock">
                                    <img src="../images/CreateClock/zan.png" alt="">
                                    <p>点赞</p>
                                </div>
                            </div>
                        </div>
                        <van-divider />
                    </div>

                    

                    <div class="clock_list_item">
                        <div class="clock_item_userinfo">
                            <!-- 打卡头部用户信息 -->
                            <div class="clock_item_avatar">
                                <img src="http://img2.imgtn.bdimg.com/it/u=1347074168,2023995894&fm=26&gp=0.jpg" alt="">
                            </div>
                            <div class="clock_item_user_info">
                                <p class="user_name">阿拉啦</p>
                                <div class="clock_info">
                                    <p>已打卡7次</p>
                                    <p>2020/01/20 17:53</p>
                                </div>
                            </div>
                            <!-- 打卡头部用户信息 -->
                        </div>
                        <div class="clock_item_content">
                            <p>ICLR 2020 自确定开会地点选在非洲埃塞俄比亚首都以来，一波三起，但最终仍逃不掉取消线下会议的命运。</p>
                        </div>
                        <div class="clock_item_images" v-show="false">
                            <!-- <p>这里是照片区域</p> -->
                            <ul>
                                <li v-for="(item, index) in preImage" :key="index"><img style="width: 2.773333rem;height: 2.773333rem;" :src="item" alt="" @click="preClick(index)"></li>
                            </ul>
                            <p class="clock_img_count">+6</p>
                        </div>
                        <!-- 图片预览 -->
                        <van-image-preview v-model="pre_show" :images="preImage" @change="onChange(pre_index)" @close="onClose" :start-position='pre_index'>
                            <template v-slot:index></template>
                        </van-image-preview>
                        <!-- 图片预览 -->
                        <div class="clock_item_video" >
                            <!-- 这里是视频区域 -->
                            <H5Video :fileVideoSrc='fileVideoSrc'/>
                        </div>
                        <div class="clock_item_class_info">
                            <p>来自<span>2020届舞蹈基础A班</span></p>
                        </div>
                        <div class="clock_item_func">
                            <div class="clock_item_zan_user">
                                <div class="clock_item_info_list">
                                    <ul>
                                        <li><img src="http://img1.imgtn.bdimg.com/it/u=3011024659,3918111814&fm=26&gp=0.jpg" alt=""></li>
                                        <li><img src="http://img5.imgtn.bdimg.com/it/u=1013062358,2295738855&fm=26&gp=0.jpg" alt=""></li>
                                        <li><img src="http://img2.imgtn.bdimg.com/it/u=1602610465,750348961&fm=26&gp=0.jpg" alt=""></li>
                                        <li><img src="http://img4.imgtn.bdimg.com/it/u=335183132,539509064&fm=26&gp=0.jpg" alt=""></li>
                                        <li><img src="http://img2.imgtn.bdimg.com/it/u=1473741299,1011020019&fm=26&gp=0.jpg" alt=""></li>
                                    </ul>
                                </div>
                                <p>1.2w人觉得很赞</p>
                            </div>
                            <div class="clock_btn">
                                <div class="clock_btn01 btn_clock">
                                    <img src="../images/CreateClock/share.png" alt="">
                                    <p>分享</p>
                                </div>
                                <div class="btn_clock">
                                    <img src="../images/CreateClock/zan.png" alt="">
                                    <p>点赞</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <van-divider />
                </div>
            </van-tab>
            <van-tab title="排行榜">
                <div class="rankList_wrap">
                    <van-tabs v-model="activeOrder" sticky swipeable lazy-render :border='false'>
                        <van-tab title="打卡榜" class="rank_list_clock">
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
                        <van-tab title="点赞榜" class="rank_list_zan">
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
    </div>
</template>
<script>
import H5Video from '../components/H5Video'
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
        }
    },
    components:{
        H5Video
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
    }
}
</script>
<style scoped>
@import url(../../public/resetVant.css);
@import url(../css/Clock/clocklist.css);

</style>