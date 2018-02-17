import {Navigation} from 'react-native-navigation'

import AuthScreen from './src/screens/Auth'
import FindPlaceScreen from './src/screens/FindPlace'
import SharePlaceScreen from './src/screens/SharePlace'

//register screens
Navigation.registerComponent("place.AuthScreen", () => AuthScreen)
Navigation.registerComponent("place.FindPlace", () => FindPlaceScreen)
Navigation.registerComponent("place.SharePlace", () => SharePlaceScreen)


//start an app
Navigation.startSingleScreenApp({
  screen:{
    screen:"place.AuthScreen",
    title: "Login"
  }
})