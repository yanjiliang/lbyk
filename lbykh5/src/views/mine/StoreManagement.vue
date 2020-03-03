<template>
    <div class="storemanagement">
        <div class="container">
            
            <div class="topbox" style="z-index:9999">
                <div class="left">
                    <img :src="store_mana_data.logo" alt="" />
                </div>
                <div class="right">
                    <p class="store_name">{{store_mana_data.storeName}}</p>
                    
                    <div class="links">
                        <div class="orgindex">
                            <p style="line-height:14px;height:14px;margin-right:4px"><img style="width:14px;height:14px" src="../../images/mine/mdzy2x.png" alt=""></p>
                            <p style="height:20px;line-height:20px"  @click="store_mana_skipe_orgindex('MDZY')">门店主页</p>
                        </div>
                        <div class="edit">
                            <p style="line-height:14px;height:14px;margin-right:4px"><img style="width:14px;height:14px" src="../../images/mine/sz2x.png" alt=""></p>
                            <p style="height:20px;line-height:20px" @click="ClickTo('SZ')">设置</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bgpic">
                <div class="orginfo">
                    <p>基础服务<span v-if="time < 7300"><span v-if="base_effective"> · 使用中</span><span v-if="!base_effective"> · 已过期</span></span></p>
                    <div v-if="time < 7300">
                        <p v-if="base_effective">有效期至 {{base_expirationDate}}</p>
                        <p v-if="!base_effective">部分操作将受限，请及时续费</p>
                    </div>
                    <div v-if="time >= 7300">
                        <p>教务管理轻松便捷</p>
                    </div>
                    <p class="renew_btn"   v-if="time < 7300" @click="toRenew()"><span>续费</span></p>
                    <!-- <p v-if="base_openStatus == true && base_effective == false">超过有效期</p> -->
                    
                </div>
                <div class="top">
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
            </div>
            
        </div>
        <!-- <p>{{store_mana_data.functionalList}}</p> -->
       
        <div class="listbox">
            <div class="list">
                
                <div class="row">
                    <div class="list_item" @click.prevent="ClickTo('YGGL')">
                        <p style="box-shadow:0px 4px 6px rgba(255, 132, 36, .2);"><img src="../../images/mine/yggl2xnew.png" alt=""></p>
                        <p>员工管理</p>
                    </div>
                    <div class="list_item" @click.prevent="ClickTo('XYGL')">
                        <p style="box-shadow:0px 4px 6px rgba(33, 151, 254, .2);"><img src="../../images/mine/xygl2xnew.png" alt=""></p>
                        <p>学员管理</p>
                    </div>
                    <div class="list_item" @click.prevent="ClickTo('BJGL')">
                        <p style="box-shadow:0px 4px 6px rgba(252, 105, 90, .2);"><img src="../../images/mine/bjgl2xnew.png" alt=""></p>
                        <p>班级管理</p>
                    </div>
                </div>
                <div class="row">
                    <div class="list_item" @click.prevent="ClickTo('KCB')">
                        <p style="box-shadow:0px 4px 6px rgba(83, 147, 245, .2);"><img src="../../images/mine/kcb2xnew.png" alt=""></p>
                        <p>课程表</p>
                    </div>
                    <div class="list_item" @click.prevent="ClickTo('SKJL')">
                        <p style="box-shadow:0px 3px 6px rgba(255, 71, 102, .2);"><img src="../../images/mine/skjl2xnew.png" alt=""></p>
                        <p>上课记录</p>
                    </div>
                    <div class="list_item" @click.prevent="ClickTo('DK')">
                        <p style="box-shadow:0px 3px 6px rgba(151, 71, 255, .2);"><img src="../../images/mine/dk2xnew.png" alt=""></p>
                        <p>打卡</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- <p>{{store_mana_data.prompt}}</p> -->

        <div class="enrollmana" v-if="recruit_openStatus" @click="skipe_storemana()">
            <div class="pic"><img src="../../images/mine/zsgl2xnew.png" alt=""></div>
            <div class="info">
                <p>招生管理</p>
                <div v-if="time < 7300">
                    <p v-if="recruit_effective">有效期至{{recruit_expirationDate}}</p>
                    <p v-if="!recruit_effective" style="color:#FF444B">已过期，请尽快续费</p>
                </div>
                <div v-if="time >= 7300">
                    <p>更懂教育的互联网营销</p>
                </div>
            </div>
            <div class="btn">管理</div>
        </div>

        <div class="enrollmana" v-if="recruit_openStatus == false" @click="skipe_open_enrollFunc()">
            <div class="pic"><img src="../../images/mine/zsgl2xnew.png" alt=""></div>
            <div class="info">
                <p>招生管理</p>
                <div>
                    <p>尽享周边优质生源</p>
                </div>
            </div>
            <div class="btn">开通</div>
        </div>

        
    </div>
