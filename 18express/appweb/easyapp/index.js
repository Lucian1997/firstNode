const express = require('express')
let app = express()

app.get('/', function (req, res) {
  res.send("<h1>hello,world</h1>")
})

app.listen(8080,()=> {
  console.log('express已启动:', 'http://127.0.0.1:8080');
})