<template>
    <div id="InvitePage">
        <div style="margin-top:36px">
            <div class=" font_14" style="margin:10px 0 45px 0" flex="dir:top cross:center">
                <img style="width:64px;height:64px" src="https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png" alt="">

                <p style="color:#78849E;margin:10px 0 8px 0"><span>{{name}}  </span><span>邀请您入驻</span></p>

                <p class="font_24" style="font-weight:bold">蜡笔优课</p>

                <p style="color:#2AC688;margin:8px 0 40px 0">立即获得互联网营销及教务管理能力</p>

                <p style="width:100%;">
                    <img style="width:100%;display:block;" src="../../images/agent/invite02.png" alt="">
                </p>
            </div>

            
            <a  class="agent_btn btn_blue btn_56" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.lbyk.lbyk">前往app完成入驻</a>
        </div>


        
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'

// import { Toast } from 'vant'
// const axios = require('axios')
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
            name:this.$route.query.name
        }
    },
    methods:{
        rebackApp(){

        }
    }
}
</script>
<style>
    #InvitePage{
        
        width: 10rem;
        height: 100vh;
        padding: 35px;
        box-sizing: border-box;
    }
</style>
<style scoped>
    @import url(../../../public/reset.css);
    @import url(../../css/join/JoinStore.css);
</style>