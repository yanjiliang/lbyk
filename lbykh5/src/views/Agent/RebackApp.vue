<template>
    <div id="RebackApp">
        <div style="margin:100px auto;text-align: center;font-size: 12px;">
            
            <div>
                <p style="width: 70px;height:70px;padding: 6px;box-shadow: 0px 0px 35px rgba(0, 0, 0, .2);border-radius: 5px;margin: 20px auto;"><img style="width: 64px;height:64px;" src="https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png" alt=""></p>
                <p style="font-size: 18px;font-weight: bold;margin: 10px auto;">蜡笔优课</p>
            </div>
            <div>

                <p style="width: 65%;height: 48px;background: #2ac688;color: aliceblue;line-height: 48px;border-radius: 8px;margin: 26px auto;font-size: 16px;"><a style="color: white;" :href="alink">返回蜡笔优课</a></p>
            </div>

        </div>
        <van-overlay :show="show" >
            <div>
                <img style="width: 100%;" src="../../assets/images/derect.png" alt="">
            </div>
        </van-overlay>
    </div>
</template>
<script>
const axios = require('axios')
export default {
    name:'RebackApp',
    data(){
        return{
            ip: this.$ip.getIp(),
            Url: this.$Url.geturl(),
            device: this.$device.getDevice(),
            currentUrl:'121',
            auth_code:String,
            skip:'',
            show:false,
            alink:'',
            cuid:this.$route.query.cuid
        }
    },
    mounted() {
        this.init()
        setTimeout(()=>{
            // this.sentCode()
            let ip = this.ip

            let code = window.location.href
            console.log(code)
            let index = code.indexOf('auth_code=')
            let slice = code.substring(index+10)
            // this.alink = 'www.labiyouke.com://url=http://www.labiyouke.com/h5/goodclass'
            if(ip.indexOf('http://') > -1){
                let aa = ip.substring(7)
                this.alink = 'com.labiyouke.app://?name=http&url='+aa+'h5/Drawing?code='+slice
            }else if(ip.indexOf('https://') > -1){
                let aa = ip.substring(8)
                this.alink = 'com.labiyouke.app://?name=http&url='+aa+'h5/Drawing?code='+slice
            }
        },200)
    },
    methods: {
        // sentCode(){
        //     // alert('121')
        //     let code = window.location.href
        //     this.currentUrl = code
        //     let cuid = this.$route.query.cuid
        //     // let code = 'http://www.labiyouke.com/h5/goodclass?app_id=2021001102632294&source=alipay_wallet&scope=auth_user&auth_code=2c9d7e309ec54bbdbaf58eb4cae9SX64'
        //     console.log(code)
        //     let index = code.indexOf('auth_code=')
        //     console.log(index)
        //     let slice = code.substring(index+10)
        //     console.log(slice)
        //     this.auth_code = slice
        //     let url = this.ip+'authorize/getAliAccessToken'
        //     let param = new URLSearchParams()
        //     param.append("cuid",cuid)
        //     param.append("grantType",'authorization_code')
        //     param.append("code",slice)
        //     axios.post(url).then((res)=>{
        //         if(res.data.result == 'noLogin'){
        //             if(this.device == 'android'){
        //                 window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        //             }else if(this.device == 'ios'){
        //                 window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
        //             }
                    
        //         }
        //         if(res.data.result == 'success'){
        //             alert(res.data.msg)
        //         }
        //     })

        // },
        btn(){

            this.show = true
        },
        init(){
            let ua = navigator.userAgent
            if(ua.indexOf('Alipay') > -1){
                this.show = true
            }else{
                this.show = false
            }
        }
    },
}
</script>
<style>
    .van-overlay{
        background-color: rgba(0, 0, 0, .2);
    }
    a{
        text-decoration: none;
    }
</style>