<template>
    <div class="orderManagement">
        
        <div class="contentbox" v-if="content_loading">
            <div class="order_mana_info">
                <div class="infotop">
                    <p id="showAll" class="showActive" @click="showAll">全部</p>
                    <p id="showPending" @click="showPending">待跟进</p>
                    <p id="showProcessed" @click="showProcessed">已处理</p>
                </div>


                <div class="infodown">
                    
                    <van-swipe-cell v-for="(item,index) in order_mana_data" :key="item.id">
                        <van-cell-group :border="false">
                            <div class="item">
                                <div class="item_pic">
                                    <p class="bgc_processed" v-if=" item.status == 'processed' "><img src="../../images/mine/勾2@2x.png" alt=""></p>
                                    <p class="bgc_pending" v-if=" item.status == 'pending' "><img src="../../images/mine/跟进@2x(1).png" alt=""></p>
                                    <p class="text_processed" v-if=" item.status == 'processed' ">已处理</p>
                                    <p class="text_pending" v-if=" item.status == 'pending' ">待跟进</p>
                                </div>
                                <div class="item_info" @click="showPopup(index,$event)">
                                    <p>{{ item.courseTitle }}</p>
                                    <p>{{ item.studentName }}</p>
                                    <p>{{ item.createTime }}</p>
                                </div>
                                <div class="item_contact">
                                    <img src="../../images/mine/电话6@2x(1).png" alt="">
                                    <p @click="conTackto('LXJG',item.phone)">联系学员</p>
                                </div>
                            </div>
                        </van-cell-group>

                        <template slot="right">
                            <div class="markState pending" v-if=" item.status == 'processed' "><p @click="changeOrderstatus(order_mana_cuid,order_mana_storeid,'pending',item.id,token)">标记为待跟进</p></div>
                            <div class="markState processed" v-if=" item.status == 'pending' "><p @click="changeOrderstatus(order_mana_cuid,order_mana_storeid,'processed',item.id,token)">标记为已处理</p></div>
                            <div class="deleteBtn" @click="deleteOrder(order_mana_cuid,order_mana_storeid,item.id,token)"><p><img src="../../images/mine/删除2@2x.png" alt=""></p></div>
                        </template>
                    </van-swipe-cell>

                    <van-popup
                        class="pup"
                        v-model="ordershow"
                        round
                        position='bottom'
                        :style="{height:'55%'}"
                        >
                        <div class="mark"></div>

                        <div class="pup_top">
                            
                            <!-- top -->
                            <div class="pup_top_pic">
                                <p class="bgc_processed" v-if=" popupdata.status == 'processed' "><img src="../../images/mine/勾2@2x.png" alt=""></p>
                                <p class="bgc_pending" v-if=" popupdata.status == 'pending' "><img src="../../images/mine/跟进@2x(1).png" alt=""></p>
                            </div>
                            <div class="pup_top_info">
                                <p>{{ popupdata.studentName }}</p>
                                <p>{{ popupdata.createTime }}</p>
                            </div>
                            <div class="pup_top_attact">
                                <p><img src="../../images/mine/电话6@2x(1).png" alt=""></p>
                                <p @click="conTackto('LXJG',popupdata.phone)">联系学员</p>
                            </div>
                        </div>
                        <!-- <p>{{courseDetail}}</p> -->
                        <div class="pup_mid">
                            <!-- middle -->
                            <p class="title">课程信息</p>
                            <div class="pup_mid_course_info">
                                <div class="left">
                                    <p>{{courseDetail.courseTitle}}</p>
                                    <div>
                                        <span>{{courseDetail.categoryName}}</span>
                                        <span>{{order_age}}</span>
                                        <span>{{courseDetail.classHourNum}}节课</span>
                                    </div>
                                </div>
                                <div class="right">
                                    <p><i>￥</i>{{courseDetail.sellingPrice}}</p>
                                    <p>￥{{courseDetail.tagPrice}}</p>
                                </div>
                            </div>
                        </div>

                        <div class="pup_down">
                            <!-- down -->
                            <p @click="deleteOrder(order_mana_cuid,order_mana_storeid,popupdata.id,token)">删除</p>
                            <!-- （pending：待处理 | processed：已处理） -->
                            <p v-if=" popupdata.status == 'pending' " @click="changeOrderstatus(order_mana_cuid,order_mana_storeid,'processed',popupdata.id,token)">标记为已处理</p>
                            <p v-if=" popupdata.status == 'processed' " @click="changeOrderstatus(order_mana_cuid,order_mana_storeid,'pending',popupdata.id,token)">标记为待跟进</p>
                        </div>
                    </van-popup>

                    
                </div>

                <div class="nodatapic" v-if="order_mana_data.length == 0">
                    <img src="../../assets/images/nodata2x.png" alt="">
                    <p>暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast,Dialog } from 'vant'
    const axios = require('axios')
    export default {
        name: 'orderManagement',
        data(){
            return{
                van_loading: true,
                content_loading: false,
                ip: this.$ip.getIp(),
                device:this.$device.getDevice(),
                order_mana_data:[],
                ordershow:false,
                popupdata:[],
                order_mana_userInfo:'',//ios传来的数据
                order_mana_cuid:'',//
                order_mana_storeid:'',//
                courseDetail:'',
                activeitem:0,
                token:'',
                order_age:''
            }
        },methods:{
            McDispatcher : function (qury){
                this.order_mana_userInfo = qury
                this.order_mana_cuid = qury.data.cuid
                this.order_mana_storeid = qury.data.storeId
                this.token = qury.data.token
                this.$nextTick(()=>{
                    this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'',qury.data.token)
                })
            },
            linkIos : function (){
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },
            getData(cuid,storeId,token){
       
                var url = this.ip + 'course-appointment/storeList';
                //?cuid=" + cuid + "&storeId=" + storeId + "&pageNo=1&pageSize=5"
                let param = new URLSearchParams()
                param.append("cuid", cuid)
                param.append("storeId", storeId)
                param.append("pageNo", "1")
                param.append("pageSize", "10")
                param.append("userToken", token)
                axios.post(url,param).then((res)=>{
                    this.order_mana_data = res.data.data.data
                })
            },

            showAll: function(){
                console.log('1122')
                // document.getElementsByClassName('showAll').style.color="red"
                document.getElementById('showAll').classList.add('showActive')
                document.getElementById('showPending').classList.remove('showActive')
                document.getElementById('showProcessed').classList.remove('showActive')
                this.$nextTick(()=>{
                    this.activeitem =0
                    this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'',this.token)
                    
                })
            },
            showPending: function(){
                console.log('2233')
                document.getElementById('showAll').classList.remove('showActive')
                document.getElementById('showPending').classList.add('showActive')
                document.getElementById('showProcessed').classList.remove('showActive')
                this.$nextTick(()=>{
                     this.activeitem =1
                    this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'pending',this.token)
                })
            },
            showProcessed: function(){
                console.log('3344')
                document.getElementById('showAll').classList.remove('showActive')
                document.getElementById('showPending').classList.remove('showActive')
                document.getElementById('showProcessed').classList.add('showActive')
                this.$nextTick(()=>{
                     this.activeitem =2
                    this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'processed',this.token)
                })
            },
            showPopup: function(index,e){
                
                this.ordershow = true;
                this.popupdata = this.order_mana_data[index]
                const id = this.popupdata.id
                //添加该学员的课程信息，需接查询接口
                this.getCourseDetail(this.order_mana_cuid,this.order_mana_storeid,id,this.token)
            },
            getCourseDetail(cuid,storeId,id,token){
                //查询预约的课程详细信息
                let url = this.ip + 'course-appointment/getById';
                //?cuid=' +order_mana_cuid+'&storeId='+order_mana_storeid+'&id='+id
                let param = new URLSearchParams()
                param.append("cuid", cuid)
                param.append("storeId", storeId)
                param.append("status", status)
                param.append("id", id)
                param.append("userToken", token)
                axios.post(url,param).then((res) =>{
                    this.courseDetail = res.data.data
                    if(this.courseDetail.minAge == 0 && this.courseDetail.maxAge == 60){
                        this.order_age = '不限年龄'
                    }else if(this.courseDetail.minAge == 0 && this.courseDetail.maxAge != 60){
                        this.order_age = this.courseDetail.maxAge +'岁以下'
                    }else if(this.courseDetail.minAge != 0 && this.courseDetail.maxAge != 60){
                        this.order_age = this.courseDetail.minAge + '-' +this.courseDetail.maxAge +'岁'
                    }else if(this.courseDetail.minAge != 0 && this.courseDetail.maxAge == 60){
                        this.order_age = this.courseDetail.minAge  +'岁以上'
                    }
                    // 弹窗内详细的课程信息
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getOrderinfo(cuid,storeId,status,token){//查询不同状态的预约信息
                let url = this.ip + 'course-appointment/storeList';
                //?cuid=' +order_mana_cuid+'&storeId='+order_mana_storeid+'&status='+status+'&pageNo=1&pageSize=10'
                let param = new URLSearchParams()
                param.append("cuid", cuid)
                param.append("storeId", storeId)
                param.append("status", status)
                param.append("pageNo", "1")
                param.append("pageSize", "10")
                param.append("userToken", token)
                axios.post(url,param).then((res) =>{
                    this.order_mana_data = res.data.data.data
                    
                }).catch((err)=>{
                    console.log(err)
                })
            },
            deleteOrder(cuid,storeId,id,token){
                //删除预约课程
                Dialog.confirm({
                    
                    message: '是否确认删除',
                    confirmButtonColor:"#ff444b",
                    cancelButtonColor:"#9b9b9b",
                    }).then(() => {
                    // on confirm
                        let url = this.ip + 'course-appointment/remove';
                        let param = new URLSearchParams()
                        param.append("cuid", cuid)
                        param.append("storeId", storeId)
                        param.append("id", id)
                        param.append("userToken", token)
                        axios.post(url,param).then(() =>{
                            //把需要删除的数据提交后台接口
                            this.$nextTick(()=>{
                                // this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'processed',this.token)//更新删除之后的列表数据
                                if(this.activeitem == 0){
                                    this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'',this.token)
                                }else if(this.activeitem == 1){
                                    this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'pending',this.token)
                                }else if(this.activeitem == 2){
                                    this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'processed',this.token)
                                }
                            })
                            this.ordershow = false;
                        }).catch((err)=>{
                            console.log(err)
                        })
                        // Toast(this.activeitem)
                        
                    }).catch(() => {
                    // on cancel
                    });
            },
            changeOrderstatus(cuid,storeId,status,id,token){
                Toast.success('操作成功')
                //修改预约课程的状态，已处理，待跟进
                
                let url = this.ip + 'course-appointment/markingStatus';
                let param = new URLSearchParams()
                param.append("cuid", cuid)
                param.append("storeId", storeId)
                param.append("status", status)
                param.append("id", id)
                param.append("userToken", token)
                axios.post(url,param).then((res) =>{
                    //传入状态，以改变预约课程状态
                    // let result = res.data
                    if(this.activeitem == 0){
                        this.$nextTick(()=>{
                            this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'',this.token)
                        })
                    }else if(this.activeitem == 1){
                        this.$nextTick(()=>{
                            this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'pending',this.token)
                            
                        })
                    }else if(this.activeitem == 2){
                        this.$nextTick(()=>{
                            this.getOrderinfo(this.order_mana_cuid,this.order_mana_storeid,'processed',this.token)
                        })
                    }
                    this.ordershow = false;
                }).catch((err)=>{
                    console.log(err)
                })
                
                
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
            
        },
        mounted (){
            this.content_loading = true
            this.van_loading =false
            
            this.linkIos()
        },
        beforeMount(){
            window.McDispatcher = this.McDispatcher
        }
    }
</script>
<style scoped>
    @import url(../../../public/reset.css);
    @import url(../../css/mine/orderManagement.css);
</style>