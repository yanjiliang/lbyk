<template>
    <div class="h5video">
        <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline ='true'
        :webkit-playsinline ='true'
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        />
    </div>
</template>
<script>
export default {
    name:'h5video',
    props:{
        fileVideoSrc:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            playerOptions: {
                //playbackRates: [], //播放速度
                autoplay: 'false', //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4", // 类型
                    src:this.fileVideoSrc
                }],
                
                hls: true,
                poster:'', // 封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            }
        }
    }
}
</script>
<style lang="stylus">

.video-player
    border-radius 5px
    overflow hidden
    .vjs-control-bar
        border-radius 0 0 5px 5px
    .vjs-big-play-button
        height 40px!important
        width 40px!important
        border-radius 20px
        border 0
        background rgba(0,0,0,.5)
        
        .vjs-icon-placeholder:before
            top -15px
.vjs-custom-skin > .video-js .vjs-big-play-button
    height 40px!important
    width 40px!important
    margin-left -20px
    margin-top -20px!important


.vjs-error .vjs-error-display:before{
    display none 
}
</style>