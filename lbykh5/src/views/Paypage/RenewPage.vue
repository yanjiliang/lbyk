<template>
  <div class="renewpage">
    <div class="userInfoWrap">
      <div class="bg_box"></div>
      <div class="bg_box_1"></div>
      <div class="logo_box"><img src="../../images/paypage/logo@2x.png" alt=""></div>
      <div class="renew_userinfo_box">
        <div class="renew_userinfo">
          <div class="renew_userinfo_left">
            <p><img :src="renewPage_resdata.logo" alt=""></p>
          </div>
          <div class="renew_userinfo_right">
            <p class="renew_func_title">{{renewPage_resdata.functionalName}}</p>
            <p class="renew_orgin_name">{{renewPage_resdata.storeName}}</p>
            <p class="renew_func_date">有效期至 {{renewPage_resdata.storeFunctionalDto.expirationDate}} <span v-if="renewPage_resdata.storeFunctionalDto.effective">（已过期）</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>{{productInfo}}</p> -->
    <div class="renew_product_box">
      <p style="font-size:18px;font-weight:bold">选择优惠套餐</p>
      
    </div>
    <!-- 套餐--start -->
    <Product :productInfo='productInfo' @productPage_data = 'getProductpage_data' />
    <!-- 套餐--end -->
    <div class="renew_btn_box">
      <div class="renew_btn">
        <p class="renew_btn_price" >{{select_title}}：￥{{select_price}}</p>
        <p class="renew_btn_click" @click="goToRenew()">立即续费</p>
      </div>
      <p class="renew_protocol">点击“立即续费”按钮即代表阅读并同意 <a :href="Url+'/lbykServiceAgreement'">《蜡笔优课服务协议》</a></p>
    </div>
  </div>
</template>
<script>
  import Product from '../../components/Product'
import { Toast } from 'vant'
  const axios = require('axios')
  export default {
    name: 'renewpage',
    components: {
      Product
    },
    data() {
      return {
        ip:this.$ip.getIp(),
        Url:this.$Url.geturl(),
        device:this.$device.getDevice(),
        renewPage_resdata:'',
        userInfo: '',
        productInfo: [],
        intem_index:'',
        select_title:'12个月',
        select_price:'798',
        renew_token:'',
        renew_storeId:'',
        renew_cuid:''
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
        this.renew_cuid = qury.data.cuid
        this.renew_storeId = qury.data.storeId
        this.renew_token = qury.data.token
        this.getProductinfo(this.renew_storeId, 'RecruitStudents', this.renew_cuid, this.renew_token)
      },
      linkIos: function () {
        window.webkit.messageHandlers.getUserInfo.postMessage('成功了吗？')
      },
      getProductinfo(storeId, func, cuid, token) {
        //http://192.168.3.22:8081/goods/functionServiceRenewalGoods?cuid=grRF653ZPCGg2RCHNRl&storeId=STORE_bZFtqlbNfPgMzh7rKlq&functional=RecruitStudents
        // let url = this.ip + 'recruitStudents/goodsInfo';
        let url = this.ip + 'goods/functionServiceRenewalGoods'
        // let url = 'http://192.168.3.22:8081/goods/functionServiceRenewalGoods'
        let param = new URLSearchParams()
        param.append("storeId", storeId)
        param.append("functional", func) //RecruitStudents
        param.append("cuid", cuid)
        param.append("userToken", token)
        axios.post(url, param).then((res) => {
          // this.productInfo = res.data;
          let res_data = res.data
          this.renewPage_resdata = res_data.data
          // Toast(res_data.msg)
          this.productInfo = res_data.data.goodsList
          
        }).catch((err) => {
          console.log(err)
        })
      },
      getProductpage_data(productPage_data){
        let intem_index = productPage_data.select_item_index
        this.select_title = this.productInfo[intem_index].title
        this.select_price = this.productInfo[intem_index].sellingPrice
        this.intem_index = intem_index
      },
      goToRenew(){
        
        let price = this.select_price
        let goodsId = this.productInfo[this.intem_index].goodsId
        let url = this.ip + 'functionalModule/purchaseOrder';
            // ?cuid=' +this.cuid + '&storeId=' + this.storeId + '&goodsId=' +this.productInfo.goodsId+ '&price=' +this.productInfo.sellingPrice;
        let param = new URLSearchParams()
        param.append("storeId", this.renew_storeId)
        param.append("goodsId", goodsId)
        param.append("price", price)
        param.append("cuid", this.renew_cuid)
        param.append("userToken", this.renew_token)
        axios.post(url,param).then((res)=>{
          let res_data = res.data.data
          let orderId = res_data.orderDto.orderId
          Toast(res_data.msg)
          if(this.device === 'android'){
              window.android.SkipPage('{"linkType": "h5","scheme": "ZFYM","orderId":"'+orderId+'","storeId": "'+this.renew_storeId+'","url":"'+this.Url+'/PayPage","title":"支付订单"}')
          }else if(this.device === 'ios'){
              window.webkit.messageHandlers.skipPage.postMessage('{"linkType": "h5","scheme": "ZFYM","orderId":"'+orderId+'","storeId": "'+this.renew_storeId+'","url":"'+this.Url+'/PayPage","title":"支付订单"}')
          }
        })
        
      }
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
                          font-size 20px
                          font-weight bold
                          margin 8px 0
                      .renew_orgin_name
                          font-size 14px
                          font-weight 400
                      .renew_func_date
                          font-size 14px
                          font-weight 400
                          span 
                              font-size 11px
                              color #FF444B
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