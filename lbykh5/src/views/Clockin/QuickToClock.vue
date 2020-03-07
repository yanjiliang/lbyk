<template>
    <div class="quick_to_colock">
        <div class="quick_clock_wrap">
            <div class="quick_clock_title">
                <p>快速打卡</p>
                <p>这一周很难忘</p>
            </div>

            <!-- 打卡内容 start -->
            <van-field
                v-model="clock_content"
                rows="4"
                autosize
                type="textarea"
                maxlength="1000"
                placeholder="说说今天的感想和收获吧..."
            />
            <!-- 打卡内容 end -->
            <van-divider />

            <div class="file_upload_wrap">
                <van-uploader v-model="videoList" v-if="!isUpload && typeOfFile != 'image'" upload-text="视频+" accept="video/*"  :after-read="afterVideoRead" multiple :max-count='1' />
                <van-uploader v-if="typeOfFile != 'video' || typeOfFile == 'image'" v-model="imageList" :after-read="afterImageRead" accept="image/*" upload-text="图片+"  multiple :max-count='9' />
            </div>
            <div class="colock_video_box" v-if="isUpload">
                <H5Video :fileVideoSrc='fileVideoSrc'/>
            </div>

            <div class="poick_clock_class_wrap" @click="toSelectClass()" >
                <div class="pick_clock_class">
                    <div class="pick_left" v-if="hasSelected == false">
                        <p><img src="../../images/CreateClock/clock_mana_people.png" alt=""></p>
                        <p>请选择打卡班级</p>
                    </div>
                    <div class="selected_pick_left" v-if="hasSelected == true">
                        <img :src="selectedClass[0].img" alt="">
                        <div class="select_info">
                            <p>{{selectedClass[0].className}}</p>
                            <p>{{selectedClass[0].userName}}</p>
                        </div>
                    </div>
                    <div class="pick_right">
                        <img src="../../images/GoodClass/reback2x.png" alt="">
                    </div>
                </div>
            </div>


            <van-divider style="margin: 10px 0"/>

            <van-popup v-model="showClassPicker" :safe-area-inset-bottom='true' round :style="{height:'50%'}" position="bottom">
                <div class="quick_clock_pop_nav">
                    <p class="cancel_btn" @click="showClassPicker = false">取消</p>
                    <p class="pop_title">选择打卡班级</p>
                    <p class="select_btn" @click="onClassConfirm()">确认</p>
                </div>
                <div class="quick_clock_select_class_wrap">
                    
                    <div class="quick_clock_select_class_content" ref="class_list_wrap">
                        <ul class="quick_clock_select_class_list" ref="class_list">
                            <li @click="quick_clock_select_class($event,index)" v-for="(item,index) in userClassList" :key="index">
                                <div class="quick_clock_select_class_item">
                                    <div class="user_avtar">
                                        <img :src="item.img" alt="">
                                    </div>
                                    
                                    <div class="class_info">
                                        <p class="class_title">{{item.className}}</p>
                                        <div class="down_info">
                                            <p class="user_name">{{item.userName}}</p>
                                            <img v-show="item.hasSelect" src="../../images/CreateClock/selected.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </van-popup>

        </div>
        <div style="height:90px"></div>
        <div class="quick_clock_btn_wrap">
            <div class="quick_colock_btn">
                <p>立即发布</p>
            </div>
        </div>
    </div>
</template>

<script>

import H5Video from '../../components/H5Video'
import { Toast } from 'vant'
export default {
    name:'QuickToClock',
    data(){
        return{
            fileList:[],
            imageList:[],
            videoList:[],
            clock_content:'',
            fileVideoSrc:'',
            isUpload:false,
            typeOfFile:'',
            showClassPicker:false,
            userClassList:[
                {
                    img:'http://tiebapic.baidu.com/forum/w%3D580/sign=609b74c0e103738dde4a0c2a831ab073/92d0cb2d11dfa9ec53895d7775d0f703918fc134.jpg',
                    className:'英语',
                    userName:'李老师',
                    hasSelect:false
                },
                {
                    img:'http://img5.imgtn.bdimg.com/it/u=1976440341,1399146824&fm=26&gp=0.jpg',
                    className:'数学',
                    userName:'张老师',
                    hasSelect:false
                },
                {
                    img:'http://img3.imgtn.bdimg.com/it/u=2900828921,4164986636&fm=15&gp=0.jpg',
                    className:'语文',
                    userName:'孙老师',
                    hasSelect:false
                },
                {
                    img:'http://img0.imgtn.bdimg.com/it/u=1700083999,2976908511&fm=15&gp=0.jpg',
                    className:'生物',
                    userName:'赵老师',
                    hasSelect:false
                }
            ],
            selectedClass:[],
            hasSelectIndex :'',
            hasSelected:false
        }
    },
    components:{
        H5Video
    },
    methods:{
        afterVideoRead(file){
            console.log(file)
            console.log(file.file)
            this.fileVideoSrc = file.content
            this.isUpload = true
            this.typeOfFile = 'video'
        },
        afterImageRead(file){
            console.log(file)
            console.log(file.file)
            
            this.typeOfFile = 'image'
        },
        toSelectClass(){
            this.showClassPicker = true
        },
        quick_clock_select_class(e,index){
            //控制班级选择
            this.$nextTick(()=>{
                if(this.userClassList[index].hasSelect){
                    document.getElementsByClassName('quick_clock_select_class_item')[index].classList.remove('quick_clock_isSelected')
                    this.userClassList[index].hasSelect = false
                }else{
                    document.getElementsByClassName('quick_clock_select_class_item')[index].classList.add('quick_clock_isSelected')
                    
                    for(let i = 0;i<this.userClassList.length;i++){
                        if(this.userClassList[i].hasSelect == true){
                            document.getElementsByClassName('quick_clock_select_class_item')[i].classList.remove('quick_clock_isSelected')
                            this.userClassList[i].hasSelect = false
                        }
                    }
                    this.userClassList[index].hasSelect = true
                    
                }
            })
            console.log(this.selectedClass)
        },
        onClassConfirm(){
            for(let i =0;i<this.userClassList.length;i++){
                if(this.userClassList[i].hasSelect == true){
                    this.selectedClass.splice(0)
                    this.selectedClass.push(this.userClassList[i])
                }
            }
            console.log(this.selectedClass)
            this.showClassPicker = false
            this.hasSelected = true

        },
    }
}
</script>

