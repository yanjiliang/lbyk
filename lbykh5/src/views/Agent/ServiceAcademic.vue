<template>
    <div id="ServiceAcademic">
        <!-- 教务服务 -->
        <div class="agent_box text_center" style="padding: 30px 30px 40px 30px;font-weight: 300;">
            <div class="color_gray" style="line-height: 40px; letter-spacing: 3px;">管理轻松便捷</div>
            <div class="font_24 blod">教务服务功能组合</div>
            <div style="padding:20px 0 20px 0;">旨在解决教育培训机构纸质化管理落后、信息分散以及家校互通繁琐等问题</div>
            <div class="margin_bottom_24" flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">1</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">员工管理</span>
                    <span class="block font_16">教师或教务加入后，可随时查看授课记录，多维度的数据统计，让工资计算不再是难题。</span>
                </p>
            </div>
            <div class="margin_bottom_24" flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">2</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">学员管理</span>
                    <span class="block font_16">实现学员档案集中管理，档案信息随手可得，课时信息准确无误。</span>
                </p>
            </div>
            <div class="margin_bottom_24" flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">3</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">班级管理</span>
                    <span class="block font_16">支持班课模式和随到随学模式，班级是沟通和学习的基础，添加学员后要尽早分配到班级。</span>
                </p>
            </div>
            <div class="margin_bottom_24" flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">4</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">智能排课</span>
                    <span class="block font_16">支持一键按规则自动排课，也支持按日期选择排课，每个课节都可以设置不同的考勤员和授课老师，分散工作量，节省机构系统维护成本。</span>
                </p>
            </div>
            <div class="margin_bottom_24" flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">5</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">智能冲突检测</span>
                    <span class="block font_16">在添加学员到班级、排课等与人员时间安排有关系的地方，都进行了时间和人员的冲突检测并提醒。</span>
                </p>
            </div>
            <div class="margin_bottom_24" flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">6</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">智能课表</span>
                    <span class="block font_16">自动生成全机构的课程表。</span>
                </p>
            </div>
            <div class="margin_bottom_24" flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">7</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">班级圈/打卡</span>
                    <span class="block font_16">可以创建主题打卡活动，让朋友圈打卡信息不再流逝，成为机构的虚拟资产，学员打卡信息分享到朋友圈可自带招生课程推荐。</span>
                </p>
            </div>
            <div class="margin_bottom_24" flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">8</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">家校互动</span>
                    <span class="block font_16">上课提醒、到课通知、课时结算通知、打卡提醒、课时变动通知、上课时间变更通知等多种家校互动场景，构建机构标准化信息沟通渠道。</span>
                </p>
            </div>
            <div flex="main:left cross:left">
                <p class="color_gray" style="font-size: 32px; line-height: 48px; font-style: italic;">9</p>
                <p class="margin_left_24" style="text-align: left;">
                    <span class="block font_18 blod color_blue" style="line-height: 40px;">其他功能</span>
                    <span class="block font_16">转班、续课、扣课、退班、插班补课等功能一应俱全。</span>
                </p>
            </div>
            <div class="share_fix">
                <p><a class="agent_btn btn_blue font_14" @click="sharePage()" v-if="h5orApp == 'app'"><span class="iconfont block">&#xe75f;</span>分享</a></p>
            </div>
        </div>
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
import { Toast } from 'vant'
    export default {
        name: 'ServiceAcademic',
        data(){
            return{
                ip: this.$ip.getIp(),
                Url: this.$Url.geturl(),
                device: this.$device.getDevice(),
                h5orApp:'h5',
            }
        },
        beforeMount(){
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams
        },
        mounted(){
            this.linkIos()
        },
        methods:{
            
            sharePage(){
                let url = window.location.href
                if(this.device == 'android'){
                    //
                    window.android.SkipPage('{"linkType": "app","scheme": "SHARE","shareType":"SERVICELINK","url":"'+url+'","titile":"蜡笔优课","content":"【产品介绍】蜡笔优课致力于打造一体化的培训机构招生及管理","logo":"https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png"}')
                }
                if(this.device == 'ios'){
                    //
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "SHARE","url":"'+url+'","titile":"蜡笔优课","content":"【产品介绍】蜡笔优课致力于打造一体化的培训机构招生及管理","logo":"https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png"}')
                }
            },
            McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
                this.token = qury.data.token
                this.cuid = qury.data.cuid
                if(!qury.data.token){
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                setTimeout(()=>{
                    this.h5orApp= 'app'
                },200)
            },
            getParams(msg){
                this.token = msg.token
                this.cuid = msg.cuid
                if(!msg.token){
                window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                setTimeout(()=>{
                    this.h5orApp= 'app'
                },200)
            },
            linkIos (){
                    //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
        }
    }
</script>