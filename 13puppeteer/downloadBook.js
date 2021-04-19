let puppeteer = require('puppeteer')
let axios = require('axios')
let url = require('url')
let fs = require('fs')
let {fsRead, fsWrite} = require('./lfs.js');

//目标：获取https://sobooks.cc/,所有电子书的书名和链接
(async function () {
  let debugOptions = {
    //设置视窗大小
    defaultViewport: {
      width: 1400,
      height: 800
    },
    //设置为有界面
    headless: true,
    //设置放慢每个步骤的毫秒数
    slowMo: 250,
    timeout: 0
  }

  let options = {
    headless: true,
    timeout: 0
  }

  //将延迟函数封装成promise对象
  function lWait(milliSecondes) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('成功执行延迟函数，延迟：' + milliSecondes)
      }, milliSecondes)
    })
  }

  let browser = await puppeteer.launch(debugOptions)

  async function parseTxt() {
    //读取文本内容
    let textContent = await fsRead("./book.txt")
    //正则匹配json字符串对象
    let reg = /(.*?)---/igs
    let tempRes, bookArr = []
    while (tempRes = reg.exec(textContent)) {
      //获取匹配结果
      let jsonStr = tempRes[1]
      //将字符串解析成对象
      let jsonObj = JSON.parse(jsonStr)
      // console.log(jsonObj);
      bookArr.push(jsonObj)
    }
    return bookArr
  }

  let bookArr = await parseTxt()
  let index = 0

  async function downloadBook() {
    //根据索引值下载书
    //如果索引值大于书数量跳出
    if (index===bookArr.length) {
      return "完成"
    }
    let bookObj = bookArr[index]
    index++
    //打开新页面下载书籍
    let page = await browser.newPage()
    await page.goto(bookObj.href)
    //因为a链接是js渲染出来的内容，并不是页面请求回来就有的内容，而是js通过ajax访问后台获取链接地址才有的内容
    await page.waitForSelector('#table_files tbody .even a', {visible: true})
    //获取a链接对象
    let elementAHref = await page.$eval('#table_files tbody .even a', element => {
      return element.getAttribute('href')
    })
    await bookLinkPage(elementAHref, bookObj.title)
  }

  async function bookLinkPage(linkUrl, title) {
    let page = await browser.newPage()
    //截取谷歌请求
    await page.setRequestInterception(true)
    //监听请求事件，并对请求进行拦截
    page.on('request', interceptedRequest => {
      let urlObj = url.parse(interceptedRequest.url())
      if (urlObj.hostname === '170-ctc-dd.tv002.com') {
        console.log('截获地址：' + urlObj.href);
        interceptedRequest.abort()
        let ws = fs.createWriteStream('./book/' + title + '.epub')
        axios.get(urlObj.href, {responseType: "stream"}).then(res => {
          res.data.pipe(ws)
          ws.on('close', () => {
            console.log("下载已完成：" + title);
            downloadBook()
            page.close()
          })
        })
      }else {
        interceptedRequest.continue()
      }
    })
    await page.goto(`https://590m.com${linkUrl}`)
    await page.waitForSelector(".btn.btn-outline-secondary.fs--1")
    let btn = await page.$(".btn.btn-outline-secondary.fs--1")
    await btn.click()

    //判断请求完成
    // page.on('requestfinished', (req) => {
    //   console.log("下载已完成：" + req.url());
    // })
  }

  downloadBook()

})()