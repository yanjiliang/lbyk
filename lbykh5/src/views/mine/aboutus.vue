<template>
    <div class="aboutus">
        <div class="container">
            
            <div class="logo">
                <p><img src="../../images/mine/aboutus.png" alt=""></p>
                <p><a href="http://www.baidu.com">蜡笔优课</a></p>
                <p>Version {{version}}</p>
            </div>
            
            <div class="info">
                <p><a :href="Url +'/UserServiceAgreement'">《蜡笔优课用户协议》</a>和<a :href="Url +'/UserPrivate'">《隐私政策》</a></p>
                <p>蜡笔优课 版权所有</p>
                <p>Copyright © 2019 labiyouke.com. All Rights Reserved.</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url(../../../public/reset.css);
@import url(../../css/mine/aboutus.css); 
</style>
<script>
export default {
    name:'aboutus',
    data(){
        return {
            Url: this.$Url.geturl(),
            version:''
        }
    },
    methods:{
        McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
            this.version = qury.data.version

                //解析传进来的json
                //给本地变量赋值，并判断经纬度是否为空，为空显示
        },
        getParams(msg){
            this.version = msg.version
        },
        linkIos (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams
        
    },
    mounted(){
        this.linkIos()
    }

}
</script>