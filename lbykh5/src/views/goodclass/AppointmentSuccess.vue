<template>
    <div class="AppointmentSuccess">
        <div style="margin-top:108px;margin-bottom:12px">
            <img style="width:129px;height:129px" src="../../images/GoodClass/classsoldout/success2xnew.png" alt="">
        </div>
        <!-- //img图片 -->
        <div style="margin-bottom:4px">
            <p style="height:28px;
                        font-size:20px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        line-height:28px;
                        color:rgba(77,201,189,1);
                        opacity:1;">课程预约成功</p>
        </div>
        <!-- //课程已下架 -->
        <div  style="margin-bottom:69px">
            <p style="height:20px;
                    font-size:14px;
                    font-family:PingFang SC;
                    font-weight:400;
                    line-height:20px;
                    color:rgba(198,198,198,1);
                    opacity:1;" >工作人员将尽快联系您，请保持电话畅通</p>
        </div>

        <div style="margin-bottom:4px">
            <p style="height:22px;font-size:16px;font-weight:bold;line-height:22px;color:rgba(53,50,57,1);">下载蜡笔优课APP发现更多附近好课</p>
        </div>

        <div>
            <p style="height:20px;
                    font-size:14px;
                    font-family:PingFang SC;
                    font-weight:400;
                    line-height:20px;
                    color:rgba(198,198,198,1);
                    opacity:1;" >您还可以通过APP发现更多附近优惠教学课程</p>
        </div>
        <!-- //下载蜡笔优课 -->
        <div>
            <img style="width: 233px;height: 88px;" src="../../images/GoodClass/classsoldout/logo6@2x.png" alt="">
        </div>
        <!-- //logo -->
        <div class="download">
            <p v-if="device == 'android'" style="font-size:16px;font-weight:400;line-height:44px;color:#FFFFFF"><a style="text-decoration:none;color:#fff" href="https://apps.apple.com/cn/app/id1498163739?l=zh&ls=1">下载APP</a></p>
            <p v-if="device == 'ios'" style="font-size:16px;font-weight:400;line-height:44px;color:#FFFFFF"><a style="text-decoration:none;color:#fff" href="https://lbyk.oss-cn-shenzhen.aliyuncs.com/apk/labiyouke.apk">下载APP</a></p>
        </div>
    </div>
</template>
<script>
export default {
    name:'AppointmentSuccess'
}
</script>
<style scoped>
@import url(../../../public/reset.css);

.AppointmentSuccess{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.AppointmentSuccess .download{
    width:231px;
    height:44px;
    background:rgba(255,68,75,1);
    box-shadow:0px 5px 6px rgba(255,68,75,0.15);
    opacity:1;
    border-radius:5px;
    margin: 0 auto;
}

</style>