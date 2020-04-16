<template>
    <div id="SkipAli" style="margin:100px auto;text-align: center;font-size: 12px;">
        
        <div>
            <p style="width: 70px;height:70px;padding: 6px;box-shadow: 0px 0px 35px rgba(0, 0, 0, .2);border-radius: 5px;margin: 20px auto;"><img style="width: 64px;height:64px;" src="https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png" alt=""></p>
            <p style="font-size: 18px;font-weight: bold;margin: 10px auto;">蜡笔优课</p>
        </div>
        <div>
            
            <p style="width: 65%;height: 48px;background: #2ac688;color: aliceblue;line-height: 48px;border-radius: 8px;margin: 26px auto;font-size: 16px;" ><a style="text-decoration:none;color:#fff" :href="alinkUrl">跳转支付宝授权</a></p>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
const axios = require('axios')
export default {
    name:'SkipAli',
    data(){
        return{
            ip: this.$ip.getIp(),
            Url: this.$Url.geturl(),
            device: this.$device.getDevice(),
            url:'121',
            cburl:String,
            skip:'',
            alinkUrl:'',
            cuid:this.$route.query.cuid,
            token:this.$route.query.token
        }
    },
    beforeMount(){
        this.senturl()
    },
    methods: {
            senturl(){
                //
                // let returnurl = this.Url + '/RebackApp?cuid='+this.cuid
                // let returnurl = 'www.labiyouke.com/h5/goodclass?cuid='+this.cuid
                let returnurl = 'http%3A%2F%2Fwww.labiyouke.com%2Ftest%2Fpage02.html'
                let url = this.ip+'authorize/aliVisitUrl?cuid='+this.cuid+'&scope=auth_user&redirectUri='+returnurl+'&userToken='+this.token
                console.log(url)
                // alert('121')
                axios.post(url).then((res)=>{
                    if(res.data.result == 'noLogin'){
                        if(this.device == 'android'){
                            window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }else if(this.device == 'ios'){
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }
                        
                    }
                    if(res.data.result == 'success'){
                        this.cburl = res.data.data
                        let skip = 'alipays://platformapi/startapp?appId=20000067&url='+res.data.data
                        console.log(skip)
                        let alink = document.createElement('a')
                        alink.href = skip
                        this.alinkUrl = skip
                        document.body.appendChild(alink);
                        setTimeout(()=>{alink.click();alink.remove()},300)
                    }else{
                        Toast({
                            message:res.data.msg,
                            duration:0,
                            forbidClick:true
                        })
                    }
                })

            }
        },
}
</script>
<style lang="stylus" scoped>

</style>