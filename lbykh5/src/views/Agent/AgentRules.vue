<template>
    <div id="AgentRules">
        <!-- 代理佣金比例 -->
		<div class="agent_box">
			<div flex="main:justify cross:center">
				<span class="font_16">我的佣金比例</span>
        <span class="font_20 bold color_blue">30%</span>
			</div>
		</div>
        <!-- 代理政策 -->
        <div class="agent_box font_16">
            <ul class="agent_rule">
            <li>
            <p class="color_gray">如何成为我的客户？</p>
            <p>当用户通过您的二维码或邀请链接注册后，即可成为你的客户。</p>
            </li>
            <li>
            <p class="color_gray">什么情况下可获得佣金？</p>
            <p>由你的客户申请入驻的所有门店续费“教务服务”和“营销服务”时均可分得佣金。</p>
            </li>
            <li>
            <p class="color_gray">佣金什么时候发放？</p>
            <p>当门店续费“教务服务”或“营销服务”后，立即发放到代理人账户。</p>
            </li>
            <li>
            <p class="color_gray">佣金怎么提现？</p>
            <p>点击账户右侧“提现”按钮，绑定您的支付宝账号后即可提现到支付宝，暂时不支持其它方式提现。</p>
            </li>
            <li>
            <p class="color_gray">客户再次续费是否有佣金？</p>
            <p>是的，只要是您的客户，未来所有的功能组续费你都将分得佣金。</p>
            </li>
            <li>
            <p class="color_gray">续费价格变化后佣金是否变化？</p>
            <p>是的，佣金的计算方式为：续费金额*佣金比例，当续费价格提高或因为活动降低时，实际结佣金额也会变化。</p>
            </li>
            <li>
            <p class="color_gray">代理资格有没有期限？</p>
            <p>目前没有</p>
            </li>
            <li>
            <p class="color_gray">佣金比例是否会变化？</p>
            <p>2021年4月1日前不会调整，后续平台会根据代理人业绩表现做比例的上浮或下调处理。</p>
            </li>
            <li>
            <p class="color_gray">我的客户没有通过我的邀请，自行注册了怎么办？</p>
            <p>可以进行邮件申诉，邮件中提供充分的证据表明该客户是你跟进成交的，审核通过后，将为您绑定客户关系。<br />申诉邮箱：market@labiyouke.com</p>
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
    name:'AgentRules'
}
</script>
<style scoped>
    #AgentRules{
        box-sizing: border-box;
        padding: 16px;
        background: #f6f6f6;
    }
</style>