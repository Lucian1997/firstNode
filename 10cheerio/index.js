const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const url = require('url')
const path = require('path')
//获取HTML文档的相关内容,内容的获取和jquery一样

//将延迟函数封装成promise对象
function lWait(milliSecondes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功执行延迟函数，延迟：' + milliSecondes)
    }, milliSecondes)
  })
}

//获取页面总数
async function getNum() {
  let res = await axios.get( `https://www.doutula.com/article/list/?page=1`)
  let $ = cheerio.load(res.data)
  let pageLength = $('.pagination li').length
  let pageNum = $('.pagination li').eq(pageLength - 2).find('a').text()
  return pageNum
}

//爬取所有页面
async function spider() {
  //获取页面总数
  // let allPageNum = await getNum()
  let allPageNum = 2
  for (let i = 1; i <= allPageNum; i++) {
    await lWait(3000 * i)
    getListPage(i)
  }
}

async function getListPage(pageNum) {
  let httpUrl = `https://www.doutula.com/article/list/?page=${pageNum}`
  let res = await axios.get(httpUrl)
  let $ = cheerio.load(res.data)
  //获取当前页面的所有表情页面的链接
  $('#home .col-sm-9>a').each(async (i, item) => {
    let pageUrl = $(item).attr('href')
    let title = $(item).find('.random_title').text()
    let reg = /(.*?)\d/igs
    title = reg.exec(title)[1]
    fs.mkdir('./img/' + title, err => {
      if (err) {
        console.log(err);
      } else {
        console.log('成功创建目录：' + './img/' + title);
      }
    })
    await lWait(50 * i)
    parsePage(pageUrl, title)
  })
}


async function parsePage(url, title) {
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  $('.pic-content img').each((i, item) => {
    let imgUrl = $(item).attr('src')
    let extName = path.extname(imgUrl)
    //图片写入路径和名字
    let imgPath = './img/' + title + '/' + title + '_' + i + extName
    //创建写入图片流
    let ws = fs.createWriteStream(imgPath)
    axios.get(imgUrl, {responseType: 'stream'}).then(res => {
      res.data.pipe(ws)
      res.data.on('close', function () {
        ws.close()
        console.log('图片加载完成：' + imgPath)
      })
    })
  })
}

spider()