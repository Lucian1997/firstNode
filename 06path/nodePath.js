let path = require('path')
let fs = require('fs')

console.log(path);

let strPath = 'http://www.baidu.com'

//获取路径
let info = path.extname(strPath)

console.log(info);

let arr = ['/sxt', 'qianduan', 'zhongji']
let info1 = path.resolve(...arr)
console.log(info1)

//获取当前执行目录的完整路径
console.log(__dirname);

// let info2 = path.join(...[__dirname, 'sxt', 'qianduan', 'zhongji'])
let info2 = path.join(__dirname, 'sxt', 'qianduan', 'zhongji')
console.log(info2);

//
let str = "http://www.baidu.com/xinwen/guonei.html"

//解析出请求目录
let arrParse = str.split('/')
console.log(arrParse);
arr = arrParse.slice(arrParse.length - 2,arrParse.length)
console.log(arr);

filePath = path.join(__dirname, ...arr)
console.log(filePath);

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
})
