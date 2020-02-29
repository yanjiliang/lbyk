<template>
    <div class="product">
        <div class="wrap" ref="product_wrap">
            <div class="product_list" ref="product_list">
                <div class="item" v-for="(item,index) in productInfo" :key='index'>
                    <p class="title">{{item.title}}</p>
                    <p class="price"><span style="font-size:14px">￥</span>{{item.sellingPrice}}</p>
                    <p class="info">{{item.introduce}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
// import { Toast } from 'vant'
export default {
    name:'product',
    data(){
        return{
            productlist:this.productInfo,
            
        }
    },
    props:{
        productInfo:{
            type:Array,
            required:true
        }
    },
    mounted(){
       this.$nextTick(()=>{
           let getlen = setInterval(()=>{
                const len = this.productInfo.length
                
                this.Bscroll(len)
                if(len){
                    clearInterval(getlen)
                }
           },100)
       }) 
        
    },
    beforeMount(){
        
    },
    methods:{
        Bscroll (len){
            let width = len * 112   
            this.$nextTick(()=>{
                this.$refs.product_list.style.width = width +'px'
                console.log(this.$refs.product_list.style.width)
                if(!this.scroll){
                    this.scroll = new  BScroll(this.$refs.product_wrap,{
                        startX:0,
                        click:true,
                        scrollX:true,
                        scrollY:false,
                        eventPassthrough:'vertical',
                    })
                }else {
                    this.scroll.refresh()
                }
                
            })
        },
    }
}
</script>
<style lang="stylus" scoped>
    .product
        background #fff
        padding 14px
        box-sizing border-box
        width 10rem
        overflow hidden
        padding-left 16px
        .wrap
            // border 1px solid red
            .product_list
                display flex
                align-items center
                width 448px
                box-sizing border-box
                .item
                    width 108px
                    height 130px
                    text-align left 
                    background #F6F6F6
                    border-radius 10px
                    margin-right 4px
                    padding 20px 16px
                    box-sizing border-box
                    .title
                        font-size 18px
                        font-weight bold
                        color #353239
                        white-space nowrap
                    .price
                        color #FF444B
                        font-size 19px
                        margin 8px 0px 4px 0
                        span 
                            font-weight bold
                    .info
                        font-size 10px
                        font-weight 400
                        color #5E5862
                        white-space normal
                    &:hover
                        border  1px solid #FFDAA1
                        background #F9F4E7

</style>