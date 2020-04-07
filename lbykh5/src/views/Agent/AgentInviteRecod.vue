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
                <li flex="main:justify cross:top" @click="toStoreDetail" v-for="item in InviteList" :key="item.cuid">
                    <div flex="main:left cross:top">
                        <img :src="item.avatar"
                            class="avator_48">
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
                isDone:false
            }
        },
        mounted(){
            this.isDone = true
        },
        methods: {
            toStoreDetail() {
                let url = this.Url + '/StoreDetail'
                window.open(url)
            },
            getInviteList(cuid) {
                let url = this.ip + 'agent/info';
                let param = new URLSearchParams()
                param.append("pageNo", 1)
                param.append("pageSize", 50)
                param.append("cuid", cuid)
                axios.post(url, param).then((res) => {
                    //数据处理
                    if (res.data.result == 'success') {
                        let InviteList = res.data.data
                        this.InviteList = InviteList.data
                    } else if (res.data.result == 'error') {
                        Toast(res.data.msg)
                    }
                })
            }
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