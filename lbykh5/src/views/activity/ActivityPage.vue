<template>
    <div class="activityPage">
        <div class="container">
            <div class="topbox">
                <div class="top">
                    <div class="left">
                        <p>招生管理</p>
                        <!-- <p>标准价： ￥{{productInfo.tagPrice}}/年</p> -->
                        <p>更懂教育的互联网营销</p>
                    </div>
                    <div class="right">
                        <img src="../../images/activity/user2x.png" alt="">
                    </div>
                </div>
            </div>
            <div class="function_infobox">
                <p>功能介绍</p>
                <p>为培训机构提供区域性优质生源及提升机构互联网形象！让培训机构招生从此不再是难题。</p>
            </div>
            <!-- <Product :productInfo='productInfo' /> -->

            <div class="banner_box" style="display:none">
                <img :src="productInfo.picture" alt="" @click="Pump()">
            </div>

        

            <div class="privilege_show">
                <p><img src="../../images/activity/12x.png" alt=""></p>
                <p><img src="../../images/activity/22x.png" alt=""></p>
                <p><img src="../../images/activity/32x.png" alt=""></p>
                
            </div>
        </div>
        <div class="btn">
            <!-- <p @click="toOpen()">￥{{productInfo.sellingPrice}}  开启招生之旅</p> -->
            <p @click="toOpen()">免费开启招生之旅</p>
            <p>点击“提交”按钮即代表阅读并同意<a :href="Url+'/lbykServiceAgreement'">《蜡笔优课服务协议》</a></p>
        </div>
    </div>
</template>
<script>
import { Dialog } from 'vant';
import { Toast } from 'vant'
const axios = require('axios')

