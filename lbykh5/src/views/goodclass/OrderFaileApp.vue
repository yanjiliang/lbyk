<template>
    <div class="OrderFaileApp">
        <div style="margin-top:108px;margin-bottom:12px">
            <img style="width:129px;height:129px" src="../../images/GoodClass/classsoldout/failorder.png" alt="">
        </div>
        <!-- //img图片 -->
        <div style="margin-bottom:4px">
            <p style="height:28px;
                        font-size:20px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        line-height:28px;
                        color:rgba(255,68,75,1);
                        opacity:1;">课程预约失败</p>
        </div>
        <!-- //课程已下架 -->
        <div  style="margin-bottom:69px">
            <p style="height:20px;
                    font-size:14px;
                    font-family:PingFang SC;
                    font-weight:400;
                    line-height:20px;
                    color:rgba(198,198,198,1);
                    opacity:1;" >{{result_reason}}</p>
        </div>
        <!-- //logo -->
        <div class="download">
            <p style="font-size:16px;font-weight:400;line-height:44px;color:#FFFFFF" @click="ClickTo('HOME')">返回首页  发现更多好课</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'OrderFaileApp',
    data(){
        return {
            result_reason: this.$route.params.resmsg,
            device:this.$device.getDevice(),
        }
    },
    mounted(){
        
    },
    methods:{
        ClickTo : function (qury){
            
            if (this.device === 'android') {
                
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'"  }');
                
            }
            if (this.device === 'ios') { 
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'"}')
            }
        
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写
        },
    }
}
</script>
<style scoped>
    .OrderFaileApp{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.OrderFaileApp .download{
    width:231px;
    height:44px;
    background:rgba(255,68,75,1);
    box-shadow:0px 5px 6px rgba(255,68,75,0.15);
    opacity:1;
    border-radius:5px;
    margin: 0 auto;
}
</style>