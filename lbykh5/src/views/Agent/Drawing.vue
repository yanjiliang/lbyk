<template>
    <div id="Drawing">
        <div class="draw_wrap">
            <!-- 绑定支付宝 -->
            <div class="bind_zfb" flex="main:justify cross:center">
                <p><span class="block font_16 blod">提现到支付宝账号</span><span v-if="!uid" class="block color_gray">未绑定</span><span v-if="uid" class="block color_gray">{{uid.substring(0,3)+'****'+uid.substring(5+1)}}</span></p>
                <a class="agent_btn btn_blue" @click="toBind()" v-if="!uid">去绑定</a>
                <a class="agent_btn btn_blue" v-if="uid">解绑</a>
            </div>
            <!-- 提现金额 -->
            <div class="draw_num">
                <p flex="main:justify cross:center"><span class="font_16 blod">提现金额</span><span class="color_gray">可提现金额<span> {{fundInfo.balance}} 元</span></span></p>
                <div flex="main:justify cross:center">
                    <p style="width:15em"><span>￥</span><input class="margin_left_10" v-model="cashCount" type="text" placeholder="请输入提现金额"></p>
                    <p class="font_14" @click="cashCount = fundInfo.balance">全部提现</p>
                </div>
            </div>
            <!-- 短信验证码 -->
            <div class="draw_code">
                <p flex="main:justify cross:center"><span class="font_16 blod">短信验证码</span><span class="color_gray">验证码将发送至：{{pritephone}}</span></p>
                <div flex="main:justify cross:center" >
                    <input type="text" style="width:10em" v-model="checkCode" placeholder="请输入验证码">
                    <a class="agent_btn btn_blue" v-show="flag" :disabled="isDisabled" @click.prevent="getCheckCode()">点击获取</a>
                    <p v-show="showTow" class="color_blue">{{cuttingdown}} s</p>
                </div>
            </div>
            <!-- 提现按钮 -->
            <div class="draw_btn" @click="toDrawing()">
                <a class="agent_btn btn_blue">立即提现</a>
                <!-- :href="Url+'/DrawResult'" -->
            </div>
        </div>
    </div>
</template>

<script>

