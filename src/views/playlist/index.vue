<!-- 歌单 list -->
<template>
  <div>
    <div class="resouce-info" :style="getimg">
    </div>
    <div class="resouce-contenr">
      <div @click.stop="GoHemos" class="get-hemo">
        <div class="get-hemo-btn">
           <van-icon name="arrow-left" />
        </div>
      </div>
      <div class="resouce-info-top">
          <div class="resouce-img">
            <img :src="coverimg" alt="">
          </div>
          <div class="resouce-infos">
            <p class="resouce-info-title">{{ResourceName.substring(0,18)+'...'}}</p>
            <p class="resouce-description">
              {{description.substring(0,36)+'...'}}
            </p>
            <p class="resouce-description">
             共播放 {{playCount}} 次
            </p>
          </div>
      </div>
      <div class="resouce-bottom">
        <div class="resouce-bottom-item">
          <div class="resouce-bottom-img">
            <img src="../../../static/评论.png" alt="">
          </div>
          <div class="resouce-bottom-text">
            {{commentCount}}
          </div>
        </div>
        <div class="resouce-bottom-item">
          <div class="resouce-bottom-img">
            <img src="../../../static/分享3.png" alt="">
          </div>
          <div class="resouce-bottom-text">
            {{shareCount}}
          </div>
        </div>
        <div class="resouce-bottom-item">
          <div class="resouce-bottom-img">
            <img src="../../../static/下载.png" alt="">
          </div>
          <div class="resouce-bottom-text">
            下载
          </div>
        </div>
        <div class="resouce-bottom-item">
          <div class="resouce-bottom-img">
            <img src="../../../static/30show_多选.png" alt="">
          </div>
          <div class="resouce-bottom-text">
            多选
          </div>
        </div>
      </div>
    </div>
    <div class="resouce-list">
        <div class="resouce-play">
          <p>
            <van-icon class="icon-play" name="play-circle-o" /> 
            播放全部 <span>(共 {{trackCount}} 首)</span>
          </p>
        </div>
        <ul class="resouce-box">
          <li @click="GetPlay(item.id)" v-for="(item,index) in ResouceArray" :key="index">
            <div class="resouce-index">
              {{index + 1}}
            </div>
              <div class="resouce-center">
                <p class="resouce-title">{{item.name}}</p>
                <p>{{item.ar[0].name}}</p>
              </div>
              <div class="resouce-list-item">
                <img src="../../../static/play.png" alt="">
              </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { playlist} from '@/api/home.js'
export default {
  data () {
    return {
        resouce:this.$route.query.Resource,
        ResouceArray:[],
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
    // this.GetInfo()
},
computed:{
  getimg(){
    return 'background-image: url('+ this.backUrl +')'
  }
},
  methods: {
    GoHemos(){
      this.$parent.resoure_show = false
      document.title = "网抑云"
    },
    GetPlay(e){
      this.$parent.GetMusic(e)
    },
      GetInfo(e){
          let LIST_DATA ={
              id:e,
              cookie:document.cookie
          }
          playlist(LIST_DATA).then(Res=>{
            this.coverimg =  Res.playlist.coverImgUrl
            this.backUrl = Res.playlist.backgroundCoverUrl
            this.ResouceArray = Res.playlist.tracks
            this.trackCount = Res.playlist.trackCount
            this.ResourceName = Res.playlist.name
            this.description = Res.playlist.description
            this.playCount = Res.playlist.playCount
            this.commentCount = Res.playlist.commentCount
            this.shareCount = Res.playlist.shareCount
            this.$parent.resoure_show = true
          })

      }
  }
}

</script>
<style lang='scss' scoped>
.resouce-contenr{
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
  .resouce-info-title{
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
  .resouce-description{
    color: #efefef;
  }
  .resouce-info-top{
    display: flex;
  }
  .resouce-bottom{
    width: 100%;
    height: 60px;
    padding-top: 8px;
    box-sizing: border-box;
    display: flex;
    // background: #ccc;
    .resouce-bottom-item{
      flex: 1;
      .resouce-bottom-img{
        text-align: center;
        img{
          width: 20px;
        }
      }
      .resouce-bottom-text{
        color: #efefef;
        text-align: center;
      }
    }
  }
  .resouce-img{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
    img{
      width: 100%;
      border-radius: 5px;
    }
  }
  .resouce-infos{
    flex: 1;
    height: 100px;
    // background-color: #ccc;
    margin-left: 15px;
  }
}
.resouce-info{
  width: 100%;
  height: 230px;
  background-color: #ccc;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -o-filter: blur(20px);
  -ms-filter: blur(20px);
  filter: blur(20px);
  
}
.resouce-list{
  .resouce-play{
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
.resouce-box{
  width: 100%;
  box-sizing: border-box;
  position: relative;
    top: -20px;
    .resouce-list-item{
      width: 40px;
      // background: #ccc;
      text-align: center;
      img{
        padding-top: 15px;
        width: 20px;
      }
    }
    .resouce-center{
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
    .resouce-index{
      line-height: 50px;
      min-width: 25px;
      color: #888;
    }
    .resouce-title{
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