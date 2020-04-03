<template>
    <div id="AgentInviteRecod">
        <!-- 我的客户开始 -->
        <div class="agent_box">
        <!-- 我的客户标题开始 -->
        <div class="agent_box_title" flex="main:justify cross:center">
            <span>我的邀请记录</span>
        </div>
        <!-- 我的客户标题结束 -->
        <!-- 客户列表开始 -->
        <ul class="custom_list">
            <li flex="main:justify cross:top" @click="toStoreDetail">
            <div flex="main:left cross:top">
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3362031625,1608568250&fm=11&gp=0.jpg"  class="avator_48">
                <div>
                <p><span class="blod">陈忠陈忠陈忠</span></p>
                <p class="color_gray font_12"><span>18681010566</span><span class="margin_left_10">3月12日注册</span></p>
                </div>
            </div>
            <div>
                <div class="text_center">
                <p class="store_name blod color_blue">0</p>
                <p class="color_gray font_12"><span>入驻门店数</span></p>
                </div>
            </div>
            </li>
            <li flex="main:justify cross:top" @click="toStoreDetail">
            <div flex="main:left cross:top">
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3362031625,1608568250&fm=11&gp=0.jpg"  class="avator_48">
                <div>
                <p><span class="blod">陈忠陈忠陈忠</span></p>
                <p class="color_gray font_12"><span>18681010566</span><span class="margin_left_10">3月12日注册</span></p>
                </div>
            </div>
            <div>
                <div class="text_center">
                <p class="store_name blod color_blue">0</p>
                <p class="color_gray font_12"><span>入驻门店数</span></p>
                </div>
            </div>
            </li>
            <li flex="main:justify cross:top" @click="toStoreDetail">
            <div flex="main:left cross:top">
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3362031625,1608568250&fm=11&gp=0.jpg"  class="avator_48">
                <div>
                <p><span class="blod">陈忠陈忠陈忠</span></p>
                <p class="color_gray font_12"><span>18681010566</span><span class="margin_left_10">3月12日注册</span></p>
                </div>
            </div>
            <div>
                <div class="text_center">
                <p class="store_name blod color_blue">0</p>
                <p class="color_gray font_12"><span>入驻门店数</span></p>
                </div>
            </div>
            </li>
            <li flex="main:justify cross:top" @click="toStoreDetail">
            <div flex="main:left cross:top">
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3362031625,1608568250&fm=11&gp=0.jpg"  class="avator_48">
                <div>
                <p><span class="blod">陈忠陈忠陈忠</span></p>
                <p class="color_gray font_12"><span>18681010566</span><span class="margin_left_10">3月12日注册</span></p>
                </div>
            </div>
            <div>
                <div class="text_center">
                <p class="store_name blod color_blue">0</p>
                <p class="color_gray font_12"><span>入驻门店数</span></p>
                </div>
            </div>
            </li>
        </ul>
        <!-- 客户列表结束 -->
        </div>
        <!-- 我的客户结束 -->
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
export default {
    name:'AgentInviteRecod',
    data(){
        return{
            ip: this.$ip.getIp(),
            Url: this.$Url.geturl(),
            device: this.$device.getDevice(),
        }
    },
    methods:{
        toStoreDetail(){
            let url = this.Url+'/StoreDetail'
            window.open(url)
        }
    }
}
</script>
<style>
    #AgentInviteRecod{
        box-sizing: border-box;
        padding: 16px;
        background: #f6f6f6;
        height: 100vh;
    }
</style>