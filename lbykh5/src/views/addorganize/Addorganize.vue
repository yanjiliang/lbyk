<template>
    <div class="addorganize" >
        <div class="topbox"></div>
        <div class="container">
            <div class="management_function">
                <p>管理功能</p>
                <div class="function_infos">
                    <div class="item"><img src="../../images/addorganize/zsgl2x.png" alt=""></div>
                    <div class="item"><img src="../../images/addorganize/yggl2x.png" alt=""></div>
                    <div class="item"><img src="../../images/addorganize/xygl2x.png" alt=""></div>
                    <div class="item"><img src="../../images/addorganize/ksgl2x.png" alt=""></div>
                </div>
                <div class="function_infos">
                    <div class="item"><img src="../../images/addorganize/znpk2x.png" alt=""></div>
                    <div class="item"><img src="../../images/addorganize/znkq2x.png" alt=""></div>
                    <div class="item"><img src="../../images/addorganize/sktz2x.png" alt=""></div>
                    <div class="item"><img src="../../images/addorganize/jxhd2x.png" alt=""></div>
                </div>  
                <p class="continu">更多功能陆续推出...</p>
            </div>
            <div class="enter_info">
                <p>入驻须知</p>
                <p>为保障入驻机构的真实性，我们将进行必要的审核，入住前请准备好 <span>以下材料</span></p>
               
                <div class="step">
                    <div class="left">
                        <div>
                            <p>1</p>
                            <p>门脸照图片</p>
                        </div>
                        <p>需拍出完整牌匾、门框（建议正对门店2米处拍摄）</p>
                    </div>
                    <div class="right">
                        <img src="../../images/addorganize/join01.png" alt="">
                    </div>
                </div> 
                <div class="step">
                    <div class="left">
                        <div>
                            <p>2</p>
                            <p>门店环境图(2张)</p>
                        </div>
                        
                        <p>需真实反映教学环境(学习环境、教学工具等)</p>
                    </div>
                    <div class="right">
                        <img src="../../images/addorganize/join02.png" alt="">
                    </div>
                </div>
                
            </div>

            <div class="addorgnize_btn">
                <p @click="gotoEnter()">立即免费入驻</p>
                <p> 点击“提交”按钮即代表阅读并同意<a :href="Url+'/lbykServiceAgreement'">《蜡笔优课服务协议》</a></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'addorganize',
    data (){
        return{
            msg:'1122233',
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
        }
    },
    mounted: function (){
        this.linkIos()
    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
        window.getParams = this.getParams
    },
    methods:{
        McDispatcher (qury){
            if(!qury.data.token){
                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            }
        },
        getParams(msg){
            if(!msg.token){
                window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
            }
        },
        linkIos (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        consoleQury: function (qury){
            this.msg = qury
        },
        gotoEnter(){
            
            if (this.device === 'android') {
                window.android.SkipPage('{"linkType": "app","scheme": "JGRZ"}');
            }
            if (this.device === 'ios') {
        　　　　window.webkit.messageHandlers.Addorganize.postMessage('')
            }
        }
    }
}
</script>
<style scoped>
    .addorganize .btn{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }

@import url(../../../public/reset.css);
@import url(../../css/addorganize/addorganize.css);
</style>