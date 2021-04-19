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

function fsDir(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        reject()
      }else {
        resolve('创建目录成功')
      }
    })
  })
}

function rename(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.log(err);
      }else {
        resolve('rename success')
      }
    })
  })
}

module.exports = {
  fsRead,
  fsWrite,
  fsDir,
  rename
}
