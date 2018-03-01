import {AppRegistry} from 'react-native'
import {Provider} from 'react-redux'
import React from 'react'
import App from './App'
import configureStore from './src/store/config'

const store = configureStore()

const RNRedux = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

AppRegistry.registerComponent('reactnativeapp', () => App)
