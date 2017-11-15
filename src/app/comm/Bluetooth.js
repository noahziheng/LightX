import EasyBluetooth from 'easy-bluetooth-classic'
import { Buffer } from 'buffer'

class Bluetooth {
  constructor (device, dataReadCb, statusChangeCb) {
    this.status = false
    this.device = device
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener((data) => {
      data = Buffer.from(data, 'binary')
      dataReadCb(data)
    })
    this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this))
    this.statusChangeCb = statusChangeCb
  }

  onStatusChange (r) {
    this.setStatus(r === 'CONNECTED')
  }

  setStatus (r) {
    this.status = r
    this.statusChangeCb(r)
  }

  connect () {
    return EasyBluetooth.connect(this.device)
      .then(r => {
        this.setStatus(true)
        console.log('Comm[Bluetooth]:Connected!')
        return r
      })
      .catch((ex) => {
        console.warn(ex)
      })
  }

  disconnect () {
    this.onDataReadEvent.remove()
    this.onStatusChangeEvent.remove()
    return EasyBluetooth.disconnect()
    .then(r => {
      console.log('Comm[Bluetooth]:Disconnected!')
      return r
    })
    .catch((ex) => {
      console.warn(ex)
    })
  }

  write (content) {
    return EasyBluetooth.writeIntArray([0x3A, 0x00, ...content, 0xFF, 0xFA])
      .then(r => {
        console.log('Comm[Bluetooth]:Writing...')
        return r
      })
      .catch((ex) => {
        console.warn(ex)
      })
  }
}

export default Bluetooth
