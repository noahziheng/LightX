import Bluetooth from './Bluetooth'
import Wifi from './Wifi'

export default function (device, dataReadCb, statusChangeCb) {
  console.log(device)
  return (device.type === 1 ? new Wifi(device, dataReadCb, statusChangeCb) : new Bluetooth(device, dataReadCb, statusChangeCb))
}
