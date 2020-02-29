<template>

    <div id="app" v-cloak>

            <router-view />

        
    </div>

</template>


<script>
export default {
  data() {
    return {
      
    }
  },
};
</script>


<style scoped>
[v-cloak]{
  display: none!important;
}

</style>