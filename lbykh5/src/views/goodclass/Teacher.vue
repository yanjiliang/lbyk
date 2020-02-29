<template>
    <div class="teacher">
        <!-- 授课老师 -->
        <div class="container">
            <div class="classteacher">
                <div class="title">
                    <p>授课老师</p>
                    <a href="">查看全部(8)</a>
                </div>
                
                <div class="teacherlist">
                    <ul>
                        <li v-for="(item,index) in teacher_list" :key="index">
                            <div class="teacherpic">
                                <img :src="item.avatar" alt="">
                            </div>
                            <div class="teacherinfo">
                                <div>
                                    <span>{{item.name}}</span><span>{{item.teachAge}}教龄</span>
                                </div>
                                <div class="motto">{{item.teachingSlogan}}</div>
                                <div class="teachertag" v-if="item.labelList.length != 0">
                                    <span>{{item.labelList[0]}}</span>
                                    <span>{{item.labelList[1]}}</span>
                                    <span>{{item.labelList[2]}}</span>
                                </div>
                            </div>
                        </li>
                        
                        
                    </ul>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const axios = require('axios')
export default {
    name:'teacher',
    data (){
        return{
            ip:this.$ip.getIp(),
            device:this.$device.getDevice(),
            teacher_data:'',
            teacher_list:[],
            teacher_storeid: '',
            teacher_courseid: ''
        }
    },
    methods:{
        linkIos (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
            this.teacher_data = qury
            this.teacher_storeid = qury.data.storeId
            this.teacher_courseid = qury.data.courseId
            this.getteacherData(qury.data.storeId,qury.data.courseId)
                //解析传进来的json
                //给本地变量赋值，并判断经纬度是否为空，为空显示
        },
        getteacherData(storeId,courseId){
            var url = this.ip + 'courseTeacher/list?storeId=' +storeId+ '&courseId='+courseId+'&pageNo=1&pageSize=10';
            axios.post(url).then((res)=>{
                this.teacher_data = res.data.data
                this.teacher_list = this.teacher_data.data
            })
        },
        getParams(msg){
                //拿到安卓拿来的数据
                this.androidparams = msg
                this.teacher_storeid = msg.storeId
                this.teacher_courseid = msg.courseId
                this.getteacherData(msg.storeId,msg.courseId)
            },
    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams
    },
    mounted(){
        this.linkIos()
        
    }
}
</script>
<style scoped>
@import url(../../../public/reset.css);

    /* 授课老师 */
.teacher .container{
    /* width: 21.43rem; */
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    margin-top: -53px;
    padding-bottom: 30px;
    
}
.teacher .container .classteacher .title{
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}
.teacher .container .classteacher .title p{
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
}
.teacher .container .classteacher .title a{
    font-size: 14px;
    line-height: 24px;
    color: #C6C6C6;
    position: absolute;
    right: 15px;
}
.teacher .container .classteacher .title a:after{
    content:'';
    width: 14px;
    height: 14px;
    display: inline-block;
    background: url('../../images/GoodClass/reback2x.png');
    background-size: cover;
    margin: -2px 0;
}


.teacher .container .classteacher .teacherlist{
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 30px rgba(0,0,0,0.05);
    opacity:1;
    border-radius:8px;
    padding: 0 12px;
}

.teacher .container .classteacher .teacherlist ul li{
    display: flex;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 30px rgba(0,0,0,0.05);
    opacity:1;
    border-radius:8px;
    padding-left: 12px;
    margin-bottom: 20px;
}

.teacher .container .classteacher .teacherlist ul li .teacherpic{
    margin-right: 12px;
    margin-top: 28px;
    margin-bottom: 23px;
    padding: 6.5px 0;
}
.teacher .container .classteacher .teacherlist ul li .teacherpic img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.teacher .container .classteacher .teacherlist ul li .teacherinfo{
    margin-top: 28px;
    margin-bottom: 23px;
}
.teacher .container .classteacher .teacherlist ul li .teacherinfo div:nth-child(1){
    margin-bottom: 4px;
}
.teacher .container .classteacher .teacherlist ul li .teacherinfo div:nth-child(2){
    margin-bottom: 8px;
}
.teacher .container .classteacher .teacherlist ul li .teacherinfo div:nth-child(1) span:nth-child(1){
    color: #1A1B20;
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
    margin-right: 4px;
}
.teacher .container .classteacher .teacherlist ul li .teacherinfo div:nth-child(1) span:nth-child(2){
    color: #C6C6C6;
    font-size: 14px;
    line-height: 20px;
}
.teacher .container .classteacher .teacherlist ul li .teacherinfo div:nth-child(3) span{
    border:0.6px solid rgba(246,246,246,1);
    opacity:1;
    border-radius:3px;
    margin-right: 8px;
    padding: 2px 4px;
    color: #9B9B9B;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
}
.teacher .container .classteacher .teacherlist ul li .teacherinfo .motto{
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:20px;
    color:rgba(94,88,98,1);
    opacity:1;
}
</style>