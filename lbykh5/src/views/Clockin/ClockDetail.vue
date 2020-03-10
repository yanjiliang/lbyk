<template>
    <div class="clock_detail">
        <!-- <p>打卡详情页</p>
        <div class="clock_detail_navinfo_box">

        </div> -->
        <ClockList />
    </div>
</template>
<script>
import ClockList from '../../components/ClockList'
export default {
    name:'clockdetail',
    components:{
        ClockList
    }
}
</script>
<style lang="stylus" scoped>

    .clock_detail_navinfo_box
        width 10rem
        height 330px
        background url('../../images/CreateClock/clock_detail_topbg.png') no-repeat
        background-size 100% 100%
        box-sizing border-box 
</style>
