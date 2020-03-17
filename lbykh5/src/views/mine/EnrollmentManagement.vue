<template>
    <div class="enrollmentManagement">
        <div class="btn_issue" >
            <div class="btn" @click="ClickTo('KSFB')">
                <p><img src="../../images/mine/编辑3@2x.png" alt=""></p>
                <p>快速发布</p>
            </div>
        </div>
        
    
        <!-- 主体内容信息 -->
        
        <!-- 课程 -->
        <div class="gcList">
            <div class="gc_top">
                <p class="gcListitle">课程列表</p>
                <div class="liststate">
                    <p @click="showAll()" id="showAll" class="showActive">全部</p>
                    <!-- lowerShelf:下架 | upperShelf：上架 -->
                    <p @click="showEnrollmenting()" id="showEnrollmenting">招生中</p>
                    <p @click="showSoldOut()" id="showSoldOut">已下架</p>
                </div>
            </div>

            <div class="nodatapic" v-if="data.length == 0">
                <img src="../../assets/images/nodata2x.png" alt="">
                <p>暂无数据</p>
            </div>
            
            <div class="listbox" v-if="loadingDone">
                
                <waterfall style="background-color:#fff" :col='col' :width="itemWidth" :gutterWidth="gutterWidth" :data="data"  >
                     
                    <template>
                        <div class="item" v-for="(item,index) in data" :key="index" @click="enroll_skipe_page(index)">
                                <div class="lowershelf" v-if="item.status == 'lowerShelf'"><p>已下架</p></div>
                                <div class="listpic">
                                    <img :src=" item.mainPic " :onerror="defaultImg" />
                                </div>
                                <div class="tagbox" >
                                    <span :class="{lower:item.status == 'lowerShelf',lowerbg:item.status == 'lowerShelf'}">{{ item.categoryName }}</span>
                                    <span :class="{lower:item.status == 'lowerShelf',lowerbg:item.status == 'lowerShelf'}">{{age[index]}}</span>
                                    <span :class="{lower:item.status == 'lowerShelf',lowerbg:item.status == 'lowerShelf'}">{{ item.classHourNum }}节课</span>
                                </div>
                                <div class="titl">
                                    <p :class="{lower:item.status == 'lowerShelf'}">{{ item.courseTitle }}</p>
                                    
                                </div>
                                <div class="price">
                                    <span :class="{lower:item.status == 'lowerShelf'}"><i>￥</i>{{ item.sellingPrice }}</span>
                                    <span :class="{lowertagprice:item.status == 'lowerShelf'}"><i>￥</i>{{ item.tagPrice }}</span>
                                </div>
                                
                        </div>
                    </template>
                </waterfall>
            </div>
            
        </div>
        
    </div>
