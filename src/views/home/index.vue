<!-- home -->
<template>
  <div class="app-container">
    <div v-show="!resoure_show&&!newmusic_show">
      <!-- 搜索 -->
      <div class="search-box">
        <form class="search-from" action="/">
          <van-search
            v-model="search"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            shape="round"
            @focus="onFocus"
            @cancel="onCancel"
            @clear="onClear"
            @blur="onBlur"
          />
        </form>
        <div v-show="show_search_list" class="search-list">
          <ul class="search-list-box">
            <li v-for="(item,index) in search_list" @click="GetMusic(item.id)" :key="index">
              <i class="search-icon van-icon van-icon-search"></i>
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
      <!-- 搜索 end -->

      <!-- 轮播图 -->
      <div class="swipe-box">
        <van-swipe @change="onChange" :autoplay="3000">
          <van-swipe-item
            @click="GetSwipeLink(item.url)"
            v-for="(item,index) in banners"
            :key="index"
          >
            <img class="swipe-img" :src="item.pic" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 轮播图 end -->

      <!-- 工具导航 -->
      <div class="navigation-tool">
        <div class="navigation-item" @click="Get_New_Music()">
          <img src="../../../static/日历.png" alt srcset />
        </div>
        <div class="navigation-item">
          <img src="../../../static/列表.png" alt srcset />
        </div>
        <div class="navigation-item">
          <img src="../../../static/排行.png" alt srcset />
        </div>
        <div class="navigation-item">
          <img src="../../../static/电台.png" alt srcset />
        </div>
      </div>
      <div class="navigation-text">
        <p>每日推荐</p>
        <p>歌单</p>
        <p>排行榜</p>
        <p>电台</p>
      </div>
      <!-- 工具导航 end -->

      <!-- 发现歌单 -->
      <div class="find-box">
       <div class="find-title">
         <h3>发现歌单</h3>
         <div @click="GetUpdata" class="find-updata">
           查看更多
         </div>
        </div>
        <div class="find-item-box">
          <div
            class="find-item"
            @click="Get_PlayList(item.id)"
            v-for="(item,index) in recommend"
            :key="index"
          >
            <div class="find-item-img">
              <img :src="item.picUrl?item.picUrl:item.coverImgUrl" alt />
            </div>
            <div class="find-item-text">
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 发现歌单 end -->

      <!-- 新歌榜 -->
      <div class="new-music">
        <h3>精品推荐</h3>
        <ul class="new-music-list">
        <li @click="GetMusic(item.id)" class="new-music-item" v-for="(item,index) in new_musics" :key="index">
          <div class="new-music-name">{{item.name}}</div> <div class="new-music-bg"><img src="../../../static/play.png" alt=""></div>
        </li>
      </ul>
      </div>
      <!-- 新歌榜 end -->
      
    </div>
    <div v-show="resoure_show">
      <ResourceList ref="resource_cp" />
    </div>
    <div v-show="newmusic_show">
      <NewMusic ref="New_Music" />
    </div>
    <div>
      <MusicFm ></MusicFm>
    </div>
    <MusicPlay ref="MusicPlay"></MusicPlay>
    
  </div>
</template>

