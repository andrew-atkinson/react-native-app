import {Navigation} from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import {Platform} from 'react-native'
import { BACKGROUND_BLUE, LISTITEM_BLUE, HIGHLIGHT, LOWLIGHT, WHITE } from '../assets/color';

export const startMainTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "places.FindPlaceScreen",
          label: "Find Place",
          title: "Find Place",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "menu",
                id: "SideDrawerToggle"
              }
            ]
          }
        }, {
          screen: "places.SharePlaceScreen",
          label: "Share Place",
          title: "Share Place",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "menu",
                id: "SideDrawerToggle"
              }
            ]
          }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: HIGHLIGHT,
        tabBarButtonColor: LOWLIGHT,
        tabBarBackgroundColor: BACKGROUND_BLUE,
        tabBarLabelColor: LOWLIGHT,
        tabBarSelectedLabelColor: HIGHLIGHT
      },
      appStyle: {
        tabBarSelectedButtonColor: HIGHLIGHT,
        tabBarButtonColor: LOWLIGHT,
        navBarBackgroundColor: BACKGROUND_BLUE,
        tabBarBackgroundColor: BACKGROUND_BLUE,
        navigationBarColor: BACKGROUND_BLUE,
        navBarTextFontFamily: 'Merriweather-Regular',
        navBarTextFontSize: 30,
        navBarTextColor: WHITE
      },
      drawer: {
        left: {
          screen: "places.SideDrawerScreen"
        }
      }
    })
  })
}
