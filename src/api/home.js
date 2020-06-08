// import qs from 'qs'
// axios
// import request from '@/utils/request'
//home api
import qs from 'qs'
// axios
import request from '@/utils/request'
// user api
// 获取搜索关键词
export function search_keywords(params) {
  return request({
    url: '/search?' + qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}
// 获取轮播图
export function banner_list (params){
  return request({
    url:'/banner?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}
// 获取发现歌单
export function resource(params){
  return request({
    url:'/recommend/resource?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}

// 获取音乐
export function music_info(params){
  return request({
    url:'/song/url?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}

// 获取歌词
export function music_lyric(params){
  return request({
    url:'/lyric?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}

// 
export function playlist(params){
  return request({
    url:'/playlist/detail?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}

export function related_list(params){
  return request({
    url:'/top/playlist/highquality?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}

export function new_music(params){
  return request({
    url:'/recommend/songs?'+qs.stringify(params),
    method:'get',
    hideloading:true
  })
}