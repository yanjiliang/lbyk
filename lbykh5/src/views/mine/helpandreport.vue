<template>
    <div class="helpandreport">
        <div class="container">
            <div class="weixin box">
                <p class="title">关注蜡笔优课公众号</p>
                <p class="secondtitle">请前往微信搜索“蜡笔优课”</p>
                <p><img src="../../images/mine/gongzhonghao.png" alt=""></p>
            </div>
            <div class="serveSurrpote box">
                <p class="title">微信服务支持</p>
                <p class="secondtitle">服务人员在线答疑</p>
                <div class="staff">
                    <div class="item">
                        <div class="left">
                            <p class="avatar"><img src="../../images/mine/fengge.png" ></p>
                            <div class="info">
                                <p>胡先生</p>
                                <p>业务咨询及服务支持</p>
                            </div>
                        </div>
                        <div class="right">
                            <p @click="ClickTo('COPY','huzfjl')">复制微信号</p>
                        </div>
                    </div>

                    <div class="item">
                        <div class="left">
                            <p class="avatar"><img src="../../images/mine/zhongge.png" ></p>
                            <div class="info">
                                <p>陈先生</p>
                                <p>业务咨询及服务支持</p>
                            </div>
                        </div>
                        <div class="right">
                            <p @click="ClickTo('COPY','tsyouasd')">复制微信号</p>
                        </div>
                    </div>

                    <div class="item">
                        <div class="left">
                            <p class="avatar"><img src="../../images/mine/xuge.png" ></p>
                            <div class="info">
                                <p>陈先生</p>
                                <p>技术支持</p>
                            </div>
                        </div>
                        <div class="right">
                            <p @click="ClickTo('COPY','cx695904')">复制微信号</p> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="mainStore box" style="display:none">
                <div class="storeinfo">
                    <p>蜡笔优课官方旗舰店</p>
                    <p>了解蜡笔优课</p>
                </div>
                <p class="btn">进店</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url(../../../public/reset.css);
@import url(../../css/mine/helpandreport.css); 
</style>
<script>
export default {
    name:'helpandreport',
    data(){
        return {
            device:this.$device.getDevice(),
        }
    },
    methods:{
        ClickTo : function (qury,wechat){
            
            if (this.device === 'android') {
                
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'","content":"'+wechat+'"}');
                
            }
            if (this.device === 'ios') { 
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'","content":"'+wechat+'"}')
            }
        
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写
        },
        linkIos (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        McDispatcher (){
                
        },

    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
    },
    mounted(){
        this.linkIos()
    }

}
</script>