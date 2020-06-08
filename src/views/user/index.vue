<!-- user -->
<template>
  <div class="app-container">
      <div class="logo-box">
          <img class="logo" src="../../../static/音乐.png" alt="">
      </div>
      <div>
        <van-cell-group>
            <van-field v-model="login.phone" label="账户" placeholder="请输入手机号" />
            <van-field v-model="login.password" type="password" label="密码"  placeholder="请输入密码" />
        </van-cell-group>
      </div>
      <van-button round class="round-btn" @click="GetLogin" type="info">登录</van-button>
  </div>
</template>

<script>
import {login} from '@/api/user.js'
import { userInfo } from 'os';
export default {
  data () {
    return {
        login:{
            phone:"",
            password:""
        }
    };
  },
  
  methods: {
      GetLogin(){
          login(this.login).then((Res)=>{
              localStorage.setItem("userInfo",JSON.stringify(Res.profile)) 
              document.cookie = Res.cookie
              localStorage.setItem("token",JSON.stringify(Res.token)) 
              localStorage.setItem("musiclist",JSON.stringify([]))
              this.$router.push({
                  path:'/',
              })
          },Err=>{
              alert(JSON.stringify(Err))
          })
      }
  }
}

</script>
<style lang='scss' scoped>
.logo-box{
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
        width: 50px;
    }
}
.round-btn{
    background-color: #fff;
    color: #cb3e2d;
    border: unset;
    margin: 0 auto;
    width: 60%;
    display: block;
}
.app-container{
    background: #cb3e2d;
    height: 100%;
    width: 100%;
    position: absolute;
}
/deep/ .van-field__control{
    color: #fff !important;
}
.van-cell__value{
    color: #fff !important;
}
.van-field__body>input{
    color: #fff;
}
.van-cell{
    background-color: #cb3e2d;
    color: #fff !important;
}
.van-cell-group{
    margin-bottom: 20px;
}
input {
    color: #fff !important;
}

</style>