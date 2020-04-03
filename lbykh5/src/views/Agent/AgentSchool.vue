<template>
    <div id="AgentSchool">
        <!-- 学院banner -->
		<div class="banner_box">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=255796534,123773988&fm=15&gp=0.jpg">
		</div>
        <!-- 品牌介绍 -->
        <div class="agent_box" flex="main:justify cross:center">
        <div flex="main:left cross:center">
            <div class="agent_box_icon"><span class="iconfont">&#xe790;</span></div>
            <div><p class="font_16 blod">品牌介绍</p><p class="color_gray">了解蜡笔优课</p></div>
        </div>
        <a href="brand.html" class="agent_btn btn_blue">去了解</a>
        </div>
        <!-- 服务介绍及价格 -->
        <div class="agent_box" flex="main:justify cross:center">
        <div flex="main:left cross:center">
            <div class="agent_box_icon btn_blue"><span class="iconfont">&#xe79d;</span></div>
            <div><p class="font_16 blod">服务及价格介绍</p><p class="color_gray">了解客户服务内容</p></div>
        </div>
        <a href="service.html" class="agent_btn btn_blue">去了解</a>
        </div>
        <!-- 销售技巧及重点知识 -->
        <div class="agent_box">
        <!-- 标题开始 -->
        <div class="agent_box_title"><span>销售技巧及重点知识</span></div>
            <ul class="agent_know font_16" id="ask_list">
                <li class="agent_know_active">
                <p flex="main:justify cross:center" class="ask"><span>尽早续费有什么好处?</span><span class="iconfont arrow_up">&#xe745;</span><span class="iconfont arrow_down">&#xe7b2;</span></p>
                <p class="answer color_gray">蜡笔优课以功能组的形式提供服务，服务组内的功能会不断新增和升级，届时定价也会有所提升，对于已续费服务组的客户有效期内不会额外收费。</p>
                </li>
                <li>
                <p flex="main:justify cross:center" class="ask"><span>学员太多如何快速添加?</span><span class="iconfont arrow_up">&#xe745;</span><span class="iconfont arrow_down">&#xe7b2;</span></p>
                <p class="answer color_gray">可以多设置几个管理员，多人同时协作能快速完成学员添加工作，我们将尽快发布PC端的批量操作功能。</p>
                </li>
                <li>
                <p flex="main:justify cross:center" class="ask"><span>新门店入驻需要注意什么?</span><span class="iconfont arrow_up">&#xe745;</span><span class="iconfont arrow_down">&#xe7b2;</span></p>
                <p class="answer color_gray">新门店要注意以下两点：<br />1、门店logo默认为入驻时上传的门脸图，可在设置中更换；<br />2、门店客服电话默认为入驻联系人电话，可在设置中更改。；</p>
                </li>
                <li>
                <p flex="main:justify cross:center" class="ask" id="ask"><span>什么是机构数据隐私保护？</span><span class="iconfont arrow_up">&#xe745;</span><span class="iconfont arrow_down">&#xe7b2;</span></p>
                <p class="answer color_gray">在系统结构设计上，机构所有数据是相互隔离的受平台保护，除本机构管理员之外，其他任何人都无法获取到机构数据。</p>
                </li>
                <li>
                <p flex="main:justify cross:center" class="ask" id="ask"><span>什么是同业竞争保护？</span><span class="iconfont arrow_up">&#xe745;</span><span class="iconfont arrow_down">&#xe7b2;</span></p>
                <p class="answer color_gray">平台会将机构的营销课程向附近的用户推荐，帮助机构获取更多生源，为了营造和谐的竞争氛围，我们不会向您机构在读学员推荐与他在读科目相同的课程。</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import 'flex.css'
import '../../css/agent/iconfont.css'
import '../../css/agent/agent.css'
export default {
    name:'AgentSchool'
}
</script>
<style>
    #AgentSchool{
        box-sizing: border-box;
        padding: 16px;
        background: #f6f6f6;
    }
</style>