<style lang="stylus" scoped>
@import url(../../../public/resetVant.css); 
.quick_to_colock
    input,textarea
        font-size 18px!important
        font-weight 400!important
    .quick_clock_wrap
        padding 26px 24px
        
        .quick_clock_title
                margin-bottom 10px
                margin-top 26px
                p
                    &:nth-child(1)
                        font-size 24px
                        font-weight bold
                        line-height 33px
                        color #353239
                    &:nth-child(2)
                        font-size 14px
                        font-weight 400
                        color #9B9B9B
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
        .poick_clock_class_wrap
            margin-top 35px
            .pick_clock_class
                display flex
                align-items center
                justify-content space-between
                .selected_pick_left
                    display flex
                    align-items center
                    img 
                        width 48px
                        height 48px
                        border-radius 50%
                        display block
                        margin-right 12px
                    .select_info
                        p
                            &:nth-child(1)
                                color #181818
                                width auto
                                font-size 16px
                                font-weight 400
                                line-height 22px
                                box-sizing border-box
                                margin-bottom 8px 
                            &:nth-child(2)
                                color #9B9B9B
                                font-size 12px
                                font-weight 400
                                line-height 17px
                .pick_left
                    display flex
                    align-items center
                    p 
                        &:nth-child(1)
                            margin-right 8px
                            img 
                                display block
                                width 18px
                                height 18px
                        &:nth-child(2)
                            font-size 18px
                            font-weight 400
                            line-height 25px
                            color #C6C6C6
                .pick_right
                    img 
                        width 14px
                        height 14px
                        display block
        .van-popup
                .quick_clock_pop_nav
                        display flex
                        align-items center
                        justify-content space-between
                        font-size 14px
                        font-weight 400
                        line-height 20px
                        border-radius 20px 20px 0 0
                        background #FFFFFF
                        opacity 1
                        box-sizing border-box
                        padding 10px 16px
                        position fixed
                        width 10rem
                        // position fixed
                        .pop_title
                            color #353239
                            font-size 16px
                            line-height 22px
                            font-weight 500
                        .cancel_btn
                            color #C6C6C6
                        .select_btn
                            color #FF444B
                .quick_clock_select_class_wrap
                    margin-top 10px
                    padding 20px 16px
                    box-sizing border-box
                    
                    .quick_clock_select_class_content
                        .quick_clock_select_class_list
                            box-sizing border-box
                            padding 20px 0
                            li
                                margin-bottom 16px
                            .quick_clock_select_class_item
                                box-sizing border-box
                                border 1px solid #E8E8E8
                                display flex
                                align-items center
                                height 80px
                                padding 17px 16px 15px 16px
                                border-radius 15px
                                .user_avtar
                                    margin-right 12px
                                    img 
                                        width 48px
                                        height 48px
                                        border-radius 50%
                                        display block
                                .class_info
                                    width  100%
                                    .class_title
                                        color #181818
                                        width auto
                                        font-size 16px
                                        font-weight 400
                                        line-height 22px
                                        box-sizing border-box
                                        margin-bottom 10px 
                                    .down_info
                                        // width 6.8rem
                                        display flex
                                        align-items center
                                        justify-content space-between
                                        height 18px
                                        box-sizing border-box
                                        .user_name
                                            color #9B9B9B
                                            font-size 12px
                                            font-weight 400
                                            line-height 17px
                                        img 
                                            width 18px
                                            height 18px
                                            display block
                            .quick_clock_isSelected
                                border 1px solid #FF444B
                                background #FCF0F1
    .quick_clock_btn_wrap 
        position fixed
        bottom 35px 
        box-sizing border-box
        width 10rem
        padding 0 16px  
        .quick_colock_btn
                height 56px
                background #FF444B
                box-shadow 0px 4px 6px rgba(255,68,75,0.2)
                border-radius 28px
                text-align center
                line-height 56px
                p
                    font-size 16px
                    font-weight 400
                    color #FFF

        
</style>