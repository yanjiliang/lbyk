<template>
    <div class="quick_to_colock">
        <div class="quick_clock_wrap">
            <div class="quick_clock_title">
                <p>快速打卡</p>
                <p>这一周很难忘</p>
            </div>

            <!-- 打卡内容 start -->
            <van-field
                v-model="clock_theme"
                rows="4"
                autosize
                type="textarea"
                maxlength="1000"
                placeholder="说说今天的感想和收获吧..."
            />
            <!-- 打卡内容 end -->
            <van-divider />


            <div>
                <van-uploader v-model="fileList" multiple :max-count='9' />
            </div>

            <div>
                <van-uploader>
                    <van-button icon="photo" type="primary">上传文件</van-button>
                </van-uploader>
            </div>

            <div>
                <input type="file" name="" id="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'QuickToClock',
    data(){
        return{
            fileList:[]
        }
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

</style>