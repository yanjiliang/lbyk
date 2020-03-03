<template>

    <div class="msgList">
            <div class="navbox" v-if="type == 'classStudent' || type == 'classTeacher'">
                <a class="msg_orgin" @click.prevent="msg_skipe_orgindex('JGZY')"><span class="orglocation">{{msgorg_data.storeName}}<img src="../../images/msgasist/return2.png"></span></a>
                <div class="nav" >
                    <div class="navitem">
                        <a @click.prevent="ClickTo('LXJG')" href="">
                            <img src="../../images/msgasist/联系机构@2x.png" alt="">
                            <p>联系机构</p>
                        </a>
                    </div>
                    <!-- <div class="navitem">
                        <a @click.prevent="msg_skipe_orgindex('JGZY')" href="">
                            <img src="../../images/msgasist/机构主页@2x.png" alt="">
                            <p>机构主页</p>
                        </a>
                    </div> -->
                    <div class="navitem">
                        <a @click.prevent="ClickTo('BJXQ')" href="">
                            <img src="../../images/msgasist/班级详情@2x.png" alt="">
                            <p>班级详情</p>
                        </a>
                    </div>
                    <div class="navitem">
                        <a @click.prevent="ClickTo('KSJL')" href="">
                            <img src="../../images/msgasist/课时记录@2x.png" alt="">
                            <p>课时记录</p>
                        </a>
                    </div>
                    <div class="navitem">
                        <a @click.prevent="msg_skipe_orgindex('DK')" href="">
                            <img src="../../images/msgasist/dk2x.png" alt="">
                            <p>打卡</p>
                        </a>
                    </div>
                </div>
            </div>

            <!-- <p>{{isManager}}</p> -->
            <!-- <p>{{msg_staffinfo_data}}</p> -->

            <ul>
                <li class="msglistli" v-for="(item,index) in Asistlist" :key="index" @click.prevent="msg_skipe_teacher(index)">
                    <div class="msgtime">
                        <p>{{item.sendTime}}</p>
                    </div>
                    <div class="msgbox">
                        <div class="msgtitlebox">
                            <i v-if="item.icon"><img src="../../images/msgasist/sktx.png" alt=""></i>
                            <span class="msgtitle" v-if="item.title">
                                {{ item.title }}
                            </span>
                        </div>
                        <p class="msgcontent">{{ item.content }}</p>
                        
                        <van-divider v-if='item.msgLinkDtoList.length !== 0' class="msgdivider" style="margin:0"/>
                        <p class="msgevent" v-if="item.msgLinkDtoList.length !== 0">
                            <a>{{ item.msgLinkDtoList[0].content}}</a>
                        </p>
                    </div>
                </li>
            </ul>

            
            
    </div>

</template>

