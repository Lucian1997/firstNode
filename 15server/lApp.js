const http = require('http')
const path = require('path')
const fs = require('fs')

class lApp {
  constructor() {
    this.server = http.createServer()
    this.reqEvent = {}
    this.staticDir = '/static'
    this.server.on('request', (req, res) => {
      //解析路径
      let pathObj = path.parse(req.url)
      if (pathObj.dir in this.reqEvent) {
        res.render = render
        res.setHeader("content-type", "text/html;charset=utf-8")
        req.pathObj = pathObj
        this.reqEvent[pathObj.dir](req, res)
      }else if (pathObj.dir === this.staticDir) {
        res.setHeader("content-type", this.getContentType(pathObj.ext))
        let rs = fs.createReadStream('./static/' + pathObj.base)
        rs.pipe(res)
      }else {
        res.setHeader("content-type", "text/html;charset=utf-8")
        res.end("<h1>404，页面找不到</h1>")
      }
    })
  }
  on(url, fn) {
    this.reqEvent[url] = fn
  }
  run(port, callback) {
    this.server.listen(port, callback)
  }
  getContentType(extName) {
    switch (extName) {
      case ".jpg":
        return "image/jpeg";
      case ".html":
        return "text/html;charset=utf-8";
      case ".js":
        return "text/javascript;charset=utf-8";
      case ".json":
        return "text/json;charset=utf-8";
      case ".gif":
        return "image/gif";
      case ".css":
        return "text/css";
    }
  }
}

function render(options, path) {
  fs.readFile(path, {encoding: 'utf-8', flag: 'r'},(err, data) => {
    if (err) {
      console.log(err);
    }else {
      data = replaceArr(data, options)
      data = replaceVar(data, options)
      this.end(data)
    }
  })
}

function replaceVar(data, options) {
  //匹配普通的变量，并且替换内容
  let reg = /\{\{(.*?)}}/igs
  let result;
  while(result = reg.exec(data)){
    //去除两边空白行
    let strKey = result[1].trim()
    let strValue = eval('options.' + strKey)
    data = data.replace(result[0], strValue)
  }
  return data
}

function replaceArr(data, options) {
  //匹配循环的变量，并且替换循环的内容
  let result;
  let reg = /\{%for \{(.*?)} %}(.*?)\{%endfor%}/igs
  while (result = reg.exec(data)) {
    let strKey = result[1].trim()
    //通过key值获取数组内容
    let strValueArr = options[strKey]
    let listStr = ''
    strValueArr.forEach((item, index) => {
      //替换每一项内容里的变量
      listStr = listStr + replaceVar(result[2], {"item": item})
    })
    data = data.replace(result[0], listStr)
  }
  return data
}

module.exports = lApp;