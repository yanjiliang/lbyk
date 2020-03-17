<template>
    <div class="aboutus">
        <div class="container">
            
            <div class="logo">
                <p><img src="../../images/mine/aboutus.png" alt=""></p>
                <p>蜡笔优课</p>
                <p>Version 1.0.3</p>
            </div>
            
            <div class="info">
                <p><a :href="Url +'/UserServiceAgreement'">《蜡笔优课用户协议》</a>和<a :href="Url +'/UserPrivate'">《隐私政策》</a></p>
                <p>蜡笔优课 版权所有</p>
                <p>Copyright © 2019 labiyouke.com. All Rights Reserved.</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url(../../../public/reset.css);
@import url(../../css/mine/aboutus.css); 
</style>
<script>
export default {
    name:'aboutus',
    data(){
        return {
            Url: this.$Url.geturl()
        }
    },
    

}
</script>