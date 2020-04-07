<template>
    <div id="Drawing">
        <div class="draw_wrap">
            <!-- 绑定支付宝 -->
            <div class="bind_zfb" flex="main:justify cross:center">
                <p><span class="block font_16 blod">提现到支付宝账号</span><span class="block color_gray">未绑定</span></p>
                <a class="agent_btn btn_blue">去绑定</a>
            </div>
            <!-- 提现金额 -->
            <div class="draw_num">
                <p flex="main:justify cross:center"><span class="font_16 blod">提现金额</span><span class="color_gray">可提现金额<span>{{fundsCount}}元</span></span></p>
                <div flex="main:justify cross:center">
                <p><span>￥</span><input class="margin_left_10" v-model="cashCount" type="text" placeholder="请输入提现金额"></p>
                <p class="font_14" @click="cashCount = fundsCount">全部提现</p>
                </div>
            </div>
            <!-- 短信验证码 -->
            <div class="draw_code">
                <p flex="main:justify cross:center"><span class="font_16 blod">短信验证码</span><span class="color_gray">验证码将发送至：186****0566</span></p>
                <div flex="main:justify cross:center">
                <input type="text" placeholder="请输入验证码">
                <a class="agent_btn btn_blue" v-show="flag" :disabled="isDisabled" @click.prevent="getCheckCode()">点击获取</a>
                <p v-show="showTow" class="color_blue">{{cuttingdown}} s</p>
                </div>
            </div>
            <!-- 提现按钮 -->
            <div class="draw_btn">
                <a :href="Url+'/DrawResult'" class="agent_btn btn_blue">立即提现</a>
            </div>
        </div>
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
import {Toast} from 'vant'
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
            fundsCount:'999.99'
        }
    },
    beforeMount(){
        //
    },
    mounted(){

    },
    methods:{
        getCheckCode() {

            //检验手机号码
            // if (this.checkCode() == false) {
            //     return false;
            // }
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