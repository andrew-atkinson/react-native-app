import {Navigation} from 'react-native-navigation'
import {Provider} from 'react-redux'

import AuthScreen from './src/screens/Auth'
import FindPlaceScreen from './src/screens/FindPlace'
import SharePlaceScreen from './src/screens/SharePlace'
import configureStore from './src/store/config'

const store = configureStore();

//register screens
Navigation.registerComponent("places.AuthScreen", () => AuthScreen, store, Provider)
Navigation.registerComponent("places.FindPlaceScreen", () => FindPlaceScreen, store, Provider)
Navigation.registerComponent("places.SharePlaceScreen", () => SharePlaceScreen, store, Provider)

//start an app
Navigation.startSingleScreenApp({
  screen: {
    screen: "places.AuthScreen",
    title: "Login"
  }
})