</template>
<script>
const axios = require('axios')
import {Dialog, Toast} from 'vant'
export default {
    name:'enrollmentManagement',
    data() {
            return {
                imagelist: [],
                datalist: [],
                loadingDone:false,
                col:2,
                ip: this.$ip.getIp(),
                Url:this.$Url.geturl(),
                device:this.$device.getDevice(),
                enroll_mana_data:[],
                ordershow:false,
                popupdata:[],
                emroll_userInfo:'',
                emroll_cuid:'',
                enroll_storeId:'',
                token:'',
                enroll_course_data:'',
                data:[{}],//好课数据
                courseDetail:'',
                lng:'',
                lat:'',
                defaultImg: 'this.src="' + require('../../assets/images/default.png') + '"',
                age:[],
                time:'',
                selectedItem:0
                // itemWidth:168
            }
        },
        methods:{
            // toRenew(){
                
            //     window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "RENEW","url": "'+this.Url+'/RenewPage","renewType":"RecruitStudents","jump":"true","title":"续费","storeId": "'+this.enroll_storeId+'"}')
            // },
            getData(cuid,storeId,token){
                var url = this.ip + 'recruitStudents/managerInfo';
                //?cuid=' + cuid + '&storeId=' +storeId
                let param = new URLSearchParams()
                
                param.append("storeId", storeId)
                param.append("cuid", cuid)
                param.append("userToken", token)
                axios.post(url,param).then((res)=>{
                    // this.tableData = res.data
                    if(res.data.result == 'noLogin'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                    this.enroll_mana_data = res.data.data
                    let arrdate = this.enroll_mana_data.expirationDate.split('-')
                    var date = new Date();
                    let year =arrdate[0] - date.getFullYear() 
                    let month =arrdate[1] - date.getMonth() + 1;
                    let day =arrdate[2] - date.getDate();
                    let today = year * 365 + month*30 + day

                    this.time = today
                }).catch((err)=>{
                    console.log(err)
                })

            },
            getGoodCourseData (cuid,storeId,status,token){
                        // 请求好课数据
                if(status){
                    let url = this.ip + 'course/pageLsit';
                    //?cuid=' +emroll_cuid+'&storeId='+enroll_storeId+'&status='+status+'&pageNo=1&pageSize=10'
                    let param = new URLSearchParams()
                    param.append("cuid", cuid)
                    param.append("storeId", storeId)
                    param.append("status", status)
                    param.append("pageNo", "1")
                    param.append("pageSize", "10")
                    param.append("userToken", token)
                    axios.post(url,param).then((res) =>{
                        // let aa = res.data.data
                        const indexdata = res.data.data
                        this.data = indexdata.data
                        if(res.data.result == 'noLogin'){
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }
                        this.$nextTick(()=>{
                            for(let i = 0; i< this.data.length;i++){
                                if(this.data[i].minAge == 0 && this.data[i].maxAge == 60){
                                    this.age[i] = '不限年龄'
                                }else if(this.data[i].minAge == 0 && this.data[i].maxAge != 60){
                                    this.age[i] = this.data[i].maxAge +'岁以下'
                                }else if(this.data[i].minAge != 0 && this.data[i].maxAge != 60){
                                    this.age[i] = this.data[i].minAge + '-' +this.data[i].maxAge +'岁'
                                }else if(this.data[i].minAge != 0 && this.data[i].maxAge == 60){
                                    this.age[i] = this.data[i].minAge  +'岁以上'
                                }
                            }
                        })
                        // Toast(this.data.minAge)
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    let url = this.ip + 'course/pageLsit';
                    //?cuid=' +emroll_cuid+'&storeId='+enroll_storeId+'&pageNo=1&pageSize=10
                    let param = new URLSearchParams()
                    param.append("cuid", cuid)
                    param.append("storeId", storeId)
                    param.append("pageNo", "1")
                    param.append("pageSize", "10")
                    param.append("userToken", token)
                    axios.post(url,param).then((res) =>{
                        // let aa = res.data.data
                        const indexdata = res.data.data
                        if(res.data.result == 'noLogin'){
                            window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                        }
                        this.data = indexdata.data
                        for(let i = 0; i< this.data.length;i++){
                            if(this.data[i].minAge == 0 && this.data[i].maxAge == 60){
                                this.age[i] = '不限年龄'
                            }else if(this.data[i].minAge == 0 && this.data[i].maxAge != 60){
                                this.age[i] = this.data[i].maxAge +'岁以下'
                            }else if(this.data[i].minAge != 0 && this.data[i].maxAge != 60){
                                this.age[i] = this.data[i].minAge + '-' +this.data[i].maxAge +'岁'
                            }else if(this.data[i].minAge != 0 && this.data[i].maxAge == 60){
                                this.age[i] = this.data[i].minAge  +'岁以上'
                            }
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            },
            McDispatcher : function (qury){
            this.emroll_userInfo = qury
            this.emroll_cuid = qury.data.cuid
            this.enroll_storeId = qury.data.storeId
            this.token = qury.data.token
            
            this.$nextTick(()=>{
                if(this.selectedItem === 0) this.showAll()
                if(this.selectedItem === 1) this.showEnrollmenting()
                if(this.selectedItem === 2) this.showSoldOut()
                this.getData(qury.data.cuid,qury.data.storeId,qury.data.token)
                // window.location.reload()
                // this.getGoodCourseData (qury.data.cuid,qury.data.storeId,'',qury.data.token)
            })
            },
            linkIos : function (){
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
            showAll :function (){
                this.selectedItem = 0
                document.getElementById('showAll').classList.add('showActive')
                document.getElementById('showEnrollmenting').classList.remove('showActive')
                document.getElementById('showSoldOut').classList.remove('showActive')
                this.$nextTick(()=>{
                    this.getGoodCourseData(this.emroll_cuid,this.enroll_storeId,'',this.token)
                })
            },
            showEnrollmenting :function (){
                this.selectedItem = 1
                document.getElementById('showAll').classList.remove('showActive')
                document.getElementById('showEnrollmenting').classList.add('showActive')
                document.getElementById('showSoldOut').classList.remove('showActive')
                this.$nextTick(()=>{
                    this.getGoodCourseData(this.emroll_cuid,this.enroll_storeId,'upperShelf',this.token)
                })
            },
            showSoldOut :function (){
                this.selectedItem = 2
                document.getElementById('showAll').classList.remove('showActive')
                document.getElementById('showEnrollmenting').classList.remove('showActive')
                document.getElementById('showSoldOut').classList.add('showActive')
                this.$nextTick(()=>{
                    this.getGoodCourseData(this.emroll_cuid,this.enroll_storeId,'lowerShelf',this.token)
                })
            },
            ClickTo : function (qury){
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写
                if(this.enroll_mana_data.effective){
                    if (this.device === 'android') {
                        window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.enroll_storeId+'"}');
                        
                    }
                    if (this.device === 'ios') { 
                        //jump  取值为true为跳新页面打开，false为当前页面打开
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.enroll_storeId+'","Phonenumber":"'+this.org_index_phone+'"}')
                    }
                }else{
                    Toast('服务已过期，无法发布课程，请尽快续费')
                }
                
            
            },
            conTackto(qury,phone){
               
                if (this.device === 'android') {
                    window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.enroll_storeId+'","Phonenumber":"'+phone+'"}');
                    
                }
                if (this.device === 'ios') { 
                    //jump  取值为true为跳新页面打开，false为当前页面打开
            
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"storeId": "'+this.enroll_storeId+'","Phonenumber":"'+phone+'"}')
                }
            },
            showPopup: function(index,e){
                this.ordershow = true;
                this.popupdata = this.enroll_mana_data.appointmentDtoList[index]
                const id = this.enroll_mana_data.appointmentDtoList[index].id
                //添加该学员的课程信息，需接查询接口
                this.getCourseDetail(this.emroll_cuid,this.enroll_storeId,id,this.token)
            },
            deleteOrder(cuid,storeId,id,token){
                
                Dialog.confirm({
                    
                    message: '是否确认删除',
                    confirmButtonColor:"#ff444b",
                    cancelButtonColor:"#9b9b9b",
                    }).then(() => {
                    // on confirm
                        let url = this.ip + 'course-appointment/remove';
                        //?cuid=' +emroll_cuid+'&storeId='+enroll_storeId+'&id='+id
                        let param = new URLSearchParams()
                        param.append("cuid", cuid)
                        param.append("storeId", storeId)
                        param.append("id", id)
                        param.append("userToken", token)
                        axios.post(url,param).then((res) =>{
                            //把需要删除的数据提交后台接口
                            if(res.data.result == 'noLogin'){
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }
                            this.$nextTick(()=>{
                                 this.getData(this.emroll_cuid,this.enroll_storeId,this.token) //更新删除之后的列表数据
                            })
                        }).catch((err)=>{
                            console.log(err)
                        })
                        this.ordershow = false;
                    }).catch(() => {
                    // on cancel
                    });
            },
            changeOrderstatus(cuid,storeId,status,id,token){
                //修改预约课程的状态，已处理，待跟进
                Toast.success('操作成功')
                let url = this.ip + 'course-appointment/markingStatus';
                let param = new URLSearchParams()
                param.append("cuid", cuid)
                param.append("storeId", storeId)
                param.append("status", status)
                param.append("id", id)
                param.append("userToken", token)
                axios.post(url,param).then((res) =>{
                    //
                    if(res.data.result == 'noLogin'){
                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                    }
                    this.$nextTick(()=>{
                        // this.getData(this.emroll_cuid,this.enroll_storeId)
                        this.getData(this.emroll_cuid,this.enroll_storeId,this.token)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
                this.ordershow = false;
                
                
            },
            enroll_skipe_page :function (index){
                //跳转页面
                
                if (this.device === 'android') {
                    window.android.SkipPage('{"linkType": "app","url": "'+this.Url+'/classdetailOrg","title":"课程详情","scheme":"ZSKCXQ","courseId":"'+this.data[index].courseId+'","storeId":"'+this.enroll_storeId+'","longitude":"","latitude":""}');
                     
                }
                if (this.device === 'ios') { 
                    //jump  取值为true为跳新页面打开，false为当前页面打开
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","url": "'+this.Url+'/classdetailOrg","title":"课程详情","scheme":"KCXQ","courseId":"'+this.data[index].courseId+'","storeId":"'+this.enroll_storeId+'","longitude":"","latitude":""}')
                }
            },
            enroll_skipe_order_page(){
                //跳转预约管理页面
               
                if (this.device === 'android') {
                    window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/orderManagement","title":"预约管理","scheme":"QBYY","storeId":"'+this.enroll_storeId+'"}');
                    
                }
                if (this.device === 'ios') { 
                    //jump  取值为true为跳新页面打开，false为当前页面打开
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/orderManagement","title":"预约管理","scheme":"QBYY","storeId":"'+this.enroll_storeId+'","title":"预约管理"}')
                }
            },
            getParams(msg){
                this.emroll_userInfo = msg
                this.emroll_cuid = msg.cuid
                this.enroll_storeId = msg.storeId
                this.token = msg.token
                this.lng = msg.longitude
                this.lat = msg.latitude
                this.$nextTick(()=>{
                    // this.getData(msg.cuid,msg.storeId)
                    this.getData(msg.cuid,msg.storeId,msg.token)
                    this.getGoodCourseData(msg.cuid,msg.storeId,'',msg.token)
                })
                
            },
        },
        computed:{
	      itemWidth(){  
                return (340*0.5*(document.documentElement.clientWidth/375)) 
                // #rem布局 计算宽度 
	      },
	      gutterWidth(){
                return (16*0.5*(document.documentElement.clientWidth/375))	
                // #rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
	      }
        },
        mounted () {
            setTimeout(()=>{
                this.loadingDone = true
            },200)
            this.linkIos()
            
            
        },
        beforeMount(){
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams
        }
}
</script>
<style scoped>
@import url(../../../public/reset.css);
@import url(../../css/mine/enrollmentManagement.css); 
</style>