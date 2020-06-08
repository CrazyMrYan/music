<template>
  <div>
      <ul class="nav-box">
          <!-- class 路由元信息判断是否高亮 -->
          <li :class="[this.$route.fullPath =='/'?'active':'']" >
                <!-- 跳转方法一：router-link -->
                <router-link to="/">
                    一级菜单
                </router-link>
          </li>
          <li :class="[this.$route.fullPath=='/about'?'active':'']" >
                <router-link to="/about">
                    二级菜单
                </router-link>
          </li>
          <li :class="[this.$route.fullPath=='/info'?'active':'']" >
                <router-link to="/info">
                    三级菜单
                </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
        // 获取路由元需不需
        // RouterPath:this.$route.fullPath
    };
  },
  watch:{
    RouterPath(n,o){
      console.log(n,o)
    }
  },
  mounted(){
    // console.log(this.RouterPath)
  },
  methods: {
      // 跳转方法二：点击事件   
      GetPage(e){
          if(e == 1){
              this.$router.push({
                  path:"路由"
              })
          }else{
            //   。。。。
          }
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  color: #fff;
  display: block;
}
.nav-box{
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: orange;
  position: fixed;
  bottom: 0;
  left: 0;
  li{
    width: 33%;
    text-align: center;
  }
}
.active{
  background: skyblue;
  color: #000;
}
</style>
