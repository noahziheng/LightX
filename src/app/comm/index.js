import Bluetooth from './Bluetooth'
import Wifi from './Wifi'

export default function (device, dataReadCb, statusChangeCb) {
  return (device.type === 1 ? new Wifi(device, dataReadCb, statusChangeCb) : new Bluetooth(device, dataReadCb, statusChangeCb))
}
