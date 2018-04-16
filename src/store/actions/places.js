import {SET_PLACES, DELETE_PLACE} from './actionTypes'
import {uiStopLoading, uiStartLoading} from './index'

export const addPlace = (placeName, location, image) => {
  console.log('placeName, location, image', placeName, location, image)
  return dispatch => {
    dispatch(uiStartLoading())
    fetch('https://us-central1-react-native-places.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => {
      console.log('err', err)
      alert("Imagestore: Something went wrong, please try again!")
      dispatch(uiStopLoading())
    })
    .then(res => res.json())
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location,
        image: parsedRes.imageUrl
      }
      return fetch('https://react-native-places.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
    })
    .catch(err => {
      console.log('err', err)
      alert("location: Something went wrong, please try again!")
      dispatch(uiStopLoading())
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes)
      dispatch(uiStopLoading())
    })
  }
}

export const getPlaces = () => {
  return dispatch => {
    fetch('https://react-native-places.firebaseio.com/places.json')
    .catch(err => {
      alert("something went wrong...")
      console.log(err)
    })
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
  }
}

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places
  }
}

export const deletePlace = key => {
  return dispatch => {
    fetch('https://react-native-places.firebaseio.com/' + key + '.json', {method: 'DELETE'})
    .catch(err => {
      console.log('err', err)
      alert("deleting: Something went wrong, please try again!")      
      dispatch(uiStopLoading())
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("done...")
      dispatch(deletePlaceAction(key))
    })

  }
}

export const deletePlaceAction = key => ({type: DELETE_PLACE, key})