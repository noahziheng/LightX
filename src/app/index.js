import {
  StackNavigator
} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import AddScreen from './screens/AddScreen'
import ControllScreen from './screens/ControllScreen'
import FinishAddScreen from './screens/FinishAddScreen'

export default StackNavigator({
  Home: { screen: HomeScreen },
  Add: { screen: AddScreen },
  Controll: { screen: ControllScreen },
  FinishAdd: {screen: FinishAddScreen}
}, {
  navigationOptions: {
    header: null
  }
})
