let lApp = require('./lApp.js')

let app = new lApp()

app.staticDir = "/abc"

app.on('^/$', (req, res) => {
  // res.end('<h1>首页</h1><img src="./static/nier.jpg">')
  res.end('<h1>首页</h1><img src="./abc/nier.jpg">')
})

app.on('/guonei/(.*)', (req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8")
  if (req.pathObj.base === 'index') {
    res.end('国内新闻的首页')
  } else {
    res.end('国内新闻的其他页')
  }
})

app.on('/movies/[01]', (req, res) => {
  let movies = [
    {
      name: '雪暴',
      brief: '《雪暴》简介',
      author: '崔斯韦',
      stars: ['1', '2', '3', '4']
    },
    {
      name: '少年的你',
      brief: '《少年的你》简介',
      author: '曾国祥',
      stars: [
        {
          name: 'a',
          gender: '男'
        },
        {
          name: 'b',
          gender: '女'
        },
        {
          name: 'c',
          gender: '男'
        }
      ]
    }
  ]
  let index = req.pathObj.base;
  if (index === 0 || index === '0') {
    res.render(movies[index], './template/index0.html')
  }else {
    res.render(movies[index], './template/index1.html')
  }
})

app.run(80, () => {
  console.log('服务器已启动：', 'http://127.0.0.1');
})