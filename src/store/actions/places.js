import {SET_PLACES, DELETE_PLACE, PLACE_ADDED, START_ADD_PLACE} from './actionTypes'
import {uiStopLoading, uiStartLoading, authGetToken} from './index'

export const setPlaces = places => ({type: SET_PLACES, places})
export const deletePlaceAction = key => ({type: DELETE_PLACE, key})
export const placeAdded = () => ({type: PLACE_ADDED})
export const startAddPlace = () => ({type: START_ADD_PLACE})

const isOk = res => {
  if (res.ok) {
    return res.json()
  } else {
    throw(new Error())
  }
}

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(authGetToken())
    .catch(err => alert('no valid token found:' + err))
    .then(token => {
      authToken = token
      dispatch(uiStartLoading())
      return fetch('https://us-central1-react-native-places.cloudfunctions.net/storeImage', 
        {
          method: 'POST',
          body: JSON.stringify({image: image.base64}),
          headers: {
            "Authorization" : "Bearer " + authToken
          }
        }
      )
    })
    .catch(err => {
      alert('no valid token found:' + err)
      console.log('err', err)
      alert("Imagestore: Something went wrong, please try again!")
      dispatch(uiStopLoading())
    })
    .then(res => isOk(res))
    .then(parsedRes => {
      console.log("parsedRes from imagestore:", parsedRes)
      const placeData = {
        name: placeName,
        location,
        image: parsedRes.imageUrl,
        imagePath: parsedRes.imagePath
      }
      return fetch('https://react-native-places.firebaseio.com/places.json?auth=' + authToken, {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
    })
    .then(res => isOk(res))
    .then(parsedRes => {
      console.log(parsedRes)
      dispatch(uiStopLoading())
      dispatch(placeAdded())
    })
    .catch(err => {
      console.log('err', err)
      alert("location: Something went wrong, please try again!")
      dispatch(uiStopLoading())
    })
  }
}

export const getPlaces = () => {
  return dispatch => 
  dispatch(authGetToken())
  .then(token => fetch('https://react-native-places.firebaseio.com/places.json?auth=' + token))
  .catch(err => alert('no valid token found:' + err))
  .then(res => isOk(res))
  .then(parsedRes => {
    let places = []
    for (let key in parsedRes) {
      places.push({
        ...parsedRes[key],
        image: {
          uri: parsedRes[key].image
        },
        key
      })
    }
    dispatch(setPlaces(places))
  })
  .catch(err => {
    alert("something went wrong...")
    console.log(err)
  })
}

export const deletePlace = key => {
  return dispatch => {
    dispatch(uiStartLoading())
    dispatch(authGetToken())
    .then(token => {
      console.log('token from delete place', token)
      dispatch(deletePlaceAction(key))

      return fetch('https://react-native-places.firebaseio.com/places/' + key + '.json?auth=' + token, {method: 'DELETE'})
    })
    .catch(err => alert('no valid token found:' + err))
    .then(parsedRes => {
      console.log("done...", parsedRes)
      dispatch(uiStopLoading())
    })
    .catch(err => {
      alert("something went wrong with deleting the entry")
      console.log(err)
      dispatch(uiStopLoading())
    })
  }
}
