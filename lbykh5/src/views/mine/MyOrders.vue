<template>
    <div class="myorders">

        <div class="nodatapic" v-if="myorders_list.length == 0" style="margin-top:250px">
            <img src="../../assets/images/nodata2x.png" alt="">
            <p>暂无预约信息</p>
        </div>


        <div class="order_info_box">
            
            <div class="order_item" v-for="(item,index) in myorders_list" :key="index">
                <div class="top">
                    <!-- 跳门店主页 -->
                    <div class="top_left" @click="myorder_skipe_orgindex('MDZY',item.storeId)">
                        <div class="orgpic">
                            <img :src="item.logo" alt="">
                        </div>
                        <div class="orginfo">
                            <p>{{ item.storeName }}</p>
                            
                            <p>{{item.subjectCategoryList.join('/')}}</p>
                        </div>
                    </div>
                    <div class="top_right" @click="ClickTo('LXJG',item.servicePhone)">
                        <p><img src="../../images/mine/phone2x.png" alt=""></p>
                        <p>联系机构</p>
                    </div>
                </div>
                <div style="width:8.4rem;height:0.6px;background:#F6F6F6;margin-top:0.32rem"></div>
                <div class="mid" @click="myorder_skipe_classdetail(index)">
                    <!-- 跳课程详情 -->
                    <div class="mid_left">
                        <p>{{item.courseTitle}}</p>
                        <p>
                            <span>{{item.categoryName}}</span>
                            <span>{{item.minAge}}-{{item.maxAge}}岁</span>
                            <span>{{item.classHourNum}}节课</span>
                        </p>
                    </div>
                    <div class="mid_right">
                        <p><i>￥</i>{{item.sellingPrice}}</p>
                        <p>￥{{item.tagPrice}}</p>
                        
                    </div>
                </div>
                <div class="click_btn" @click="clickShowornot(index)">
                    <p>查看预约消息</p>
                    <!-- <i><img src="../../images/mine/返回4@2x.png" alt=""></i> -->
                    <i><img ref="myorders_arrow" src="../../images/mine/箭头下2x2.png" alt=""></i>
                </div>
                <div class="bottom my_orders_fold" ref="myorder_bottom">
                    <div class="bottom_item">
                        <p>学员姓名</p>
                        <p>{{item.studentName}}</p>
                    </div>
                    <div class="bottom_item">
                        <p>预留电话</p>
                        <p>{{item.phone}}</p>
                    </div>
                    <div class="bottom_item">
                        <p>预约时间</p>
                        <p>{{item.createTime}}</p>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
