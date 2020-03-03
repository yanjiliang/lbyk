<template>
    <div class="createclock">
        <div class="createclock_wrap">
            <div class="create_clock_title">
                <p>创建/编辑打卡</p>
                <p>打卡不仅能活跃老用户，还能推广课程哦</p>
            </div>
            <!-- 主题start -->
            <van-field
                v-model="clock_theme"
                rows="1"
                autosize
                type="textarea"
                maxlength="30"
                placeholder="请输打卡主题（5-30个字）"
            />
            <!-- 主题end -->
            <van-divider />

            <!-- 选择班级 start -->
            <div class="create_clock_second_title">
                <p>适用班级</p>
                <p>每个班级同时只能发布一个打卡活动</p>
            </div>
            <van-field
                readonly
                clickable
                :value="selectClass"
                placeholder="请选择"
                @click="showClassPicker = true"
            />
            <van-popup v-model="showClassPicker" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showClassPicker = false"
                    @confirm="onClassConfirm"
                />
            </van-popup>
            <van-divider />
            <!-- 选择班级 end -->
            <!-- 打卡结束时间 start -->
            <div class="create_clock_second_title">
                <p>打卡结束时间</p>
            </div>
            <van-field
                readonly
                clickable
                :value="currentDate"
                placeholder="请选择结束日期"
                @click="showDatePicker = true"
            />
            <van-popup v-model="showDatePicker" position="bottom">
                <van-datetime-picker
                    v-model="value"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="onDateConfirm"
                    @cancel="showDatePicker = false"
                />
            </van-popup>
            <van-divider />
            <!-- 打卡结束时间 end -->

            <!-- 推广课程 start -->
            <div class="create_clock_second_title">
                <p>推广课程(可选)</p>
                <p>只能选择一个，学员分享的打卡页面可同步展示招生课程</p>
            </div>
            <van-field
                readonly
                clickable
                :value="selectCourse"
                placeholder="选择课程"
                @click="showCoursePicker = true"
            />
            <van-popup v-model="showCoursePicker" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showCoursePicker = false"
                    @confirm="onCourseConfirm"
                />
            </van-popup>
            <van-divider />
            <!-- 推广课程 end -->

            <!-- 打卡介绍 start -->
            <div class="create_clock_second_title">
                <p>打卡介绍</p>
            </div>
            <van-field
                v-model="clock_theme"
                rows="1"
                autosize
                type="textarea"
                maxlength="500"
                placeholder="请填写打卡介绍（500字以内）"
                show-word-limit
            />
            <van-divider />
            <!-- 打卡介绍 end -->
            <div style="height:60px"></div>
            <div class="create_colock_btn">
                <p>立即发布</p>
            </div>

        </div>
    </div>
</template>
<script>
import {Toast} from 'vant'
export default {
    name:'createclock',
    data(){
        return{
            clock_theme:'',
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            value: '',
            showClassPicker: false,
            showDatePicker: false,
            showCoursePicker: false,
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: '',
            

        }
    },
    methods:{
        onChange(picker, value, index) {
            Toast(`当前值：${value}, 当前索引：${index}`);
        },
        onClassConfirm(value) {
            this.selectClass = value;
            this.showClassPicker = false;
        },
        onCourseConfirm(value) {
            this.selectCourse = value;
            this.showCoursePicker = false;
        },
        onDateConfirm(value){
            // this.currentDate = value;
            // let dataNow = new Date()
            // let now_year = dataNow.getFullYear()
            // let now_month = dataNow.getMonth() +1 
            // let now_day = dataNow.getDate()
            
            let year = value.getFullYear()
            let month = value.getMonth() +1 
            let day = value.getDate()
            this.currentDate =year +' 年 '+ month +' 月 '+ day +' 日'
            this.showDatePicker = false;
        }
    }
}
</script>
<style lang="stylus">
    .createclock
        
        .createclock_wrap
            padding 0 24px
            .create_clock_title
                margin-bottom 10px
                margin-top 26px
                p
                    &:nth-child(1)
                        font-size 24px
                        font-weight bold
                        line-height 33px
                        color #353239
                    &:nth-child(2)
                        font-size 14px
                        font-weight 400
                        color #9B9B9B
            .van-cell
                padding 10px 0 !important
                &:not(:last-child)::after
                    display none
            .van-divider
                margin 0
            .create_clock_second_title
                margin-top 20px
                p
                    &:nth-child(1)
                        font-size 14px
                        font-weight 400
                        line-height 20px
                        color #353239
                    &:nth-child(2)
                        font-size 12px
                        line-height 17px
                        font-weight 400
                        color #C6C6C6
                        margin 5px 0
            .create_colock_btn
                // position absolute
                // bottom 35px
                // left 0.64rem
                // width 8.8rem
                height 56px
                background #FF444B
                box-shadow 0px 4px 6px rgba(255,68,75,0.2)
                border-radius 28px
                text-align center
                line-height 56px
                p
                    font-size 16px
                    font-weight 400
                    color #FFF
            .van-picker__cancel, .van-picker__confirm
                color #FF444B!important
    input,textarea
        font-size 18px!important
        font-weight 400!important

</style>