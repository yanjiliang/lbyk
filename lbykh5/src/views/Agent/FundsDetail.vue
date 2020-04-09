<template>
    <div id="FundsDetail">
        <!-- 资金明细 -->
        <ul class="deal_list">
            <li flex="main:justify cross:center" v-for="funds in fundsDetail" :key="funds.createTime">
                <div flex="main:left cross:center">
                    <img :src="funds.picUrl" class="avator_48">
                    <div>
                        <p class="store_name blod">{{funds.title}}</p>
                        <p class="color_gray font_12 color_blue"><span>{{funds.createTime}}</span><span
                                class="margin_left_10">{{funds.typeName}}</span></p>
                    </div>
                </div>
                <span class="font_18 blod margin_left_10 color_blue">{{funds.amount}}</span>
            </li>
            
        </ul>

        <!-- 缺省图 -->
        <div flex="dir:top cross:center" style="margin:200px 0">
            <img style="width:150px;height:150px;display:block" src="../../assets/images/nodata2x.png" alt="">
            <p class="font_14 color_gray">暂无相关数据</p>
        </div>
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
import {Toast} from 'vant'
const axios = require('axios')
    export default {
        name:'FundsDetail',
        data(){
            return{
                ip: this.$ip.getIp(),
                Url: this.$Url.geturl(),
                device: this.$device.getDevice(),
                fundsDetail:""
            }
        },
        beforeMount(){
            //
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams
        },
        mounted(){
            //
            this.linkIos()
        },
        methods:{
            getData(cuid){
                let url = this.ip+'customer-account-flow/listPage'
                let param = new URLSearchParams()
                param.append("pageNo",1)
                param.append("pageSize",50)
                param.append("cuid",cuid)
                axios.post(url,param).then((res)=>{
                    if(res.data.result == 'success'){
                        let fundsDetail = res.data.data
                        this.fundsDetail = fundsDetail.data
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
                
            },
            getParams(msg){
                //android获取APP传过来的参数的方法
                this.token = msg.token
                this.cuid = msg.cuid
                if(!msg.token){
                    window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                
            },
            linkIos (){
                    //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
        }
    }
</script>
<style scoped>
    #FundsDetail{
        box-sizing: border-box;
        padding: 16px;
    }
</style>