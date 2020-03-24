<template>
    <div class="ClockRecod">
        
        <!-- 打卡用户列表 -->
        <div>
            <ClockList :storeId='storeId' :studentId='studentId' />
        </div>
        <!-- 打卡用户列表 -->
    </div>
</template>
<script>
import 'flex.css'
import '../../css/Clock/clockPublic.css'
import '../../css/Clock/clocklist.css'
import {Toast} from 'vant'
const axios = require('axios')
// import H5Video from '../../components/H5Video'
import ClockList from '../Clockin/ClockList'
export default {
    name:'ClockRecod',
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            ClockList:[],
            ZanList:[],
            preImage:[],
            pre_index:0,
            pre_show:false,
            cuid:'',
            storeId:this.$route.query.storeId,
            personalInfo:'',
            className:this.$route.query.className,
            studentId:this.$route.query.studentId,
            clockId:this.$route.query.clockId
        }
    },
    components:{
        ClockList
    },
    mounted(){
        this.getPersonalInfo()
        setTimeout(()=>{
            document.title = this.personalInfo.data.studentName+'的打卡记录'
        },100)
    },
    methods:{
        getRecodIndex(index){
            // this.selectRecod = index
            let clockRecod = this.personalInfo.data.clockRecordDtos.data
            let item = clockRecod[index].picUrls;
            let len = clockRecod[index].picUrls.length;
            this.preImage = [];
            for(let i=0;i<len;i++){
                //
                this.preImage.push(item[i].url)
            }
        },
        preClick(index){
            this.pre_show=true;
            this.pre_index=index;
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "false"}')
        },
        onClose(){
            // window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "PREVIEW" ,"show": "true"}')
        },
        onChange(index) {
            this.pre_index = index;
        },
        getPersonalInfo(){
            //获取打卡个人主页
            // /class-clock-student/clockRecord
            // /class-clock-student/clockPersonalPage
            let url = this.ip+'class-clock-student/clockPersonalPage';
            let param = new URLSearchParams()
            param.append("cuid", 'eYhjQznFDdvZiHz4oXt')
            param.append("storeId", 'STORE_Sh8YinETjSwngmo2szC')
            param.append("pageNo", 1)
            param.append("pageSize", 100)
            param.append("studentId", this.$route.query.studentId)
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'noLogin'){
                    if(this.device == 'android'){
                        window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }else if(this.device == 'ios'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                }
                let personalInfo = res.data
                this.personalInfo = personalInfo
                this.personalRecod = personalInfo.data.clockRecordDtos
                
                
                
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.ClockRecod
    background #fff
    padding 16px
    .class_info_wrap
        background #FFFFFF
        box-sizing border-box
        padding 12px 16px 28px 16px
        .class_student_info_list
            .class_student_item
                background #60C38C
                box-sizing border-box
                box-shadow 0 10px 20px rgba(96,195,140,0.3)
                padding 12px
                border-radius 15px
        .class_circle_clock
            margin-top 32px
            box-sizing border-box
            padding 18px 16px
            background #F0FDF4
            border-radius 15px
            position relative
            .class_circle_clock_tag
                
                height 18px 
                background #60C38C
                box-sizing border-box
                border-radius 15px 0 15px 0
                padding 4px 12px 
                position absolute
                top 0
                left 0
</style>