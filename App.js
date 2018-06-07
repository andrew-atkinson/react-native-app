import {Navigation} from 'react-native-navigation'
import {Provider} from 'react-redux'

import AuthScreen from './src/screens/Auth'
import FindPlaceScreen from './src/screens/FindPlace'
import SharePlaceScreen from './src/screens/SharePlace'
import PlaceDetailScreen from './src/screens/PlaceDetail'
import SideDrawerScreen from './src/screens/SideDrawer'

import configureStore from './src/store/config'
import { BACKGROUND_BLUE, WHITE } from './src/assets/color'

const store = configureStore()

//register screens
Navigation.registerComponent("places.AuthScreen", () => AuthScreen, store, Provider)
Navigation.registerComponent("places.FindPlaceScreen", () => FindPlaceScreen, store, Provider)
Navigation.registerComponent("places.SharePlaceScreen", () => SharePlaceScreen, store, Provider)
Navigation.registerComponent("places.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider)
Navigation.registerComponent("places.SideDrawerScreen", () => SideDrawerScreen, store, Provider)


//start an app
Navigation.startSingleScreenApp({
  screen: {
    screen: "places.AuthScreen",
    title: "Login",
    navigatorStyle:{
      navBarBackgroundColor: BACKGROUND_BLUE,
      navBarTextColor: WHITE,
      navigationBarColor: BACKGROUND_BLUE,
      navBarTextFontFamily: 'Merriweather-Regular',
      navBarTextFontSize: 30,
      navBarTitleTextCentered: true
    }
  }
})