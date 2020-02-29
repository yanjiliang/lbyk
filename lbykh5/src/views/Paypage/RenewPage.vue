<template>
  <div class="renewpage">
    <div class="userInfoWrap">
      <div class="bg_box"></div>
      <div class="bg_box_1"></div>
      <div class="logo_box"><img src="../../images/paypage/logo@2x.png" alt=""></div>
      <div class="renew_userinfo_box">
        <div class="renew_userinfo">
          <div class="renew_userinfo_left">
            <p><img src="http://img1.imgtn.bdimg.com/it/u=561326960,1564995287&fm=11&gp=0.jpg" alt=""></p>
          </div>
          <div class="renew_userinfo_right">
            <p class="renew_func_title">招生管理</p>
            <p class="renew_orgin_name">星悦国际（南山店）</p>
            <p class="renew_func_date">有效期至2020年2月5日 <span>（已过期）</span></p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="renew_product_box">
      <p style="font-size:18px;font-weight:bold">选择优惠套餐</p>
      
    </div>
    <Product :productInfo='productInfo' />

    <div class="renew_btn_box">
      <div class="renew_btn">
        <p class="renew_btn_price">12个月：￥798</p>
        <p class="renew_btn_click">立即续费</p>
      </div>
      <p class="renew_protocol">点击“立即续费”按钮即代表阅读并同意 <a href="">《蜡笔优课服务协议》</a></p>
    </div>
  </div>
</template>
<script>
  import Product from '../../components/Product'
  const axios = require('axios')
  export default {
    name: 'renewpage',
    components: {
      Product
    },
    data() {
      return {
        userInfo: '',
        productInfo: []
      }
    },
    created() {
      window.McDispatcher = this.McDispatcher
    },
    mounted() {
      this.linkIos()
    },
    methods: {
      McDispatcher(qury) {
        //接受数据
        this.userInfo = qury
        let cuid = qury.data.cuid
        let storeId = qury.data.storeId
        let token = qury.data.token
        this.getProductinfo(storeId, 'RecruitStudents', cuid, token)
      },
      linkIos: function () {
        window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
      },
      getProductinfo(storeId, func, cuid, token) {
        // let url = this.ip + 'recruitStudents/goodsInfo';
        let url = this.ip + 'goods/functionServiceGoods'
        let param = new URLSearchParams()
        param.append("storeId", storeId)
        param.append("functional", func) //RecruitStudents
        param.append("cuid", cuid)
        param.append("userToken", token)
        axios.post(url, param).then((res) => {
          this.productInfo = res.data.data;
        }).catch((err) => {
          console.log(err)
        })
      },
    }
  }
</script>
<style lang="stylus">
  .renewpage
      width 10rem
      height 100vh
      position relative
      .userInfoWrap
          width 10rem
          // height 208px
          box-sizing border-box
          position relative
          .bg_box
              width 10rem
              height 208px
              background-image: linear-gradient( #2E3662, #3B467A)
              box-sizing border-box
          .bg_box_1
              width: 0
              height: 0
              border-bottom: 80px solid #fff
              border-left: 10rem solid transparent
              position absolute
              bottom 0
              box-sizing border-box
          .logo_box
              box-sizing border-box
              width 235px
              height 235px
              position absolute
              right 0
              top 0
              img 
                  width 235px
                  height 235px
          .renew_userinfo_box
              // border-bottom  1px solid red
              box-sizing border-box
              width 10rem
              height 50px
              padding 0 16px
              .renew_userinfo
                  width 100%
                  height 118px
                  background-image linear-gradient(#EEC368,#F5DE8A)
                  box-sizing border-box
                  border-radius 15px
                  position relative
                  top -100px
                  box-shadow 0 3 10px rgba(103,181,209,.2)
                  display flex
                  align-items center
                  .renew_userinfo_left
                      width 118px
                      height 100%
                      box-sizing border-box
                      text-align center
                      display flex
                      align-items center
                      justify-content center
                      img 
                          width 60px
                          height 60px
                          border-radius 50%
                          border 1px solid #fff 
                          box-sizing border-box
                  .renew_userinfo_right
                      .renew_func_title
                          font-size 16px
      .renew_product_box  
        padding 0 16px   
    .renew_btn_box
      position absolute
      bottom 35px
      width 10rem
      box-sizing border-box
      padding 0 16px
      text-align center
      .renew_btn
        width 100%
        height:56px
        background:rgba(232,232,232,1)
        border-radius:30px
        display flex
        align-items center
        box-sizing border-box
        padding 0 0 0 22px
        justify-content space-between
        .renew_btn_price
            font-size 16px
            font-weight bold
            line-height 22px
            color #2E3662
        .renew_btn_click
            width:130px
            height:56px
            line-height 56px
            text-align center
            background:linear-gradient(270deg,rgba(238,195,104,1) 0%,rgba(245,222,138,1) 100%)
            border-radius:30px
            font-size 16px
            font-weight 400
      .renew_protocol
        margin-top 10px
        a
          color #FF444B

</style>