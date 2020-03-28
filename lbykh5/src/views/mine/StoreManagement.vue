<template>
    <div class="storemanagement">
        <div class="container">
            
            <div class="topbox" style="z-index:9999">
                <div class="store_mana_store_info_box">
                    <div class="store_mana_store_info">
                        <div class="store_mana_store_mainpic">
                            <div>
                                <img :src="store_mana_data.logo" alt="">
                            </div>
                        </div>
                        <div class="store_mana_store">
                            <div class="store_name">
                                <p>{{store_mana_data.storeName}}</p>
                            </div>
                            <div class="store_btn_box">
                                <p class="store_index_page" @click="store_mana_skipe_orgindex('MDZY')">门店主页 <span style="margin-left:4px"><img style="width:14px;height:14px;display:block" src="../../images/mine/turn-right2x.png" alt=""></span></p>
                                <p class="store_edit_btn" @click="ClickTo('SZ')"><img style="width:20px;display:block" src="../../images/mine/store-mana-edit.png" alt=""></p>
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>
            <div class="bgpic">
                <div class="store_service_wrap">
                    <div class="store_service_product_item">
                        <div class="store_service_info">
                            <p class="store_service_name">教务服务<span v-if="base_time < 7300"><span v-if="base_openStatus"><span v-if="base_effective"> · 使用中</span><span v-if="!base_effective"> · 已过期</span></span><span v-if="!base_openStatus"> · 未开通</span></span></p>
                            <div v-if="base_time < 7300">
                                <p v-if="base_effective">有效期至 {{base_expirationDate}}</p>
                                <p v-if="!base_effective">部分操作将受限，请及时续费</p>
                            </div>
                            <div v-if="base_time >= 7300">
                                <p>教务管理轻松便捷</p>
                            </div>
                            <p class="store_mana_renew_btn" :class="{'time_long':baseFunc}" v-if="base_time < 7300" @click="toRenew('BaseFunctional')"><span>续费</span></p>
                        </div>
                        <!-- <p>{{base_time}}</p> -->
                        <div class="store_data_info">
                            <div class="toptitle">
                                <p style="margin-bottom:4px">{{store_mana_data.readingStudentCount}}</p>
                                <p>在读学员</p>
                            </div>
                            <div class="toptitle">
                                <p style="margin-bottom:4px">{{store_mana_data.totalRemainingHours}}</p>
                                <p>剩余总课时</p>
                            </div>
                            <div class="toptitle">
                                <p style="margin-bottom:4px">{{store_mana_data.classHourConsumption}}</p>
                                <p>今日课消</p>
                            </div>
                        </div>

                        <van-divider />
                    </div>
                    <div class="store_service_listbox">
                        <div class="store_service_list">
                            <div class="row">
                                <div class="list_item" @click.prevent="ClickTo('YGGL')">
                                    <p><img style="box-shadow:0px 4px 6px rgba(255, 132, 36, .2);" src="../../images/mine/yggl2xnew.png" alt=""></p>
                                    <p>员工管理</p>
                                </div>
                                <div class="list_item" @click.prevent="ClickTo('XYGL')">
                                    <p><img style="box-shadow:0px 4px 6px rgba(33, 151, 254, .2);" src="../../images/mine/xygl2xnew.png" alt=""></p>
                                    <p>学员管理</p>
                                </div>
                                <div class="list_item" @click.prevent="ClickTo('BJGL')">
                                    <p><img style="box-shadow:0px 4px 6px rgba(252, 105, 90, .2);" src="../../images/mine/bjgl2xnew.png" alt=""></p>
                                    <p>班级管理</p>
                                </div>
                                <div class="list_item" @click.prevent="ClickTo('KCB')">
                                    <p><img style="box-shadow:0px 4px 6px rgba(83, 147, 245, .2);" src="../../images/mine/kcb2xnew.png" alt=""></p>
                                    <p>课程表</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="list_item" @click.prevent="ClickTo('SKJL')">
                                    <p><img style="box-shadow:0px 4px 6px rgba(255, 71, 102, .2);" src="../../images/mine/skjl2xnew.png" alt=""></p>
                                    <p>上课记录</p>
                                </div>
                                <div class="list_item" @click.prevent="ClickTo('DK')">
                                    <p><img style="box-shadow:0px 4px 6px rgba(151, 71, 255, .2);" src="../../images/mine/dk2xnew.png" alt=""></p>
                                    <p>打卡</p>
                                </div>
                                <div class="list_item"></div>
                                <div class="list_item"></div>
                            </div>
                        </div>
                    </div>

                    <!-- 营销服务  -->
                    <div class="store_service_product_item">
                        <div class="store_service_info">
                            <p class="store_service_name">营销服务
                                <span v-if="market_time < 7300">
                                    <span v-if="market_openStatus === true">
                                        <span v-if="market_effective"> · 使用中</span>
                                        <span v-if="!market_effective"> · 已过期</span>
                                    </span>
                                    <span v-if="market_openStatus === false"> · 未开通</span>
                                </span>
                            </p>
                            <div v-if="market_time < 7300">
                                <p v-if="market_effective">有效期至 {{market_expirationDate}}</p>
                                <p v-if="!market_effective">部分操作将受限，请及时续费</p>
                            </div>
                            <div v-if="market_time >= 7300">
                                <p>更懂教育的互联网营销</p>
                                
                            </div>
                            <p class="store_mana_renew_btn" :class="{'time_long':marketFunc}" v-if="market_time < 7300" @click="toRenew('MarketingService')"><span>续费</span></p>
                        </div>

                        <div class="store_data_info">
                            <div class="toptitle">
                                <p style="margin-bottom:4px">{{store_mana_data.upperShelfCourseCount}}</p>
                                <p>招生中课程</p>
                            </div>
                            <div class="toptitle">
                                <p style="margin-bottom:4px">{{store_mana_data.exposureCount}}</p>
                                <p>曝光总次数</p>
                            </div>
                            <div class="toptitle">
                                <p style="margin-bottom:4px">{{store_mana_data.appointmentCount}}</p>
                                <p>订单总量</p>
                            </div>
                        </div>

                        <van-divider />
                    </div>
                    <div class="store_service_listbox">
                        <div class="store_service_list">
                            
                            <div class="row">
                                
                                <div class="list_item" @click="skipe_storemana()">
                                    <p><img style="box-shadow:0px 4px 6px rgba(255, 71, 102, .2);" src="../../images/mine/zsgl2xnew.png" alt=""></p>
                                    <p>招生管理</p>
                                </div>
                                <div class="list_item" @click="enroll_skipe_order_page">
                                    <p><img style="box-shadow:0px 4px 6px rgba(151, 71, 255, .2);" src="../../images/mine/ddgl2xnew.png" alt=""></p>
                                    <p>预约管理</p>
                                </div>
                                <div class="list_item"></div>
                                <div class="list_item"></div> 
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>
<script>
import { Toast,Notify } from 'vant'
const axios = require('axios')
export default {
    name:'storemanagement',
    data(){
        return{
            userInfo:{},//ios参数
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            store_mana_data:{},
            androidparams:{},
            cuid:'',
            storeId:'',
            classId:'',
            fun_info:'',
            base_openStatus:'',
            base_effective:'',
            base_expirationDate:'',
            market_openStatus:'',
            market_effective:'',
            market_expirationDate:'',
            base_time:'',
            market_time:'',
            token:'',
            marketFunc:false,
            baseFunc:false
        }
    },
    beforeMount() {
        // this.getStoreManaData('wdIjWrRwFZN1E8iXVJr','STORE_KViD2PJ948G2eV0Agt2')
        window.McDispatcher = this.McDispatcher
        window.getStoreManaParams = this.getStoreManaParams
        
        
    },
    mounted(){
        this.linkIos()
    },
    methods: {
        enroll_skipe_order_page(){
                //跳转预约管理页面
               
                if (this.device === 'android') {
                    if(this.market_openStatus == false){
                        Toast('未开通营销服务，开通后即可享用该功能！')
                    }else{
                        window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/orderManagement","title":"预约管理","scheme":"QBYY","storeId":"'+this.storeId+'"}');
                    }
                }
                if (this.device === 'ios') { 
                    //jump  取值为true为跳新页面打开，false为当前页面打开
                    if(this.market_openStatus == false){
                        Toast('未开通营销服务，开通后即可享用该功能！')
                    }else{
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/orderManagement","title":"预约管理","scheme":"QBYY","storeId":"'+this.storeId+'","title":"预约管理"}')
                    }
                }
            },
        toRenew(func){
            window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "RENEW","renewType":"'+func+'" ,"url": "'+this.Url+'/RenewPage","jump":"true","title":"续费","storeId": "'+this.storeId+'"}')
        },
        McDispatcher (qury){
            //接受数据
            this.userInfo = qury
            this.cuid =qury.data.cuid
            this.storeId = qury.data.storeId
            this.token = qury.data.token
            this.getStoreManaData(qury.data.cuid,qury.data.storeId,qury.data.token)
            // this.getFuctionInfo(this.cuid,this.storeId,qury.data.token)
        },
        
        linkIos : function (){
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        ClickTo : function (qury){
            
            
            if(qury == 'DK'){
                // this.$router.push({path:'/CreateClockMana'})
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/CreateClockMana?cuid='+this.cuid+'&storeId='+this.storeId+'"}')
                }
                if (this.device === 'ios') { 
                    //http://192.168.3.22:8091/clock/clockDetails?cuid=eYhjQznFDdvZiHz4oXt&storeId=STORE_Sh8YinETjSwngmo2szC&clockId=CLOCK_pQNxuyGt6PQpanIYZEB
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/CreateClockMana?cuid='+this.cuid+'&storeId='+this.storeId+'"}')
                    // let url = this.Url+'/CreateClockMana?cuid='+this.cuid+'&storeId='+this.storeId
                    // let a = document.createElement("a")
                    // a.href = url
                    // setTimeout(()=>{a.click()},200)
                }
            }else{
                if (this.device === 'android') {
                    window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.storeId+'","classId":"" }')
                }
                if (this.device === 'ios') { 
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.storeId+'","classId":""}')
                }
            }
    
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写
        },
        skipe_storemana(){
      
            if (this.device === 'android') {
                if(this.market_openStatus == false){
                    Toast('未开通营销服务，开通后即可享用该功能！')
                }else{
                    window.android.SkipPage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理","cuid":"'+this.cuid+'","storeId":"'+this.storeId+'"}');
                }
            }
            if (this.device === 'ios') { 
                if(this.market_openStatus == false){
                    Toast('未开通营销服务，开通后即可享用该功能！')
                }else{
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理","cuid":"'+this.cuid+'","storeId":"'+this.storeId+'"}')
                }
            }
        },
        getStoreManaData(cuid,storeId,token){
            //苹果
            let url = this.ip + 'storeManager/info';
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("storeId", storeId)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                
                if(res.data.result == 'noPrivileges'){
                    // Toast(res.data.msg)
                    // Notify({ type: 'danger', message: res.data.msg})
                    Toast({
                        message: res.data.msg,
                        overlay : true,
                        forbidClick:true,
                        duration:0
                    })
                    setTimeout(()=>{
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK"}')
                    },1500)
                }else if(res.data.result == 'noLogin'){
                    if(this.device == 'android'){
                        window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else if(this.device == 'ios'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                }else if(res.data.result == 'success'){
                    this.store_mana_data = res.data.data
                    let funclist = this.store_mana_data.functionalList
                    for(let i=0;i<funclist.length;i++){
                        if(funclist[i].functional == 'BaseFunctional'){
                            //基础功能
                            this.base_effective = funclist[i].effective
                            this.base_openStatus = funclist[i].openStatus
                            this.base_expirationDate = funclist[i].expirationDate
            
                            let sDate2 = new Date()
                            let sDate1 = Date.parse(this.base_expirationDate);
                            sDate2 = Date.parse(sDate2);
                            let dateSpan =sDate1 - sDate2;
                            // dateSpan = Math.abs(dateSpan);
                            let iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
                            this.base_time = iDays+1
                            
                            this.base_time <=7 ? this.baseFunc = true : this.baseFunc = false
                        }else if(funclist[i].functional == 'MarketingService'){
                            //营销服务功能
                            this.market_effective = funclist[i].effective
                            this.market_openStatus = funclist[i].openStatus
                            this.market_expirationDate = funclist[i].expirationDate
                            if(funclist[i].expirationDate === ''){
                                this.market_expirationDate = new Date()
                            }
                            let sDate2 = new Date()
                            // let sDate2 = date.getFullYear() +'-'+(date.getMonth() + 1)+'-'+date.getDate()
                            let sDate1 = Date.parse(this.market_expirationDate);
                            sDate2 = Date.parse(sDate2);
                            let dateSpan =sDate1 - sDate2;
                            // dateSpan = Math.abs(dateSpan);
                            let iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
                            this.market_time = iDays+1
                            this.market_time <=7 ? this.marketFunc = true : this.marketFunc = false
                        }
                    }
                    if(this.store_mana_data.prompt){
                        if(this.device == 'android'){
                            window.android.SkipPage('{"linkType": "app","scheme": "MDXX" ,"storeId": "'+this.storeId+'"}');
                        }
                        if(this.device == 'ios'){
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "MDXX" ,"storeId": "'+this.storeId+'"}')
                        }
                    }
                }
                
            })
        },
        getStoreManaParams(msg){
            //安卓
            this.androidparams = msg
            this.cuid =msg.cuid;
            this.storeId =msg.storeId;
            this.token = msg.token
            this.getStoreManaData(msg.cuid,msg.storeId,msg.token)
        },
        store_mana_skipe_orgindex (qury){
                //跳转机构主页
                if (this.device === 'android') {
                    window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/OrgIndexMana","title":"机构主页","storeId":"'+this.storeId+'"}');
                }
                if (this.device === 'ios') { 
                    
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/OrgIndexMana","title":"机构主页","jump":"true","storeId":"'+this.storeId+'"}')
                }
            },
        
    },
    
    
}
</script>
<style scoped>

@import url(../../../public/reset.css);

@import url(../../css/mine/storeMana.css); 

body{
    background: #f6f6f6;
}
.time_long{
    color: #FFFFFF;
    background: #FF444B;
}
</style>