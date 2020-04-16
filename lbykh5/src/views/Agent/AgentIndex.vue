<template>
    <div id="agentindex">
        <!-- 开始头部信息 -->
        <!-- <p>{{cuid}}</p> -->
        <div class="agent_header" flex="main:left cross:center">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avator_64">
            <p v-if="!userInfo.avatar" class="avator_64 font_18 color_blue" style="border:1px solid #ffffff;text-align:center;line-height:64px">{{userInfo.realName.substring(userInfo.realName.length-2,userInfo.realName.length)}}</p>
            <div>
                <p class="font_20 blod">{{userInfo.realName}}</p>
                <!-- <p class="font_20 blod">赛诸葛</p> -->
                <p><a @click.prevent="skipStaticPage(Url+'/AgentRules','代理政策及规则')">代理政策及规则<span class="iconfont">&#xe743;</span></a></p>
            </div>
        </div>
        <!-- 代理账户 -->
        <div class="agent_box">
            <div class="agent_box_title" flex="main:justify cross:center">
                <span>代理账户</span>
                <a @click.prevent="skipStaticPage(Url+'/FundsDetail','资金明细')" >资金明细<span class="iconfont">&#xe743;</span></a>
            </div>
            <div flex="main:justify cross:center" class="text_center">
                <div><span class="font_20 blod block">{{userInfo.income}}</span><span class="font_12 color_gray block">总收入</span></div>
                <div><span class="font_20 blod block">{{userInfo.balance}}</span><span class="font_12 color_gray block">剩余提现余额</span>
                </div>
                <a @click.prevent="skipStaticPage(Url+'/Drawing','提现')" class="agent_btn btn_gray">提现</a>
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
            <a class="agent_btn btn_blue" @click.prevent="skipStaticPage(Url+'/AgentSchool','营销学院')">去学习</a>
        </div>
        <!-- 营销工具 -->
        <div class="agent_box invite_wrap">
            <div class="agent_box_title" flex="main:justify cross:center">
                <span class="color_blue blod">我的邀请战绩</span>
                <a @click.prevent="skipStaticPage(Url+'/AgentInviteRecod','邀请记录')" >邀请记录<span class="iconfont">&#xe743;</span></a>
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
                <a @click.prevent="skipStaticPage(Url+'/Posters?slider=2','营销海报')" class="color_black"><span class="iconfont block font_32">&#xe75e;</span><span
                        class="font_12 block">营销海报</span></a>
                <a @click="InviteLink" class="color_black"><span class="iconfont block font_32">&#xe764;</span><span
                        class="font_12 block">邀请链接</span></a>
                <a @click="downLoad" class="color_black"><span class="iconfont block font_32">&#xe74d;</span><span
                        class="font_12 block">App下载链接</span></a>
                        <!-- href="https://a.app.qq.com/o/simple.jsp?pkgname=com.lbyk.lbyk" -->
                <a @click.prevent="skipStaticPage(Url+'/ServiceIndex','服务介绍')" class="color_black"><span class="iconfont block font_32">&#xe79d;</span><span
                        class="font_12 block">服务介绍</span></a>
            </div>
        </div>
        <!-- 我的客户开始 -->
        <div class="agent_box">
            <!-- 我的客户标题开始 -->
            <div class="agent_box_title" flex="main:justify cross:center">
                <span>门店维护</span>
                <div class="font_12">
                    <i class="color_blue" style="margin-right:3px"><span class="iconfont font_12">&#xe78d;</span>正常</i>
                    <i class="color_gray" style="margin-right:3px"><span class="iconfont font_12">&#xe789;</span>未开通</i>
                    <i class="color_red" style="margin-right:3px"><span class="iconfont font_12">&#xe78b;</span>已到期</i>
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
            <ul class="custom_list" v-show="StoreList.length != 0 && isDone == true">
                <li flex="main:justify cross:center" @click="ToStoreDetail(index)" v-for="(store,index) in StoreList" :key="index">
                    <div flex="main:left cross:center">
                        <img :src="store.logo" class="avator_48">
                        <div>
                            <p class="store_name blod">{{store.storeName}}</p>
                            <div class="color_gray font_12">
                                <span v-for="(service, index) in store.serviceList" :key="index">
                                    <span :class="{'span_left':index==1}">{{service.service}}</span>
                                    <span v-if="service.status == 'normal'" class="iconfont font_12 color_blue">&#xe78d;</span>
                                    <span v-if="service.status == 'unopen'" class="iconfont font_12 color_gray">&#xe789;</span>
                                    <span v-if="service.status == 'expired'" class="iconfont font_12 color_red">&#xe78b;</span>
                                    <span v-if="service.status == 'expiring'" class="iconfont font_12 color_yellow">&#xe77b;</span>
                                </span>
                                <!-- <span class="margin_left_10 color_blue">试用中</span> -->
                            </div>
                        </div>
                    </div>
                    <span class="iconfont font_20 color_gray">&#xe743;</span>
                </li>
            </ul>
            <!-- 客户列表结束 -->
            <!-- 缺省图 -->
            <div flex="dir:top cross:center" v-show="StoreList.length == 0 && isDone == true">
                <img style="width:150px;height:150px;display:block" src="../../assets/images/nodata2x.png" alt="">
                <p class="color_gray font_14">暂无相关门店数据</p>
            </div>
            <!-- 缺省图 -->
        </div>
        <!-- 我的客户结束 -->
    </div>