</template>
<script>
import { Toast } from 'vant'
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
            recruit_openStatus:'',
            recruit_effective:'',
            recruit_expirationDate:'',
            time:'',
            token:''
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
        toRenew(){
            window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "RENEW" ,"url": "'+this.Url+'/RenewPage","jump":"true","title":"续费","storeId": "'+this.storeId+'"}')
        },
        McDispatcher (qury){
            //接受数据
            this.userInfo = qury
            this.cuid =this.userInfo.data.cuid
            this.storeId = this.userInfo.data.storeId
            this.token = qury.data.token
            this.getStoreManaData(this.userInfo.data.cuid,this.userInfo.data.storeId,qury.data.token)
            // this.getFuctionInfo(this.cuid,this.storeId,qury.data.token)
        },
        
        linkIos : function (){
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        ClickTo : function (qury){
            
            if (this.device === 'android') {
                
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.storeId+'","classId":"" }');
                
            }
            if (this.device === 'ios') { 
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.storeId+'","classId":""}')
            }
    
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写
        },
        skipe_storemana(){
      
            if (this.device === 'android') {
                
                window.android.SkipPage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理","cuid":"'+this.cuid+'","storeId":"'+this.storeId+'"}');
                
            }
            if (this.device === 'ios') { 
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理","cuid":"'+this.cuid+'","storeId":"'+this.storeId+'"}')
        　　　　
            }
        },
        getStoreManaData(cuid,storeId,token){
            //苹果
            let url = this.ip + 'storeManager/info';
            //?cuid=' + cuid + '&storeId=' + storeId
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("storeId", storeId)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.store_mana_data = res.data.data
                let funclist = this.store_mana_data.functionalList
                for(let i=0;i<funclist.length;i++){
                    if(funclist[i].functional == 'BaseFunctional'){
                        //基础功能
                        this.base_effective = funclist[i].effective
                        this.base_openStatus = funclist[i].openStatus
                        this.base_expirationDate = funclist[i].expirationDate
                        let arrdate = this.base_expirationDate.split('-')
                        var date = new Date();
                        let year =arrdate[0] - date.getFullYear() 
                        let month =arrdate[1] - date.getMonth() + 1;
                        let day =arrdate[2] - date.getDate();
                        let today = year * 365 + month*30 + day

                        this.time = today
                    }else if(funclist[i].functional == 'RecruitStudents'){
                        //招生管理功能
                        this.recruit_effective = funclist[i].effective
                        this.recruit_openStatus = funclist[i].openStatus
                        this.recruit_expirationDate = funclist[i].expirationDate
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
            })
        },
        getStoreManaParams(msg){
            //安卓
            this.androidparams = msg
            this.cuid =msg.cuid;
            this.storeId =msg.storeId;
            this.getStoreManaData(msg.cuid,msg.storeId,msg.token)
            // this.getFuctionInfo(msg.cuid,msg.storeId.msg.token)
        },
        store_mana_skipe_orgindex (qury){
                //跳转机构主页
                
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/OrgIndexMana","title":"机构主页","storeId":"'+this.storeId+'"}');
                }
                if (this.device === 'ios') { 
                    
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/OrgIndexMana","title":"机构主页","jump":"true","storeId":"'+this.storeId+'"}')
                }
            },
        
        skipe_open_enrollFunc(){
            
            let url = this.ip + 'storeFunctional/checkOpening';
            let param = new URLSearchParams()
            param.append("cuid", this.cuid)
            param.append("functional", "RecruitStudents")
            param.append("storeId", this.storeId)
            param.append("userToken", this.token)
            axios.post(url,param).then((res)=>{
                let qury = res.data
                
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    if(qury.data.openStatus){
                        window.android.SkipPage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理","cuid":"'+this.cuid+'"}')
                    }else{
                        window.android.SkipPage('{"linkType": "h5","scheme": "KTZF" ,"url": "'+this.Url+'/activityPage","jump":"true","title":"首发特惠","cuid":"'+this.cuid+'","storeId": "'+this.storeId+'"}');
                    }
                }
                if (this.device === 'ios') { 
                    if(qury.data.openStatus){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZSGL" ,"storeId": "'+this.storeId+'","url":"'+this.Url+'/enrollmentManagement","title":"招生管理","cuid":"'+this.cuid+'"}')
                        window.open(location,'_self')
                    }else{
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "KTZF" ,"url": "'+this.Url+'/activityPage","jump":"true","title":"首发特惠","cuid":"'+this.cuid+'","storeId": "'+this.storeId+'"}')
                        window.open(location,'_self')
                    }
            　　　　
                }
            }).catch(()=>{

            })
            
                    
        }
        
    },
    
    
}
</script>
<style scoped>

@import url(../../../public/reset.css);

@import url(../../css/mine/storeMana.css); 

body{
    background: #f6f6f6;
}
</style>