<template>
    <div class="OrderSuccessApp">
        <div class="container" style="padding-left:2.186666rem;padding-right:2.16rem">
            <div class="pic" style="margin:0 auto;width:3.44rem;heigth:4.506666rem;text-align:center;margin-top:25vh;margin-bottom:1.28rem">
                <img style="width:3.44rem;height:3.44rem;margin-bottom:0.32rem" src="../../images/GoodClass/success2xnew.png" alt="发布成功">
                <p style="font-size:0.53333rem;font-weight:bold;line-height:0.746666rem;color:rgba(77,201,189,1);opacity:1;">课程预约成功</p>
                
            </div>
            <div style="display:flex;align-items:center;text-align:center;font-size:0.426666rem;font-weight:400;justify-content: space-between">
                <p style="width:2.56rem;height:1.173333rem;line-height:1.173333rem;border:1px solid rgba(255,68,75,1);opacity:1;border-radius:5px;color:rgba(255,68,75,1);" @click="result_skipe_page(OrderSuccessApp_data_cuid)">查看预约</p>
                <p style="width:2.56rem;height:1.173333rem;line-height:1.173333rem;background:rgba(255,68,75,1);box-shadow:0px 5px 6px rgba(255,68,75,0.15);opacity:1;border-radius:5px;color:rgba(255,255,255,1);" @click="ClickTo('HOME')">返回首页</p>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name:'OrderSuccessApp',
    data(){
        return {
            OrderSuccessApp_data:'',
            OrderSuccessApp_data_cuid:'',
            Url:this.$Url.geturl(),
            device:this.$device.getDevice(),
        }
    },
    methods:{
        linkIos (){
                //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
        },
        McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
            this.OrderSuccessApp_data = qury
            this.OrderSuccessApp_data_cuid = qury.data.cuid
            
                //解析传进来的json
                //给本地变量赋值，并判断经纬度是否为空，为空显示
        },
        result_skipe_page (){
                //跳转页面
              
                if (this.device === 'android') {
                    //安卓每个页面方法名不一样
                    window.android.SkipPage('{"linkType": "h5","url": "'+this.Url+'/myorders","title":"我的预约","jump":"true"}');
                    
                }
                if (this.device === 'ios') { 
                    //jump  取值为true为跳新页面打开，false为当前页面打开
            　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","url": "'+this.Url+'/myorders","title":"我的预约","jump":"true"}')
                }
            },
        ClickTo : function (qury){
            
            if (this.device === 'android') {
                
                window.android.SkipPage('{"linkType": "app","scheme": "'+ qury +'"  }');
                
            }
            if (this.device === 'ios') { 
        　　　　window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "app","scheme": "'+ qury +'"}')
            }
        
            // document.getElementById('item').style.href = '{"skipPage":"{"linkType":"h5","type":"员工管理","storeeId":@"xxxxxx"}"}'
            //scheme 类型命名规范：例：员工管理-YGGL  首字母大写
        },
    },
    mounted(){
        this.linkIos()
    },
    beforeMount(){
        window.McDispatcher = this.McDispatcher
    }
}
</script>
<style scoped>
    
</style>