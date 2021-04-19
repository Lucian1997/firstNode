let puppeteer = require('puppeteer')
let axios = require('axios')
let url = require('url')
let fs = require('fs')
let httpUrl = "https://sobooks.cc/";

//将延迟函数封装成promise对象
function lWait(milliSecondes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('成功执行延迟函数，延迟：' + milliSecondes)
    }, milliSecondes)
  })
}

//目标：获取https://sobooks.cc/,所有电子书的书名和链接
(async function () {
  let debugOptions = {
    //设置视窗大小
    defaultViewport: {
      width: 1400,
      height: 800
    },
    //设置为有界面
    headless: false,
    //设置放慢每个步骤的毫秒数
    slowMo: 250,
    timeout: 0
  }

  let options = {
    headless: true,
    timeout: 0
  }

  let browser = await puppeteer.launch(options)

  //进入网站，获取整个网站列表页的页数
  async function getAllNum() {
    let page = await browser.newPage()
    //截取谷歌请求
    await page.setRequestInterception(true)
    //监听请求事件，并对请求进行拦截
    page.on('request', interceptedRequest => {
      let urlObj = url.parse(interceptedRequest.url())
      if (urlObj.hostname === 'googleads.g.doubleclick.net') {
        interceptedRequest.abort()
      }else {
        interceptedRequest.continue()
      }
    })
    await page.goto(httpUrl)
    //设置选择器，获取总页数
    let pageNum = await page.$eval(".pagination li:last-child span", element => {
      let text = element.innerHTML

      text = text.substring(1, text.length - 2).trim()
      return text
    })
    await page.close()
    return pageNum
  }

  let pageNum = await getAllNum()

  //获取列表页的所有链接
  async function pageList(num) {
    let pageListUrl = "https://sobooks.cc/page/" + num;
    let page = await browser.newPage()
    //截取谷歌请求
    await page.setRequestInterception(true)
    //监听请求事件，并对请求进行拦截
    page.on('request', interceptedRequest => {
      let urlObj = url.parse(interceptedRequest.url())
      if (urlObj.hostname === 'googleads.g.doubleclick.net') {
        interceptedRequest.abort()
      }else {
        interceptedRequest.continue()
      }
    })

    //访问列表页地址
    await page.goto(pageListUrl)
    let arrPage = await page.$$eval('.card .card-item .thumb-img>a', elements => {
      let arr = []
      elements.forEach(item => {
        let obj = {
          href: item.getAttribute('href'),
          title: item.getAttribute('title')
        }
        arr.push(obj)
      })
      return arr
    })
    await page.close()
    //通过获取的数组的地址和标题去请求书籍的详情页
    arrPage.forEach(async (item, index)=> {
      await lWait(30000 * index)
      getPageInfo(item)
    })
  }

  //进入每个电子书的详情页获取下载电子书的网盘地址
  async function getPageInfo(pageObj) {
    let page = await browser.newPage()
    //截取谷歌请求
    await page.setRequestInterception(true)
    //监听请求事件，并对请求进行拦截
    page.on('request', interceptedRequest => {
      let urlObj = url.parse(interceptedRequest.url())
      if (urlObj.hostname === 'googleads.g.doubleclick.net') {
        interceptedRequest.abort()
      }else {
        interceptedRequest.continue()
      }
    })

    await page.goto(pageObj.href)
    let eleA = await page.$('.dltable tr:nth-child(3) a:last-child')
    if (eleA != null) {
      let aHref = await eleA.getProperty('href')
      aHref = aHref._remoteObject.value
      aHref = aHref.split('?url=')[1]
      //将获取的数据保存到book.txt文档里
      let content = `{"title": "${pageObj.title}", "href": "${aHref}"}---\n`
      fs.writeFile('book.txt', content, {flag: 'a'}, err => {
        if (err){
          console.log(err);
        }else {
          console.log('已将书下载路径写入：' + pageObj.title);
          page.close()
        }
      })
    }
  }

  pageList(60)
  // getPageInfo({href: 'https://sobooks.cc/books/14620.html', title: '海明威作品精选'})
})()