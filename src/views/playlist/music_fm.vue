<!--  -->
<template>
  <div>
      
  </div>
</template>

<script>
import {personal_fm} from '@/api/music.js' 
export default {
 created(){
     let DATA ={
         cookie:document.cookie
     }
     personal_fm(DATA).then(res=>{
         console.log(res)
     })
 },
  data () {
    return {
    };
  },

 
}

</script>
<style lang='scss' scoped>
</style>