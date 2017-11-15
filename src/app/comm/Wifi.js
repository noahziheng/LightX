import net from 'react-native-tcp'
import wifi from 'react-native-android-wifi'
import { Buffer } from 'buffer'
import { NetInfo } from 'react-native'

class Wifi {
  constructor (device, dataReadCb, statusChangeCb) {
    this.status = false
    this.device = device
    this.statusChangeCb = statusChangeCb
    this.client = net.createConnection()
    this.buf = []
    this.client.on('data', (data) => {
      data = Buffer.from(data, 'binary')
      console.log(data)
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          this.buf.push(data[key])
          if (data[key] === 0xFA) {
            dataReadCb(this.buf)
            console.log(this.buf)
            this.buf.splice(0, this.buf.length)
          }
        }
      }
    })
    this.client.on('error', (err) => {
      console.log(err)
    })
    this.client.on('end', (r) => {
      this.client.destroy()
    })
    NetInfo.addEventListener(
      'connectionChange',
      (t) => {
        if (t.type === 'wifi' || t.type === 'WIFI') {
          wifi.getSSID((ssid) => {
            if (ssid === this.device.name && !this.status) {
              this.client.connect(5000, '192.168.4.1', () => {
                console.log('Comm[Wifi]:Connected!')
                this.setStatus(true)
              })
            }
          })
        }
      }
    )
  }

  setStatus (r) {
    this.status = r
    this.statusChangeCb(r)
  }

  connect () {
    wifi.findAndConnect(this.device.name, '', (found) => {
      if (found) {
        console.log('wifi is in range')
      } else {
        console.log('wifi is not in range')
      }
    })
  }

  disconnect () {
    this.dataReadCb = () => {}
    this.statusChangeCb = () => {}
    this.write([0x44], () => {
      this.client.end()
      wifi.getSSID((ssid) => {
        console.log(ssid)
        if (ssid === this.device.name) {
          this.setStatus(false)
          wifi.isRemoveWifiNetwork(this.device.name, (isRemoved) => {
            console.log('Forgetting the wifi device - ' + this.device.name)
          })
          console.log('Comm[Wifi]:Disconnected!')
        }
      })
    })
  }

  write (content, Cb?) {
    if (this.status) this.client.write(Buffer.from([0x3A, 0x00, ...content, 0xFF, 0xFA]), null, Cb)
    else if (Cb) Cb()
  }
}

export default Wifi
