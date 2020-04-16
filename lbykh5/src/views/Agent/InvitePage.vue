<template>
    <div id="InvitePage">
        <div>
            <div class=" font_14" style="margin:0px 0 20px 0" flex="dir:top cross:center">
                <img style="width:64px;height:64px" src="https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png" alt="">

                <p style="color:#78849E;margin:10px 0 8px 0"><span>{{userName}}  </span><span>邀请您入驻</span></p>

                <p class="font_24" style="font-weight:bold">蜡笔优课</p>

                <p style="color:#2AC688;margin:8px 0 15px 0">立即获得互联网营销及教务管理能力</p>

                <p style="width:100%;">
                    <img style="width:100%;display:block;" src="../../images/agent/invite.png" alt="">
                </p>
            </div>

            <!-- 邀请区域 -->
            <div style="margin:0">
                <div class="draw_code">
                    <p flex="main:justify cross:center"><span class="font_14">手机号码</span></p>
                    <div flex="main:justify cross:center">
                        <input style="font-size:18px"  type="tel" pattern="[0-9]*" maxlength="11"  class="lb_mobliePhone" v-model="mobliePhone" placeholder="请输入手机号码" @blur="checkCode()">
                    </div>
                </div>


                <div class="draw_code">
                    <p flex="main:justify cross:center"><span class="font_14">短信验证码</span></p>
                    <div flex="main:justify cross:center">
                    <input type="tel" pattern="[0-9]*" v-model="checkCodes" maxlength="4" style="width:10em;font-size:18px" placeholder="请输入验证码">
                    <a class="agent_btn btn_blue" v-show="flag" :disabled="isDisabled" @click.prevent="getCheckCode()">点击获取</a>
                    <p v-show="showTow" class="color_blue">{{cuttingdown}} s</p>
                    </div>
                </div>
            </div>
            <!-- 邀请区域 -->
            <a  class="agent_btn btn_blue btn_56" @click="Invite(mobliePhone,checkCodes,cuid)">立即注册</a>
        </div>


        
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'

import { Toast } from 'vant'
const axios = require('axios')
export default {
    name:'InvitePage',
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            flag:true,
            showTow:false,
            mobliePhone:'',
            checkCodes:'',
            cuttingdown:'',
            cuid:this.$route.query.cuid,
            userINfo:'',
            userName:""
        }
    },
    beforeMount(){
        this.getUserInfo(this.cuid)
    },
    mounted(){

    },
    methods:{
        getCheckCode() {

            //检验手机号码
            if (this.checkCode() == false) {
                return false;
            }
            //按钮设置状态
            this.isDisabled = true;

            this.flag = false;

            //设置倒计时显示状态
            this.showTow = true;

            var url = this.ip + "smsVerCode/sendCode?phone=" + this.mobliePhone;

            // this.$http.post(url, {emulateJson: true}).then((res)=>{
                
            // })
            axios.post(url).then((res)=>{
                if(res.data.result == 'success'){
                    Toast('获取成功')
                }else{
                    Toast(res.data.msg)
                }
            })
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
        checkCode() {
            if (this.mobliePhone == "") {
                // this.messages("error", "手机号码不能为空!");
                Toast('手机号码不能为空!')
                return false;
            }

            var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
            if (!reg.test(this.mobliePhone)) {
                // this.messages("error", "号码格式不正确,请输入11位纯数字");
                // Notify({ type: 'warning', message: '号码格式不正确,请输入11位纯数字' ,duration:1000});
                Toast('号码格式不正确,请输入11位纯数字')
                return false;
            }
            return true;
        },
        
        Invite(mobliePhone,checkCodes,cuid){
            // /customerInviter/inviter
            if(mobliePhone){
                this.checkCode()
                if(checkCodes){
                    let url = this.ip+'customerInviter/inviter'
                    let param = new URLSearchParams()
                    param.append("phone",mobliePhone)
                    param.append("code",checkCodes)
                    param.append("inviterCuid",cuid)
                    axios.post(url,param).then((res)=>{
                        
                        if(res.data.result == 'success'){
                            this.$router.push({name:'InviteResult',query:{name:this.userName,cuid:this.cuid}})
                        }else{
                            Toast(res.data.msg)
                        }
                    })
                }else{
                    Toast('请输入验证码')
                }
            }else{
                Toast('请输入手机号码')
            }
        },
        getUserInfo(cuid){
            //获取用户信息
            let url = this.ip+'customer/baseInfo'
            let param = new URLSearchParams()
            param.append("cuid",cuid)
            // param.append("userToken",token)
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'success'){
                    //
                    let userINfo = res.data.data
                    this.userINfo = userINfo
                    if (userINfo.realName) {
                        this.userName = userINfo.realName 
                    }else{
                        this.userName = userINfo.name 
                    }
                    
                }
            })
        },
    }
}
</script>
<style>
    #InvitePage{
        
        width: 10rem;
        height: 100vh;
        padding: 30px 50px;
        box-sizing: border-box;
    }
</style>
<style scoped>
    @import url(../../../public/reset.css);
    @import url(../../css/join/JoinStore.css);
</style>