// let axios = require('axios')
let request = require('request')
let fs = require('fs')
let { fsWrite, fsRead, fsDir} = require('./lfs.js')

let httpURrl = 'https://www.1905.com/vod/list/n_1_t_1/o3p1.html'
// axios.get(httpURrl, {
//     headers: {
//       'X-Requested-With': 'XMLHttpRequest',
//       'upgrade-insecure-requests': 1,
//       'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
//     }
//   }
// ).then(res => {
//   console.log(res);
// })

function req(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve({res, body})
      }
    })
  })
}

//获取起始页面的所有分类
async function getClassUrl() {
  let {res, body} = await req(httpURrl)
  let reg = /<span class="search-index-L">类型 :(.*?)<div class="grid-12x">/igs
  //解析html内容
  let result = reg.exec(body)[1]
  let reg1 = /<a href="javascript:void\(0\);" onclick="location\.href='(.*?)';return false;".*?>(.*?)<\/a>/igs
  let arrClass = []
  let result1
  while (result1 = reg1.exec(result)) {
    if (result1[2] != '全部') {
      let obj = {
        className: result1[2],
        url: result1[1]
      }
      arrClass.push(obj)
      await fsDir('./movies/' + result1[2])
      getMovies(result1[1], result1[2])
    }
  }
}

//获取分类里的电影链接
async function getMovies(url, category) {
  let {res, body} = await req(url)
  let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)".*?><img/igs
  let result
  let arrList = []
  while (result = reg.exec(body)) {

    arrList.push(result[1])
    parsePage(result[1], category)
  }
}

//根据电影链接获取电影的详细信息
async function parsePage(url, category) {
  let {res, body} = await req(url)
  let reg = /<div class=".*?playerBox-info-cnName">(.*?)<\/h1>.*?id="playerBoxIntroCon">(.*?)<a.*?导演.*?target="_blank" title="(.*?)" data-hrefexp/igs
  let result = reg.exec(body)
  if (result) {
    let movie = {
      name: result[1],
      brief: result[2],
      director: result[3],
      movieUrl:  url,
      category: category
    }
    let strMovie = JSON.stringify(movie)
    fsWrite('./movies/' + category + '/' + result[1] + '.json', strMovie)
  }
}

getClassUrl()
