<template>
    <div id="DrawResult">
        <div class="draw_wrap text_center">
            <div class="draw_icon"><span class="iconfont color_blue">&#xe7c4;</span></div>
            <div class="draw_success"><p class="draw_success_title color_blue">提现成功</p><p class="color_gray">请到绑定的支付宝账号中查询款项</p></div>
            <div class="draw_btn">
                <a :href="Url+'/AgentIndex'" class="agent_btn btn_blue">完成</a>
            </div>
        </div>
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
export default {
    name:'DrawResult',
    data(){
        return{
            ip: this.$ip.getIp(),
            Url: this.$Url.geturl(),
            device: this.$device.getDevice(),
        }
    }
}
</script>