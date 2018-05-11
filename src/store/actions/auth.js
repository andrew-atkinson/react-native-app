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
    if (!parsedRes.idToken) {
      alert("Authentication error: " + parsedRes.error.message)
    } else {
      dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn))
      startMainTabs()
    }
  })
}

export const authSetToken = token => ({type: AUTH_SET_TOKEN, token})

export const authStoreToken = (token, expiresIn) => dispatch => {
  dispatch(authSetToken(token))
  const now = new Date()
  const expirationDate = now.getTime() + expiresIn * 1000
  AsyncStorage.setItem('places-token', token)
  AsyncStorage.setItem('expiration-date', expirationDate.toString())
}

export const authGetToken = () => (dispatch, getState) => {
  const promise = new Promise((resolve, reject) => {
    const token = getState().auth.token // checks for token stored in redux
    if (!token) {
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
          // dispatch(authSetToken(fetchedToken)) // sets token on Redux
          resolve(fetchedToken) // resolves with global react native token
        } else {
          reject()
        }
      })
      .catch(err => reject())
    } else {
      console.log("I'm in resolved with token", token)
      resolve(token) // resolve with a redux token resolve, if it exists
    }
  })
  promise.catch(err => { // if the promise has an error, remove the AsyncStorage. 
    AsyncStorage.removeItem('expiration-date')
    AsyncStorage.removeItem('places-token')
  })
  return promise //returns whatever is resolved/rejected
}

export const authAutoSignin = () => dispatch => {
  dispatch(authGetToken())
  .then(token => {
    startMainTabs()
  })
  .catch(err => console.log('tokenless: failed to fetch token!'))
}
