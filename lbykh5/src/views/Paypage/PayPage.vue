<template>
    <div class="paypage">
        <div class="topbox">
            <div class="top">
                <div><i><img src="../../images/paypage/时间6@2x.png" alt=""></i><p>支付剩余时间 {{timing}}</p></div>
                <div><i>￥</i>{{productInfo.sellingPrice}}</div>
                <div>￥{{productInfo.tagPrice}}</div>
                <div>招生管理-{{orderId}}</div>
            </div>
        </div>
        
        <!-- <p>{{productInfo}}</p>  -->

        <div class="pay_ways_selectbox">
            <p>选择支付方式</p>
            <div class="weixin radiobox">
                <div class="left">
                    <p><img src="../../images/paypage/微信@2x.png" alt=""></p>
                    <p>微信支付</p>
                </div>
                <p></p>
                <p>
                    <van-radio-group v-model="radio" >
                        <van-radio name="1" checked-color="#FF444B" @click="selected ='1'"></van-radio>
                    </van-radio-group>
                </p>
            </div>
            <div class="alipay radiobox">
                <div class="left">
                    <p><img src="../../images/paypage/b-2@2x.png" alt=""></p>
                    <p>支付宝支付</p>
                </div>
                <p></p>
                <p>
                    <van-radio-group v-model="radio" >
                        <van-radio name="2" checked-color="#FF444B" @click="selected ='2'"></van-radio>
                    </van-radio-group>
                </p>
                
            </div>

           

        </div>
        <div class="pay_btn_box" @click="toPay()">
            <p class="pay_btn">确认支付</p>
        </div>
        
    </div>
</template>
<script>
import {Toast} from 'vant'

