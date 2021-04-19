let http = require('http')

//创建Server服务器
let server = http.createServer()
//监听对当前服务器对象的请求
server.on('request', (req, res) => {
  //当服务器被请求时，会触发请求事件，并传入请求对象和响应对象
  console.log(req.url);

  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  //根据路径信息，显示不同的页面信息
  if (req.url === '/'){
    res.end('<h1>首页</h1><img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"/>')
  }else if (req.url === '/guonei') {
    res.end('<h1>国内新闻</h1>')
  }else if (req.url === '/yule') {
    res.end('<h1>娱乐新闻</h1>')
  }else {
    res.end('<h1>404</h1>')
  }

})

//服务器监听的端口号

server.listen(3000, ()=> {
  //启动监听端口号成功时触发
  console.log('服务器启动成功');
})