</template>
<script>
    import 'flex.css'
    import '../../css/agent/iconfont.css'
    import '../../css/agent/agent.css'

    import { Toast } from 'vant'
    const axios = require('axios')
    export default {
        name: 'AgentIndex',
        data() {
            return {
                ip: this.$ip.getIp(),
                Url: this.$Url.geturl(),
                device: this.$device.getDevice(),
                isDone:false,
                cuid:'',
                userInfo:'',
                StoreList:'',
                expiredCount:'',
                expiringCount:'',
                totalCount:'',
                token:'',
                linktoinvite:''
            }
        },
        created(){
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams
        },
        mounted(){
            
            console.log(this.userInfo)
            setTimeout(()=>{
                this.isDone = true
            },200)
            this.linkIos()
        },
        methods:{
            ToStoreDetail(index){
                let storeId = this.StoreList[index].storeId
                let url = this.Url+'/StoreDetail?storeId='+storeId
                if (this.device === 'android') {
                    window.android.SkipPage('{"linkType": "h5","url": "'+url+'","title":"门店详情"}');
                }
                if (this.device === 'ios') { 
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+url+'","title":"门店详情"}')
                }
            },
            getInfo(cuid,token){
                let url = this.ip+'agent/info';
                let param = new URLSearchParams()
                param.append("cuid", cuid)
                param.append("userToken", token)
                axios.post(url,param).then((res)=>{
                    //数据处理
                    if(res.data.result == 'success'){
                        let UserInfo = res.data
                        this.userInfo = UserInfo.data
                        // console.log(this.userInfo)
                        if(!UserInfo.data.realNameAuth){
                            //没有实名认证
                            if (this.device === 'android') {
                                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/RealName","title":"实名认证"}');
                                // this.toRealName()
                            }
                            if (this.device === 'ios') { 
                        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/RealName","title":"实名认证"}')
                            }
                        }
                    }else if(res.data.result == 'error'){
                        Toast(res.data.msg)
                    }
                })
            },
            getStoreList(cuid,status,token){
                if(status == ''){
                    let url = this.ip+'agent/storeList';
                    let param = new URLSearchParams()
                    param.append("pageNo", 1)
                    param.append("pageSize", 50)
                    param.append("cuid", cuid)
                    param.append("userToken", token)
                    axios.post(url,param).then((res)=>{
                        //数据处理
                        if(res.data.result == 'noLogin'){
                            if(this.device == 'android'){
                                window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }else if(this.device == 'ios'){
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }
                            
                        }
                        if(res.data.result == 'success'){
                            let StoreList = res.data.data
                            this.StoreList = StoreList.pageData.data
                            this.totalCount = StoreList.totalCount
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
                    param.append("userToken", token)
                    axios.post(url,param).then((res)=>{
                        //数据处理
                        if(res.data.result == 'noLogin'){
                            if(this.device == 'android'){
                                window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }else if(this.device == 'ios'){
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }
                            
                        }
                        if(res.data.result == 'success'){
                            let StoreList = res.data.data
                            this.StoreList = StoreList.pageData.data
                            this.totalCount = StoreList.totalCount
                            this.expiredCount = StoreList.expiredCount
                            this.expiringCount = StoreList.expiringCount
                        }else if(res.data.result == 'error'){
                            Toast(res.data.msg)
                        }
                    })
                }
            },
            InviteLink(){
                //邀请链接
                let name = this.userInfo.realName
                let title = name+'邀请你加入蜡笔优课'
                let logo = 'https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png'
                let content = '即刻拥有更懂教育的无接触式营销以及轻松便捷的教务管理服务。'
                if(this.device == 'android'){
                    //
                    window.android.SkipPage('{"linkType": "app","scheme": "SHARE","shareType":"YQLINK","url":"'+this.Url+'/InvitePage?cuid='+this.cuid+'","title":"'+title+'","content":"'+content+'","logo":"'+logo+'"}')
                }
                if(this.device == 'ios'){
                    //
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "SHARE","url":"'+this.Url+'/InvitePage?cuid='+this.cuid+'","title":"'+title+'","content":"'+content+'","logo":"'+logo+'"}')
                }
            },
            downLoad(){
                // 下载链接分享
                if(this.device == 'android'){
                    //
                    window.android.SkipPage('{"linkType": "app","scheme": "SHARE","shareType":"DOWNLOADLINK","url":"https://a.app.qq.com/o/simple.jsp?pkgname=com.lbyk.lbyk","titile":"蜡笔优课","content":"【产品介绍】蜡笔优课致力于打造一体化的培训机构招生及管理","logo":"https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png"}')
                }
                if(this.device == 'ios'){
                    //
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "SHARE","url":"https://a.app.qq.com/o/simple.jsp?pkgname=com.lbyk.lbyk","titile":"蜡笔优课","content":"【产品介绍】蜡笔优课致力于打造一体化的培训机构招生及管理","logo":"https://lbyk.oss-cn-shenzhen.aliyuncs.com/imag/logo/LOGO.png"}')
                }
            },
            changeItem(status){
                let item = document.getElementsByClassName('tab_cell')
                if(status === 'all'){
                    //全部
                    item[0].classList.add('active')
                    item[1].classList.remove('active')
                    item[2].classList.remove('active')
                    this.getStoreList(this.cuid,'',this.token)
                }else if(status === 'expired'){
                    //已过期
                    item[0].classList.remove('active')
                    item[1].classList.add('active')
                    item[2].classList.remove('active')
                    this.getStoreList(this.cuid,'expired',this.token)
                }else if(status === 'expiring'){
                    //即将过期
                    item[0].classList.remove('active')
                    item[1].classList.remove('active')
                    item[2].classList.add('active')
                    this.getStoreList(this.cuid,'expiring',this.token)
                }
            },
            skipStaticPage(url,title){
                if(title == '提现'){
                    if(this.userInfo.balance != '0'){
                        Toast({
                            message:'暂无可提现金额'
                        })
                    }else{
                        if (this.device === 'android') {
                            if(title == '营销海报'){
                                window.android.SkipPage('{"linkType": "h5","scheme":"YXHB","url": "'+url+'","title":"'+title+'"}');
                            }else{
                                window.android.SkipPage('{"linkType": "h5","url": "'+url+'","title":"'+title+'"}');
                            }
                        }
                        if (this.device === 'ios') { 
                    　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+url+'","title":"'+title+'"}')
                        }
                    }
                }else{
                    if (this.device === 'android') {
                        if(title == '营销海报'){
                            window.android.SkipPage('{"linkType": "h5","scheme":"YXHB","url": "'+url+'","title":"'+title+'"}');
                        }else{
                            window.android.SkipPage('{"linkType": "h5","url": "'+url+'","title":"'+title+'"}');
                        }
                    }
                    if (this.device === 'ios') { 
                　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+url+'","title":"'+title+'"}')
                    }
                }
            },
            toRealName(){
                // window.android.SkipPage('{"linkType":"app","scheme":"REALNAME"}');
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/RealName","title":"实名认证"}')
            },
            McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
                this.token = qury.data.token
                this.cuid = qury.data.cuid
                if(!qury.data.token){
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                this.getStoreList(this.cuid,'',qury.data.token)
                this.getInfo(qury.data.cuid,qury.data.token)
                
                
            },
            getParams(msg){
                // this.userInfo='222'
                this.token = msg.token
                this.cuid = msg.cuid
                if(!msg.token){
                window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                this.getInfo(msg.cuid,msg.token)
                this.getStoreList(this.cuid,'',msg.token)
                
            },
            linkIos (){
                    //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
        }
    }
</script>
<style scoped>
    #agentindex{
        box-sizing: border-box;
        padding: 16px;
        background: #f6f6f6;
    }
    .span_left{
        margin-left: 8px;
    }
</style>