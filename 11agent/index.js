const axios = require('axios')

let httpUrl = 'https://www.doutula.com/article/detail/9002522'
let options = {
  proxy: {
    host: '163.125.113.224',
    port: 8118
  }
}
axios.get(httpUrl, options).then(res => {
  console.log(res);
})