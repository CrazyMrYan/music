<!-- 歌单 list -->
<template>
  <div>
    <div class="new-info" >
    </div>
    <div class="new-contenr">
      <div @click.stop="GoHemos" class="get-hemo">
        <div class="get-hemo-btn">
           <van-icon name="arrow-left" />
        </div>
      </div>
      <div class="new-info-top">
          <h2>
            {{date.day}}
            <span> / {{date.month}}</span>
          </h2>
      </div>
     
    </div>
    <div class="new-list">
        <div class="new-play" @click="GetAllMusic()">
          <p>
            <van-icon class="icon-play" name="play-circle-o" /> 
            播放全部 <span>(共 {{newArray.length}} 首)</span>
          </p>
        </div>
        <ul class="new-box">
          <li @click="GetPlay(item.id)" v-for="(item,index) in newArray" :key="index">
            <div class="new-index">
              <img :src="item.img" alt="">
            </div>
              <div class="new-center">
                <p class="new-title">{{item.name}}</p>
                <p>{{item.ar}}</p>
              </div>
              <div class="new-list-item">
                <img src="../../../static/play.png" alt="">
              </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { playlist ,new_music} from '@/api/home.js'
export default {
  data () {
    return {
        new:this.$route.query.Resource,
        date:{
          month: new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1) : new Date().getMonth()+1,
          day: new Date().getDay() < 10 ? '0'+ (new Date().getDay()) : new Date().getDay()
        },
        newArray:[],
        backUrl:'',
        trackCount:'',
        ResourceName:'',
        coverimg:'',
        description:'',
        playCount:'',
        commentCount:'',
        shareCount:''
    };
  },
mounted(){
},
computed:{
  getimg(){
    return 'background-image: url('+ this.backUrl +')'
  }
},
  methods: {
    
    GoHemos(){
      this.$parent.newmusic_show = false
      document.title='网抑云'
    },
    GetPlay(e){
      this.$parent.GetMusic(e)
    },
      GetInfo(){
          let LIST_DATA ={
              cookie:document.cookie
          }
          new_music(LIST_DATA).then(Res=>{
            for(let a = 0;a<Res.data.dailySongs.length;a++){
              Res.data.dailySongs[a].ar = Res.data.dailySongs[a].artists[0].name
              Res.data.dailySongs[a].img = Res.data.dailySongs[a].album.picUrl
            }
            this.newArray = Res.data.dailySongs
          })

      }
  }
}

</script>
<style lang='scss' scoped>
.new-contenr{
  .get-hemo{
    color: #fff;
    height: 30px;
    .get-hemo-btn{
    height: 30px;
      width: 30px;
      font-size: 16px;
    }
  }
  position: absolute;
  top: 0;
  width: 100%;
  height: 200px;
  padding:  20px 10px;
  box-sizing: border-box;
  .new-info-title{
    color: #fff;
    width: 100%;
    font-size: 14px;
     white-space: nowrap;
          word-break: norma;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 3;
    margin: 0;
  }
  .new-description{
    color: #efefef;
  }
  .new-info-top{
    padding-top: 50px;
    display: flex;
    h2{
      font-size: 28px;
      color: #fff;
      span{
        font-size: 18px;
      }
    }
    h3{
       font-size: 26px;
      color: #fff;
    }
  }
  .new-bottom{
    width: 100%;
    height: 60px;
    padding-top: 8px;
    box-sizing: border-box;
    display: flex;
    .new-bottom-item{
      flex: 1;
      .new-bottom-img{
        text-align: center;
        img{
          width: 20px;
        }
      }
      .new-bottom-text{
        color: #efefef;
        text-align: center;
      }
    }
  }
  .new-img{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
    img{
      width: 100%;
      border-radius: 5px;
    }
  }
  .new-infos{
    flex: 1;
    height: 100px;
    // background-color: #ccc;
    margin-left: 15px;
  }
}
.new-info{
  width: 100%;
  height: 230px;
  background-color: #ccc;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
    background-image: url('../../../static/wyy.png');
  background-position: -150px 0;
  // -webkit-filter: blur(20px);
  // -moz-filter: blur(20px);
  // -o-filter: blur(20px);
  // -ms-filter: blur(20px);
  // filter: blur(20px);
  
}
.new-list{
  .new-play{
    font-size: 15px;
    padding: 15px 0 15px;
    border-radius: 10px;
    position: relative;
    top: -20px;
    background: #f2f3f4;
    padding-left: 15px;
    p{
      margin: 0;
      span{
        color: #999;
        font-size: 12px;
        line-height: 12px;
      }
    }
    .icon-play{
      font-weight: 600;
      font-size: 16px;
      position: relative;
      top: 2px;
    }
  }
}
.new-box{
  width: 100%;
  box-sizing: border-box;
  position: relative;
    top: -20px;
    .new-list-item{
      width: 40px;
      // background: #ccc;
      text-align: center;
      img{
        padding-top: 15px;
        width: 20px;
      }
    }
    .new-center{
      flex: 1;
    }
  li{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    padding: 0 10px;
    font-size: 14px;
    color:#222;
    border-bottom:1px solid #efefef ;
    .new-index{
      line-height: 50px;
      margin-top: 4px;
      margin-right: 5px;
      width: 46px;
      height: 46px;
      img{
         width: 40px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #e5e5e5;
      }
    }
    .new-title{
       font-size: 14px;
      color:#222;
      line-height: 30px;
      width: 260px;
      white-space: nowrap;
          word-break: norma;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 3;

    }
    p{
      margin: 0;
      line-height: 15px;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>