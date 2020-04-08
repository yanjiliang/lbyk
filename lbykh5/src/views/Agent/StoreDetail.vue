<template>
    <div id="StoreDetail">
        <!-- 开始头部信息 -->
		<div class="agent_header" flex="main:left cross:center">
			<img :src="storeInfo.logo"  class="avator_64">
			<div>
				<p class="font_20 blod store_name">{{storeInfo.storeName}}</p>
				<p class="color_gray">{{storeInfo.entryDate}}</p>
			</div>
		</div>
        <!-- 客户 -->
        <div class="agent_box">
            <div class="agent_box_title">
                <span>客户信息</span>
            </div>
        <div flex="main:justify cross:top">
            <div flex="main:left cross:top">
            <img :src="storeInfo.avatar"  class="avator_48">
            <div>
                <p><span class="blod">{{storeInfo.name}}</span></p>
                <p class="color_gray font_12"><span>{{storeInfo.phone}}</span><span class="margin_left_10">{{storeInfo.regTime}}</span></p>
            </div>
            </div>
            <div>
            <div class="text_center">
                <p class="store_name blod color_blue">{{storeInfo.storeCount}}</p>
                <p class="color_gray font_12"><span>入驻门店数量</span></p>
            </div>
            </div>
        </div>
        </div>
            <!-- 门店基础信息 -->
            <div class="agent_box">
                <div class="agent_box_title">
                    <span>门店基础信息</span>
                </div>
                <div flex="main:left cross:top"><p class="color_gray store_base_title">经营科目：</p><p>{{storeInfo.categoryList}}</p></div>
        <div flex="main:left cross:top"><p class="color_gray store_base_title">门店地址：</p><p>{{storeInfo.addrInfo}}</p></div>
        <div flex="main:left cross:top"><p class="color_gray store_base_title">联系方式：</p><p>{{storeInfo.contact}}<a :href="'tel:'+storeInfo.contactNumber" class="color_blue margin_left_10">{{storeInfo.contactNumber}}</a><span class="block font_12 color_gray">该联系信息由入驻时所填</span></p></div>
            </div>
        <!-- 服务详情 -->
        <div class="agent_box">
        <div class="agent_box_title">
            <span>服务详情及诊断</span>
        </div>
        <div>
            <!-- 教务服务诊断开始 -->
            <div>
            <p>
                <span class="font_16 blod">教务服务</span>
                <span v-if="storeInfo.baseService.status == 'normal'" class="color_blue margin_left_10"><span class="iconfont">&#xe78d;</span>正常</span>
                <span v-if="storeInfo.baseService.status == 'unopen'" class="color_gray margin_left_10"><span class="iconfont">&#xe789;</span>未开通</span>
                <span v-if="storeInfo.baseService.status == 'expiring'" class="color_yellow margin_left_10"><span class="iconfont">&#xe77b;</span>即将过期</span>
                <span v-if="storeInfo.baseService.status == 'expired'" class="color_red margin_left_10"><span class="iconfont">&#xe78b;</span>已过期</span>
            </p>
            <p class="color_gray">有效期至{{storeInfo.baseService.expirationDate}}</p>
            </div>
            <div class="service_info margin_bottom_24">
            <div flex="main:justify cross:center"><span>服务诊断</span><span class="color_gray">请留意黄色指标</span></div>
            <div class="service_info_list" flex="main:justify cross:center">
                <p><span v-if="storeInfo.baseService.addStaff" class="iconfont font_20 block color_blue">&#xe78d;</span><span v-if="!storeInfo.baseService.addStaff" class="iconfont font_20 block color_yellow">&#xe78a;</span><span class="color_gray font_12 block">是否添加员工</span></p>
                <p><span class="font_20 block color_blue">{{storeInfo.baseService.staffActivationRatio}}</span><span class="color_gray font_12 block">员工激活比例</span></p>
                <p><span v-if="storeInfo.baseService.addClass" class="iconfont font_20 block color_blue">&#xe78d;</span><span v-if="!storeInfo.baseService.addClass" class="iconfont font_20 block color_yellow">&#xe78a;</span><span class="color_gray font_12 block">是否创建班级</span></p>
            </div>
            <div class="service_info_list" flex="main:justify cross:center">
                <p><span v-if="storeInfo.baseService.addStudent" class="iconfont font_20 block color_blue">&#xe78d;</span><span v-if="!storeInfo.baseService.addStudent" class="iconfont font_20 block color_yellow">&#xe78a;</span><span class="color_gray font_12 block">是否添加学员</span></p>
                <p><span class="font_20 block color_yellow">{{storeInfo.baseService.studentActivationRatio}}</span><span class="color_gray font_12 block">学员激活比例</span></p>
                <p><span v-if="storeInfo.baseService.addClock" class="iconfont font_20 block color_blue">&#xe78d;</span><span v-if="!storeInfo.baseService.addClock" class="iconfont font_20 block color_yellow">&#xe78a;</span><span class="color_gray font_12 block">是否创建打卡</span></p>
            </div>
            </div>
            <!-- 教务服务诊断结束 -->
            <!-- 营销服务诊断开始 -->
            <div>
            <p>
                <span class="font_16 blod">营销服务</span>
                <span v-if="storeInfo.marketingService.status == 'normal'" class="color_blue margin_left_10"><span class="iconfont">&#xe78d;</span>正常</span>
                <span v-if="storeInfo.marketingService.status == 'unopen'" class="color_gray margin_left_10"><span class="iconfont">&#xe789;</span>未开通</span>
                <span v-if="storeInfo.marketingService.status == 'expiring'" class="color_yellow margin_left_10"><span class="iconfont">&#xe77b;</span>即将过期</span>
                <span v-if="storeInfo.marketingService.status == 'expired'" class="color_red margin_left_10"><span class="iconfont">&#xe78b;</span>已过期</span>
            </p>
            <p class="color_gray">有效期至{{storeInfo.marketingService.expirationDate}}</p>
            </div>
            <div class="service_info">
            <div flex="main:justify cross:center"><span>服务诊断</span><span class="color_gray">请留意黄色指标</span></div>
            <div class="service_info_list" flex="main:justify cross:center">
                <p><span v-if="storeInfo.marketingService.releaseCourse" class="iconfont font_20 block color_blue">&#xe78d;</span><span v-if="!storeInfo.marketingService.releaseCourse" class="iconfont font_20 block color_yellow">&#xe78a;</span><span class="color_gray font_12 block">是否发布课程</span></p>
                <!-- <p><span v-if="storeInfo.marketingService.releaseCourse" class="iconfont font_20 block color_blue">&#xe78d;</span><span class="iconfont font_20 block color_yellow">&#xe78a;</span><span class="color_gray font_12 block">是否发布旁听</span></p> -->
            </div>
            </div>
            <!-- 营销服务诊断结束 -->
        </div>
        </div>
        <!-- 服务详情结束 -->
        <!-- 交易记录开始 -->
        <div class="agent_box">
        <div class="agent_box_title">
            <span>交易记录</span>
        </div>
        <ul class="deal_list">
            <li v-for="(item, index) in accountFlow" :key="index">
            <p class="blod" flex="main:justify cross:center"><span>{{item.title}}</span><span>￥{{item.amount}}</span></p>
            <p class="font_12 color_gray" flex="main:justify cross:center"><span>{{item.dateTime}}</span><span class="color_blue">已结佣<i>￥{{item.commission}}</i></span></p>
            </li>
            <!-- <li>
            <p class="blod" flex="main:justify cross:center"><span>基础服务续费</span><span>￥888</span></p>
            <p class="font_12 color_gray" flex="main:justify cross:center"><span>2020年3月25日 15:23</span><span class="color_blue">已结佣<i>￥166.7</i></span></p>
            </li> -->
        </ul>
        </div>
        <!-- 交易记录结束 -->
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
import { Toast } from 'vant'
const axios = require('axios')