import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
import {Toast} from 'vant'
const axios = require('axios')
export default {
    name:'Drawing',
    data(){
        return{
            ip: this.$ip.getIp(),
            Url: this.$Url.geturl(),
            device: this.$device.getDevice(),
            cuttingdown:'',
            isDisabled:false,
            flag:true,
            showTow:false,
            mobliePhone:'',
            timer:'',
            cashCount:'',
            fundsCount:'999.99',
            fundInfo:'',
            pritephone:'',
            uid:'',
            checkCode:'',
            cip:'',
            cuid:String,
            token:String
        }
    },
    beforeMount(){
        //
        
        this.cip = returnCitySN['cip']
        console.log(this.cip)
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams

    },
    mounted(){
        
        this.linkIos()
    },
    methods:{
        sentCode(){
            // alert('121')
            let code = window.location.href
            this.currentUrl = code
            let cuid = this.$route.query.cuid
            // let code = 'http://www.labiyouke.com/h5/goodclass?app_id=2021001102632294&source=alipay_wallet&scope=auth_user&auth_code=2c9d7e309ec54bbdbaf58eb4cae9SX64'
            console.log(code)
            let index = code.indexOf('auth_code=')
            console.log(index)
            let slice = code.substring(index+10)
            console.log(slice)
            this.auth_code = slice
            let url = this.ip+'authorize/getAliAccessToken'
            let param = new URLSearchParams()
            param.append("cuid",cuid)
            param.append("grantType",'authorization_code')
            param.append("code",slice)
            axios.post(url).then((res)=>{
                if(res.data.result == 'noLogin'){
                    if(this.device == 'android'){
                        window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else if(this.device == 'ios'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                    
                }
                if(res.data.result == 'success'){
                    alert(res.data.msg)
                }
            })

        },
        getCheckCode() {

            //检验手机号码
            if (!this.uid) {
                Toast('先绑定支付宝');
            }
            //按钮设置状态
            this.isDisabled = true;

            this.flag = false;

            //设置倒计时显示状态
            this.showTow = true;

            var url = this.ip + "smsVerCode/sendCode?phone=" + this.mobliePhone;

            this.$http.post(url, {emulateJson: true}).then()

            //定时
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.cuttingdown = TIME_COUNT;
                this.showTow = true;
                this.timer = setInterval(() => {
                    if (this.cuttingdown > 0 && this.cuttingdown <= TIME_COUNT) {
                        this.cuttingdown--;
                    } else {
                        this.showTow = false;
                        this.flag = true;
                        this.isDisabled = false;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
            //this.isDisabled = false;

        },
        replaceNumber(text,start,end,replacetext){
               let mystr = text.substring(0,start)+replacetext+replacetext+replacetext+replacetext+text.substring(end+1);
               return mystr
        },
        getFundInfo(cuid,token){
            //获取账户信息
            let url = this.ip+'customerAccount/info'
            let param = new URLSearchParams()
            param.append("cuid",cuid)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'noLogin'){
                    if(this.device == 'android'){
                        window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else if(this.device == 'ios'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                    
                }
                if(res.data.result == 'success'){
                    //
                    let fundInfo = res.data.data
                    this.fundInfo = fundInfo
                    this.mobliePhone = fundInfo.phone
                    let phone = this.replaceNumber(fundInfo.phone,3,6,'*')
                    this.pritephone = phone
                    this.uid = fundInfo.UID
                }else{
                    Toast({
                        message:res.data.msg,
                        duration:0,
                        forbidClick:true,
                    })
                    
                }
            })
        },
        toBind(){
            //调到浏览器打开页面
            if(this.device == 'android'){
                //
                window.android.SkipPage('{"linkType": "h5","scheme":"SKIPOUT","url": "'+this.Url+'/SkipAli?cuid='+this.cuid+'","title":"跳转支付宝"}');
            }
            if(this.device == 'ios'){
                //
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme":"SKIPOUT","url": "'+this.Url+'/SkipAli?cuid='+this.cuid+'&token='+this.token+'","title":"跳转支付宝"}')
            }
        },
        Drawing(cuid,phone,code,amount,cashMethod,cashType,clientIp,clientType,alipayUserId){
            // 先判断后申请
            if(!this.uid){
                //
                if(this.cashCount){
                    //
                    if(this.checkCode){
                        //提现申请
                        let url = this.ip+'cashOrder/withdraw'
                        let param = new URLSearchParams()
                        param.append("cuid",cuid)
                        param.append("phone",phone)
                        param.append("code",code)
                        param.append("amount",amount)
                        param.append("cashMethod",cashMethod)
                        param.append("cashType",cashType)
                        param.append("clientIp",clientIp)
                        param.append("clientType",clientType)
                        param.append("alipayUserId",alipayUserId)
                        param.append("userToken", this.token)
                        axios.post(url,param).then((res)=>{
                            if(res.data.result == 'noLogin'){
                                if(this.device == 'android'){
                                    window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                                }else if(this.device == 'ios'){
                                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                                }
                                
                            }
                            if(res.data.result == 'success'){
                                //
                                if (this.device === 'android') {
                                    window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/DrawResult","title":"提现结果"}');
                                }
                                if (this.device === 'ios') {
                            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/DrawResult","title":"提现结果"}')
                                }
                            }
                        })
                    }else{
                        Toast('请输入验证码')
                    }
                }else{
                    Toast('请输入提现金额')
                }
            }else{
                Toast('先绑定支付宝')
            }
        },
        toDrawing(){
            if(this.device == 'android'){
                this.Drawing(this.cuid,this.mobliePhone,this.checkCode,this.cashCount,'wx','app',this.cip,'Android',this.alipayUserId)
            }
            if(this.device == 'ios'){
                this.Drawing(this.cuid,this.mobliePhone,this.checkCode,this.cashCount,'wx','app',this.cip,'iOS',this.alipayUserId)
            }
        },
        McDispatcher (qury){
            //iOS获取APP传过来的参数的方法
            this.token = qury.data.token
            this.cuid = qury.data.cuid
            if(!qury.data.token){
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            }
            this.getFundInfo(qury.data.cuid,qury.data.token)
        },
        getParams(msg){
            this.token = msg.token
            this.cuid = msg.cuid
            if(!msg.token){
            window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            }
            this.getFundInfo(msg.cuid,msg.token)
        },
        linkIos (){
                //给iOS APP传参
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },

        // toAli(){
        //     //跳转支付宝
        //     let url = 'http://192.168.3.22:8081/authorize/visitUrl?cuid=eYhjQznFDdvZiHz4oXt&scope=auth_user&redirect_uri=http%3A%2F%2Fwww.labiyouke.com%2Ftest%2Fpage02.html'
        //         // alert('121')
        //     axios.post(url).then((res)=>{
        //         if(res.data.result == 'success'){
                    
        //             let skip = 'alipays://platformapi/startapp?appId=20000067&url='+res.data.data
        //             let alink = document.createElement('a')
        //             alink.href = skip
        //             Toast(skip)
        //             setTimeout(()=>{alink.click()},200)
        //         }
        //     })
        // },
        // checkCode() {
        //     if (this.mobliePhone == "") {
        //         // this.messages("error", "手机号码不能为空!");
        //         Toast('手机号码不能为空!')
        //         return false;
        //     }

        //     var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
        //     if (!reg.test(this.mobliePhone)) {
        //         // this.messages("error", "号码格式不正确,请输入11位纯数字");
        //         // Notify({ type: 'warning', message: '号码格式不正确,请输入11位纯数字' ,duration:1000});
        //         Toast('号码格式不正确,请输入11位纯数字')
        //         return false;
        //     }
        //     return true;
        // },
    }
}
</script>
<style lang="stylus" scoped>
    #Drawing
        padding 16px
</style>