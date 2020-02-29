
<template>
    <div class="orderinfo">
        <div class="ordertitle">
            <p>预约须知</p>
        </div>
        <div class="infocontent">
            <div>
                <p><i><img src="../images/GoodClass/zffy2x.png" alt=""></i>如何支付费用？</p>
                <p>预约后，培训机构将与您联系约定到店学习时间，费用请在到店后支付给商家。</p>
            </div>
            <div>
                <p><i><img src="../images/GoodClass/fp2x.png" alt=""></i>如何取得发票？</p>
                <p>平台不支持开发票，如有需要请与机构协商</p>
            </div>
            <div>
                <p><i><img src="../images/GoodClass/wxts2x.png" alt=""></i>温馨提示</p>
                <p>请告知机构本课程通过蜡笔优课预约，我们将为您提供有必要的售后服务</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'orderinfo',
    data(){
        return{
            
        }
    }
}
</script>
<style lang="stylus">
.orderinfo
    width 10rem
    box-sizing border-box
    padding 0 16px
    .ordertitle
        margin 0 0 20px 0
        p
            font-size:18px;
            font-weight:bold
            line-height:25px
            color:#181818
    .infocontent
        background #fff
        box-shadow:0px 0px 30px rgba(0,0,0,0.05)
        border-radius 8px
        box-sizing border-box
        padding 16px 12px 4px 12px
        div
            p
                &:nth-child(1)
                    font-size: 16px
                    font-weight: 400
                    line-height: 16px
                    color: #181818
                    display flex
                    align-items center
                    i 
                        width: 14px
                        height: 14px
                        margin-right: 8px
                        // margin-top: -1px
                        display: inline-block
                        box-sizing border-box
                        img 
                            width 14px
                            height 14px
                &:nth-child(2)
                    font-size: 14px
                    font-weight: 400
                    line-height: 24px
                    color: #9B9B9B
                    box-sizing border-box
                    padding-left 22px
                    margin 12px 0

</style>