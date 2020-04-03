<template>
    <div class="product">
        <div class="wrap" ref="product_wrap">
            <div class="product_list" ref="product_list">
                <div class="item"  ref="product_item" v-for="(item,index) in productInfo" :key='index' @click="renew_select(index)">
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
// import { Toast } from 'vant'
export default {
    name:'product',
    data(){
        return{
            productlist:this.productInfo,
            select_item_index :0,
        }
    },
    props:{
        productInfo:{
            type:Array,
            required:true
        }
    },
    mounted(){
        setTimeout(()=>{
            // this.$refs.product_item[0].classList.add('select_item')
            this.renew_select(0)
        },300)
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
        renew_select(index){
            
            let len = this.productInfo.length
            // for(let i=0;i<len;i++){
            //     if(i == index){
            //         document.getElementsByClassName('item')[index].classList.add('select_item')
            //     }else{
            //         document.getElementsByClassName('item')[index].classList.remove('select_item')
            //     }
            // }
            switch (index){
                case 0 :
                    document.getElementsByClassName('item')[0].classList.add('select_item')
                    for(let i=0;i<len;i++){
                        if(i !== index){
                            document.getElementsByClassName('item')[i].classList.remove('select_item')
                        }
                    }
                    break;
                case 1 :
                    document.getElementsByClassName('item')[1].classList.add('select_item')
                    for(let i=0;i<len;i++){
                        if(i !== index){
                            document.getElementsByClassName('item')[i].classList.remove('select_item')
                        }
                    }
                    break;
                case 2 :
                    document.getElementsByClassName('item')[2].classList.add('select_item')
                    for(let i=0;i<len;i++){
                        if(i !== index){
                            document.getElementsByClassName('item')[i].classList.remove('select_item')
                        }
                    }
                    break;
                case 3 :
                    document.getElementsByClassName('item')[3].classList.add('select_item')
                    for(let i=0;i<len;i++){
                        if(i !== index){
                            document.getElementsByClassName('item')[i].classList.remove('select_item')
                        }
                    }
                    break;
            }
            let productPage_data = {
                select_item_index : index,
            }
            this.$emit('productPage_data',productPage_data)
        }
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
                    border  1px solid #EBEBEB
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
                    // &:active
                    //     border  1px solid #FFDAA1
                    //     box-sizing border-box
                    //     background #F9F4E7
                    &:hover
                        border  1px solid #FFDAA1
                        box-sizing border-box
                        background #F9F4E7
                .select_item
                    border  1px solid #ECCB8F
                    box-sizing border-box
                    background #FDF8E6

</style>