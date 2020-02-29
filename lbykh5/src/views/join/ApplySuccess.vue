<template>


   <div class="#app">
     <meta name="viewport" content="width=320,maximum-scale=1.3,user-scalable=no">

     <el-card class="box-card">
        <!-- el-card修改 -->
         <div class="success">
                                
             <img :src="require('../../images/JoinStore/'+ imgContent  +'.png')" class="lb_successImg"/>

             <p style="color:#303133; font-weight: bold; font-size:14px; margin-top:16px;">{{applyContent}}</p>
            
             <p style="color:#909399; font-size:14px; margin-top:28px;">{{auditContent}}</p>

             <!-- <el-button href type="danger" style="width:100%; margin-top:30px;" @click="androisIos()">
                  <a style="text-decoration:none; color:#FFFFFF;" :href="this.downloadAddress">下载蜡笔优课</a>
             </el-button> -->
             <div class="download" @click="androisIos()">
                <p style="font-size:14px;font-weight:400;line-height:44px;color:#FFFFFF"><a style="text-decoration:none;color:#fff" :href="this.downloadAddress">下载蜡笔优课</a></p>
            </div>
             <!-- el-button修改 -->
         </div>
        
     </el-card>

     <div style="width:129px;">
      <img class="logo" src="../../images/JoinStore/lb_Mobile_Login.png"/>
    </div>

   </div>

</template>


<script>

export default {

    data() {
        return {
            imgContent: '',
            applyContent: "",
            auditContent: "",
            downloadAddress:"",
        }
    },

    mounted() {
        var status = this.$route.query.status;
        this.assignment(status);
    },

    methods: {

        assignment(status){
            // if (status == 0) {
            //    this.imgContent = 'success2';
            //    this.applyContent = "申请已提交";
            //    this.auditContent = "正在等待管理员审核";
            // }

            // if (status == 0) {
            //    this.imgContent = 'Sigh';
            //    this.applyContent = "你已存在该组织";
            //    this.auditContent = "无需重复提交";
            // }

            //applicationSuccess(0),//申请成功  noStore(1),//没有门店  storeAuditFailed(2),//门店审核未通过  verificationCodeError(3),//验证码错误  registerError(4),//注册失败
                        //existingStore(5),//已经是门店员工  haveApplied(6),//已经申请
            switch(status){
                case 0:
                    this.imgContent = 'success2';
                    this.applyContent = "申请已提交";
                    this.auditContent = "正在等待管理员审核";
                    break;
                case 1:
                    this.imgContent = 'success2';
                    this.applyContent = "申请失败";
                    this.auditContent = "该门店不存在";
                    break;
                case 2:
                    this.imgContent = 'success2';
                    this.applyContent = "申请失败";
                    this.auditContent = "门店审核未通过";
                    break;
                case 3:
                    this.imgContent = 'success2';
                    this.applyContent = "申请失败";
                    this.auditContent = "验证码错误";
                    break;
                case 4:
                    this.imgContent = 'success2';
                    this.applyContent = "申请失败";
                    this.auditContent = "注册失败";
                    break;
                case 5:
                    this.imgContent = 'success2';
                    this.applyContent = "你已存在该组织";
                    this.auditContent = "无需重复提交";
                    break;
                case 6:
                    this.imgContent = 'success2';
                    this.applyContent = "已经申请";
                    this.auditContent = "无需重复提交";
                    break;
                
            }
        },

        //校验是否是安卓还是ios
        androisIos(){
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                //Android
                this.downloadAddress = "1.net:81/201703/tools/ideaiu_jb51.rar";
            } else if (isIOS) {
                //ios
                this.downloadAddress = "https://apps.apple.com/cn/app/id1498163739?l=zh&ls=1";
            }
        }


    }
    
}
</script>


<style scoped>

  *{
    margin: 0;
    padding: 0;
 }

 .box-card {
        width: 90%;
        height: 326px;
        margin: 30px auto;
  }

  .success{
      text-align: center;

  }
  .lb_successImg{
      width: 48px;
      height: 48px;
      margin-top: 64px;
  }

  .logo{
        margin-left: 70%;
        margin-top: -18%;
        width: 100%;
        height: 100%;
      }
.download{
    width:231px;
    height:44px;
    background:rgba(255,68,75,1);
    box-shadow:0px 5px 6px rgba(255,68,75,0.15);
    opacity:1;
    border-radius:5px;
    margin: 30px auto;
}
</style>