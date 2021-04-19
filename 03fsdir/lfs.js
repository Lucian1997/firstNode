let fs = require('fs')

function fsRead(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {flag: 'r', encoding: 'utf-8'}, (err, data) => {
      if (err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
}

function fsWrite(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, {flag: 'a', encoding: 'utf-8'}, err => {
      if (err) {
        // console.log('写入出错');
        reject(err)
      }else {
        resolve()
        // console.log('写入成功');
      }
    })
  })
}

module.exports = {
  fsRead,
  fsWrite
}
