import {
  StackNavigator
} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import AddScreen from './screens/AddScreen'

export default StackNavigator({
  Home: { screen: HomeScreen },
  Add: { screen: AddScreen }
}, {
  navigationOptions: {
    header: null
  }
})
