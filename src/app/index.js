import {
  StackNavigator
} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import AddScreen from './screens/AddScreen'
import ControllScreen from './screens/ControllScreen'

export default StackNavigator({
  Home: { screen: HomeScreen },
  Add: { screen: AddScreen },
  Controll: { screen: ControllScreen }
}, {
  navigationOptions: {
    header: null
  }
})
