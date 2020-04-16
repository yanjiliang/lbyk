<template>
    <div id="RealName" style="position:relative">
        <!-- 激活 -->
        <div class="agent_box text_center" style="padding: 30px 30px 40px 30px">
            <div class="color_gray" style="line-height: 40px; letter-spacing: 2px;">您已具备代理人资格</div>
            <div class="font_24" style="letter-spacing: 2px;">激活代理服务</div>
            <div style="padding:20px 0 20px 0;">您需要先进行实名认证，激活代理服务后，您将与我们共同成长并获得收益。</div>
            <div class="ocr_box">
                <div class="ocr_box_inner">
                    <a class="upload_btn" flex="main:center cross:center" @click="pickFile()" >
                        <p>
                            <van-uploader :after-read="afterRead" :multiple='false' :deletable='true' :max-count='1'>
                                <div v-show="!hasUpload">
                                    <span class="iconfont font_48 color_blue">&#xe643;</span>
                                    <span class="block font_12 color_gray" style="padding-top: 10px;" v-show="!hasUpload">点击上传身份证正面照片</span>
                                    <span class="block font_12 color_gray" style="padding-top: 10px;" v-show="hasUpload">点击更换身份证正面照片</span>
                                </div>
                                <img style="width:100%;height:220px;box-sizing:border-box;object-fit: cover;" :src="preViewImg" v-show="hasUpload" />
                            </van-uploader>
                        </p>
                    </a>
                    
                </div>
            </div>
            <!-- <van-uploader v-model="fileList" multiple :max-count='1'/> -->
            
            <div class="color_gray font_12" style="line-height: 40px; padding-bottom: 40px;">*请上传清晰证件照，以免认证失败</div>
            <a href="#" class="agent_btn btn_blue btn_56" @click="realNameIdentify(idFile,cuid,token)">立即认证</a>
        </div>

        <van-overlay :show="hasDone" >
            <div style="margin:50vh auto">
                <van-loading size="48px" type="spinner" color="#b0b3ba" v-show="hasDone" vertical></van-loading>
            </div>
        </van-overlay>
    </div>
</template>
<script>
    import 'flex.css'
    import '../../css/agent/iconfont.css'
    import '../../css/agent/agent.css'
import { Toast } from 'vant'
    const axios = require('axios')
    export default {
        name:'RealName',
        data(){
            return{
                ip: this.$ip.getIp(),
                Url: this.$Url.geturl(),
                device: this.$device.getDevice(),
                preViewImg:'',
                hasUpload:false,
                idFile:'',
                cuid:"",
                token:'',
                hasDone:false,
            }
        },
        beforeMount(){
            //
            window.McDispatcher = this.McDispatcher
            window.getParams = this.getParams
        },
        mounted(){
            //
            this.linkIos()
        },
        methods:{
            translateBase64ImgToFile(base64,filename,contentType){
                var arr = base64  //去掉base64格式图片的头部
                var bstr = atob(arr)   //atob()方法将数据解码
                var leng = bstr.length
                var u8arr = new Uint8Array(leng)
                while(leng--){
                    u8arr[leng] =  bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
                }
                return new File([u8arr],filename,{type:contentType}) 
            },
            afterRead(file){
                //选取文件后的操作
                // console.log(file)
                this.preViewImg = file.content
                this.hasUpload = true
                this.idFile = file.file
            },
            // /customer-certification-info/authentication 
            realNameIdentify(file,cuid,token){
                //提交认证的信息
                if(file != ''){
                    this.hasDone = true
                    let url = this.ip+'customer-certification-info/authentication'
                    let param = new FormData()
                    param.append("cuid",cuid)
                    param.append("idCardPicFile",file)
                    param.append("userToken", token)
                    let config = {
                        headers: { //添加请求头
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    axios.post(url,param,config).then((res)=>{
                        //
                        if(res.data.result == 'noLogin'){
                            if(this.device == 'android'){
                                window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }else if(this.device == 'ios'){
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                            }
                            
                        }
                        if(res.data.result == 'success'){
                            //
                            this.hasDone = false
                            if(this.device == 'android'){
                                window.android.SkipPage('{"linkType": "h5","scheme":"DLSY","url":"'+this.Url+'/AgentIndex","title":"代理服务"}');
                            }
                            if(this.device == 'ios'){
                                //
                                window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK"}')
                            }
                        }else{
                            Toast(res.data.msg)
                            this.hasDone = false
                            if(res.data.msg == '已经实名认证，无需重复认证'){
                                setTimeout(()=>{
                                    if(this.device == 'android'){
                                        window.android.SkipPage('{"linkType":"app","scheme":"REBACK"}');
                                    }
                                    if(this.device == 'ios'){
                                        //
                                        window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"REBACK"}')
                                    }
                                },200)
                            }
                        }
                    })
                }else{
                    Toast('抱歉，您还未选择证件照！')
                }
            },
            pickFile(){
                window.android.SkipPage('{"linkType":"app","scheme":"PICKFILE"}')
            },
            McDispatcher (qury){
                //iOS获取APP传过来的参数的方法
                this.token = qury.data.token
                this.cuid = qury.data.cuid
                if(!qury.data.token){
                    window.webkit.messageHandlers.skipPage.postMessage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
            },
            getParams(msg){
                //android获取APP传过来的参数的方法
                this.token = msg.token
                this.cuid = msg.cuid
                if(msg.file){
                    setTimeout(()=>{
                        this.preViewImg = 'data:image/jpeg;base64,' + msg.file
                        this.hasUpload = true
                        this.idFile = this.translateBase64ImgToFile(msg.file,"idcard.jpeg","image/jpeg")
                    },300)
                }
                if(!msg.token){
                    window.android.SkipPage('{"linkType":"app","scheme":"LOGIN","callback":"true"}')
                }
                
            },
            linkIos (){
                    //给iOS APP传参
                window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
            },

        }
    }
</script>