<script>
import {related_list, search_keywords, banner_list, resource, music_info, music_lyric ,new_music } from '@/api/home.js'
import MusicPlay from '../music/index'
import ResourceList from '../playlist/index'
import MusicFm from '../playlist/music_fm'
import NewMusic from '../music/music_list.vue'
export default {
  data() {
    return {
      search: '',
      show_search_list: true,
      search_list: [],
      banners: [],
      title:this.title,
      recommend: [],
      resoure_show: false,
      new_musics:[],
      newmusic_show:false
    }
  },
  components: { MusicPlay, ResourceList ,NewMusic ,MusicFm},
  computed: {},
  created() {
    this.Get_Resource();
    this.GetnewMusic()
    document.title = "网抑云"
  },
  mounted() {
    this.Get_Banner()
  },
  watch: {
    search(val, old) {
      if (val == '' || val == null || val == undefined) 
        this.show_search_list = false
      else 
        this.Get_search()
    }
  },
  methods: {
    Get_New_Music(){
      this.newmusic_show = true
      this.$refs.New_Music.GetInfo()
      document.title='每日推荐'
    },
    GetnewMusic(){
      let COOIKEs = {
            cookie : document.cookie,
            limit: 10
          }
          new_music(COOIKEs).then(res => {
            for(let x =0;x<5;x++){
              this.new_musics.push(res.data.dailySongs[x])
            }
          })
    },
    /** 搜索框操作 **/
    // 清空输入框
    onClear() {
      this.show_search_list = false
    },
    // 获取焦点时
    onFocus(event) {},
    // 确定搜索
    onSearch(val) {
      //   Toast(val)
    },
    // 取消搜索
    onCancel() {
      //   Toast('取消')
    },
    // 查询关键词
    Get_search() {
      let DATA_SEARCH = {
        keywords: this.search,
        limit: 10
      }
      search_keywords(DATA_SEARCH).then(Res => {
        this.search_list = Res.result.songs
        this.show_search_list = true
      })
    },
    onBlur(){
      this.Get_search()
      this.show_search_list = false
    },
    GetMusic(ids) {
      let MUSIC_INFO = {
        id: ids
      }
      this.$refs.MusicPlay.GetMusic(ids)
      this.show_search_list = false
    },

    /** 轮播图操作 **/
    onChange(index) {},
    Get_Banner() {
      let DATA_BANNER = {
        type: 1
      }
      banner_list(DATA_BANNER).then(Res => {
        this.banners = Res.banners
      })
    },
    GetSwipeLink(Link) {
      if(Link !== null && Link !== undefined && Link !== '')
        location.href = Link
      else
        return
    },

    /** 每日歌单 **/
    GetUpdata(){
      let DATA = {
        cookie : document.cookie,
        limit:3
      }
      related_list(DATA).then(res=>{
        this.recommend = res.playlists
      })
    },
    Get_Resource() {
      const COOKIE = {
        limit: 3,
        cookie: document.cookie
      }
      resource(COOKIE).then(Res => {
        this.recommend = []
        for (let x = 0; x < 3; x++) {
          this.recommend[x] = Res.recommend[x]
        }
      })
    },
    Get_PlayList(e) {
      document.title = "歌单推荐"
      this.$refs.resource_cp.GetInfo(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  padding-bottom: 100px;
  .new-music {
    background-color: #fff;
    width: 100%;
    .new-music-list{
        padding:0 15px;
        box-sizing: border-box;
      .new-music-item{
        font-size: 14px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #efefef;
        display: flex;
        .new-music-name{
          flex: 1;
        }
        .new-music-bg{
          width: 40px;
          // background: #ccc;
          text-align: center;
          img{
            padding-top: 15px;
            width: 20px;
          }
        }
      }
    }
    
    h3 {
      color: #333;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      margin: 0;
      padding-left: 14px;
      box-sizing: border-box;
      margin-bottom: 5px;
    }
  }
  .find-box {
    height: 180px;
    background-color: #fff;
    width: 100%;
    padding-top: 10px;
    box-sizing: border-box;
    .find-title{
      display: flex;
      .find-updata{
        width: 70px;
        height: 22px;
        border-radius: 15px;
        border: 1px solid #e5e5e5;
        text-align: center;
        line-height: 25px;
        margin-right: 15px;
      }
    }
    h3 {
      flex: 1;
      color: #333;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      margin: 0;
      padding-left: 14px;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .find-item-box {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
    }
    /*自定义滚动条的伪对象选择器, CSS 可以隐藏滚动条*/
    .find-item-box::-webkit-scrollbar {
      display: none;
    }

    .find-item {
      width: 33.33%;
      height: 120px;
      .find-item-img {
        width: 95px;
        height: 95px;
        margin: 0 auto;
        img {
          width: 95px;
          height: 95px;
          border: 1px solid #efefef;
          border-radius: 5px;
          display: block;
          margin: 0 auto;
        }
      }
      .find-item-text {
        width: 100px;
        // height: 100px;
        font-size: 12px;
        line-height: 20px;
        color: #444;
        margin: 0 auto;
        p {
          margin: 5px 0;
          white-space: nowrap;
          word-break: norma;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .swipe-img {
    width: 100%;
  }
  .navigation-text {
    display: flex;
    background: #fff;
    margin-top: -20px;
    p {
      flex: 1;
      color: #444444;
      font-size: 12px;
      text-align: center;
    }
  }
  .navigation-tool {
    height: 70px;
    background: #fff;
    width: 100%;
    display: flex;
    .navigation-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 30%;
        padding: 7px;
        background: #cb3e2d;
        border-radius: 50%;
        border: 1px solid #fff;
      }
    }
  }
  .search-box {
    width: 100%;
    background: skyblue;
    .search-list-box {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      li {
        width: 100%;
        min-height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #efefef;
      }
      .search-icon {
        position: relative;
        left: -10px;
      }
    }
    .search-list {
      // border-top: 1px solid #efefef;
      z-index: 2;
      width: 100%;
      background: #fff;
      position: absolute;
      top: 50px;
    }
  }
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
}
.swipe-box {
  height: 135px;
  width: 100%;
  background: #fff;
  .van-swipe {
    margin: 0 auto;
    border-radius: 5px;
    overflow: hidden;
    width: 94%;
    height: 135px;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 135px;
    text-align: center;
    background-color: #39a9ed;
  }
}
</style>
