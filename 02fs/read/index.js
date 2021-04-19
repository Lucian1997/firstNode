let fs = require('fs')

//同步
let content = fs.readFileSync('hello.txt', {flag: 'r', encoding: 'utf-8'})
console.log(content.toString());

//异步
// fs.readFile('hello.txt', {flag: 'r', encoding: 'utf-8'}, (err, data) => {
//   if (err) {
//     console.log(err);
//   }else {
//     console.log(data);
//   }
//   console.log(456);
// })

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

async function readList() {
  let file2 = await fsRead('hello.txt')
  console.log(file2.toString() + '.txt')
  console.log(file2.length)
  console.log(file2.trim().length)
  let file3 = await fsRead(file2.trim() + '.txt')
  console.log(file3)
  let file3Content = await fsRead('hello3.txt')
  console.log(file3Content);
}

readList()