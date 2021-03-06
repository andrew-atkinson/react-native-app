import {AsyncStorage} from 'react-native'
import {Navigation} from 'react-native-navigation'

import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes'
import {APIKEY} from '../../../APIKEY.json'
import {startMainTabs} from '../../screens/startMainTabs'
import {uiStartLoading, uiStopLoading} from './index'
import {WHITE, BACKGROUND_BLUE} from '../../assets/color'

export const tryAuth = (authData, authMode) => dispatch => {
  dispatch(uiStartLoading())
  fetch(authMode === "signUp" 
                 ? "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + APIKEY 
                 : "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + APIKEY, {
    method: "POST",
    body : JSON.stringify({
      email: authData.email, 
      password: authData.password, 
      returnSecureToken: true
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .catch(err => {
    console.log(err)
    alert('authentication failed!')
    dispatch(uiStopLoading())
  })
  .then(res => {
    dispatch(uiStopLoading())
    return res.json()
  })
  .then(parsedRes => {
    if (!parsedRes.idToken) {
      alert("Authentication error: " + parsedRes.error.message)
    } else {
      dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken))
      startMainTabs()
    }
  })
}

export const authSetToken = (token, expiration) => ({type: AUTH_SET_TOKEN, token, expiration})

export const authStoreToken = (token, expiresIn, refreshToken) => dispatch => {
  const now = new Date()
  const expirationDate = now.getTime() + expiresIn * 1000
  dispatch(authSetToken(token, expirationDate))
  AsyncStorage.setItem('places-token', token)
  AsyncStorage.setItem('expiration-date', expirationDate.toString())
  AsyncStorage.setItem('places-refreshToken', refreshToken)
}

export const authGetToken = () => (dispatch, getState) => {
  const promise = new Promise((resolve, reject) => {
    const token = getState().auth.token // checks for token stored in redux
    const expiration = getState().auth.expiration
    if (!token || new Date(expiration) <= new Date()) {
      let fetchedToken;
      // if not, checks for token stored in global react native
      AsyncStorage.getItem('places-token')
      .catch(() => reject())
      .then(storageToken => {
        fetchedToken = storageToken
        return !storageToken ? reject() : AsyncStorage.getItem('expiration-date') // if there's a global react native token, call the expiration
      })
      .then(expirationDate => { // potentially, this COULD be null... 
        const parsedExpirationDate = new Date(parseInt(expirationDate)) // parses a date from the expirationDate
        const now = new Date()
        if (parsedExpirationDate > now) { // checks if still valid (not valid if Null)
          dispatch(authSetToken(fetchedToken)) // sets token on Redux
          resolve(fetchedToken) // resolves with global react native token
        } else {
          reject()
        }
      })
      .catch(err => reject())
    } else {
      resolve(token) // resolve with a redux token resolve, if it exists
    }
  })
  return promise.catch(err => AsyncStorage.getItem('places-refreshToken')
    .then(refreshToken => fetch("https://securetoken.googleapis.com/v1/token?key=" + APIKEY, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "grant_type=refresh_token&refresh_token=" + refreshToken
      })
    )
    .then(res => res.json())
    .then(parsedRes => {
      if(parsedRes.id_token) {
        dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token))
        return parsedRes.id_token
      } else {
        dispatch(authClearStorage())
      }
    })
    .then(token => {
      if (!token) {
        throw(new Error())
      } else {
        return token
      }
    })
  )
}

export const authAutoSignin = () => dispatch => {
  dispatch(authGetToken())
  .then(token => {
    startMainTabs()
  })
  .catch(err => console.log('tokenless: failed to fetch token!'))
}

export const authClearStorage = () => dispatch => {
  AsyncStorage.removeItem('expiration-date')
  AsyncStorage.removeItem('places-token')
  return AsyncStorage.removeItem('places-refreshToken')
}

export const authLogout = () => dispatch => {
  dispatch(authClearStorage())
  .then(() => Navigation.startSingleScreenApp({
    screen: {
      screen: "places.AuthScreen",
      title: "Log in",
      navigatorStyle:{
        navBarBackgroundColor: BACKGROUND_BLUE,
        navBarTextColor: WHITE,
        navigationBarColor: BACKGROUND_BLUE,
        navBarTextFontFamily: 'Merriweather-Regular',
        navBarTextFontSize: 30,
        navBarTitleTextCentered: true
      }
    }
  }))
  dispatch(authRemoveToken())
}

export const authRemoveToken = () => ({type: AUTH_REMOVE_TOKEN})
