<template>
    <div id="agentindex">
        <!-- 开始头部信息 -->
        <!-- <p>{{userInfo}}</p> -->
        <div class="agent_header" flex="main:left cross:center">
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=86265968,1507895075&fm=11&gp=0.jpg" class="avator_64">

            <div>
                <p class="font_20 blod">{{userInfo.realName}}</p>
                <p><a :href="Url+'/AgentRules'">代理政策及规则<span class="iconfont">&#xe743;</span></a></p>
            </div>
        </div>
        <!-- 代理账户 -->
        <div class="agent_box">
            <div class="agent_box_title" flex="main:justify cross:center">
                <span>代理账户</span>
                <a :href="Url+'/FundsDetail'">资金明细<span class="iconfont">&#xe743;</span></a>
            </div>
            <div flex="main:justify cross:center" class="text_center">
                <div><span class="font_20 blod block">{{userInfo.income}}</span><span class="font_12 color_gray block">总收入</span></div>
                <div><span class="font_20 blod block">{{userInfo.balance}}</span><span class="font_12 color_gray block">剩余提现余额</span>
                </div>
                <a :href="Url+'/Drawing'" class="agent_btn btn_gray">提现</a>
            </div>
        </div>
        <!-- 营销学院 -->
        <div class="agent_box" flex="main:justify cross:center">
            <div flex="main:left cross:center">
                <div class="agent_box_icon"><span class="iconfont">&#xe790;</span></div>
                <div>
                    <p class="font_16 blod">营销学院</p>
                    <p class="color_gray">学习产品营销技巧</p>
                </div>
            </div>
            <a class="agent_btn btn_blue" :href="Url+'/AgentSchool'">去学习</a>
        </div>
        <!-- 营销工具 -->
        <div class="agent_box invite_wrap">
            <div class="agent_box_title" flex="main:justify cross:center">
                <span class="color_blue blod">我的邀请战绩</span>
                <a :href="Url+'/AgentInviteRecod'">邀请记录<span class="iconfont">&#xe743;</span></a>
            </div>
            <div flex="main:justify cross:center" class="invite_box text_center">
                <p><span class="font_20 block color_blue">{{userInfo.invitedCount}}</span><span class="font_12 color_gray block">邀请总数</span>
                </p>
                <p><span class="font_20 block color_blue">{{userInfo.onlyRegisterCount}}</span><span class="font_12 color_gray block">仅注册人数</span>
                </p>
                <p><span class="font_20 block color_blue">{{userInfo.inviterStoreCount}}</span><span class="font_12 color_gray block">入驻门店总数</span>
                </p>
            </div>
            <div class="invite_tools text_center" flex="main:justify cross:center">
                <a :href="Url+'/Posters'" class="color_black"><span class="iconfont block font_32">&#xe75e;</span><span
                        class="font_12 block">营销海报</span></a>
                <a href="#" class="color_black"><span class="iconfont block font_32">&#xe764;</span><span
                        class="font_12 block">邀请链接</span></a>
                <a class="color_black"><span class="iconfont block font_32">&#xe74d;</span><span
                        class="font_12 block">App下载链接</span></a>
                <a :href="Url+'/ServiceIndex'" class="color_black"><span class="iconfont block font_32">&#xe79d;</span><span
                        class="font_12 block">服务介绍</span></a>
            </div>
        </div>
        <!-- 我的客户开始 -->
        <div class="agent_box">
            <!-- 我的客户标题开始 -->
            <div class="agent_box_title" flex="main:justify cross:center">
                <span>门店维护</span>
                <div class="font_12">
                    <i class="color_blue"><span class="iconfont font_12">&#xe78d;</span>正常</i>
                    <i class="color_gray"><span class="iconfont font_12">&#xe789;</span>未开通</i>
                    <i class="color_red"><span class="iconfont font_12">&#xe78b;</span>已到期</i>
                    <i class="color_yellow"><span class="iconfont font_12">&#xe77b;</span>即将到期</i>
                </div>
            </div>
            <!-- 我的客户标题结束 -->
            <!-- 我的客户tab开始 -->
            <div class="custom_tab" flex="main:justify cross:center">
                <a class="tab_cell active" @click="changeItem('all')">
                    <p class="font_20 blod">{{totalCount}}</p>
                    <p class="font_12 color_gray">所有门店</p>
                </a>
                <a class="tab_cell" @click="changeItem('expired')">
                    <p class="font_20 blod font_18">{{expiredCount}}</p>
                    <p class="font_12 color_gray">已到期</p>
                </a>
                <a class="tab_cell" @click="changeItem('expiring')">
                    <p class="font_20 blod">{{expiringCount}}</p>
                    <p class="font_12 color_gray">7日内到期</p>
                </a>
            </div>
            <!-- 我的客户tab结束 -->
            <!-- 客户列表开始 -->
            <ul class="custom_list">
                <li flex="main:justify cross:center" @click="ToStoreDetail">
                    <div flex="main:left cross:center">
                        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3281231102,3683095279&fm=11&gp=0.jpg" class="avator_48">
                        <div>
                            <p class="store_name blod">秦红梅国际儿童教育（亿利达店）微服私访胜多负少</p>
                            <p class="color_gray font_12"><span>教务服务</span><span
                                    class="iconfont font_12 color_blue">&#xe78d;</span><span
                                    class="margin_left_10">营销服务</span><span
                                    class="iconfont font_12 color_yellow">&#xe77b;</span><span
                                    class="margin_left_10 color_blue">试用中</span></p>
                        </div>
                    </div>
                    <span class="iconfont font_20 color_gray">&#xe743;</span>
                </li>
                <li flex="main:justify cross:center" @click="ToStoreDetail">
                    <div flex="main:left cross:center">
                        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1225147013,1266880682&fm=15&gp=0.jpg" class="avator_48">
                        <div>
                            <p class="store_name blod">秦红梅国际儿童教育（亿利达店）</p>
                            <p class="color_gray font_12"><span>教务服务</span><span
                                    class="iconfont font_12 color_blue">&#xe78d;</span><span
                                    class="margin_left_10">营销服务</span><span
                                    class="iconfont font_12 color_yellow">&#xe77b;</span></p>
                        </div>
                    </div>
                    <span class="iconfont font_20 color_gray">&#xe743;</span>
                </li>
                <li flex="main:justify cross:center" @click="ToStoreDetail">
                    <div flex="main:left cross:center">
                        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1225147013,1266880682&fm=15&gp=0.jpg" class="avator_48">
                        <div>
                            <p class="store_name blod">秦红梅国际儿童教育（亿利达店）</p>
                            <p class="color_gray font_12"><span>教务服务</span><span
                                    class="iconfont font_12 color_blue">&#xe78d;</span><span
                                    class="margin_left_10">营销服务</span><span
                                    class="iconfont font_12 color_yellow">&#xe77b;</span></p>
                        </div>
                    </div>
                    <span class="iconfont font_20 color_gray">&#xe743;</span>
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
    import axios from 'axios'
