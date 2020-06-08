// import qs from 'qs'
// axios
// import request from '@/utils/request'
//home api
import qs from 'qs'
// axios
import request from '@/utils/request'
// user api
// 获取搜索关键词
export function like_music(params) {
  return request({
    url: '/likelist?' + qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}

export function music_url(params) {
    return request({
      url: '/song/url?' + qs.stringify(params),
      method: 'get',
      hideloading: true
    })
}

export function music_img(params) {
  return request({
    url:'/song/detail?'+qs.stringify(params),
    method:'get',
    hideloading:true
  })
}

export function music_lyric(params){
  return request({
    url:'/lyric?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}

export function music_check(params){
  return request({
    url:'/check/music?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}
export function personal_fm(params){
  return request({
    url:'/personal_fm?'+qs.stringify(params),
    method: 'get',
    hideloading: true
  })
}
