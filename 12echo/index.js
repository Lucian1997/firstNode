const axios = require('axios')
const fs = require('fs')
const path = require('path')

async function getPage(num) {
  let httpUrl = 'http://www.app-echo.com/api/recommend/sound-day?page=' + num
  let res = await axios.get(httpUrl)
  // console.log(res.data.list);
  res.data.list.forEach((item, index) => {
    let title = item.sound.name
    let mp3Url = item.sound.source
    let fileName = path.parse(mp3Url).name
    let content = `${title},${mp3Url},${fileName}\n`
    fs.writeFile('music.txt', content, {flag: 'a'}, () => {
      console.log('写入完成：' + title);
    })
    download(mp3Url, fileName)
  })
}

async function download(mp3Url, title) {
  let res = await axios.get(mp3Url, {responseType: "stream"})
  let ws = fs.createWriteStream('./sound/' + title + '.mp3')
  res.data.pipe(ws)
  res.data.on('close', () => {
    ws.close()
  })
}


getPage(1)