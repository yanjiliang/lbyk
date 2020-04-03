<template>
    <div>
        <H5Video :fileVideoSrc ='fileVideoSrc' />
    </div>
</template>

<script>
import H5Video from '../../components/H5Video'

export default {
    name: "aliPay",
    components:{
      H5Video
    },
    data() {
        return {
            fileVideoSrc:{
              src:'../assets/cat.mp4',
              autoplay:true,
              preload:'auto',
              muted:true,
              controls:true
            }
        }
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    }
}
</script>
<style lang="stylus" scoped>
  
</style>