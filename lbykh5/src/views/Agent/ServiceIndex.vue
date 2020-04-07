<template>
    <div id="ServiceIndex">
        <!-- 教务服务 -->
        <div class="agent_box text_center" style="padding: 30px 30px 40px 30px">
        <div class="color_gray" style="line-height: 40px; letter-spacing: 3px;">管理轻松便捷</div>
        <div class="font_24" >教务服务功能组合</div>
        <div flex="main:justify cross:center" style="padding: 40px 0 10px 0;">
            <p><span class="block font_20 blod color_blue"><i class="font_12">￥</i>888<i class="font_12">/1年</i></span><span class="block font_12 color_gray">原价1600元</span></p>
            <p><span class="block font_20 blod color_blue"><i class="font_12">￥</i>1600<i class="font_12">/2年</i></span><span class="block font_12 color_gray">原价3200元</span></p>
            <p><span class="block font_20 blod color_blue"><i class="font_12">￥</i>2200<i class="font_12">/3年</i></span><span class="block font_12 color_gray">原价4800元</span></p>
        </div>
        <div class="color_gray font_12" style="line-height: 40px; padding-bottom: 40px;">*功能的增加或开展营销活动，会有小幅度波动</div>
            <a :href="Url+'/Posters?slider=2'" class="agent_btn btn_blue">营销海报</a>
            <a :href="Url+'/ServiceAcademic'" class="agent_btn btn_blue_border margin_left_24">详细介绍</a>
        </div>
        <!-- 营销服务 -->
        <div class="agent_box text_center" style="padding: 30px 30px 40px 30px">
        <div class="color_gray" style="line-height: 40px; letter-spacing: 3px;">更懂互联网营销</div>
        <div class="font_24" >营销服务功能组合</div>
        <div flex="main:justify cross:center" style="padding: 40px 0 10px 0;">
            <p><span class="block font_20 blod color_blue"><i class="font_12">￥</i>798<i class="font_12">/1年</i></span><span class="block font_12 color_gray">原价1500元</span></p>
            <p><span class="block font_20 blod color_blue"><i class="font_12">￥</i>1500<i class="font_12">/2年</i></span><span class="block font_12 color_gray">原价3000元</span></p>
            <p><span class="block font_20 blod color_blue"><i class="font_12">￥</i>2000<i class="font_12">/3年</i></span><span class="block font_12 color_gray">原价4500元</span></p>
        </div>
        <div class="color_gray font_12" style="line-height: 40px; padding-bottom: 40px;">*功能的增加或开展营销活动，会有小幅度波动</div>
            <a :href="Url+'/Posters?slider=2'" class="agent_btn btn_blue">营销海报</a>
            <a :href="Url+'/ServiceMarket'" class="agent_btn btn_blue_border margin_left_24">详细介绍</a>
        </div>
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
export default {
    name:'ServiceIndex',
    data(){
        return{
            ip: this.$ip.getIp(),
            Url: this.$Url.geturl(),
            device: this.$device.getDevice(),
        }
    }
}
</script>