import { Toast } from 'vant'
    // const axios = require('axios')
    export default {
        name: 'AgentIndex',
        data() {
            return {
                ip: this.$ip.getIp(),
                Url: this.$Url.geturl(),
                device: this.$device.getDevice(),
                userInfo:'',
                StoreList:'',
                allStoreCount:'',
                expiredCount:'',
                expiringCount:'',
            }
        },
        beforeMount(){
            // window.McDispatcher = this.McDispatcher
            // window.getParams = this.getParams
        },
        mounted(){
            this.getInfo('eYhjQznFDdvZiHz4oXt')
            // this.linkIos()
        },
        methods:{
            ToStoreDetail(){
                let a = document.createElement('a')
                a.href = this.Url+'/StoreDetail'
                setTimeout(()=>{a.click()},200)
            },
            getInfo(cuid){
                let url = this.ip+'agent/info';
                let param = new URLSearchParams()
                param.append("cuid", cuid)
                axios.post(url,param).then((res)=>{
                    //数据处理
                    if(res.data.result == 'success'){
                        let UserInfo = res.data
                        this.userInfo = UserInfo.data
                    }else if(res.data.result == 'error'){
                        Toast(res.data.msg)
                    }
                })
            },
            getStoreList(cuid,status){
                if(status == ''){
                    let url = this.ip+'agent/storeList';
                    let param = new URLSearchParams()
                    param.append("pageNo", 1)
                    param.append("pageSize", 50)
                    param.append("cuid", cuid)
                    axios.post(url,param).then((res)=>{
                        //数据处理
                        if(res.data.result == 'success'){
                            let StoreList = res.data.data
                            this.StoreList = StoreList.pageData.data
                            this.allStoreCount = StoreList.totalCount
                            this.expiredCount = StoreList.expiredCount
                            this.expiringCount = StoreList.expiringCount
                        }else if(res.data.result == 'error'){
                            Toast(res.data.msg)
                        }
                    })
                }else{
                    let url = this.ip+'agent/storeList';
                    let param = new URLSearchParams()
                    param.append("pageNo", 1)
                    param.append("pageSize", 50)
                    param.append("cuid", cuid)
                    param.append("status", status)
                    axios.post(url,param).then((res)=>{
                        //数据处理
                        if(res.data.result == 'success'){
                            let StoreList = res.data.data
                            this.StoreList = StoreList.pageData.data
                            this.allStoreCount = StoreList.totalCount
                            this.expiredCount = StoreList.expiredCount
                            this.expiringCount = StoreList.expiringCount
                        }else if(res.data.result == 'error'){
                            Toast(res.data.msg)
                        }
                    })
                }
            },
            changeItem(status){
                let item = document.getElementsByClassName('tab_cell')
                if(status === 'all'){
                    //全部
                    item[0].classList.add('active')
                    item[1].classList.remove('active')
                    item[2].classList.remove('active')
                }else if(status === 'expired'){
                    //已过期
                    item[0].classList.remove('active')
                    item[1].classList.add('active')
                    item[2].classList.remove('active')
                }else if(status === 'expiring'){
                    //即将过期
                    item[0].classList.remove('active')
                    item[1].classList.remove('active')
                    item[2].classList.add('active')
                }
            }
            // McDispatcher (qury){
            //     //iOS获取APP传过来的参数的方法
            //     this.token = qury.data.token
            //     if(!qury.data.token){
            //     window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            //     }
            //     this.getInfo('eYhjQznFDdvZiHz4oXt')
            // },
            // getParams(msg){
            //     this.token = msg.token
            //     if(!msg.token){
            //     window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            //     }
            //     this.getInfo('eYhjQznFDdvZiHz4oXt')
            // },
            // linkIos (){
            //         //给iOS APP传参
            //     window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            // },
        }
    }
</script>
<style scoped>
    #agentindex{
        box-sizing: border-box;
        padding: 16px;
        background: #f6f6f6;
    }
</style>