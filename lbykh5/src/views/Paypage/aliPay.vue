<template>
    <div>
        <VideoPlayer :options ='videoInfo' />
    </div>
</template>

<script>
import VideoPlayer from '../../components/VideoPlayer'

export default {
    name: "aliPay",
    components:{
      VideoPlayer
    },
    data() {
        return {
            videoInfo:{
              
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