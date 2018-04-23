import {TRY_AUTH, AUTH_SET_TOKEN} from './actionTypes'
import {APIKEY} from '../../../APIKEY.json'
import {startMainTabs} from '../../screens/startMainTabs'
import {uiStartLoading, uiStopLoading} from './index'
import {AsyncStorage} from 'react-native'

export const tryAuth = (authData, authMode) => dispatch => {
  dispatch(uiStartLoading())
  let url = authMode === "signUp" 
            ? "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + APIKEY
            : "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + APIKEY
  fetch(url, {
    method: "POST",
    body: JSON.stringify({email: authData.email, password: authData.password, returnSecureToken: true}),
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
    console.log('parsedRes', parsedRes)
    if (!parsedRes.idToken) {
      alert("Authentication error: " + parsedRes.error.message)
    } else {
      dispatch(authStoreToken(parsedRes.idToken))
      startMainTabs()
    }
  })
}

export const authSetToken = token => ({type: AUTH_SET_TOKEN, token})

export const authStoreToken = token => dispatch => {
  dispatch(authSetToken(token))
  AsyncStorage.setItem('places-token', token)
}

export const authGetToken = () => (dispatch, getState) => {
  const promise = new Promise((resolve, reject) => {
    const token = getState().auth.token
    if (!token) {
      AsyncStorage.getItem('places-token', () => reject())
      .then(storageToken => {
        dispatch(authSetToken(storageToken))
        resolve(storageToken)
      })
      .catch(err => reject())
    } else {
      resolve(token)
    }
  })
  return promise
}


export const authAutoSignin = () => dispatch => {
  dispatch(authGetToken())
  .then(token => {
    startMainTabs()
  })
  .catch(err => console.log('tokenless!'))
}