export default {
    name:"StoreDetail",
    data(){
        return{
            //
            ip: this.$ip.getIp(),
            Url: this.$Url.geturl(),
            device: this.$device.getDevice(),
            storeInfo:Object,
            accountFlow:Object
        }
    },
    beforeMount(){
        //
        // Toast()
    },
    mounted(){
        //
    },
    methods:{
        getStoreInfo(cuid,storeId){
            //获取门店信息
            let url = this.ip+'agent/storeInfo';
            let param = new URLSearchParams()
            param.append("cuid",cuid)
            param.append("storeId",storeId)
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'success'){
                    //请求成功
                    let storeInfo = res.data.data
                    this.storeInfo = storeInfo
                }else if(res.data.result == 'error'){
                    Toast(res.data.msg)
                }
            })
        },
        getAccountFlow(cuid,storeId){
            // /agent/storeAccountFlow
            let url = this.ip+'agent/storeAccountFlow';
            let param = new URLSearchParams();
            param.append("pageNo",1)
            param.append("pageSize",50)
            param.append("cuid",cuid)
            param.append("storeId",storeId)
            axios.post(url,param).then((res)=>{
                if(res.data.result == 'success'){
                    //
                    let accountFlow = res.data.data
                    this.accountFlow = accountFlow
                }else if(res.data.result == 'error'){
                    Toast(res.data.msg)
                }
            })
        }
    }
}
</script>
<style scoped>
    #StoreDetail{
        box-sizing: border-box;
        padding: 16px;
        background: #f6f6f6;
    }
</style>