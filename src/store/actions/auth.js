import {TRY_AUTH, AUTH_SET_TOKEN} from './actionTypes'
import {APIKEY} from '../../../APIKEY.json'
import {startMainTabs} from '../../screens/startMainTabs'
import {uiStartLoading, uiStopLoading} from './index'

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading())
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + APIKEY
    if (authMode === "signUp") {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + APIKEY
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({email: authData.email, password: authData.password, returnSecureToken: true}),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(err => {
      console.log(err)
      alert('authentication failed!')
      dispatch(uiStopLoading())
    }).then(res => {
      dispatch(uiStopLoading())
      return res.json()
    }).then(parsedRes => {
      console.log('parsedRes', parsedRes)
      if (!parsedRes.idToken) {
        alert("Authentication error: " + parsedRes.error.message)
      } else {
        dispatch(authSetToken(parsedRes.idToken))
        startMainTabs()
      }
    })
  }
}

export const authSetToken = token => ({type: AUTH_SET_TOKEN, token})

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token
      if (!token) {
        reject()
      } else {
        resolve(token)
      }
    })
    return promise
  }
}