let fs = require('fs')

//创建写入流
//--语法：fs.createWriteStream(文件路径， [可选的配置操作])
let ws = fs.createWriteStream('hello.txt', {flags: 'w', encoding: 'utf-8'})
// console.log(ws)

//监听文件打开事件
ws.on('open', function () {
  console.log('文件打开了');
})
//监听准备事件
ws.on('ready', function () {
  console.log('文件写入已准备状态');
})
//监听文件关闭事件
ws.on('close', function () {
  console.log('文件写入完毕，关闭');
})
//文件流式写入
ws.write('helloWorld!\n', function (err) {
  if (err) {
    console.log(err);
  }else {
    console.log('内容1流入完成');
  }
})
ws.write('helloWorld!\n', function (err) {
  if (err) {
    console.log(err);
  }else {
    console.log('内容2流入完成');
  }
})
ws.write('helloWorld!\n', function (err) {
  if (err) {
    console.log(err);
  }else {
    console.log('内容3流入完成');
  }
})
//文件写入完成
ws.end(function () {
  console.log('文件写入关闭');
})