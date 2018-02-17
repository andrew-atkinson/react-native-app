import {Navigation} from 'react-native-navigation'

import AuthScreen from './src/screens/Auth'
import FindPlaceScreen from './src/screens/FindPlace'
import SharePlaceScreen from './src/screens/SharePlace'

//register screens
Navigation.registerComponent("places.AuthScreen", () => AuthScreen)
Navigation.registerComponent("places.FindPlaceScreen", () => FindPlaceScreen)
Navigation.registerComponent("places.SharePlaceScreen", () => SharePlaceScreen)


//start an app
Navigation.startSingleScreenApp({
  screen:{
    screen:"places.AuthScreen",
    title: "Login"
  }
})