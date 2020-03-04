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
            <div>
                <van-uploader v-model="imageList" accept="image/*"  multiple :max-count='9' />
            </div>

            <div>
                <van-uploader v-if="!isUpload" v-model="videoList" accept="video/*"  :after-read="afterRead" multiple :max-count='1' />
            </div>


            <!-- <video :src="videosrc" id="video" class="clock_video"></video> -->
            <video v-if="isUpload" id="video" class="clock_video" controls muted webkit-playsinline="true" playsinline="true" poster="" :src="fileVideoSrc"></video>
            
            <div class="colock_box">
                <H5Video v-if="isUpload" :fileVideoSrc='fileVideoSrc'/>
            </div>


        </div>
    </div>
</template>

<script>
import H5Video from '../../components/H5Video'
export default {
    name:'QuickToClock',
    data(){
        return{
            fileList:[],
            imageList:[],
            videoList:[],
            clock_content:'',
            fileVideoSrc:'',
            isUpload:false
        }
    },
    components:{
        H5Video
    },
    methods:{
        afterRead(file){
            console.log(file)
            console.log(file.file)
            this.fileVideoSrc = file.content
            this.isUpload = true
        },
    }
}
</script>
<style lang="stylus" scoped>
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
        .clock_video
            width 100%
            height 200px
        

//     .van-uploader__upload
//             border 1px solid #FF444B!important
    

// .quick_to_colock .van-uploader__preview-delete{
//     color #FF444B!important
// }
            
        

</style>