<script>
import { Toast } from 'vant'
const axios = require('axios')
export default {
    name:'msgList',
    data () {
        return {
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            msg:{},
            Asistlist: [],//消息数据列表存储
            msg_userInfo:'',//接受ios传来的参数
            msglist_data:{},//请求的数据缓存
            type:'',//消息主体类型system：系统 | store：门店 | classStudent：班级学员 | classTeacher：班级老师
            mcid:'',//消息主体ID，请求数据用
            msg_storeid:'',//
            msg_classid:'',//
            msg_studentid:'',
            msg_cuid:'',
            phone:'',
            msgorg_data:'',
            skip_h5_app:'',
            msg_staffinfo_data:'',
            lng:'',
            lat:'',
            parameter:'',
            msg_identity:'',
            employStatus:'',
            staffId:'',
            isManager:Boolean
        }
    },
    
    beforeMount(){
        window.McDispatcher = this.McDispatcher
        window.getMsgParams = this.getMsgParams
        
        
    }
    ,mounted(){
        this.loading=false //控制骨架屏
        this.linkIos()
        
        
    }
    ,methods:{
        McDispatcher : function (qury){
            this.msg_userInfo = qury
            this.mcid = qury.data.mcid
            this.type = qury.data.type
            this.msg_storeid = qury.data.storeId
            this.msg_classid = qury.data.classId
            this.msg_studentid = qury.data.studentId

            this.$nextTick(()=>{
                // this.getData(qury.data.mcid)
                this.getData(qury.data.mcid,qury.data.storeId,qury.data.cuid,qury.data.token)
                this.getorgphone(qury.data.storeId,qury.data.cuid,qury.data.token)
                this.getStaffInfo(qury.data.cuid,qury.data.cuid,qury.data.storeId,qury.data.classId,qury.data.token)
                this.getStaffId(qury.data.cuid,qury.data.cuid,qury.data.storeId,qury.data.token)
            })
        },
        linkIos : function (){
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        getMsgParams(msg){
            this.msg_userInfo = msg
            this.mcid = msg.mcid
            this.type = msg.type
            this.msg_storeid = msg.storeId
            this.msg_classid = msg.classId
            this.msg_studentid = msg.studentId
            this.lng = msg.longitude
            this.lat = msg.latitude
            
            this.getData(msg.mcid,msg.storeId,msg.cuid,msg.token)
            
            this.getorgphone(msg.storeId,msg.cuid,msg.token)
            this.getStaffInfo(msg.cuid,msg.cuid,msg.storeId,msg.classId,msg.token)
        },
        ClickTo : function (qury){
            
            if (this.device === 'android') {
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.msg_storeid+'","staffId":"'+this.staffId+'","classId":"'+this.msg_classid+'","Phonenumber":"'+this.phone+'","studentId":"'+this.msg_studentid+'","identity":"'+this.msg_identity+'","isManager":"'+this.isManager+'","employStatus":"'+this.employStatus+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'","type":"'+this.type+'"}');
            }
            if (this.device === 'ios') { 
                //Toast(this.msg_identity)
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.msg_storeid+'","staffId":"'+this.staffId+'","classId":"'+this.msg_classid+'","Phonenumber":"'+this.phone+'","studentId":"'+this.msg_studentid+'","isManager":"'+this.isManager+'","identity":"'+this.msg_identity+'","employStatus":"'+this.employStatus+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}')
            }
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写 
        },
        getData(mcId,storeId,cuid,token){
            let url = this.ip + 'message/listPage';
            //?mcId='+mcid+'&pageNo=1&pageSize=10
            let param = new URLSearchParams()
            param.append("mcId", mcId)
            param.append("pageNo", "1")
            param.append("pageSize", "10")
            param.append("storeId", storeId)
            param.append("cuid", cuid)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.msglist_data = res.data.data
                this.Asistlist = this.msglist_data.data
                
                // msgLinkDtoList
            }).catch((err)=>{
                console.log(err)
                
            })
         },
         getStaffInfo(cuid,staffCuId,storeId,classId,token){
            let url = this.ip + 'classStaff/statusAndRole';
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("staffCuId", staffCuId)
            param.append("storeId", storeId)
            param.append("classId", classId)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.msg_staffinfo_data = res.data.data
                this.isManager = this.msg_staffinfo_data.manager
                this.msg_staffinfo_data.working === true ? this.employStatus = '1' : this.employStatus = '0';
                
                if(this.type == 'classStudent'){
                    this.msg_identity = 'student'
                }else{
                    let len = this.msg_staffinfo_data.roleList.length
                    let list = this.msg_staffinfo_data.roleList
                    for(let i=0;i<len;i++){
                        if(list[i] === 'attendOfficer'){
                            this.msg_identity = 'attendOfficer'
                            return
                        }else{
                            this.msg_identity = 'teacher'
                        }
                    }
                    
                }
            }).catch((err)=>{
                console.log(err)
                
            })
         },
        getStaffId(cuid,staffCuId,storeId,token){
            let url = this.ip + 'store-staff/statusAndRole';
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("staffCuId", staffCuId)
            param.append("storeId", storeId)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.staffId = res.data.data.staffId
            })
        },
        getorgphone(storeId,cuid,token){
            let url = this.ip + 'store/info';
            //?storeId='+storeId
            let param = new URLSearchParams()
            param.append("storeId", storeId)
            param.append("cuid", cuid)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.msgorg_data = res.data.data
                this.phone = this.msgorg_data.servicePhone
            }).catch((err)=>{
                console.log(err)
            })
         },
         msg_skipe_teacher (index){
                //跳转页面
            
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    // this.$router.push({name:'Teacher',params:{storeId:this.cd_storeid,courseId:this.cd_courseid}})
                    if(this.Asistlist[index].msgLinkDtoList[0].jumpType == 'noJump'){
                        return
                    }else if(this.Asistlist[index].msgLinkDtoList[0].jumpType == 'app'){
                        //跳APP页面的方法调用
                        let qury = this.Asistlist[index].msgLinkDtoList[0]
                        this.parameter = JSON.parse(qury.parameter)
                        let storeId = JSON.parse(qury.parameter).storeId
                        let classId = JSON.parse(qury.parameter).classId
                        let studentId = JSON.parse(qury.parameter).studentId
                        let classScheduleId = JSON.parse(qury.parameter).classScheduleId
                    
                            window.android.SkipPage('{"linkType": "app","scheme": "'+ qury.url +'" ,"storeId": "'+storeId+'","classId":"'+classId+'","studentId":"'+studentId+'","classScheduleId":"'+classScheduleId+'","identity":"'+this.msg_identity+'","employStatus":"'+this.employStatus+'"}')

                    }else if(this.Asistlist[index].msgLinkDtoList[0].jumpType == 'h5'){
                        //跳H5页面的方法
                        let qury = this.Asistlist[index].msgLinkDtoList[0]
                        this.parameter = JSON.parse(qury.parameter)
                        let storeId = JSON.parse(qury.parameter).storeId
                        let classId = JSON.parse(qury.parameter).classId
                        let studentId = JSON.parse(qury.parameter).studentId
                        let classScheduleId = JSON.parse(qury.parameter).classScheduleId
                            window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/OrderManagement" ,"title":"预约管理","storeId": "'+storeId+'","classId":"'+classId+'","studentId":"'+studentId+'","classScheduleId":"'+classScheduleId+'","identity":"'+this.msg_identity+'","employStatus":"'+this.employStatus+'"}')

                    }else if(this.Asistlist[index].msgLinkDtoList[0].jumpType == 'api'){
                        //链接 目前没用到
                    }
                }
                if (this.device === 'ios') { 
                    
                    //this.$router.push({name:'Teacher',params:{storeId:this.cd_storeid,courseId:this.cd_courseid}})
                    // this.$router.push({ name:'OrderFaileApp',params:{resmsg: this.resMsg }}) 跳转类型(noJump:不跳转 | app | h5 | api）
                    if(this.Asistlist[index].msgLinkDtoList[0].jumpType == 'noJump'){
                        return
                    }else if(this.Asistlist[index].msgLinkDtoList[0].jumpType == 'app'){
                        //跳APP页面的方法调用
                        let qury = this.Asistlist[index].msgLinkDtoList[0]
                        this.parameter = JSON.parse(qury.parameter)
                        let storeId = JSON.parse(qury.parameter).storeId
                        let classId = JSON.parse(qury.parameter).classId
                        let studentId = JSON.parse(qury.parameter).studentId
                        let classScheduleId = JSON.parse(qury.parameter).classScheduleId                     
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury.url +'" ,"storeId": "'+storeId+'","classId":"'+classId+'","studentId":"'+studentId+'","classScheduleId":"'+classScheduleId+'","identity":"'+this.msg_identity+'","employStatus":"'+this.employStatus+'"}')


                    }else if(this.Asistlist[index].msgLinkDtoList[0].jumpType == 'h5'){
                        //跳H5页面的方法
                        let qury = this.Asistlist[index].msgLinkDtoList[0]
                        this.parameter = JSON.parse(qury.parameter)
                        let storeId = JSON.parse(qury.parameter).storeId
                        let classId = JSON.parse(qury.parameter).classId
                        let studentId = JSON.parse(qury.parameter).studentId
                        let classScheduleId = JSON.parse(qury.parameter).classScheduleId
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/OrderManagement" ,"title":"预约管理","storeId": "'+storeId+'","classId":"'+classId+'","studentId":"'+studentId+'","classScheduleId":"'+classScheduleId+'","identity":"'+this.msg_identity+'","employStatus":"'+this.employStatus+'"}')

                        
                    }else if(this.Asistlist[index].msgLinkDtoList[0].jumpType == 'api'){
                        //链接 目前没用到
                    }
                }
            },
            msg_skipe_orgindex (qury){
                //跳转页面
                
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","jump":"true","storeId":"'+this.msg_storeid+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}');
                }
                if (this.device === 'ios') { 
                    
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","jump":"true","storeId":"'+this.msg_storeid+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}')
                }
            },
            msg_skipe_allorder (qury){
                //跳转页面
                
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/orgindex","title":"机构主页","jump":"true"}');
                }
                if (this.device === 'ios') { 
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","jump":"true","storeId":"'+this.msg_storeid+'"}')
                }
            },


    }
}
</script>

<style scoped>
@import url(../../../public/reset.css);
@import url(../../css/msgasist/msgList.css);
</style>