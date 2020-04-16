<template>
    <div id="Brands" v-if="hasLoaded">
        <!-- logo -->
		<div class="brand_logo" flex="main:center cross:center">
            <img src="../../images/agent/logo.png">
		</div>
        <!-- 品牌介绍 -->
        <div class="agent_box">
        <!-- 标题 -->
        <div class="agent_box_title"><span>品牌介绍</span></div>
        <div style="font-size: 15px; line-height: 28px;">
            <p>蜡笔优课平台由深圳极数创新有限公司研发并运营，是中国首个全移动模式打造的教育行业在线服务平台。</p>
            <p>我们始终秉持以极低的价格为中小教育培训机构提供最优质的服务，目前，蜡笔优课的产品已经覆盖“教务管理”及“营销管理”两大板块，提供了学员管理、员工管理、智能排课、上课考勤、课时统计、家校互动、班级圈/打卡、招生管理等功能。</p>
        </div>
        </div>
        <!-- 公司资质 -->
        <div class="agent_box">
        <!-- 标题 -->
        <div class="agent_box_title"><span>公司资质</span></div>
            <div class="brand_zizhi" flex="main:justify cross:center">
                <img src="../../images/agent/zhizhao.jpg" >
                <img src="../../images/agent/ruanzhu.jpg" >
            </div>
        </div>
    </div>
</template>
<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
export default {
    name:'Brands',
    data(){
        return{
            hasLoaded:false
        }
    },
    mounted(){
        this.hasLoaded = true
    }
}
</script>