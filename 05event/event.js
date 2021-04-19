let events = require('events')
let fs = require('fs')

let emitEvent = new events.EventEmitter()

emitEvent.on('helloSuccess', function (eventMsg) {
  console.log('1吃夜宵');
  console.log(eventMsg);
})
emitEvent.on('helloSuccess', function () {
  console.log('2唱K');
})
emitEvent.on('helloSuccess', function () {
  console.log('3打Dota');
})
emitEvent.on('helloSuccess', function () {
  console.log('4休息');
})

function lReadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {flags: 'r', encoding: 'utf-8'}, (err, data) => {
      if (err) {
        console.log(err);
        reject(err)
      } else {
        console.log(data);
        resolve(data)
        // emitEvent.emit('helloSuccess', data)
      }
    })
  })
}

lReadFile().then(res => {
  
})