const net = require('net')

let client = new net.Socket()
client.connect(5000, '127.0.0.1', () => {
  console.log('Comm[Wifi]:Connected!')
  setTimeout(() => {
    client.destroy()
    console.log('Comm[Wifi]:Disconnected!')
  }, 5000)
})