// import Product from '../../components/Product'
export default {
    name:'activityPage',
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            userInfo:'',
            productInfo:[],
            fun_info:'',
            cuid:'',
            token:'',
            storeId:'',
            resultinfo:'',
            goodsId:'',
            price:'',
        }
    },
    // components:{
    //     Product
    // },
    methods:{
        submitBuy(cuid,storeId,goodsId,price,token){
            
            let url = this.ip + 'functionalModule/purchaseOrder';
            // ?cuid=' +this.cuid + '&storeId=' + this.storeId + '&goodsId=' +this.productInfo.goodsId+ '&price=' +this.productInfo.sellingPrice;
            let param = new URLSearchParams()
            param.append("storeId", storeId)
            param.append("goodsId", goodsId)
            param.append("price", price)
            param.append("cuid", cuid)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.resultinfo= res.data.data
                if(this.resultinfo.status == 'openingSuccess'){//这里只是下单成功
                    //const orderId = this.resultinfo.data.orderDto.orderId
                    Toast.success('开通成功')
                    if(price == 0){
                        setTimeout(()=>{
                            if(this.device === 'android'){
                                window.android.SkipPage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理"}')
                            }else if(this.device === 'ios'){
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "FTPN" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理"}')
                            }
                        },2000)
                    }else{
                    //     if(this.device === 'android'){
                    //         window.android.SkipPage('{"linkType": "h5","scheme": "ZFYM","orderId":"'+orderId+'","storeId": "'+this.storeId+'","url":"'+this.Url+'/PayPage","title":"支付订单"}')
                    //     }else if(this.device === 'ios'){
                    //         window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZFYM","orderId":"'+orderId+'","storeId": "'+this.storeId+'","url":"'+this.Url+'/PayPage","title":"支付订单"}')
                    //     }
                    }
                    
                    
                    // if(price == 0){
                    //     Toast.success('开通成功')
                    //     setTimeout(()=>{
                    //         if(this.device === 'android'){
                    //             window.android.SkipPage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理"}')
                    //         }else if(this.device === 'ios'){
                    //             window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理"}')
                    //         }
                    //     },2000)
                    // }else{
                        
                    //     if(this.device === 'android'){
                    //         window.android.SkipPage('{"linkType": "h5","scheme": "ZFYM","orderId":"'+orderId+'","storeId": "'+this.storeId+'","url":"'+this.Url+'/PayPage","title":"支付订单"}')
                    //     }else if(this.device === 'ios'){
                    //         window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZFYM","orderId":"'+orderId+'","storeId": "'+this.storeId+'","url":"'+this.Url+'/PayPage","title":"支付订单"}')
                    //     }
                    // }
                    
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        getProductinfo(storeId,cuid,token){
            // let url = this.ip + 'recruitStudents/goodsInfo';
            let url = this.ip + 'goods/functionServiceGoods'
            let param = new URLSearchParams()
            param.append("storeId", storeId)
            param.append("functional", 'RecruitStudents')
            param.append("cuid", cuid)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.productInfo = res.data.data;
            }).catch((err)=>{
                console.log(err)
            })
        },
        getFuctionInfo(storeId,cuid,token){
        
            let url = this.ip + 'storeFunctional/checkOpening';
            //?cuid=' + cuid1+'&functional=RecruitStudents
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("functional", "RecruitStudents")
            param.append("storeId", storeId)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                let qury = res.data
                this.fun_info = qury
                this.storeId = qury.data.storeId //获取的门店id
                this.openStatus = qury.data.openStatus //功能是否开启
                this.effective = qury.data.effective //功能是否有效
                this.getProductinfo(this.storeId,this.cuid,this.token)
                if(qury.data.openStatus){
                    if(this.device === 'android'){
                        window.android.SkipPage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理"}')
                        }else if(this.device === 'ios'){
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理"}')
                        }
                }
            }).catch(()=>{

            })
        },
        Pump(){
            Dialog.alert({
            title:'活动规则',
            message: '1、活动时间：2020年3月10日截止.本活动仅对蜡笔优课注册机构会员开放；\n\n2、本活动原价798元的平台特权礼包限时免费抢驻；\n\n3、成功参加本次活动的机构将在蜡笔优课平台上免费获得一个月的招生特权使用权；\n\n4、本活动最终解释权归蜡笔优课所有，如有疑问请联系平台客服。'
            }).then(() => {
            // on close
            });
            
        },
        toOpen(){
            let that = this  
            let url = this.ip + 'storeFunctional/checkOpening';
            let param = new URLSearchParams()
            param.append("cuid", that.cuid)
            param.append("functional", "RecruitStudents")
            param.append("storeId", that.storeId)
            param.append("userToken", that.token)
            axios.post(url,param).then((res)=>{
                let qury = res.data
                this.fun_info = qury
                this.storeId = qury.data.storeId //获取的门店id
                this.openStatus = qury.data.openStatus //功能是否开启
                this.effective = qury.data.effective //功能是否有效
                if(this.userInfo.cuid){
                //登录后的操作
                    if(this.storeId){ //该用户是否有门店入驻
                        if(!this.openStatus){//当前门店是否开通了招生管理的功能
                            //未开通
                            const price = this.productInfo[0].sellingPrice
                            const goodsId = this.productInfo[0].goodsId
                            this.submitBuy(this.cuid,this.storeId,goodsId,price,this.token)
                            // Toast.success('开通成功')
                        }else{
                            if(this.openStatus){
                                if(this.device === 'android'){
                                    window.android.SkipPage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理"}')
                                }else if(this.device === 'ios'){
                                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理"}')
                                }
                            }
                        }
                    }else{
                        //弹框提示，入驻门店后再开通
                        Toast('请入驻门店后再开通！')
                    }
                }else{
                    //安卓登录待定
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"LOGIN"}')
                }
                
            }).catch(()=>{

            })

            if(this.userInfo.cuid){
                //登录后的操作
                if(this.storeId){ //该用户是否有门店入驻
                    if(!this.openStatus){//当前门店是否开通了招生管理的功能
                        //未开通
                        const price = this.productInfo[0].sellingPrice
                        const goodsId = this.productInfo[0].goodsId
                        this.submitBuy(this.cuid,this.storeId,goodsId,price,this.token)
                        // Toast.success('开通成功')
                    }
                }else{
                    //弹框提示，入驻门店后再开通
                    Toast('请入驻门店后再开通！')
                }
            }else{
                //安卓登录待定
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"LOGIN"}')
            }
            
        },
        McDispatcher (qury){
            //接受数据
            this.userInfo = qury.data
            this.cuid = qury.data.cuid
            this.storeId = qury.data.storeId
            this.token = qury.data.token
            this.getProductinfo(qury.data.storeId,qury.data.cuid,qury.data.token)
        },
        
        linkIos : function (){
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        getParams(msg){
                //拿到安卓拿来的数据
                this.userInfo = msg
                this.cuid = msg.cuid
                this.storeId = msg.storeId
                this.token = msg.token
                this.getFuctionInfo(msg.storeId,msg.cuid,msg.token)
            },
        
    },
    mounted(){
        this.linkIos()
    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams 
    }
}
</script>
<style lang="stylus" scoped>
@import url(../../../public/reset.css);
 @import url(../../css/activity/ActivityPage.css);
// @import "../../css/activity/ActivityPage.styl";
</style>
