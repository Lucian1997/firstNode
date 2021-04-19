let fs = require('fs')
let {
  fsRead,
  fsWrite
} = require('./lfs')


const txtPath = 'all.txt'

fs.readdir('../02fs/write', (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log(files);
    files.forEach(async function(file, i) {
      let content = await fsRead('../02fs/write/' + file.trim())
      await fsWrite(txtPath, content)
    })
  }
})