import {SET_PLACES, DELETE_PLACE} from '../actions/actionTypes'

const initialState = {
  places: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places,

      }
    case DELETE_PLACE:
      console.log("delete places: ", state)
      return {
        ...state,
        places: state.places.filter(place => {
            return place.key != action.key
          })
      }
    default:
      return state
  }
}

export default reducer