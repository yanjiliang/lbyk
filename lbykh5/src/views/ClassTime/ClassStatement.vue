<template>
    <div class="classStatement">
        <!-- 头部背景 -->
        <div class="top" v-if="hasData">
            <div class="orgname">
                <div class="orgicon"></div>
                <div class="storename">{{ class_statement_data.storeName }}</div>
            </div>
            <div class="classname">{{ class_statement_data.className }}</div>
            <div class="time">{{ class_statement_data.startTime + ' -' + class_statement_data.endTime.substring(10) }}</div>
        </div>
        
        <div class="container" v-if="hasData">
            <div class="classinfobox">
                <div class="infoitem">
                    <p>授课老师</p>
                    <p><span>{{teacherList}}</span></p>
                </div>
                <div class="infoitem">
                    <p>学员考勤</p>
                    <p>{{'到课'+class_statement_data.signNum+'，请假'+class_statement_data.leaveNum+'，未到'+class_statement_data.notArrivedNum}}</p>
                </div>
                <div class="infoitem">
                    <p>课时结算</p>
                    <p v-if="class_statement_data.deductClassNum != 0">{{class_statement_data.deductClassNum}}课时</p>
                    <p v-if="class_statement_data.deductClassNum === 0">不计课时</p>
                </div>
                <div class="infoitem">
                    <p>结算时间</p>
                    <p> {{class_statement_data.settleDate}} </p>
                </div>
            </div>
            
            
            
            <div class="linktobox">
                <div class="linkitem" @click="ClickTo('KJXQ')" v-if="this.ident != 'student' && this.working == '1'">
                    <p>课节详情</p>
                    <p></p>
                </div>
                <div class="linkitem" @click="ClickTo('KSJL')" v-if="this.ident == 'student' || this.working == '1'">
                    <p>在本班级的课时记录</p>
                    <p></p>
                </div>
                <div class="linkitem" @click="ClickTo('SKJL')" v-if="this.ident != 'student' && this.working == '0'">
                    <p>在本班级的上课记录</p>
                    <p></p>
                </div>
                <div class="linkitem" @click="ClickTo('LXJG')" v-if="this.ident != 'student' && this.working == '0'">
                    <p>联系机构</p>
                    <p></p>
                </div>
                <div class="linkitem" @click="ClickTo('CKBJ')" v-if="this.ident == 'student' || this.working == '1'">
                    <p>查看班级</p>
                    <p></p>
                </div>
                <div class="linkitem" @click="cs_skipe_orgindex('JGZY')">
                    <p>机构主页</p>
                    <p></p>
                </div>
                
            </div>


        </div>

        <!-- <p>{{aa}}</p> -->

        <div class="no_data" v-if="!hasData">
            <img src="../../assets/images/nodata2x.png" alt="">
            <p>没有与您相关的信息</p>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
