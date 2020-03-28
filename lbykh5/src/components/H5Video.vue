<template>
    <div class="h5video">
        <video-player class="video-player vjs-custom-skin" 
            ref="videoPlayer" 
            :playsinline="true" 
            @play="hasplay($event)"
            @ended="onPlayerEnded()"
            :options="playerOptions">
        </video-player>
        <div class="videoTitle" v-if="videoTitle" v-show="showTitle"><p>{{videoRemarks}}</p></div>
        <div class="videoBottom" v-show="showNum" flex="main:justify cross:center">
            <p>{{videoDuration}}</p>
            <p v-if="playCount != 0">{{playCount}}次播放</p>
        </div>
        <div class="videoPlayBtn" v-show="showPlayBtn" flex="main:center cross:center">
            <img class="img_60" @click="onPlayerPlay()" src="../images/CreateClock/play.png" alt="">
        </div>
        <div class="videoPlayBtn" v-show="showPauseBtn" @click="onPlayerPause()">
        </div>
    </div>
</template>
<script>
import 'flex.css'
import '../css/Clock/clockPublic.css'
import { Toast } from 'vant'
const axios = require('axios')
export default {
    name:'h5video',
    props:{
        fileVideoSrc:{
            type:String,
            required:true
        },
        videoCover:{
            type:String
        },
        videoId:{
            type:String
        },
        videoRemarks:{
            type:String
        },
        playCount:{
            type:String
        }
    },
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            showTitle:true,
            showNum:true,
            showPlayBtn:true,
            showPauseBtn:false,
            videoDuration:'',
            playerOptions: {
                playbackRates: [], // 可选的播放速度
                autoplay: false, // 如果为true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 是否视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4", // 类型
                    src:this.fileVideoSrc
                }],
                poster: this.videoCover, // 封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    playToggle:false,
                    volumeMenuButton:false,
                    timeDivider: true, // 当前时间和持续时间的分隔符
                    durationDisplay: true, // 显示持续时间
                    remainingTimeDisplay: true, // 是否显示剩余时间功能
                    fullscreenToggle: true // 是否显示全屏按钮
                }
            },
            videoTitle:true,
            hasCounted:true
        }
    },
    methods:{
        hasplay(){
            this.countPlayNum()
        },
        onPlayerPlay() {
           this.$refs.videoPlayer.player.play()
           this.showPlayBtn=false
           this.showTitle=false
           this.showNum=false
           this.showPauseBtn=true
           
        },
        onPlayerPause(){
            this.$refs.videoPlayer.player.pause()
            this.showPlayBtn=true
            this.showTitle=true
            this.showPauseBtn=false
        },
        onPlayerEnded(){
            this.showPlayBtn=true
            this.showTitle=true
            this.showPauseBtn=false
        },
        countPlayNum(){
            if(this.hasCounted){
                setTimeout(()=>{
                    let url = this.ip+'statistics/play'
                    let param = new URLSearchParams()
                    param.append("videoId", this.videoId)
                    axios.post(url,param).then((res)=>{
                        console.log(res)
                    }).catch((err)=>{
                        console.log(err)
                    })
                    
                },300)
                this.hasCounted = false
            }else{
                return
            }
            
        }
    },
    mounted(){
        var videoTime = setInterval(()=>{
            let videoDuration = this.$refs.videoPlayer.player.duration()
            
            if(videoDuration){
                let min = parseInt(videoDuration /60)
                let sec = parseInt((videoDuration /60 -min)*60)
                min < 10 ? min = '0'+min : min
                sec < 10 ? sec = '0'+sec : sec
                this.videoDuration = min+':'+sec 
                clearInterval(videoTime)
            }
        },300)
        
    }
}
</script>
<style lang="stylus">

.video-player
    border-radius 5px
    overflow hidden
    .vjs-control-bar
        background none
        z-index 1
        .vjs-volume-panel
            display none
    .vjs-progress-holder{
        height 1px
    }
    .vjs-play-progress:before{
        top -.444444em
    }
    .vjs-play-progress{
        background #2ac688
    }
    .vjs-big-play-button
        display none
.vjs-custom-skin > .video-js .vjs-big-play-button
    display none


.h5video
    position relative
    .videoTitle
        background linear-gradient(180deg,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0) 100%);
        box-sizing border-box
        width 100%
        position absolute
        top 0
        left 0
        padding 12px
        border-radius 5px
        color #FFFFFF
        font-size 16px
        p
            display -webkit-box;
            -webkit-line-clamp 2;
            text-overflow ellipsis;
            -webkit-box-orient vertical;
            overflow hidden;
    .videoBottom
        background linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.4) 100%);
        box-sizing border-box
        width 100%
        position absolute
        bottom 0
        left 0
        padding 48px 12px 12px 12px
        border-radius 5px
        color #FFFFFF
        font-size 12px
    .videoPlayBtn{
        width 100%
        height 100%
        position absolute
        top 0
        left 0
        border-radius 5px
    }
</style>