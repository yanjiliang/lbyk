<template>
    <div id="AgentInviteRecod">
        <!-- 我的客户开始 -->
        <div class="agent_box">
            <!-- 我的客户标题开始 -->
            <div class="agent_box_title" flex="main:justify cross:center">
                <span class="font_14">我的邀请记录</span>
            </div>
            <!-- 我的客户标题结束 -->
            <!-- 客户列表开始 -->
            <ul class="custom_list" v-if="InviteList.length != 0 && isDone == true">
                <li flex="main:justify cross:top" v-for="item in InviteList" :key="item.cuid">
                    <div flex="main:left cross:top">
                        <img v-if="item.avatar" :src="item.avatar" class="avator_48">
                        <p v-if="!item.avatar" class="avator_48 font_16 color_blue" style="border:1px solid #f6f6f6;text-align:center;line-height:48px">{{item.name.substring(item.name.length-2,item.name.length)}}</p>
                        <div>
                            <p><span class="blod">{{item.name}}</span></p>
                            <p class="color_gray font_12"><span>{{item.phone}}</span><span
                                    class="margin_left_10">{{item.regTime}}注册</span></p>
                        </div>
                    </div>
                    <div>
                        <div class="text_center">
                            <p class="store_name blod color_blue">{{item.storeCount}}</p>
                            <p class="color_gray font_12"><span>入驻门店数</span></p>
                        </div>
                    </div>
                </li>
                
            </ul>
            <!-- 客户列表结束 -->

            <!-- 缺省图 -->
            <div flex="dir:top cross:center" style="margin:200px 0" v-if="InviteList.length == 0 && isDone == true">
                <img style="width:150px;height:150px;display:block" src="../../assets/images/nodata2x.png" alt="">
                <p class="font_16 color_gray">暂无邀请记录</p>
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
    const axios = require('axios')
    import {
        Toast
    } from 'vant'
    export default {
        name: 'AgentInviteRecod',
        data() {
            return {
                ip: this.$ip.getIp(),
                Url: this.$Url.geturl(),
                device: this.$device.getDevice(),
                InviteList: '',
                isDone:false,
                cuid:String,
                token:String
            }
        },
        beforeMount(){
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams
        },
        mounted(){
            this.isDone = true
            this.linkIos()
        },
        methods: {
            // toStoreDetail() {
            //     let url = this.Url + '/StoreDetail'
            //     // window.open(url)
            //     if (this.device === 'android') {
            //         window.android.SkipPage('{"linkType": "h5","url": "'+url+'","title":"门店详情"}');
            //     }
            //     if (this.device === 'ios') { 
            // 　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+url+'","title":"门店详情"}')
            //     }
            // },
            getInviteList(cuid,token) {
                let url = this.ip + 'agent/inviteList';
                let param = new URLSearchParams()
                param.append("pageNo", 1)
                param.append("pageSize", 50)
                param.append("cuid", cuid)
                param.append("userToken", token)
                axios.post(url, param).then((res) => {
                    //数据处理
                    if(res.data.result == 'noLogin'){
                            if(this.device == 'android'){
                                window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }else if(this.device == 'ios'){
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }
                            
                        }
                    if (res.data.result == 'success') {
                        let InviteList = res.data.data
                        this.InviteList = InviteList.data
                        for(let i = 0;i<InviteList.data.length;i++){
                            let date = this.InviteList[i].regTime
                            let time = date.split(' ')
                            let mm = time[0].split('-')[1]
                            let dd = time[0].split('-')[2]
                            this.InviteList[i].regTime = mm+'月'+dd+'日'
                        }
                    } else if (res.data.result == 'error') {
                        Toast({
                            message:res.data.msg,
                            duration:0,
                            forbidClick:true
                        })
                    }
                })
            },
            McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
                this.token = qury.data.token
                this.cuid = qury.data.cuid
                if(!qury.data.token){
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                this.getInviteList(qury.data.cuid,qury.data.token)
            },
            getParams(msg){
                //android获取APP传过来的参数的方法
                this.token = msg.token
                this.cuid = msg.cuid
                if(!msg.token){
                    window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                this.getInviteList(msg.cuid,msg.token)
            },
            linkIos (){
                    //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
        }
    }
</script>
<style>
    #AgentInviteRecod {
        box-sizing: border-box;
        padding: 16px;
        background: #f6f6f6;
        height: 100vh;
    }
</style>