const axios = require('axios')
export default {
    name:'classStatement',
    data (){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            class_statement_data:{},
            class_statement_userInfo:'',
            cuid:'',
            classScheduleId:'',
            teacherList:[],
            studentId:'',
            storeId:'',
            token:'',
            identity:'',
            classId:'',
            ident:'',
            working:'',
            servicePhone:'',
            hasData:Boolean,
            aa:''
        }
    },
    methods:{
        getData(cuid,classId,storeId,studentId,classScheduleId,ident,token){
            
            if(ident == 'student'){
                this.getstateStudent(cuid,classScheduleId,studentId,token)
                
            }else{
                this.getstateTeacher(cuid,storeId,classScheduleId,token)
            }
        },
        getstateStudent(cuid,classScheduleId,studentId,token){
            
            let url = this.ip + 'attendClass/getStudentSettleSheet';
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("classScheduleId", classScheduleId)
            param.append("studentId", studentId)
            
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.aa = res.data.data
                if(res.data.data === null){
                    document.title = '课节详情'
                    document.getElementsByTagName('title')[0].innerText  = '课节详情'
                    this.hasData = false
                }else{
                    this.class_statement_data = res.data.data
// <span v-for="(item1,index) in class_statement_data.teacherList" :key="index">{{item1.teacherName}}</span><span v-if="index == class_statement_data.teacherList.length-1">,</span>
                    this.class_statement_data = res.data.data
                    let teacherList = this.class_statement_data.teacherList
                    for(let i = 0;i<teacherList.length;i++){
                        this.teacherList.push(teacherList[i].teacherName)
                    }
                    let aa = Array.from(new Set(this.teacherList))
                    this.teacherList = aa.join(',')
                }
                
            }).catch((err)=>{
                console.log(err)
            })
        },
        getstateTeacher(cuid,storeId,classScheduleId,token){
            let url = this.ip + 'attendClass/getTeacherSettleSheet';
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("storeId", storeId)
            param.append("classScheduleId", classScheduleId)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.aa = res.data.data
                if(res.data.data === null){
                    document.title = '课节详情'
                    document.getElementsByTagName('title')[0].innerText  = '课节详情'
                    this.hasData = false
                }else{
                    this.class_statement_data = res.data.data
                    let teacherList = this.class_statement_data.teacherList
                    // this.teacherList = teacherList
                    for(let i = 0;i<teacherList.length;i++){
                        this.teacherList.push(teacherList[i].teacherName)
                    }
                    let aa = Array.from(new Set(this.teacherList))
                    this.teacherList = aa.join(',')
                    
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        getStateParams(msg){
            this.class_statement_userInfo =msg
            this.ident = msg.identity
            this.cuid =msg.cuid;
            this.token = msg.token
            this.classId =msg.classId;
            this.storeId =msg.storeId;
            this.studentId =msg.studentId;
            this.classScheduleId =msg.classScheduleId;
            this.working = msg.employStatus
            this.getData(this.cuid,this.classId,this.storeId,this.studentId,this.classScheduleId,this.ident,msg.token)
            this.getphone(this.storeId,msg.cuid,msg.token)
            

        },
        ClickTo : function (qury){
            
            if (this.device === 'android') {
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+ this.storeId +'","classId":"'+ this.classId +'" ,"cuid":"'+ this.cuid +'","studentId":"'+ this.studentId +'","classScheduleId":"'+ this.classScheduleId +'","identity":"'+ this.ident +'","Phonenumber":"'+this.servicePhone+'","employStatus":"'+this.working+'"}');
            }
            if (this.device === 'ios') {
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+ this.storeId +'","classId":"'+ this.classId +'" ,"cuid":"'+ this.cuid +'","studentId":"'+ this.studentId +'","classScheduleId":"'+ this.classScheduleId +'","identity":"'+ this.ident +'","Phonenumber":"'+this.servicePhone+'","employStatus":"'+this.working+'"}');
            }
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写 
        },
        McDispatcher (qury){
            this.class_statement_userInfo =qury
            this.ident = qury.data.ident
            this.cuid =qury.data.cuid;
            this.token =qury.data.token;
            this.classId =qury.data.classId;
            this.storeId =qury.data.storeId;
            this.studentId =qury.data.studentId;
            this.classScheduleId =qury.data.classScheduleId;
            this.working = qury.data.employStatus
            this.getData(qury.data.cuid,qury.data.classId,qury.data.storeId,qury.data.studentId,qury.data.classScheduleId,qury.data.ident,qury.data.token)
            this.getphone(qury.data.storeId,qury.data.cuid,qury.data.token)
            
        },
        linkIos(){
            window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        getphone(storeId,cuid,token){
            let url = this.ip + 'store/info' ;
            //?storeId=' + storeId
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("storeId", storeId)
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                // this.servicePhone = res.data.data
                let str = res.data.data
                this.servicePhone = str.servicePhone
            }).catch((err)=>{
                console.log(err)
            })
        },
        cs_skipe_orgindex (qury){
                //跳转机构主页
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","storeId": "'+ this.storeId +'","classId":"'+ this.classId +'" ,"cuid":"'+ this.cuid +'","studentId":"'+ this.studentId +'","classScheduleId":"'+ this.classScheduleId +'","identity":"'+ this.ident +'","Phonenumber":"'+this.servicePhone+'","employStatus":"'+this.working+'"}');
                }
                if (this.device === 'ios') { 
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","storeId": "'+ this.storeId +'","classId":"'+ this.classId +'" ,"cuid":"'+ this.cuid +'","studentId":"'+ this.studentId +'","classScheduleId":"'+ this.classScheduleId +'","identity":"'+ this.ident +'","Phonenumber":"'+this.servicePhone+'","employStatus":"'+this.working+'"}')
                }
            },
    },
    beforeMount(){
        window.getStateParams=this.getStateParams
        window.McDispatcher = this.McDispatcher
    },
    mounted(){
        this.linkIos()
    }
}
</script>
<style>
@import url(../../../public/reset.css);
@import url(../../css/ClassTime/ClassStatement.css);
</style>