const axios = require('axios')
export default {
    name:'paypage',
    data(){
        return{
            ip:this.$ip.getIp(),
            device:this.$device.getDevice(),
            radio:'1',
            selected:'1',
            timing:'',
            productInfo:'',
            userInfo:'',
            goodsId:'',
            price:'',
            cuid:'',
            storeId:'',
            token:'',
            minite:'',
            seconds:'',
            timer:'',
            orderId:'',
            clientIp:'',
            isClicked:true
        }
    },
    methods:{
        getProductinfo(storeId,cuid,token){
            
            let url = this.ip + 'recruitStudents/goodsInfo';
            let param = new URLSearchParams()
            param.append("storeId", storeId)
            param.append("cuid", cuid)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.productInfo = res.data.data
                // this.goodsId = this.productInfo.goodsId;
                // this.price = this.productInfo.sellingPrice
                
            }).catch((err)=>{
                console.log(err)
            })
        },
        McDispatcher (qury){
            //接受数据
            
            this.userInfo = qury.data
            this.cuid = qury.data.cuid
            this.storeId = qury.data.storeId
            this.token = qury.data.token
            this.orderId = qury.data.orderId
            this.clientIp = qury.data.clientIp
            this.getProductinfo(qury.data.storeId,qury.data.cuid,qury.data.token)
        },
        linkIos : function (){
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        timingCut(val1){
            

            
            var now = val1;  //处理开始时间
            var minutes=900000;  //处理输入的过期时间
            var end = now.getTime()+minutes; //计算最后时间
            var time_now =  new Date().getTime(); //当前时间
            var msec =end - time_now;   //最后时间-当前时间
            if(msec>0){
                let min = parseInt(msec / 1000 / 60 % 60)
                let sec = parseInt(msec / 1000 % 60)
                min = min > 9 ? min : '0' + min
                sec = sec > 9 ? sec : '0' + sec,
                // document.getElementById('timer').innerHTML=`${day}天${hr}小时${min}分${sec}秒`
                this.timing = min +':'+ sec
            }else{
                clearInterval(tim);
                Toast('支付有效时间已到，请重新下单支付')
            }
            const that = this
            var tim=setTimeout(function () {
                that.timingCut(now)
            }, 1000)
            
        },
        toPay(){
            if(this.selected == 1){
                // Toast('微信支付')
                this.paying(this.cuid,this.orderId,'wx','h5',this.clientIp,'H5',this.token)
            }else if(this.selected == 2){
                // Toast('支付宝支付')
                this.paying(this.cuid,this.orderId,'ali','app',this.clientIp,'iOS',this.token)
            }
        },
        paying(cuid,orderId,payMethod,payType,clientIp,clientType,token){
            if(this.isClicked){
                this.isClicked = false
                let url = this.ip + 'payOrder/payment'
                let param = new URLSearchParams()
                param.append("cuid", cuid)
                param.append("orderId", orderId)
                param.append("payMethod", payMethod)
                param.append("payType", payType)
                param.append("clientIp", clientIp)
                param.append("clientType", clientType)
                param.append("userToken", token)
                axios.post(url,param).then((res)=>{
                    const ress = res.data.data
                    const url = ress.parameterMap.mwebUrl

                    if(ress.parameterMap.mwebUrl){
                        // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "WXPAY","mwebUrl":"'+url+'"}')
                        // window.location.href = url
                        window.open(url)
                    }
                    if(ress.parameterMap.orderStr){
                        
                        const str = ress.parameterMap
                        const str2 = JSON.stringify(str)
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ALIPAY","orderStr":'+str2+'}')
                    }
                    setTimeout(()=>{
                        this.isClicked = true
                    },2000)
                    
                })
            }
        }

    },
    mounted(){
        this.timingCut(new Date())
        this.linkIos()
        

    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
        
    }
}
</script>
<style scoped>
    @import url(../../../public/reset.css);
    .paypage .topbox{
        padding: 0.6133333rem 0.16rem 1.0133333rem 0.16rem;
    }
    .paypage .topbox .top{
        background: url('../../images/paypage/pay.png') no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 4.66666rem;
        opacity:1;
        text-align: center;
        border: 1px solid #fff;
    }
    .paypage .topbox .top div:nth-child(1){
        margin-top: 0.693333rem;
        margin-bottom: 0.32rem;
        height:17px;
        font-size:12px;
        font-weight:400;
        line-height:17px;
        color:#9B9B9B;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .paypage .topbox .top div:nth-child(1) i{
        width: 0.32rem;
        height: 0.32rem;
        margin-right: 4px; 
    }
    .paypage .topbox .top div:nth-child(1) img{
        width: 0.32rem;
        height: 0.32rem;
    }
    .paypage .topbox .top div:nth-child(2){
        
        height:0.96rem;
        font-size:30px;
        font-weight:normal;
        line-height:0.96rem;
        color:rgba(53,50,57,1);
    }
    .paypage .topbox .top div:nth-child(2) i{
        font-size:16px;
        font-weight: bold;
    }
    .paypage .topbox .top div:nth-child(3){
        text-decoration: line-through;
        height:0.453333rem;
        font-size:12px;
        font-weight:400;
        line-height:0.453333rem;
        color:#9B9B9B;
    }
    .paypage .topbox .top div:nth-child(4){
        height:0.53333rem;
        font-size:14px;
        font-weight:400;
        line-height:0.53333rem;
        color:rgba(94,88,98,1);
        margin-top: 0.53333rem;
    }

    /* 支付方式 */
    .paypage .pay_ways_selectbox{
        padding: 0 32px
    }
    .paypage .pay_ways_selectbox > p{
        width:96px;
        height:22px;
        font-size:16px;
        font-weight:400;
        line-height:22px;
        color:rgba(53,50,57,1);
        opacity:1;
        margin-bottom: 28px
    }
    
    .paypage .pay_ways_selectbox div img{
        width: 40px;
        height: 40px;
    }
    .paypage .pay_ways_selectbox div p:nth-child(1){
        width: 40px;
        height: 40px;
        margin-right: 20px;
    }
    .paypage .pay_ways_selectbox div p:nth-child(2){
        
        height:20px;
        font-size:14px;
        font-weight:400;
        line-height:20px;
        color:rgba(53,50,57,1);
        opacity:1;
    }
    .paypage .pay_ways_selectbox .radiobox{
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px
    }
    .paypage .pay_ways_selectbox .radiobox .left{
        align-items: center;
        display: flex;
    }
    
    .paypage .pay_ways_selectbox .radiobox .radio{
        width: 14px;
        height: 14px;
        border: 1px solid #ccc;
        border-radius: 50%;
    }

    
    .paypage .pay_btn_box{
        padding: 0 16px;
        text-align: center;
        margin-top: 200px;
    }
    .paypage .pay_btn_box .pay_btn{
        height:44px;
        background:rgba(255,68,75,1);
        opacity:1;
        border-radius:5px;
        font-size:16px;
        font-weight:400;
        line-height:44px;
        color:rgba(255,255,255,1);
    }

    
</style>