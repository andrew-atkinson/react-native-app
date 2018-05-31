import {SET_PLACES, DELETE_PLACE, PLACE_ADDED, START_ADD_PLACE} from './actionTypes'
import {uiStopLoading, uiStartLoading, authGetToken} from './index'

export const startAddPlace = () => ({type: START_ADD_PLACE})

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
    .then(res => res.json())
    .then(parsedRes => {
      console.log("parsedRes from imagestore:", parsedRes)
      const placeData = {
        name: placeName,
        location,
        image: parsedRes.imageUrl
      }
      return fetch('https://react-native-places.firebaseio.com/places.json?auth=' + authToken, {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
    })
    .then(res => res.json())
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

export const placeAdded = () => ({type: PLACE_ADDED})
  
export const getPlaces = () => {
  return dispatch => 
  dispatch(authGetToken())
  .then(token => fetch('https://react-native-places.firebaseio.com/places.json?auth=' + token))
  .catch(err => alert('no valid token found:' + err))
  .then(res => res.json())
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

export const setPlaces = places => {
  return {type: SET_PLACES, places}
}

export const deletePlace = key => {
  return dispatch => {
    dispatch(uiStartLoading())
    dispatch(authGetToken())
    .then(token => {
      dispatch(deletePlaceAction(key))
      return fetch('https://react-native-places.firebaseio.com/' + key + '.json?auth=' + token, {method: 'DELETE'})
    })
    .catch(err => alert('no valid token found:' + err))
    .then(res => res.json())
    .then(parsedRes => {
      console.log("done...")
      dispatch(uiStopLoading())
    })
    .catch(err => {
      alert("something went wrong with deleting the entry")
      console.log(err)
      dispatch(uiStopLoading())
    })
  }
}

export const deletePlaceAction = key => ({type: DELETE_PLACE, key})