</template>
<script>
const axios = require('axios')
export default {
    name:'myorders',
    data(){
        return{
            ip:this.$ip.getIp(),
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
            fold_toggle:true,
            myorders_list:[
                0,1,2,3
            ],
            myorders_data:{},
            myorders_params:'',
            myorders_cuid:'',
            lng:'',
            lat:''
        }
    },
    methods:{
        clickShowornot (index){
            if(this.fold_toggle == true){
                this.$refs.myorder_bottom[index].classList.remove('my_orders_fold')
                this.$refs.myorders_arrow[index].src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABVUlEQVRIS+2TS0oDQRCG/wqBWYq48h6B0DWJeIBEXXoFXaj4WAoBlz4wLvQIbn3kAILpbgK5hyuRLLOYKekwERxn7BYMKKS3Vf19zV/VhBkfmjEfc4E34b8TkYiQtbbjnqyU6hCReJ8PhA9Za31NRFsOKiI3cRxv/5rAWtsVkR0Arxl0iYiulFK7Pol3Bjn4WgZ8ABAk+VaQhzOzcQJjDAMIkpQKjDGXAFwEbwBaU/g0kkzSA7AIoMvMe0VxFQq01udEtO/gaZquNxqN56LL/X6/WalU7p1ERC7iOD7I930RhMKnIJ/kk+Cn8BDJh8AYcwrgEMAoTdN2WSxlazkYDJpJkjwCWABwxsxHrnciMMa0ALjiiIg2lFJPvv0uqltrV0XkLpO0mbk3EQyHw+XxeHxcrVZv6/V64UBDhVrrFQCbURSd1Gq1F+9HCwWX9c0F3gT/f0TvQoubGZOYcJcAAAAASUVORK5CYII='
                this.fold_toggle = false
            }else if(this.fold_toggle == false){
                this.$refs.myorder_bottom[index].classList.add('my_orders_fold')
                console.log(this.$refs.myorder_bottom[index].style.animation)
                this.$refs.myorders_arrow[index].src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABZElEQVRIS+2Tu0oDQRSG/5MtthSx8j0CYc4k4AMkausjaKHipRQCll4wFvoKll7yAKK7MwTyHlYiloGQIyO7EnPZ2SzGKtMNM/N///nPHMKcF81ZHwuAN+H/iajb7a72er0TAHda6xevrYwLnU6n1u/3t8IwPC2Xy2/fFRhj6gCeAHwS0aZS6rkIxFq7JiL3AJYANJi5/RORMeYMwJGDBEHQqFQqr7NAoiiqlUolZ9KJnzPzsXv/qwdxHF8Q0QGAj8FgsFGtVnNBEvEHAMsicqm1PkzNjTV5VkiW+FgFKTUvxCc+FZA0/grAnosLQJ2ZzXBPjDEMoO1iAdBi5v1JPcucA2ttS0R2AbwDWE8hifgjgBUiulZKOSMTl3fQRiGJSi7xzIiG7YxA3JHX+dRfNK3UOI5viGjbnYvIrdZ6J8+ceCNKRUSErLVNt1dKNYlI/hSQR2zmX1RUdPhd7oiKwhYAb3Jf/VqYGSxCm6kAAAAASUVORK5CYII='
                this.fold_toggle = true
            }
            // console.log(index)
            // console.log(this.$refs.myorder_bottom)
        },
        getmyorders_Data(cuid,token){
            let url = this.ip + 'course-appointment/personal'
            //?cuid=' + cuid + '&pageNo=1&pageSize=10
            let param = new URLSearchParams()
            param.append("cuid", cuid)
            param.append("pageNo", "1")
            param.append("pageSize", "10")
            param.append("userToken", token)
            axios.post(url,param).then((res)=>{
                this.myorders_data = res.data.data
                this.myorders_list = this.myorders_data.data
                if(res.data.result == 'noLogin'){
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
            }).catch(()=>{

            })
        },
        linkIos (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
            this.myorders_params = qury
            this.lng = qury.data.longitude
            this.lat = qury.data.latitude
            this.getmyorders_Data(qury.data.cuid,qury.data.token)

                //解析传进来的json
                //给本地变量赋值，并判断经纬度是否为空，为空显示
        },
        getParams(msg){
            this.myorders_params = msg
            this.lng = msg.longitude
            this.lat = msg.latitude
            this.getmyorders_Data(msg.cuid,msg.token)
        },
        ClickTo : function (qury,phone){//联系机构
            
            if (this.device === 'android') {
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'" ,"Phonenumber":"'+phone+'"}');
            }
            if (this.device === 'ios') { 
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'" ,"Phonenumber":"'+phone+'"}')
            }
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写 
        },
        myorder_skipe_orgindex(qury,storeId){
            
            if (this.device === 'android') {
                //安卓每个页面方法名不一样
                
                window.android.SkipPage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","storeId":"'+storeId+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}');
            }
            if (this.device === 'ios') { 
                
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme":"'+qury+'","url": "'+this.Url+'/orgindex","title":"机构主页","jump":"true","storeId":"'+storeId+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}')
            }
        },
        myorder_skipe_classdetail(index){
            
            if (this.device === 'android') {
                window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/classdetail","title":"课程详情","scheme":"JXHK","courseId":"'+this.myorders_list[index].courseId+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}');
                
            }
            if (this.device === 'ios') { 
                //jump  取值为true为跳新页面打开，false为当前页面打开
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","url": "'+this.Url+'/classdetail","title":"课程详情","scheme":"KCXQ","courseId":"'+this.myorders_list[index].courseId+'","longitude":"'+this.lng+'","latitude":"'+this.lat+'"}')
            }
        }
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
@import url(../../css/mine/myorders.css); 
</style>