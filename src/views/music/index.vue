<!-- music -->
<template>
  <div class="music-paly">
    <aplayer theme="#cb3e2d" listMaxHeight="200px" @ended="onEnded" :float="true" :listFolded="true" :list="music_array" :showLrc="true" preload="auto" :autoplay="true"  :music="{
              title: music_info.title,
              artist: music_info.artist,
              src:music_info.src ,
              pic: music_info.pic,
              lrc:music_info.lyric
            }"
            
             />
  </div>
</template>

<script>
    import { like_music, music_url, music_img, music_lyric, music_check } from '@/api/music.js'
    import { search_keywords, new_music } from '@/api/home.js'
    import aplayer from 'vue-aplayer'
    import { Toast } from 'vant'

    export default {
      components: {
        aplayer
      },
      data() {
        return {
          userId: '',
          isAutoplay: false,
          music_info: {
            title: '',
            artist: '',
            src: 'url',
            pic: '',
            lyric: '加载中'
          },
          music_array: [],
          music_ids: [25714082],
          num:0
        }
      },
      mounted() {
        this.GetMusic(this.music_ids.toString())
        this.GetMusicList()
      },
      updated(){
        
      },
      watch:{
        music_array(val,old){
          
        }
      },
      methods: {
        isArrays(objarray){
          let len = objarray.length;
          let tempJson = {};
          let res = [];
          for(let i = 0;i < len;i++){
              //取出每一个对象
              tempJson[JSON.stringify(objarray[i])] = true;
          }
          let keyItems= Object.keys(tempJson);
          for(let j = 0;j < keyItems.length;j++){
              res.push(JSON.parse(keyItems[j]));
          }
          this.music_array = res
        },
        // over on
        onEnded() {
     
        },
        GetMusicList() {
          let COOIKEs = {
            cookie : document.cookie
          }
          new_music(COOIKEs).then(res => {
            for (let x = 0; x < 5; x++) {
              this.music_ids.push(res.data.dailySongs[x].id)
            }
   
          })
        },
        
        GetMusic(e) {
          let Data = {
            id: e
          }
          music_check(Data).then(res => {
            // Get Music-Copyright
            if (res.success == false) {
              Toast(res.message)
              this.$parent.search_list = false
              return
            } else {
              // Get Music-link
              music_url(Data).then(res => {
                // Determine if the link is healthy
                if (res.data[0].url == null || res.data[0].url == undefined) {
                  Toast('暂时不能播放哦！')
                  return
                } else {
                  this.music_info.src = res.data[0].url
                  this.isAutoplay = true
                  let MUSIC_IDS = {
                    ids: e
                  }
                  // Get Music-Info(image,music-name,music-artist)
                  music_img(MUSIC_IDS).then(res => {
                    this.music_info.pic = res.songs[0].al.picUrl
                    this.music_info.title = res.songs[0].name
                    this.music_info.artist = res.songs[0].ar[0].name

                    // Get Music-lyric
                    music_lyric(Data).then(res => {
                    if (res.lrc.lyric == undefined) 
                      this.music_info.lyric = '暂无歌词'
                    else {
                      this.music_info.lyric = res.lrc.lyric
                      
                      this.music_array.unshift(JSON.parse(JSON.stringify(this.music_info)))
                      
                      // this.music_array = this.isArrays(this.music_array)
                    }
                    
                    })
                  })
                }
              })
            }
          })
        }
      }
    }
</script>
<style lang='scss' scoped>
.music-paly {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #efefef;
}
/deep/ .audio-player .audio__btn-wrap {
  width: 60% !important;
}
/deep/ .aplayer {
  margin: 0;
}
.music-name {
  position: fixed;
  bottom: 25px;
  width: 160px;
  height: 65px;
  right: 0;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  p {
    margin: 0;
  }
  .nike-name {
    font-size: 12px;
    color: #666;
  }
  .music-names {
    font-size: 16px;
    color: #222;
  }
  .music-name-box {
    flex: 1;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    animation: rotation 2s linear infinite;
  }
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
}
</style>