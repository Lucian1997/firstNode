let fs = require('fs')
// fs.writeFile('test.txt', 'lucian1997', {flag: 'a', encoding: 'utf-8'}, err => {
//   if (err) {
//     console.log('写入出错');
//   }else {
//     console.log('写入成功');
//   }
// })

function writeFs(path, content) {
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

async function writeList() {
  await writeFs('lyc.txt', '1.今天吃烧烤\n')
  await writeFs('lyc.txt', '2.今天吃烧烤\n')
  await writeFs('lyc.txt', '3.今天吃烧烤\n')
  await writeFs('lyc.txt', '4.今天吃烧烤\n')
}

writeList()