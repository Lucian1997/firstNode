let readline = require('readline')
let {
  fsWrite
} = require('./lfs')

//导入readline包
//实例化接口对象
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//设置rl提问事件
// rl.question("今晚吃啥？", answer => {
//
// })

function lQuestion(title) {
  return new Promise((resolve, reject) => {
    rl.question(title, answer => {
      resolve(answer)
    })
  })
}

async function createPackage() {
  let name = await lQuestion("name?")
  let description = await lQuestion("description?")
  let main = await lQuestion("main?")
  let author = await lQuestion("author?")

  let content = `{
  "name": "${name}",
  "description": "${description}",
  "main": "${main}",
  "author": "${author}"
}
`

  await fsWrite('package.json', content)

  await rl.close()
}

createPackage()

rl.on('close', () => {
  process.exit(0)
})