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
                <p flex="main:justify cross:center"><span class="font_16 blod">提现金额</span><span class="color_gray">可提现金额<span>3209.7元</span></span></p>
                <div flex="main:justify cross:center">
                <p><span>￥</span><input class="margin_left_10" type="text" placeholder="请输入提现金额"></p>
                <p class="font_14">全部提现</p>
                </div>
            </div>
            <!-- 短信验证码 -->
            <div class="draw_code">
                <p flex="main:justify cross:center"><span class="font_16 blod">短信验证码</span><span class="color_gray">验证码将发送至：186****0566</span></p>
                <div flex="main:justify cross:center">
                <input type="text" placeholder="请输入验证码">
                <a class="agent_btn btn_blue">点击获取</a>
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
export default {
    name:'Drawing',
    data(){
        return{
            ip: this.$ip.getIp(),
            Url: this.$Url.geturl(),
            device: this.$device.getDevice(),
        }
    }
}
</script>
<style lang="stylus" scoped>
    #Drawing
        padding 16px
</style>