<template>
    <div id="RealName">
        <!-- 激活 -->
        <div class="agent_box text_center" style="padding: 30px 30px 40px 30px">
            <div class="color_gray" style="line-height: 40px; letter-spacing: 2px;">您已具备代理人资格</div>
            <div class="font_24" style="letter-spacing: 2px;">激活代理服务</div>
            <div style="padding:20px 0 20px 0;">您需要先进行实名认证，激活代理服务后，您将与我们共同成长并获得收益。</div>
            <div class="ocr_box" v-if="!hasUpload">
                <div class="ocr_box_inner">
                    <a class="upload_btn" flex="main:center cross:center">
                        <p>
                            <van-uploader :after-read="afterRead">
                                <span class="iconfont font_48 color_blue">&#xe643;</span>
                                <span class="block font_12 color_gray" style="padding-top: 10px;">点击上传身份证正面照片</span>
                            </van-uploader>
                        </p>
                    </a>
                    
                </div>
            </div>
            <img style="width:100%;height:198px;box-sizing:border-box" :src="preViewImg" v-show="hasUpload" />
            <div class="color_gray font_12" style="line-height: 40px; padding-bottom: 40px;">*请上传清晰证件照，以免认证失败</div>
            <a href="#" class="agent_btn btn_blue btn_56" @click="realNameIdentify(idFile,cuid)">立即认证</a>
        </div>
    </div>
</template>
<script>
    import 'flex.css'
    import '../../css/agent/iconfont.css'
    import '../../css/agent/agent.css'
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
                idFile:Object,
                cuid:""
            }
        },
        beforeMount(){
            //
        },
        mounted(){
            //
        },
        methods:{
            afterRead(file){
                //选取文件后的操作
                console.log(file)
                this.preViewImg = file.content
                this.hasUpload = true
                this.idFile = file
            },
            // /customer-certification-info/authentication
            realNameIdentify(file,cuid){
                //提交认证的信息
                let url = this.ip+'customer-certification-info/authentication'
                let param = new URLSearchParams()
                param.append("cuid",cuid)
                param.append("idCardPicFile",file)
                axios.post(url,param).then((res)=>{
                    //
                    if(res.data.result == 'success'){
                        //
                    }
                })
            }
        }
    }
</script>